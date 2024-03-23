const asyncHandler = require("express-async-handler");
const User = require("../Schema/userSchema");
const generateToken = require("../config/generateToken");
var validator = require("email-validator");
const { hashPassword } = require("../config/hashPassword");
const axios = require('axios')
const Claim = require('../Schema/claimSchema')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
    // throw new Error("Please enter all fields");
  }

  if (!validator.validate(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  try {
    const exisingUser = await User.findOne({ email });

    if (exisingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const pass = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: pass,
      role,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error Occured!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error",
    });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  try {
    const user = await User.findOne({ email });
    // console.log(user);

    if (user) {
      const isMatch = await user.matchPassword(password);

      if (isMatch) {
        return res.status(201).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error Occured",
    });
  }
});

const getUser =  asyncHandler(async (req, res) => {
  const {role} = req.params
  try {
    const response = await User.find({ role: role })
    .populate("claims")
    .exec();

    console.log(response);

    return res.json({
      success: true,
      users : response
    })
  } catch (error) {
    return res.json({
      error : error.message
    })
  }
})
// const getValidatorClaims =  asyncHandler(async (req, res) => {
//   const {role} = req.params
//   try {
//     const response = await User.find({ role: role })
//     .populate("claims")
//     .exec();

//     console.log(response);

//     return res.json({
//       success: true,
//       users : response
//     })
//   } catch (error) {
//     return res.json({
//       error : error.message
//     })
//   }
// })



module.exports = {
  registerUser,
  authUser,
  getUser
};
