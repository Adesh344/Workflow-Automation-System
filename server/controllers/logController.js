const Log = require("../models/Log");


const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ userId: req.user.id })
      .populate("workflowId", "name trigger action")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const clearLogs = async (req, res) => {
  try {
    await Log.deleteMany({ userId: req.user.id });
    res.json({ message: "Logs cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getLogs, clearLogs };