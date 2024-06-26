import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const server = "http://127.0.0.1:8000/api/user/login";
function Login({ user, setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(formData);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let { data } = await axios.post(
        `${server}`,
        {
          email: formData["email"],
          password: formData["password"],
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
      toast.success("Logged in successfully");

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
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50%] max-w-md mx-auto m-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
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
          <div className="mb-6">
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
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Login
          </button>
          <div className="flex gap-2 mt-3">
            <p>New user? </p>
            <Link to={"/signup"}>Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
