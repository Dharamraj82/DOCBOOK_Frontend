import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaUserFriends,
  FaStethoscope,
  FaHospital,
  FaHeartbeat,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import DoctorRegister from "../auth/DoctorRegister";
import DoctorLogin from "../auth/DoctorLogin";
import Footer from "../componets/Footer";
import { motion } from "framer-motion";
import DoctorNavbar from "../componets/DoctorNavbar";
import { AuthContext } from "../context/AuthContext";


const Doctor = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { doctor } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", icon: <FaHeartbeat />, path: "/" },
    { name: "About", icon: <FaHospital />, path: "/about" },
  ];

  return (
    <>
      {/* Modals */}
      <div
        className={`z-[99] fixed w-screen ${showRegister ? "block" : "hidden"}`}
      >
        <DoctorRegister onClose={() => setShowRegister(false)} />
      </div>
      <div
        className={`z-[99] fixed w-screen ${showLogin ? "block" : "hidden"}`}
      >
        <DoctorLogin onClose={() => setShowLogin(false)} />
      </div>

      {/* Header & Body */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-sky-50 to-white"
      >
        <DoctorNavbar />

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl px-6 py-16 gap-10">
          {/* Text Section */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 drop-shadow-lg">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent">
                DOCBOOK
              </span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-lg leading-relaxed">
              As a doctor, you can manage appointments, connect with patients,
              and grow your online presence. Join now to deliver smarter care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              {doctor ? (
                <Link to={'/doctors/dashboard'}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <FaUserMd />
                    Doctor Dashboard
                  </motion.button>
                </Link>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogin(true)}
                    className="bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <FaUserMd />
                    Doctor Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRegister(true)}
                    className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FaHospital />
                    Doctor Register
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt="Doctor"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

   {/* Features Section */}
<motion.div
  className="bg-gradient-to-b from-white to-sky-50 py-16 border-t"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        icon: <FaCalendarCheck />,
        title: "Appointment Management",
        description: "Easily view and manage all bookings in one place.",
        bgColor: "bg-sky-100/50",
        iconColor: "text-sky-600"
      },
      {
        icon: <FaUserFriends />,
        title: "Patient Engagement",
        description: "Build trust and connect better with your patients.",
        bgColor: "bg-emerald-100/50",
        iconColor: "text-emerald-600"
      },
      {
        icon: <FaChartLine />,
        title: "Grow Your Practice",
        description: "Reach more patients and expand your online presence.",
        bgColor: "bg-sky-100/50",
        iconColor: "text-sky-600"
      }
    ].map((feature, index) => (
      <motion.div
        key={feature.title}
        className="relative group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-sky-100/20 transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + index * 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
        <div className="relative z-10">
          <div
            className={`inline-block p-4 rounded-2xl ${feature.bgColor} ${feature.iconColor} mb-4`}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-3xl"
            >
              {feature.icon}
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

      </motion.section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Doctor;
