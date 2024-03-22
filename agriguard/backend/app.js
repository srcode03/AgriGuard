const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Claim = require('../backend/Schema/claimSchema')
const claimRoutes = require('./routes/claimRoutes')
const cors = require('cors')

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

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

app.use(express.json())
app.use(cors())
app.use("/api/claims" , claimRoutes)