FlowMate – Workflow Automation System (MERN + JWT)
A powerful task manager with built-in workflow automation. Create tasks, define rules, and let the system execute actions automatically — all within a secure, user-isolated workspace.
---
🚀 Features
Personal workspace (fully user-isolated data)
Create, update, and manage tasks
Workflow automation engine (IF → THEN logic)
Real-time workflow execution on task events
Logs system to track automation results
JWT-based authentication (secure APIs)
Clean dashboard UI (React + Tailwind)
---
⚙️ Workflow Automation
FlowMate allows you to define simple automation rules:
IF (trigger) → THEN (action)
🔹 Triggers
task_created → When a new task is added
task_updated → When a task is modified
🔹 Actions
log_message → Save a custom message
save_to_db → Store structured log data
🧠 Example
IF task_created → THEN log_message  
Message: "New task '{task_title}' added!"
Output:  
New task 'Buy milk' added!
---
🛠️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
React Router
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
bcryptjs
Deployment
Vercel (Frontend)
Render / Railway (Backend)
---
📌 How It Works
User logs in or signs up
Creates tasks or workflows
On task events → workflow engine triggers
Matching workflows execute actions
Results are stored in Logs
User views execution history
---
🔄 Workflow Execution Flow
Task Created / Updated  
↓  
workflowEngine.js triggered  
↓  
Find matching workflows (userId + trigger)  
↓  
Execute action(s)  
↓  
Store result in Logs collection
---
🗂️ Project Structure
```
flowmate/
├── server/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── middleware/
│
└── client/
    ├── components/
    ├── pages/
    ├── hooks/
    └── api/
```
---
🔧 Run Locally
1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/flowmate.git
cd flowmate
```
---
2️⃣ Setup Backend
```bash
cd server
npm install
npm run dev
```
Create .env:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```
---
3️⃣ Setup Frontend
```bash
cd client
npm install
npm run dev
```
Create .env:
```
VITE_API_URL=http://localhost:5000/api
```
---
🔐 API Overview
Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
Workflows
GET /api/workflows
POST /api/workflows
PUT /api/workflows/:id
DELETE /api/workflows/:id
Tasks
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
Logs
GET /api/logs
DELETE /api/logs
---
🔒 Security
Passwords hashed using bcrypt (no plain text storage)
JWT-based authentication (7-day expiry)
All data scoped to userId (strict isolation)
---
📊 Key Highlights
Automation engine triggered on backend events
Extensible workflow actions (easy to add new ones)
Clean separation of concerns (MVC structure)
Scalable for future features like notifications or integrations
---
🤝 Contributing
Pull requests are welcome. Open an issue for suggestions or bugs.
---
📄 License
MIT License
---
👤 Author
Adesh Gaurav
LinkedIn: https://www.linkedin.com/in/adeshgaurav/
GitHub: https://github.com/Adesh344
