import React, { useEffect, useState } from "react";
import axios from "axios";
import { CLOSING } from "ws";
import { log } from "console";

const FarmerProfile = ({ user }) => {
  const farmer = {
    name: user.name,
    age: 35,
    location: "Farmville",
    rating: 65,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  useEffect(() => {
    const farmer = localStorage.getItem("user_agriguard")
    const fetchCredit = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getCredit/${farmer.email}`);
        const data = response.data;
        // console.log(data);
        if (data.success) {
          setFarmer(prevFarmer => ({ ...prevFarmer, rating: data.credit }));
        }
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    fetchCredit();
  }, []);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">{farmer.name}</h3>
          <p className="text-gray-600 mb-2">Age: {farmer.age}</p>
          <p className="text-gray-600 mb-2">Location: {farmer.location}</p>
          <p className="text-gray-600 mb-2">Credit Rating: {farmer.rating}</p>
          <p className="text-gray-600">{farmer.about}</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
