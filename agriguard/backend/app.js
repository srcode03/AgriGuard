const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Claim=require('../backend/claimSchema')
const DB =
  "mongodb+srv://Shaunak:shaunak@cluster0.ffa9e6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB, {
    useNewURLParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindandModify: false,
  })
  .then(() => {
    console.log("Connection sucessful");
  })
  .catch((err) => {
    console.log("Connection sucessful");
  });
const middleware = (req, res, next) => {
  console.log("Hello this is middleware");
  next();
};
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", middleware, (req, res) => {
  res.send("About Page");
});
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
