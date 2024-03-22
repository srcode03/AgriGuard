import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const server = "http://127.0.0.1:8000/api/user/signup";

function Signup({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let { data } = await axios.post(
        `${server}`,
        {
          name: formData["name"],
          email: formData["email"],
          password: formData["password"],
          role: formData["role"],
        },
        config
      );
      data = await data.data;
      console.log(data);
      //   toast({
      //     title: "Registration Successful",
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });

      localStorage.setItem("user_agriguard", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("user_agriguard")));
      navigate("/");
    } catch (error) {
      //   toast({
      //     title: error.response.data.message,
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      //   setLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50%] max-w-md mx-auto m-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Select User Type
            </label>
            <select
              className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="farmer">Farmer</option>
              <option value="validator">Validator</option>
            </select>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex gap-2 mt-3">
            <p>Already a user? </p>
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
