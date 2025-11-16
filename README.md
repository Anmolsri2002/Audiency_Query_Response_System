# 🎯 Audiency Query Response System

A professional, unified customer-support mailbox that collects and manages queries from **multiple channels** (email, social platforms, forms, etc.) in one clean dashboard.  
Support agents can **view, filter, reply, track, and analyze** queries with ease — just like a modern email client.

The system auto-tags each query, assigns priority, maintains full conversation history, and stores every agent reply inside a dedicated **Sent Mailbox**.

---

## 🚀 Key Features

### 📬 Unified Inbox  
- Fetches all customer queries from multiple channels into one dashboard.  
- Real-time updates using WebSockets.  

### 🤖 Auto Tagging & Priority Detection  
- Detects query intent (question, request, complaint).  
- Assigns priority levels (medium / high / urgent).  

### 💬 Conversation Thread  
- Displays full message history between customer and agent.  
- Thread-style interface similar to Gmail.  

### 📤 Sent Mailbox  
- Stores every reply sent by support agents.  
- Allows viewing replies separately for audit and tracking.  

### 📊 Analytics Dashboard  
- Count of messages by category.  
- Priority distribution metrics.  
- Useful insights for team leads.  

### 🔍 Filters & Smart Views  
- Inbox filtering by tags (Questions, Requests, Complaints, Urgent).  
- Status-based filtering (Open / Resolved / All).  

### ⚡ Real-Time Support  
- Socket-based events for create/update/delete/reply.  
- No need to refresh the UI — everything updates instantly.

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- React Router  
- Context API for state management  
- Axios for API communication  
- CSS modules / custom styling  

### **Backend**
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- Socket.io for real-time communication  

---

## 📁 Folder Structure

