const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../Controllers/userController");

// const isAuth = require("../Middlewares/auth");

router.post("/signup", registerUser);
router.post("/login", authUser);

module.exports = router;
