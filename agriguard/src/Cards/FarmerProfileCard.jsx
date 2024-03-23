import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerProfile = ({ user }) => {
  const [farmer, setFarmer] = useState({
    name: user.name,
    age: 35,
    location: "Farmville",
    rating: 65,
    correctStakes: 0,
    incorrectStakes: 0,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getCredit/${user.email}`);
        const data = response.data;
        if (data.success) {
          setFarmer((prev) => ({ ...prev, rating: data.credit }));
        }
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    const fetchCorrectClaims = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getClaimsByFarmerId/${user.email}`);
        const data = response.data;
        const claims = data.claims;
        const tempCorrect = claims.filter((claim) => claim.status.toLowerCase() === 'approved');
        const tempIncorrect = claims.filter((claim) => claim.status.toLowerCase() === 'rejected');
        setFarmer((prev) => ({ ...prev, correctStakes: tempCorrect.length, incorrectStakes: tempIncorrect.length }));
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    fetchCredit();
    fetchCorrectClaims();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">{farmer.name}</h3>
          <p className="text-gray-200 mb-2">Age: {farmer.age}</p>
          <p className="text-gray-200 mb-2">Location: {farmer.location}</p>
          <p className="text-gray-200 mb-2">Credit Rating: {farmer.rating}</p>
        </div>
        <div className="bg-gray-100 p-6">
          <div className="flex justify-between text-gray-700">
            <p>Correct Stakes: {farmer.correctStakes}</p>
            <p>Incorrect Stakes: {farmer.incorrectStakes}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-800">{farmer.about}</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
