require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(5003, () => {
  console.log("Server is running on port 5000");
});
