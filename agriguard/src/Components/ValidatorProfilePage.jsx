import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ValidatorProfilePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_agriguard"));
    if (!user) {
      navigate("/login");
    }
    setUser(user);
  }, []);
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

  return (
    <div>
      <Navbar />
      <div className="flex h-[100vh]">
        <div className="w-1/4 bg-gray-200">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full py-2 text-left focus:outline-none p-2 ${
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
                <div>
                  {/* Messages Details */}
                  <p>Messages details go here...</p>
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

const ValidatorClaimHistory = ({ user }) => {
  // get claim history of validator from database
  const history = [
    { claimid: "1", status: "accepted", stakedAmount: "2" },
    { claimid: "2", status: "accepted", stakedAmount: "2" },
    { claimid: "3", status: "accepted", stakedAmount: "1" },
    { claimid: "4", status: "rejected", stakedAmount: "5" },
  ];

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Claim ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Staked Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((h) => (
            <tr key={h.claimid}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.claimid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.stakedAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
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
    name: user.name,
    numberOfCorrectStakes: 0,
    numberOfInCorrectStakes: 0,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Check if user object is not empty
        if (user && Object.keys(user).length > 0) {
          const response = await axios.get(
            `http://localhost:8000/api/user/getUser/${user.role}`
          );
          const data = await response.data;
          console.log(data);
          const users = await data.users;
          const getuser = users.filter((u) => u.email === user.email);
          console.log(getuser);
          const correct =
            getuser.claims &&
            getuser.claims.map(
              (claim) =>
                claim.status === "approved" || claim.status === "Approved"
            );
          if (correct) {
            const cor = correct.length;
            const incor = getuser.claims.length - cor;
            setValidator((prev) => ({
              ...prev,
              name: getuser.name,
              numberOfCorrectStakes: cor,
              numberOfInCorrectStakes: incor,
            }));
          } else {
            console.log("getuser", getuser);
            setValidator((prev) => ({
              ...prev,
              name: user.name,
              numberOfCorrectStakes: 0,
              numberOfInCorrectStakes: 0,
            }));
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDetails();
  }, [user]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">
            {validator.name || "N/A"}
          </h3>
          <p className="text-gray-600 mb-2">
            Number of Correct Stakes : {validator.numberOfCorrectStakes}
          </p>
          <p className="text-gray-600 mb-2">
            Number of Incorrect Stakes : {validator.numberOfInCorrectStakes}
          </p>
          <p className="text-gray-600">{validator.about}</p>
        </div>
      </div>
    </div>
  );
};

const ViewStakableClaims = () => {
  const ListOfClaimableStakes = [];
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Farmer Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Claim ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              staked amount by farmer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Farmer credit rating
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ListOfClaimableStakes.map((h) => (
            <tr key={h.claimid}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.farmername}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.claimid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.amountByFarmer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.credit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidatorProfilePage;
