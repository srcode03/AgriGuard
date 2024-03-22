var ClaimContract = artifacts.require("./ClaimContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ClaimContract);
};
