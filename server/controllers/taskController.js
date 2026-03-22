const Task = require("../models/Task");
const { executeWorkflows } = require("../services/workflowEngine");


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      userId: req.user.id,
      title,
      description: description || "",
      status: status || "pending",
    });

  
    await executeWorkflows("task_created", req.user.id, { title: task.title });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    
    await executeWorkflows("task_updated", req.user.id, { title: task.title });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };