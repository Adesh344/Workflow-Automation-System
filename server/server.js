const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();


connectDB();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workflows", require("./routes/workflowRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));


app.get("/", (req, res) => res.json({ message: "Workflow API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));