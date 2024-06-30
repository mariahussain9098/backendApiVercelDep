const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Database!');
  } catch (error) {
    console.error('Error connecting to Database:', error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectToDatabase;
