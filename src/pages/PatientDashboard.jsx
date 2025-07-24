import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import {
  FaSignOutAlt,
  FaEdit,
  FaUserCircle,
  FaBell,
  FaUserMd,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdHome, MdHealthAndSafety } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { motion } from "framer-motion";
import PatientPopUP from "../componets/PatientPopUP";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import DashboardHeader from "../componets/DashboardHeader";
const PatientDashboard = () => {
  const { patient, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  // Fetch Patient Info
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_ROUTES}patient/${patient._id}`
        );
        const data = await res.json();

        if (data.success) {
          setPatientData(data.data);
        } else {
          toast.error("Patient not found");
        }
      } catch (err) {
        toast.error("Failed to fetch patient info.");
      }
    };

    if (patient?._id) {
      fetchPatientData();
    }
  }, [patient]);

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_ROUTES}patient/appointments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patientId: patient._id,
            }),
          }
        );

        const data = await res.json();
        setBookings(data.appointments || []);
      } catch (err) {
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (patient?._id) {
      fetchBookings();
    }
  }, [patient]);

  // Cancel Booking
  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ROUTES}patient/appointments/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId: patient._id }),
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success("Booking cancelled successfully.");
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Error cancelling booking.");
    }
  };

  return (
    <>
      <PatientPopUP />

      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="p-6 mt-14 mx-auto max-w-8xl min-h-screen mx-auto bg-gradient-to-b from-green-100 via-white to-green-100">
        {/* Profile Section */}
        {patientData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6 bg-white p-6 pt-12 shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800"
              title="Edit Profile"
              onClick={() => toast.info("Edit feature coming soon!")}
            >
              <FaEdit className="text-lg" />
            </motion.button>

            {/* Quick Links */}
            <div className="absolute top-2 left-10 flex flex-row gap-5">
              <Link
                to={"/"}
                className="flex justify-center items-center bg-emerald-100 rounded-full px-2 h-9 w-9 text-emerald-600 hover:text-emerald-800"
              >
                <MdHome size={20} />
              </Link>
              <Link
                to={"/doctorlist"}
                className="flex justify-center items-center bg-emerald-100 rounded-full px-3 h-9  text-emerald-600 hover:text-emerald-800"
              >
                <FaUserDoctor size={20} />
                <span>Book Appointment</span>
              </Link>
            </div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3"
            >
              <FaUser className="text-xl text-emerald-500" />
              Welcome, {patientData.name}
            </motion.h3>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-lg"
            >
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                <MdEmail className="text-green-500" />
                <div>
                  <p className="text-sm text-green-500">Email</p>
                  <p className="font-medium">{patientData?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                <FaPhone className="text-green-500" />
                <div>
                  <p className="text-sm text-green-500">Phone</p>
                  <p className="font-medium">{patientData?.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                <FaUser className="text-green-500" />
                <div>
                  <p className="text-sm text-green-500">Gender</p>
                  <p className="font-medium">{patientData?.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm">
                <MdAccessTimeFilled className="text-green-500" />
                <div>
                  <p className="text-sm text-green-500">Age</p>
                  <p className="font-medium">{patientData?.age}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Booking Table */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings available.</p>
        ) : (
          <div className="bg-white shadow-md rounded-2xl overflow-auto border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-emerald-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="px-4 py-2">
                      {booking.doctorId?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {booking.doctorId?.address || "N/A"}
                    </td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.time}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {booking.status === "booked" && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default PatientDashboard;
