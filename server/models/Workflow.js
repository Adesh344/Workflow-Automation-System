const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      default: "Untitled Workflow",
    },
    trigger: {
      type: String,
      enum: ["task_created", "task_updated"],
      required: true,
    },
    action: {
      type: String,
      enum: ["log_message", "save_to_db"],
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workflow", workflowSchema);