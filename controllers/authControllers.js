const Providers = require("../models/providers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const provider = await Providers.findOne({
      email,
      password,
    });
    if (provider) {
      res.status(200).json({
        message: "Login successful",
        data: provider,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Provider not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const signUp = async (req, res) => {
  try {
    const provider = new Providers(req.body);
    await provider.save();
    res.status(201).json({
      message: "Provider created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  signUp,
};
