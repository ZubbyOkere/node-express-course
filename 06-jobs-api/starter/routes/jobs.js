const express = require("express");
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJob,
} = require("../controllers/jobs");

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).get(deleteJob).get(updateJob);

module.exports = router;
