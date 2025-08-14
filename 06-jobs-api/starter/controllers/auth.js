const register = async (req, res) => {
  res.send("Registered");
};

const login = async (req, res) => {
  res.send("Logged in");
};

module.exports = {
  register,
  login,
};
