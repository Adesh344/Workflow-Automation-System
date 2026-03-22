const express = require("express");
const router = express.Router();
const {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
} = require("../controllers/workflowController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); 

router.get("/", getWorkflows);
router.post("/", createWorkflow);
router.put("/:id", updateWorkflow);
router.delete("/:id", deleteWorkflow);

module.exports = router;