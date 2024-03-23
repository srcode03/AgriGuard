import React, { useState } from "react";
import Navbar from "./Navbar";
import FarmerProfile from "../Cards/FarmerProfileCard";
import ClaimHistory from "../Cards/ClaimHistory";

const ProfilePage = ({ user }) => {
  const sidebarItems = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Claim History" },
    { id: 3, label: "My wallet" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState(sidebarItems[0]["id"]);

  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
  };

  async function connectWallet() {
    let accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.log(err.code);
      });

    console.log(accounts);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left focus:outline-none py-2 px-4 rounded-md ${
                    selectedMenuItem === item.id ? "bg-gray-300 text-gray-800" : "text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition duration-300"
                  }`}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {selectedMenuItem !== null && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {sidebarItems.find((item) => item.id === selectedMenuItem).label}
              </h2>
              {/* Display respective details based on selected menu item */}
              {selectedMenuItem === 1 && (
                <div>
                  {/* Profile Details */}
                  <FarmerProfile user={user} />
                </div>
              )}
              {selectedMenuItem === 2 && (
                <div>
                  {/* Settings Details */}
                  <ClaimHistory user={user} />
                </div>
              )}
              {selectedMenuItem === 3 && (
                <div>
                  {/* Messages Details */}
                  <p className="text-gray-800">Wallet details go here...</p>
                  <button
                    type="button"
                    className="bg-green-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                  <br></br>
                  <br></br>
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={connectWallet}
                  >
                    View Balance
                  </button>
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
