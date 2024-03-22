import React from "react";

const FarmerProfile = ({ user }) => {
  const farmer = {
    name: user.name,
    age: 35,
    location: "Farmville",
    rating: 65,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <div className="flex">
      {/* Farmer Profile */}
      <div className="w-3/4 p-4">
        {" "}
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
