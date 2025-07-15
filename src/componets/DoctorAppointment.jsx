import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import CreateSlot from "./CreateSlot";
import { toast, ToastContainer } from "react-toastify";

const DoctorAppointment = () => {
  const { doctor } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSlot, setShowSlot] = useState(false);

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
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (doctor?._id) {
      fetchAppointments();
    }
  }, [doctor]);

  const deleteHandleSlot = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_ROUTES}doctor/appointments/delete/${id}`,
        {
          data: { doctorId: doctor._id },
        }
      );
      toast.error("Slot Deleted.");
      // setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete slot.");
    }
  };
  const updateHandleSlot = async (id, status) => {
    try {
      axios.put(
        `${import.meta.env.VITE_ROUTES}doctor/appointments/update/${id}`,
        {
          doctorId: doctor._id,
          status: status.toLowerCase(),
        }
      );
      console.log("Sent doctorId:", doctor._id);
      toast.success("Slot Updated");
      // setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update slot.");
    }
  };

  const totalSlots = appointments.length;
  const bookedSlots = appointments.filter(
    (app) => app.patientId !== null
  ).length;
  const availableSlots = appointments.filter(
    (app) => app.status === "available"
  ).length;

  return (
    <>
      <div className={`z-[99] fixed w-screen ${showSlot ? "block" : "hidden"}`}>
        <CreateSlot onClose={() => setShowSlot(false)} />
      </div>
      <div className="flex flex-col gap-6 mb-8">
        {/* Slot Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
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
        </div>

        {/* Appointment Table */}
        <div className="bg-white p-6 rounded-2xl shadow-md border overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Today's Appointments
          </h3>

          {loading ? (
            <p>Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-sky-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {appointments.map((appt, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">
                      {appt.patientId?.name || "N/A"}
                      <br />
                      <span className="text-xs text-gray-500">
                        {appt.patientId?.phone || ""}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {appt.patientId?.age || "N/A"}
                    </td>
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteHandleSlot(appt._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {appt.status === "booked" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateHandleSlot(appt._id, "completed")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Completed
                          </button>
                          <button
                            onClick={() =>
                              updateHandleSlot(appt._id, "cancelled")
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DoctorAppointment;
