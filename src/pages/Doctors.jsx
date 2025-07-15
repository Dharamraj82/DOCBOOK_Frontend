import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaChartLine,
  FaUserFriends,
} from "react-icons/fa";
import DoctorRegister from "../auth/DoctorRegister";
import DoctorLogin from "../auth/DoctorLogin";
import Footer from "../componets/Footer";

const Doctor = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div
        className={`z-[99] fixed w-screen ${showRegister ? "block" : "hidden"}`}
      >
        <DoctorRegister onClose={() => setShowRegister(false)} />
      </div>

      <div
        className={`z-[99] fixed w-screen ${showLogin ? "block" : "hidden"}`}
      >
        <DoctorLogin onClose={() => setShowLogin(false)}/>
      </div>

      <section className="min-h-screen w-full flex flex-col justify-between bg-sky-50">
        <div className="flex w-full bg-sky-100 shadow-xl sticky top-0 justify-between mx-auto px-4 sm:px-6 lg:px-8 items-center h-16">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-sky-600"
          >
            DOC<span className="text-sky-400">BOOK</span>
          </Link>

          <div className="hidden md:flex space-x-6 text-[17px] items-center">
            <Link
              to="/"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              About
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-6">
              Welcome to <span className="text-sky-500">DOCBOOK</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
              As a doctor, you can manage your appointments, connect with
              patients, and grow your practice online. Join our platform to
              deliver smarter healthcare.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div onClick={() => setShowLogin(true)}>
                <button className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl transition">
                  Doctor Login
                </button>
              </div>
              <div onClick={() => setShowRegister(true)}>
                <button className="border border-sky-600 text-sky-600 hover:bg-sky-100 font-semibold px-6 py-3 rounded-xl transition">
                  Doctor Register
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt="Doctor"
              className="w-full max-w-md rounded-xl shadow-xl"
            />
          </div>
        </div>

        <div className="bg-white py-10 border-t">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FaCalendarCheck className="text-sky-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Appointment Management
              </h3>
              <p className="text-gray-600">
                Easily view and manage all your bookings in one place.
              </p>
            </div>
            <div>
              <FaUserFriends className="text-sky-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Patient Engagement
              </h3>
              <p className="text-gray-600">
                Build trust and connect better with your patients.
              </p>
            </div>
            <div>
              <FaChartLine className="text-sky-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Grow Your Practice
              </h3>
              <p className="text-gray-600">
                Reach more patients and expand your presence online.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Doctor;
