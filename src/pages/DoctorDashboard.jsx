import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaStethoscope,
  FaUserMd,
  FaHospital,
  FaUserEdit,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../componets/DashboardHeader";
import DoctorAppointment from "../componets/DoctorAppointment";
import DoctorPopUP from "../componets/DoctorPopUP";
import { toast, ToastContainer } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { doctor } = useContext(AuthContext);

  return (
    <>
      <DoctorPopUP />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen relative flex-col bg-gradient-to-b from-sky-50 to-white text-gray-800 overflow-hidden"
      >
        <DashboardHeader />
        {/* Dashboard  */}
        <div className="min-h-screen w-full mt-14 max-w-8xl mx-auto">
          
          <div className="p-4 md:p-8">
            <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/80 backdrop-blur-sm p-8 md:flex items-start gap-8 rounded-2xl shadow-lg border border-sky-100 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Edit Profile Clicked")}
              className="absolute top-4 right-4 bg-sky-100 text-sky-600 font-medium px-4 py-2 rounded-lg hover:bg-sky-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <FaUserEdit />
              Edit Profile
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <img
                src={doctor?.imageUrl || "https://via.placeholder.com/200"}
                alt="Doctor"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg"
              />
              <motion.div
                className="absolute -bottom-3 -right-3 bg-sky-500 text-white p-2 rounded-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaStethoscope size={24} />
              </motion.div>
            </motion.div>

            <div className="mt-6 md:mt-0 flex-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-sky-700 mb-4 flex items-center gap-3">
                  <FaUserMd className="text-sky-500" />
                  Dr. {doctor?.name}
                </h2>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-lg"
              >
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                  <MdEmail className="text-sky-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{doctor?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                  <FaPhone className="text-sky-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{doctor?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                  <FaUserMd className="text-sky-500" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{doctor?.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                  <FaHospital className="text-sky-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{doctor?.address || "N/A"}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2"
                >
                  <FaStethoscope />
                  Specialization: {doctor?.specialization}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2"
                >
                  <FaBriefcaseMedical />
                  {doctor?.experience}+ Years Experience
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <h3 className="text-sky-800 text-center text-2xl font-bold mb-8 flex items-center justify-center gap-3">
              <FaCalendarAlt className="text-sky-600" />
              Manage Your Appointments
            </h3>
            <DoctorAppointment />
          </motion.div>

        </div>
      </motion.div>
      <ToastContainer />
    </>
  );
};

export default DoctorDashboard;
