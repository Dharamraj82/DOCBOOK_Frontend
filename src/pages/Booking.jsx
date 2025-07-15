import React from "react";
import { FapatientMd, FaEnvelope, FaStethoscope } from "react-icons/fa";
import Footer from "../componets/Footer";
import Header from "../componets/Header";

const Booking = [
  {
    id: 1,
    name: "Dr. Riya Sharma",
    email: "riya.sharma@docbook.com",
    specialization: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
  {
    id: 2,
    name: "Dr. Aarav Mehta",
    email: "aarav.mehta@docbook.com",
    specialization: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328fef74?q=80&w=800",
  },
  {
    id: 3,
    name: "Dr. Sanya Verma",
    email: "sanya.verma@docbook.com",
    specialization: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
   {
    id: 1,
    name: "Dr. Riya Sharma",
    email: "riya.sharma@docbook.com",
    specialization: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
  {
    id: 2,
    name: "Dr. Aarav Mehta",
    email: "aarav.mehta@docbook.com",
    specialization: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328fef74?q=80&w=800",
  },
  {
    id: 3,
    name: "Dr. Sanya Verma",
    email: "sanya.verma@docbook.com",
    specialization: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
];

const Doctors = () => {
  return (
    <>
    <Header/>
    <section className="min-h-screen bg-sky-50 py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-sky-700">
          Our Trusted <span className="text-sky-500">Doctors</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Meet our professional and certified medical experts.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="h-60 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-sky-700 flex items-center gap-2">
                <FapatientMd /> {doc.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <FaEnvelope className="text-sky-400" />
                {doc.email}
              </p>
              <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <FaStethoscope className="text-sky-500" />
                {doc.specialization}
              </p>
              <button className="mt-4 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl w-full transition">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
</>
  );
};

export default Booking;
