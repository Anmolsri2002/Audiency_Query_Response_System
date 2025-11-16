const Query = require('../models/Query');
const User = require('../models/User');

// simple rule-based auto-tag and priority helper
function autoTagAndPriority(message) {
  const text = (message || '').toLowerCase();
  const tags = [];
  if (text.includes('how to') || text.includes('what is') || text.includes('?')) tags.push('question');
  if (text.includes('refund') || text.includes('return') || text.includes('cancel')) tags.push('request');
  if (text.includes('bad') || text.includes('angry') || text.includes('terrible') || text.includes('complaint')) tags.push('complaint');
  let priority = 'medium';
  if (tags.includes('complaint')) priority = 'high';
  if (text.includes('urgent') || text.includes('asap')) priority = 'urgent';
  return { tags: Array.from(new Set(tags)), priority };
}

exports.getQueries = async (req, res) => {
  const queries = await Query.find().populate('assignedTo');
  res.json(queries);
};

exports.createQuery = async (req, res) => {
  const data = req.body;
  // auto tag & priority
  const meta = autoTagAndPriority(data.message || data.subject || '');
  data.tags = data.tags && data.tags.length ? data.tags : meta.tags;
  data.priority = data.priority || meta.priority;
  const q = new Query(data);
  await q.save();
  // emit realtime event
  const io = req.app.locals.io;
  if (io) io.emit('query:created', q);
  res.status(201).json(q);
};

exports.updateQuery = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  update.updatedAt = new Date();
  const q = await Query.findByIdAndUpdate(id, update, { new: true }).populate('assignedTo');
  // append history if provided
  if (update.history) {
    // just save
  }
  const io = req.app.locals.io;
  if (io) io.emit('query:updated', q);
  res.json(q);
};

exports.deleteQuery = async (req, res) => {
  await Query.findByIdAndDelete(req.params.id);
  const io = req.app.locals.io;
  if (io) io.emit('query:deleted', { id: req.params.id });
  res.sendStatus(204);
};

exports.getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id).populate('assignedTo');
    if (!query) return res.status(404).json({ error: "Query not found" });

    res.json(query);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replyToQuery = async (req, res) => {
  const { id } = req.params;
  const { text, by } = req.body;

  const original = await Query.findById(id);
  if (!original) return res.status(404).json({ error: "Query not found" });

  // 1. Add reply to original mail
  original.replies.push({
    text,
    by,
    at: new Date()
  });
  original.status = "resolved";
  await original.save();

  // 2. Create Sent Mail (for /sent folder)
  const sentMail = await Query.create({
    sender: "Agent",
    subject: "Re: " + original.subject,
    message: text,
    channel: "email",
    folder: "sent",
    status: "sent",
    priority: "low",
    tags: ["reply"],
    originalRef: original._id,
    createdAt: new Date()
  });

  // Emit events
  req.app.locals.io.emit("query:updated", original);
  req.app.locals.io.emit("query:created", sentMail);

  // 3. Send this response (IMPORTANT)
  res.json({
    success: true,
    sentMail,
    original
  });
};




