// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ClaimContract {
    uint public claimCount = 0;
    mapping(uint256 => uint256) votes;
    // Structure to represent a claim
    struct Claim {
        uint claimID;
        string location;
        string cropType;
        uint256 estimatedYieldBefore;
        uint256 estimatedYieldAfter;
        bool verified;
        uint256 compensationAmount;
    }

    // Mapping to store claims by claim ID
    mapping(uint256 => Claim) public claims;

    // Event to create claim
    event ClaimSubmitted(
        uint claimID,
        string location,
        string cropType,
        uint256 estimatedYieldBefore,
        uint256 estimatedYieldAfter,
        bool verified,
        uint256 compensationAmount
    );


    event ClaimVerified(
        uint256 id,
        bool verified
    );

    // Function to submit a new claim
    function submitClaim(string memory _location, string memory _cropType, uint256 _estimatedYieldBefore, uint256 _estimatedYieldAfter) public {
        // Generate a unique claim ID
        claimCount++;

        // Create a new claim
        claims[claimCount] = Claim(claimCount, _location, _cropType, _estimatedYieldBefore, _estimatedYieldAfter, false, 0);

        // Emit an event
        emit ClaimSubmitted(claimCount, _location, _cropType, _estimatedYieldBefore, _estimatedYieldAfter, false, 0);
    }

    // Function for users to vote on claim verification
    function voteForClaim(uint256 _claimId, uint256 _vote) public {
        Claim storage _claim = claims[_claimId];
        require(!_claim.verified, "Claim is already verified");
        votes[_claimId] += _vote;
    }

    // Function to calculate consensus and verify the claim
    function calculateConsensus(uint256 _claimId) public {
        Claim storage _claim = claims[_claimId];
        require(!_claim.verified, "Claim is already verified");

        // Verify the claim if the majority of votes are yes
        if (votes[_claimId] > 0) {
            _claim.verified = true;
            emit ClaimVerified(_claimId, true);
        } else {
            emit ClaimVerified(_claimId, false);
        }
    }

    // Function to compensate a verified claim
    function compensateClaim(uint256 _claimId, uint256 _compensationAmount) public {
        require(claims[_claimId].verified, "Claim must be verified");
        claims[_claimId].compensationAmount = _compensationAmount;
    }
}
