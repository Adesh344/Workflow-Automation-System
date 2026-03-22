const Workflow = require("../models/Workflow");
const Log = require("../models/Log");

const executeWorkflows = async (triggerEvent, userId, contextData = {}) => {
  try {
    
    const matchingWorkflows = await Workflow.find({
      userId,
      trigger: triggerEvent,
      isActive: true,
    });

    if (!matchingWorkflows.length) return;

    for (const workflow of matchingWorkflows) {
      try {
        let output = "";

        if (workflow.action === "log_message") {
         
          output = workflow.message || `Workflow triggered: ${triggerEvent}`;
          if (contextData.title) {
            output = output.replace("{task_title}", contextData.title);
          }
          console.log(`[Workflow Engine] ${output}`);
        } else if (workflow.action === "save_to_db") {
          output = `Saved to DB: ${workflow.message || triggerEvent} | Task: ${
            contextData.title || "N/A"
          }`;
          console.log(`[Workflow Engine] ${output}`);
        }

        
        await Log.create({
          workflowId: workflow._id,
          userId,
          status: "success",
          output,
          trigger: triggerEvent,
          action: workflow.action,
        });
      } catch (err) {
       
        await Log.create({
          workflowId: workflow._id,
          userId,
          status: "failed",
          output: err.message,
          trigger: triggerEvent,
          action: workflow.action,
        });
      }
    }
  } catch (error) {
    console.error("[Workflow Engine Error]", error.message);
  }
};

module.exports = { executeWorkflows };