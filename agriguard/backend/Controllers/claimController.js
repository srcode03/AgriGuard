const asyncHandler = require("express-async-handler");
const Claim = require('../Schema/claimSchema')

const getClaims = asyncHandler(async (req, res) => {
    try {
        const response = await Claim.find();
        console.log(response);
        return res.json({
            success : true,
            claims: response
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});

const addClaims = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.Location) {
        return res.status(400).json({
            success: false,
            message: 'Location is required'
        });
    }

    const { Location, cropType, expectedYield, estimatedYield, farmerEmailId } = req.body;
    console.log(req.body);
    try {
        const newClaim = new Claim({
            farmerEmailId: farmerEmailId,
            expectedYield: expectedYield,
            estimatedYield: estimatedYield,
            Location: Location,
            cropType: cropType
        });
        const savedClaim = await newClaim.save();
        return res.json({
            success: true,
            claim: savedClaim
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

const getClaimsByFarmerId = asyncHandler(async (req, res) => {
    try {
        const response = await Claim.find();
        console.log(response);
        return res.json({
            success : true,
            claims: response
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});


module.exports = {
    getClaims,
    addClaims,
};
  