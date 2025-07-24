import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../hooks/Loader";
import { motion } from "framer-motion";
import { FaUserMd, FaMapMarkerAlt, FaPhone, FaClock, FaMoneyBillWave, FaCalendarAlt, FaCertificate, FaHourglassHalf } from "react-icons/fa";

const DoctorList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ROUTES}appointments`
        );
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const { patient } = useContext(AuthContext);

  const handleBookAppointment = async (appointmentId) => {
    if (!patient || !patient._id) {
      toast.error("Please log in to book an appointment.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ROUTES}patient/appointments/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patient._id,
            appointmentId: appointmentId,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Appointment booked successfully.");
      } else {
        toast.error(result.message || "Failed to book appointment.");
      }
    } catch (error) {
      toast.error("Server error while booking appointment.");
    }
  };
  return (
    <>
      <Header />
      <div className="p-6 min-h-screen max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-4">
            Available Appointments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and book appointments with top healthcare professionals in your area
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mb-10 p-6 bg-white rounded-2xl shadow-lg border border-emerald-100/20"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <label htmlFor="specialist" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUserMd className="text-emerald-500" />
                Specialist
              </label>
              <select
                id="specialist"
                name="specialist"
                className="bg-emerald-50/50 border border-emerald-200/50 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option value="">All Types</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="neurologist">Neurologist</option>
                <option value="orthopedic">Orthopedic</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-500" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Mumbai"
                className="bg-emerald-50/50 border border-emerald-200/50 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-emerald-500" />
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="bg-emerald-50/50 border border-emerald-200/50 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Find Doctors
              </motion.button>
            </div>
          </div>
        </motion.form>

        {loading ? (
          <div className="flex justify-center flex-col w-full items-center gap-5">
          <Loader/>
          <p className="text-center text-lg text-sky-500">Please wait Loading...</p>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-xl text-red-500">No appointments found.</p>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {appointments.map((appt, index) => {
              const doc = appt.doctorId;
              return (
                <motion.div
                  key={appt._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-emerald-100 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="h-64 w-full bg-emerald-50 relative overflow-hidden">
                    <img
                      src={doc?.imageUrl || 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg'}
                      alt={doc.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow relative">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                        {doc.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                        <FaCertificate className="text-emerald-500" />
                        {doc.specialization}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-emerald-500" />
                        <span>{doc.phone || "N/A"}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock className="text-emerald-500" />
                        <span>{doc.experience} years experience</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMoneyBillWave className="text-emerald-500" />
                        <span>₹500 per consultation</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock className="text-sky-500" />
                        <span className="flex items-center gap-2">
                          <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-sm">
                            30 min consultation
                          </span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-emerald-500" />
                        <span>{doc.address || "N/A"}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-2">
                        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                          <FaCalendarAlt /> {appt.date}
                        </div>
                        <div className="bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                          <FaClock /> {appt.time}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookAppointment(appt._id)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt />
                      Book Appointment
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default DoctorList;
