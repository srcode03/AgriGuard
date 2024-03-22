const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Claim = require('../backend/claimSchema')
const cors = require("cors");
const userRoutes = require('./userRoutes');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Shaunak:shaunak@cluster0.ffa9e6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connecetd to the DB");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
