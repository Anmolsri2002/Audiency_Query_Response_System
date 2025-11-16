const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Connect to Mongo
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/audience_query_db';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/queries', require('./routes/queryRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Simple health
app.get('/', (req, res) => res.send({ ok: true }));

// Socket.io for realtime updates (emit events when queries change)
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Make io available to controllers via app.locals
app.locals.io = io;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on', PORT));
