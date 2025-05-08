// filepath: backend/db.js
const mongoose = require("mongoose");
require("dotenv").config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_EXCHANGE_SERVICE);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;