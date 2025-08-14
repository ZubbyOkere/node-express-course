const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is needed here"],
    trim: true,
    maxLength: [20, "Cannot be more than 20"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Tasks", TaskSchema);
