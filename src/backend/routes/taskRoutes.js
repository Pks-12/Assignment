const express = require('express');
const {getTasks,createTask,updateTask,deleteTask} = require('../controllers/taskController');
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect); // all routes protected
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;