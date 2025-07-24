import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import DoctorList from "./pages/DoctorList";
import Page404 from "./pages/Page404";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgetPassword from "./auth/ForgetPassword";
import useLenis from "./hooks/useLenis";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProtectedDoctorRoute from "./componets/ProtectedDoctorRoute";
import ProtectedPatientRoute from "./componets/ProtectedPatientRoute";
import PatientDashboard from "./pages/PatientDashboard";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import RoleBased from "./componets/RoleBased";


const App = () => {
  useLenis();

  return (
    <>
    <ThemeProvider>
      <div className={`min-h-screen transition-colors duration-200`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<RoleBased />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctorList" element={<DoctorList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route
            path="/doctors/dashboard"
            element={
              <ProtectedDoctorRoute>
                <DoctorDashboard />
              </ProtectedDoctorRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedPatientRoute>
                <PatientDashboard />
              </ProtectedPatientRoute>
            }
          />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <ToastContainer />
      </div>
    </ThemeProvider>
      
    </>
  );
};

export default App;
