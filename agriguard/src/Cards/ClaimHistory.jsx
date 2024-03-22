import React from "react";

const ClaimHistory = ({user}) => {
  // Dummy data for farmer's claim history
  const claimHistory = [
    { id: 1, status: "Approved", date: "2022-03-15" },
    { id: 2, status: "Pending", date: "2022-04-20" },
    { id: 3, status: "Rejected", date: "2022-05-10" },
    { id: 4, status: "Approved", date: "2022-06-05" },
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
            <tr key={h.claimid}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {h.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimHistory;
