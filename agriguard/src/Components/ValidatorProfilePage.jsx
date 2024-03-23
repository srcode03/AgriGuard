import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const ValidatorClaimHistory = () => {
  const history = [
    { claimid: "1", status: "accepted", stakedAmount: "2" },
    { claimid: "2", status: "accepted", stakedAmount: "2" },
    { claimid: "3", status: "accepted", stakedAmount: "1" },
    { claimid: "4", status: "rejected", stakedAmount: "5" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Claim ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Staked Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((h) => (
            <tr key={h.claimid}>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.claimid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.stakedAmount}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${
                  h.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600 font-semibold"
                }`}
              >
                {h.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ValidatorProfile = ({ user }) => {
  const [validator, setValidator] = useState({
    name: "name",
    numberOfCorrectStakes: 0,
    numberOfInCorrectStakes: 0,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });
  useEffect(() => {
    // Fetch data and update validator state
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {validator.name}
      </h3>
      <p className="text-gray-700 mb-2">
        Number of Correct Stakes : {validator.numberOfCorrectStakes}
      </p>
      <p className="text-gray-700 mb-2">
        Number of Incorrect Stakes : {validator.numberOfInCorrectStakes}
      </p>
      <p className="text-gray-700">{validator.about}</p>
    </div>
  );
};
const ViewStakableClaims = () => {
  const ListOfClaimableStakes = [
    {
      farmerId: "1",
      farmerName: "John Doe",
      credit: 9,
    },
    {
      farmerId: "2",
      farmerName: "Jane Smith",
      credit: 6,
    },
    {
      farmerId: "3",
      farmerName: "Bob Johnson",
      credit: 8,
    },
  ];
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setStakeAmount("");
  };

  const handleStakeAmountChange = (e) => {
    setStakeAmount(e.target.value);
  };

  const handleSubmitStake = () => {
    // Handle submit stake logic here
    console.log("Staking amount:", stakeAmount, "on claim:", selectedClaim);
    // You can add additional functionality here, like submitting the stake to the blockchain
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Farmer ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Farmer Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Farmer Credit Rating (out of 10)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ListOfClaimableStakes.map((h, index) => (
            <tr
              key={index}
              onClick={() => handleClaimClick(h)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.farmerId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.farmerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.credit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClaim && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-800 font-semibold">
            Selected Claim: Farmer ID {selectedClaim.farmerId}
          </p>
          <p className="text-gray-700">
            Farmer Name: {selectedClaim.farmerName}
          </p>
          <p className="text-gray-700">
            Farmer Credit Rating: {selectedClaim.credit}
          </p>
          <div className="mt-4">
            <label
              htmlFor="stakeAmount"
              className="block text-gray-700 font-semibold mb-2"
            >
              Enter stake amount:
            </label>
            <input
              type="number"
              id="stakeAmount"
              value={stakeAmount}
              onChange={handleStakeAmountChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter amount to stake"
            />
            <button
              type="button"
              onClick={handleSubmitStake}
              className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 shadow"
            >
              Submit Stake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const ValidatorProfilePage = ({ user }) => {
  console.log(user);
  const sidebarItems = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Claim History" },
    { id: 3, label: "My wallet" },
    { id: 4, label: "View Stakable claims" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    sidebarItems[0]["id"]
  );

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
  async function checkBalance() {
    let accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.log(err.code);
      });
    console.log(accounts);
    let balance = await window.ethereum
      .request({ method: "eth_getBalance", params: [accounts[0]] })
      .catch((err) => {
        console.log(err.code);
      });

    console.log(parseInt(balance) / Math.pow(10, 18));
    alert("Balance is " + parseInt(balance) / Math.pow(10, 18));
  }
  return (
    <div>
      <Navbar />
      <div className="flex h-[100vh]">
        <div className="w-1/4 bg-gradient-to-b from-indigo-700 to-purple-900">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">Menu</h2>
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full py-2 text-left focus:outline-none p-2 rounded-md hover:bg-indigo-800 text-white ${
                      selectedMenuItem === item.id ? "bg-indigo-800" : ""
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
        <div className="flex-1 p-4 bg-gray-100">
          {selectedMenuItem !== null && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {
                  sidebarItems.find((item) => item.id === selectedMenuItem)
                    .label
                }
              </h2>
              {/* Display respective details based on selected menu item */}
              {selectedMenuItem === 1 && (
                <div>
                  {/* Profile Details */}
                  <ValidatorProfile user={user} />
                </div>
              )}
              {selectedMenuItem === 2 && (
                <div>
                  {/* Settings Details */}
                  <ValidatorClaimHistory user={user} />
                </div>
              )}
              {selectedMenuItem === 3 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {/* Messages Details */}
                  <p className="mb-4 text-gray-800">
                    Connect your wallet to interact with the blockchain.
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mr-4 shadow"
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow"
                      onClick={checkBalance}
                    >
                      View Balance
                    </button>
                  </div>
                </div>
              )}
              {selectedMenuItem === 4 && (
                <div>
                  {/* Messages Details */}
                  <ViewStakableClaims user={user} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidatorProfilePage;
