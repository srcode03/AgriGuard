import React, { useState } from "react";
import Navbar from "./Navbar";
import FarmerProfile from "../Cards/FarmerProfileCard";
import ClaimHistory from "../Cards/ClaimHistory";

const ProfilePage = () => {
  const sidebarItems = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Claim History" },
    { id: 3, label: "My wallet" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    sidebarItems[0]["id"]
  );

  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-[100vh]">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200">
          <div className="p-3">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full p-2 text-left focus:outline-none ${
                      selectedMenuItem === item.id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleMenuItemClick(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {selectedMenuItem !== null && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {
                  sidebarItems.find((item) => item.id === selectedMenuItem)
                    .label
                }
              </h2>
              {/* Display respective details based on selected menu item */}
              {selectedMenuItem === 1 && (
                <div>
                  {/* Profile Details */}
                  <FarmerProfile />
                </div>
              )}
              {selectedMenuItem === 2 && (
                <div>
                  {/* Settings Details */}
                  <ClaimHistory />
                </div>
              )}
              {selectedMenuItem === 3 && (
                <div>
                  {/* Messages Details */}
                  <p>Wallet details go here...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
