import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import PetDetailsPage from "./pages/PetDetailsPage/PetDetailsPage";
import AllPetsPage from "./pages/AllPetsPage/AllPetsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Signupform from "./components/Signupform";
import Loginform from "./components/Loginform";

function App() {
  return (
    <div className="bg-gradient-to-b from-[#0080FF]/20 to-white">
      <Navbar />

      {/* Add routes here */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pets" element={<AllPetsPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path='/signup' element={<Signupform/>} />
        <Route path='/login' element={<Loginform/>} />
  
        {/* This should be the error page, any routes that we have not declared will be routed here */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* end add routes */}
    </div>
  );
}

export default App;
