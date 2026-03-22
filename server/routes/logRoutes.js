const express = require("express");
const router = express.Router();
const { getLogs, clearLogs } = require("../controllers/logController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getLogs);
router.delete("/", clearLogs);

module.exports = router;