import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  // FapatientMd,
  FaCalendarAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaStethoscope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DocHeader from "../componets/DocHeader";
import DoctorAppointment from "../componets/DoctorAppointment";
import DoctorPopUP from "../componets/DoctorPopUP";
import { toast, ToastContainer } from "react-toastify";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { doctor } = useContext(AuthContext);

  return (
    <>
      <DoctorPopUP />
      <div className="flex min-h-screen flex-col bg-gray-100 text-gray-800 overflow-hidden">
        <DocHeader />
        {/* Dashboard  */}
        <div className="min-h-screen w-full mt-14 p-4 md:p-8">
          <div className="relative bg-white p-6 md:flex items-center gap-6 rounded-2xl shadow-sm border mb-8">
            <button
              onClick={() => alert("Edit Profile Clicked")}
              className="absolute top-4 right-4 bg-sky-100 text-sky-600 font-medium text-sm px-4 py-1.5 rounded-md hover:bg-sky-200 transition"
            >
              Edit Profile
            </button>

            <img
              src={doctor?.imageUrl}
              alt="Doctor"
              className="w-28 h-28 rounded-full object-cover border-4 border-sky-500"
            />

            <div className="mt-4 md:mt-0 flex-1">
              <h2 className="text-4xl font-bold text-sky-700 mb-2">
                Welcome {doctor?.name} 👨‍⚕️
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600 text-base">
                <p>
                  <span className="font-semibold">Email:</span> {doctor?.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {doctor?.phone}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {doctor?.gender}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {doctor?.address || "N/A"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-xl font-semibold shadow-sm">
                  Specialization: {doctor?.specialization}
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-semibold shadow-sm">
                  Experience: {doctor?.experience}+ Years
                </div>
              </div>
            </div>
          </div>

          <p className="text-blue-600 text-center text-xl font-bold my-5">
            Manage your appointments and patients here.
          </p>
          <DoctorAppointment />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DoctorDashboard;
