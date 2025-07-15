import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-white px-4 md:px-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <div className="relative z-10 text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
          Book Your{" "}
          <span className="text-sky-400">Doctor Appointment</span> Instantly
        </h1>

        <p className="mt-4 text-white/90 text-base md:text-lg">
          Welcome to <span className="font-semibold text-sky-200">DOCBOOK</span> – your trusted platform to find verified doctors and book appointments hassle-free.
        </p>

        <Link to="/doctorList">
          <button className="mt-6 flex items-center cursor-pointer gap-2 bg-sky-600 hover:bg-sky-500 text-white font-medium px-6 py-3 rounded-full shadow-lg transition duration-300">
            <FaCalendarAlt className="text-lg" />
            Book an Appointment Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
