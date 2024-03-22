import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerProfile = ({ user }) => {
  const [farmer , setFarmer] = useState({
    name: user.name,
    age: 35,
    location: "Farmville",
    rating: 65,
    correctStakes: 0,
    InCorrectStakes: 0,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getCredit/${user.email}`);
        const data = response.data;
        console.log(data);
        if (data.success) {
          setFarmer(prev => ({...prev , rating: data.credit}))
        }
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    const fetchCorrectClaims = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getClaimsByFarmerId/${user.email}`);
        const data = response.data;
        const claims = data.claims
        console.log(claims)
        const temp = claims.filter(claim => (claim.status === 'approved' || claim.status === 'Approved'))
        // console.log(data);
        const correct = temp.length
        const temp2 = claims.filter(claim => (claim.status === 'rejected' || claim.status === 'Rejected'))
        const incorrect = temp2.length
        setFarmer(prev => ({...prev , correctStakes: correct , InCorrectStakes: incorrect}))
        
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    fetchCredit();
    fetchCorrectClaims()
  }, []);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">{farmer.name}</h3>
          <p className="text-gray-600 mb-2">Age: {farmer.age}</p>
          <p className="text-gray-600 mb-2">Location: {farmer.location}</p>
          <p className="text-gray-600 mb-2">Credit Rating: {farmer.rating}</p>
          <p className="text-gray-600 mb-2">Number of Correct Stakes : {farmer.correctStakes}</p>
          <p className="text-gray-600 mb-2">Number of Incorrect Stakes : {farmer.InCorrectStakes}</p>
          <p className="text-gray-600">{farmer.about}</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
