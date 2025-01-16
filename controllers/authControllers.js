const {Providers , Services, Bookings  } = require("../models/providers");
const bcrypt = require("bcrypt");

function isStringInvalid(string) {
  return string === undefined || string.length === 0;
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(isStringInvalid(email) || isStringInvalid(password)){
      return res.status(400).json({success: false, message: `Email and password is missing`})
    }
    const provider = await Providers.findOne({
      email,
    });
    if (provider) {
      const match = bcrypt.compare(password, provider.password);
      if (!match) {
        return res.status(400).json({
          message: "Password is wrong",
          success: false,
        });
      }
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
    const {name , email, password , phone} = req.body;
    if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)){
      return res.status(400).json({success: false, message: `Name, email and password is missing`})
    }
    const saltrounds = 10;
    const hashedPassword = bcrypt.hash(password, saltrounds , async(err, hash) => {
      if(hash){
    const provider = new Providers({name, email, password:hash, phone});
    await provider.save();
    res.status(201).json({
      message: "Provider created successfully",
      success: true,
      data: {name, email, phone ,providerId: provider._id},
      });
    }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getProvider = async (req, res) => {
  try {
    const {id} = req.params;
    const providers = await Providers.findById(id)
    const services = await Services.find();
    res.status(200).json({
      message: "Providers fetched successfully",
      success: true,
      data: providers,
      services: services
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

const updateProvider = async(req, res)=>{
   try {
    const {id} = req.params;
    const providers = await Providers.findByIdAndUpdate(id,req.body)
    
    res.status(201).json({
      message: "Provider updated successfully",
      success: true,
    });
   } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
   }
}

const myBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const myBookings = await Bookings.find({ providerId: id });
    res.status(200).json({
      message: "My Bookings fetched successfully",
      success: true,
      data: myBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const booking = await Bookings.findByIdAndUpdate(id, { accepted: status==="true" }).populate("providers");
    res.status(201).json({
      message: "Booking status updated successfully",
      success: true,
      data: booking,
    });
    console.log(booking)
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = {
  login,
  signUp,
  getProvider,
  updateProvider,
  myBooking,
  updateBookingStatus,
};
