const express = require("express");
const router = express.Router();
const {getClaims , addClaims , getCredit , getClaimsByFarmerId} = require('../Controllers/claimController')

router.get("/getAllClaims", getClaims);
router.get("/getClaimsByFarmerId/:id", getClaimsByFarmerId);
router.get("/getCredit/:id", getCredit);
router.post("/addClaims", addClaims);

module.exports = router;