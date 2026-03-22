const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
    output: {
      type: String,
      default: "",
    },
    trigger: {
      type: String,
    },
    action: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);