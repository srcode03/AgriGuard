import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ValidatorProfilePage from "./Components/ValidatorProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmerProfile from "./Components/FarmerProfile";
import ClaimForm from "./Components/ClaimForm";
import { useEffect, useState } from "react";
import ProgressBar from "./Components/ProgressBar";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_agriguard"));
    setUser(userInfo);
  }, [setUser]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/farmer_profile"
            element={
              user && user.role === "farmer" ? (
                <FarmerProfile user={user} />
              ) : (
                <ValidatorProfilePage user={user} />
              )
            }
          />
          <Route path="/validator-profile" element={<ValidatorProfilePage />} />
          <Route path="/submit_claim" element={<ClaimForm user={user} />} />
          <Route path="/claim_progress" element={<ProgressBar user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
