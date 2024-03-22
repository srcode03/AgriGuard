import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ValidatorProfilePage from "./Components/ValidatorProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmerProfile from "./Components/FarmerProfile";
import Form from "./Components/Form";
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
=======
          <Route path="/form" element={<Form />} />
>>>>>>> 8c3d381f5d8f3b49ef6b67db17047887f33d8523
        </Routes>
      </Router>
    </div>
  );
}

export default App;
