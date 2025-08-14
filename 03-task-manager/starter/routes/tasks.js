const express = require("express");
const {
  getAllTasks,
  createTasks,
  deleteTask,
  updateTasks,
  getSingleTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").patch(updateTasks).get(getSingleTask).delete(deleteTask);

module.exports = router;
