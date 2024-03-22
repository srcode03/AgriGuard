import React, { useEffect , useState} from "react";
import axios from 'axios'

const ClaimHistory = ({user}) => {
  // Dummy data for farmer's claim history
  const [claimHistory , setClaimHistory] = useState([])

  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/claims/getClaimsByFarmerId/${user.email}`);
        const data = response.data;
        console.log(data);
        setClaimHistory(data.claims)
      } catch (error) {
        console.error("Failed to fetch credit rating:", error);
      }
    };
    fetchCredit();
  }, []);

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
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {claimHistory.map((h) => (
            <tr key={h._id}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h._id}
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

export default ClaimHistory;
