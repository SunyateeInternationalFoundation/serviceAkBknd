const Providers = require("../models/providers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const provider = await Providers.findOne({
      email,
      password,
    });
    if (admin) {
      res.status(200).json({
        message: "Login successful",
        data: provider,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  login,
};
