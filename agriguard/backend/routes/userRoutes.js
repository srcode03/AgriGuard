const express = require("express");
const router = express.Router();
const { registerUser, authUser , getUser } = require("../Controllers/userController");

// const isAuth = require("../Middlewares/auth");
// const { registerUser, authUser } = require("./Controllers/userController");

router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/getUser/:role" , getUser)

module.exports = router;
