const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ msg: `Invalid ID format: ${err.value}` });
  }

  return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorHandlerMiddleware;
