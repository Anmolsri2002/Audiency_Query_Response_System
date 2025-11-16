const mongoose = require("mongoose");
const Query = require("./models/Query");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/audience_query_db";

mongoose.connect(uri).then(async () => {
  console.log("Mongo connected for seeding...");

  // Clear old data
  await Query.deleteMany({});

  // Insert default seed mails
  await Query.insertMany([
    {
      channel: "email",
      sender: "john@example.com",
      subject: "How to change my password?",
      message: "Can you tell me how to reset my password?",
      tags: ["question"],
      priority: "medium",
      status: "new"
    },
    {
      channel: "twitter",
      sender: "@angry_user",
      subject: "Terrible service!",
      message: "Your customer support is terrible. Fix this ASAP.",
      tags: ["complaint"],
      priority: "urgent",
      status: "new"
    },
    {
      channel: "facebook",
      sender: "Priya Sharma",
      subject: "Refund request",
      message: "I want a refund for my last purchase.",
      tags: ["request"],
      priority: "high",
      status: "new"
    },
    {
      channel: "email",
      sender: "sameer@example.com",
      subject: "Great experience",
      message: "I really liked your new features!",
      tags: ["positive"],
      priority: "low",
      status: "new"
    }
  ]);

  console.log("Seed data added!");
  mongoose.disconnect();
});
