import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Available Appointments
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => {
              const doc = appt.doctorId;
              return (
                <div
                  key={appt._id}
                  className="bg-sky-100/50 border border-sky-300 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-[1.01] duration-300 flex flex-col"
                >
                  <div className="h-64 w-full bg-gray-100">
                    <img
                      src={doc?.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-blue-800">
                        {doc.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-600">
                        {doc.specialization}
                      </p>
                    </div>

                    <div className="text-md text-gray-700 space-y-1 mb-4">
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {doc.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Experience:</span>{" "}
                        {doc.experience} yrs
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {doc.address || "N/A"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-sm font-medium shadow-sm flex items-center gap-1">
                          📅 <span>{appt.date}</span>
                        </div>
                        <div className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-medium shadow-sm flex items-center gap-1">
                          ⏰ <span>{appt.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookAppointment(appt._id)}
                      className="mt-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2 rounded-full transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default DoctorList;
