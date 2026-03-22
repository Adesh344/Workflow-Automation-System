const Workflow = require("../models/Workflow");


const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const createWorkflow = async (req, res) => {
  try {
    const { name, trigger, action, message } = req.body;

    if (!trigger || !action)
      return res.status(400).json({ message: "Trigger and action are required" });

    const workflow = await Workflow.create({
      userId: req.user.id,
      name: name || "Untitled Workflow",
      trigger,
      action,
      message: message || "",
    });

    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({ _id: req.params.id, userId: req.user.id });
    if (!workflow)
      return res.status(404).json({ message: "Workflow not found" });

    const { name, trigger, action, message, isActive } = req.body;
    if (name !== undefined) workflow.name = name;
    if (trigger !== undefined) workflow.trigger = trigger;
    if (action !== undefined) workflow.action = action;
    if (message !== undefined) workflow.message = message;
    if (isActive !== undefined) workflow.isActive = isActive;

    await workflow.save();
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!workflow)
      return res.status(404).json({ message: "Workflow not found" });

    res.json({ message: "Workflow deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getWorkflows, createWorkflow, updateWorkflow, deleteWorkflow };