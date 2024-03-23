import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    toast.success("Balance is " + 100 + " ETH");
    console.log(accounts);
    // let balance = await window.ethereum
    //   .request({ method: "eth_getBalance", params: [accounts[0]] })
    //   .catch((err) => {
    //     console.log(err.code);
    //   });

    // console.log(parseInt(balance) / Math.pow(10, 18));
    // toast.success("Balance is " + parseInt(balance) / Math.pow(10, 18));
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
                  {/* <ValidatorProfile user={user} /> */}
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

const ValidatorClaimHistory = ({ user }) => {
  // get claim history of validator from database
  const [history , setHistory] = useState([])

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/getUserById/${user.email}`)
        const data = await response.data;
        const user2 = data.user
        const claims = user2.claims;
        console.log(claims);
        if(!claims) 
        setHistory(claims)
      } catch (error) {
        console.log(error.message)
      }
    }
    getHistory()
  } , [])

  // console.log(user);

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
              Farmer Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Claim Filed On
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((h) => (
            <tr key={h._id}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.farmerId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.DateOfClaim}
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
              name: user.name.toUpperCase(),
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
    <div className="flex cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {validator.name || "N/A"}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Correct Stakes:</span>{" "}
              {validator.numberOfCorrectStakes}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Incorrect Stakes:</span>{" "}
              {validator.numberOfInCorrectStakes}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">About:</span>{" "}
              {validator.about || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewStakableClaims = () => {
  const [listOfClaimableStakes , setListOfClaimableStakes] = useState([])
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");

  useEffect(() => {
    const getStakeClaims = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/claims/getAllClaims");
        const data = response.data;
        const claims = data.claims;
        
        // Filter out only the pending claims
        const stakableClaims = claims.filter(claim => claim.status === 'pending' || claim.status === 'Pending');
        
        // Process the stakable claims further if needed
        console.log(stakableClaims);
        setListOfClaimableStakes(stakableClaims)
      } catch (error) {
        console.error("Failed to fetch stakeable claims:", error.message);
      }
    };
  
    getStakeClaims();
  }, []);
  
  console.log(listOfClaimableStakes);

  const newList = listOfClaimableStakes.map(val => {
    return {
      ...val ,
      rating : (Math.random()*10).toFixed(2)
    }
  })

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setStakeAmount("");
  };

  const handleStakeAmountChange = (e) => {
    setStakeAmount(e.target.value);
  };

  const shootreq = async (val) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/claims/updateClaims/${selectedClaim._id}`, {
        stake: val
      });
      const data = await response.data 
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleInFavourStake = () => {
    // Handle submit stake logic here
    console.log("Staking amount:", stakeAmount, "on claim:", selectedClaim);
    shootreq(true)
    setSelectedClaim(null)
    setStakeAmount('')
    // You can add additional functionality here, like submitting the stake to the blockchain
    // send the selected claim .id ot backend for modification
    
  };
  const handleAgainstStake = () => {
    // Handle submit stake logic here
    console.log("Staking amount:", stakeAmount, "on claim:", selectedClaim);
    // You can add additional functionality here, like submitting the stake to the blockchain
    shootreq(false)
    setSelectedClaim(null)
    setStakeAmount('')
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
              Claim ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Claim status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
            >
              Farmer Credit Rating 
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {newList.map((h, index) => (
            <tr
              key={index}
              onClick={() => handleClaimClick(h)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.farmerId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                {h.rating}
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
              onClick={handleInFavourStake}
              className="mt-2 ml-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 shadow"
            >
              In Favour
            </button>
            <button
              type="button"
              onClick={handleAgainstStake}
              className="mt-2 ml-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 shadow"
            >
              Against Claim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatorProfilePage;
