import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios library
import { useNavigate } from "react-router-dom";

const ClaimForm = ({ user }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false); // State to track submission status

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_agriguard"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    // Create a FormData object and append the selected file to it
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send an HTTP POST request to the Flask API endpoint
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      // Log the response from the Flask API
      console.log("Response from Flask API:", response.data);

      // Reset the file input field after successful submission
      setSelectedFile(null);

      // Set submitted state to true to display "Submitted Successfully" message
      setSubmitted(true);

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fileInput"
          >
            Upload File
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fileInput"
            type="file"
            onChange={handleFileInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="bg-white p-8 rounded-lg z-20">
            <p className="text-xl font-semibold mb-4">Submitted Successfully</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimForm;
