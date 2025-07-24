import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import CreateSlot from "./CreateSlot";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort } from "react-icons/fa";

const DoctorAppointment = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const { doctor } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSlot, setShowSlot] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_ROUTES}doctor/appointments`,
          {
            doctorId: doctor._id,
          }
        );
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (doctor?._id) {
      fetchAppointments();
    }
  }, [doctor]);

  const deleteHandleSlot = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_ROUTES}doctor/appointments/delete/${id}`,
        {
          data: { doctorId: doctor._id },
        }
      );
      toast.error("Slot Deleted.");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete slot.");
    }
  };

  const updateHandleSlot = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_ROUTES}doctor/appointments/update/${id}`,
        {
          doctorId: doctor._id,
          status: status.toLowerCase(),
        }
      );
      toast.success("Slot Updated");

      // Update appointment in UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: status.toLowerCase() } : appt
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update slot.");
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Computed values
  const filteredAppointments = appointments
    .filter((appt) =>
      filterStatus === "all" ? true : appt.status === filterStatus
    )
    .sort((a, b) => {
      let aField = a[sortField];
      let bField = b[sortField];

      if (sortField === "date") {
        aField = new Date(a.date + " " + a.time);
        bField = new Date(b.date + " " + b.time);
      }

      if (typeof aField === "string") {
        return sortOrder === "asc"
          ? aField.localeCompare(bField)
          : bField.localeCompare(aField);
      }

      return sortOrder === "asc" ? aField - bField : bField - aField;
    });

  const totalSlots = appointments.length;
  const bookedSlots = appointments.filter((appt) => appt.status === "booked").length;
  const availableSlots = appointments.filter((appt) => appt.status === "available").length;

  return (
    <>
      <div className={`${showSlot ? "block" : "hidden"}`}>
        <CreateSlot onClose={() => setShowSlot(false)} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-6 mb-8 p-4 md:p-8"
      >
        {/* Slot Summary */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border "
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Slot Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-100 text-blue-800 font-semibold p-4 rounded-xl">
              <p>Total Slots</p>
              <p className="text-2xl">{totalSlots}</p>
            </div>
            <div className="bg-green-100 text-green-800 font-semibold p-4 rounded-xl">
              <p>Booked</p>
              <p className="text-2xl">{bookedSlots}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 font-semibold p-4 rounded-xl">
              <p>Available</p>
              <p className="text-2xl">{availableSlots}</p>
            </div>
            <div className="bg-purple-100 text-purple-800 font-semibold p-4 rounded-xl flex flex-col items-center justify-center">
              <p className="mb-2">Create New Slot</p>
              <button
                onClick={() => setShowSlot(true)}
                className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-full transition"
              >
                + Add Slot
              </button>
            </div>
          </div>
        </motion.div>

        {/* Appointment Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md border overflow-x-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Today's Appointments
            </h3>
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-sky-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">
                    <button onClick={() => handleSort("patientId")} className="flex items-center gap-2">
                      Patient <FaSort className="text-gray-400" />
                    </button>
                  </th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">
                    <button onClick={() => handleSort("date")} className="flex items-center gap-2">
                      Date <FaSort className="text-gray-400" />
                    </button>
                  </th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">
                    <button onClick={() => handleSort("status")} className="flex items-center gap-2">
                      Status <FaSort className="text-gray-400" />
                    </button>
                  </th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <AnimatePresence>
                  {filteredAppointments.map((appt, index) => (
                    <motion.tr
                      key={appt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        {appt.patientId?.name || "N/A"}
                        <br />
                        <span className="text-xs text-gray-500">
                          {appt.patientId?.phone || ""}
                        </span>
                      </td>
                      <td className="px-4 py-2">{appt.patientId?.age || "N/A"}</td>
                      <td className="px-4 py-2">{appt.date}</td>
                      <td className="px-4 py-2">{appt.time}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appt.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "booked"
                              ? "bg-sky-100 text-sky-700"
                              : appt.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {appt.status === "available" && (
                          <button
                            onClick={() => deleteHandleSlot(appt._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Delete
                          </button>
                        )}
                        {appt.status === "booked" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateHandleSlot(appt._id, "completed")}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs"
                            >
                              Completed
                            </button>
                            <button
                              onClick={() => updateHandleSlot(appt._id, "cancelled")}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
      <ToastContainer />
    </>
  );
};

export default DoctorAppointment;
