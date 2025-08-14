const createJob = async (req, res) => {
  res.send("Create  job");
};
const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};
const getJob = async (req, res) => {
  res.send("Get  job");
};
const updateJob = async (req, res) => {
  res.send("Update all job");
};
const deleteJob = async (req, res) => {
  res.send("Delete  job");
};

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
