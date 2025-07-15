import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import PatientPopUP from "../componets/PatientPopUP";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

const PatientDashboard = () => {
  const { patient, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  // Fetch Patient Details
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

  // Cancel Booking Handler
  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_ROUTES}patient/appointments/${bookingId}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patient._id,
          }),
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
      <header className="bg-white fixed top-0 shadow-md border-b w-full px-4 py-4 flex items-center justify-between md:px-8 z-50">
        <Link to={"/"} className="text-2xl font-extrabold text-sky-600">
          DOC<span className="text-sky-400">BOOK</span>
        </Link>

        <div className="text-sm sm:text-base text-gray-700 font-medium">
          Welcome,{" "}
          <span className="text-sky-600 font-semibold">
            {patientData?.name}👨
          </span>
        </div>

        <button
          onClick={logout}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-2"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      <div className="p-6 max-w-8xl mt-20 mx-auto">
        {patientData && (
          <div className="relative mb-6 bg-white p-6 pt-12 shadow-md rounded-2xl border border-gray-100">
            <button
              className="absolute top-4 right-4 text-sky-600 hover:text-sky-800"
              title="Edit Profile"
              onClick={() => toast.info("Edit feature coming soon!")}
            >
              <FaEdit className="text-lg" />
            </button>
            <div className="absolute top-2 left-10 flex flex-row gap-5">
              <Link
            to={'/'}
              className="flex justify-center items-center bg-blue-100 rounded-full px-2 h-9 w-9 text-blue-600 hover:text-blue-800"
            ><MdHome size={20} />
            </Link>
             <Link
            to={'/doctorlist'}
              className=" flex justify-center items-center bg-blue-100 rounded-full px-2 h-9 w-9 text-blue-600 hover:text-blue-800"
            ><FaUserDoctor size={20} />
            </Link>
            </div>
            <h3 className="text-3xl font-bold text-sky-700 mb-4">
              Welcome, {patientData.name}
            </h3>

            <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-md text-gray-700">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {patientData.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {patientData.email}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {patientData.gender}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {patientData.age}
              </p>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-700 mb-6">My Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings available.</p>
        ) : (
          <div className="bg-white shadow-md rounded-2xl overflow-auto border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-sky-50 text-gray-600 uppercase text-xs">
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
                            : "bg-sky-100 text-sky-800"
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
