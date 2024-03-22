const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
    unique: false
  },
  estimatedYield: {
    type: Number,
    required: true,
  },
  expectedYield: {
    type: Number,
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  DateOfClaim: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String ,
    required: true
  }
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;