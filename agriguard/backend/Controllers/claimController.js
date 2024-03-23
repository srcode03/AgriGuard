const asyncHandler = require("express-async-handler");
const Claim = require('../Schema/claimSchema')
const User = require('../Schema/userSchema')

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

const updateClaims = asyncHandler(async (req , res) => {
    const {claimId} = req.params;
    const { stake } = req.body;
    try {
        const updatedClaim = await Claim.findByIdAndUpdate(claimId, { stake }, { new: true });
        if (!updatedClaim) {
            return res.status(404).json({
                success: false,
                message: 'Claim not found'
            });
        }
        res.json({
            success: true,
            claim: updatedClaim
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update claim'
        });
    }
});


const addClaims = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.Location) {
        return res.status(400).json({
            success: false,
            message: 'Location is required'
        });
    }

    const { farmerId, Location, cropType, expectedYield, estimatedYield , status } = req.body;
    try {
        const newClaim = new Claim({
            farmerId: farmerId,
            expectedYield: expectedYield,
            estimatedYield: estimatedYield,
            Location: Location,
            cropType: cropType,
            status: status
        });
        const savedClaim = await newClaim.save();

        // Update the user's claims array
        const user = await User.findOne({ email: farmerId });
        user.claims.push(savedClaim._id);
        await user.save();

        return res.json({
            success: true,
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
      const { id } = req.params;
      console.log(id);
      const claims = await Claim.find({farmerId : id});
      res.json({
        success: true,
        claims,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get claims",
      });
    }
});
const getCredit = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const claims = await Claim.find({ farmerId: id });

        // Filter the claims to get only approved ones
        const approvedClaims = claims.filter(claim => claim.status === 'approved');
        const totalClaims = claims.length;

        // Calculate the credit
        let credit = 0;
        if (totalClaims > 0) {
            credit = approvedClaims.length / totalClaims;
        }
        credit = credit * 10;
        credit = credit.toFixed(2)

        res.json({
            success: true,
            credit: credit,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to calculate credit",
        });
    }
});



module.exports = {
    getClaims,
    addClaims,
    getClaimsByFarmerId,
    getCredit,
    updateClaims
};
  