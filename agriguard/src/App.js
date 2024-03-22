import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ValidatorProfilePage from "./Components/ValidatorProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmerProfile from "./Components/FarmerProfile";
import ClaimForm from "./Components/ClaimForm";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer_profile" element={<FarmerProfile />} />
<<<<<<< HEAD
          <Route path="/validator-profile" element={<ValidatorProfilePage />} />
          <Route path="/form" element={<Form />} />
=======
          <Route path="/submit_claim" element={<ClaimForm />} />
>>>>>>> eeb14893a59feb7723bfa2ebfd3c672e28475a4c
        </Routes>
      </Router>
    </div>
  );
}

export default App;
