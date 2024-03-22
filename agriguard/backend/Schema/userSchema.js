const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Claim = require('../Schema/claimSchema');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["farmer", "validator"],
      default: "farmer",
    }
  },
  {
    timestamps: true,
  }
);


userSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

// userSchema.pre("save", async function (next) {
//   if (!this.password.isModified) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

module.exports = User;