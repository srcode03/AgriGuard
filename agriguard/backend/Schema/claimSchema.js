const mongoose = require("mongoose");
const ClaimSchema = new mongoose.Schema({
  farmerEmailId: {
    type: String,
    required: true,
    unique: true
  },
  estimatedYield: {
    type: Number,
    unique: true
  },
  expectedYield: {
    type: Number,
    unique: true,
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
    default: Date.now
  }
});

const Claim = mongoose.model("Claim", ClaimSchema);
module.exports = Claim;