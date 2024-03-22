const mongoose = require("mongoose");
const ClaimSchema = new mongoose.Schema({
  Location: {
    type: String,
    required: true,
  },
  Crop: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
});
const Claim = mongoose.model("Claim", ClaimSchema);
module.exports = Claim;
