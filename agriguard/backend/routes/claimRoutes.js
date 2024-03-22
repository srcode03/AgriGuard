const express = require("express");
const router = express.Router();
const {getClaims , addClaims} = require('../Controllers/claimController')

router.get("/getAllClaims", getClaims);
router.post("/addClaims", addClaims);

module.exports = router;
