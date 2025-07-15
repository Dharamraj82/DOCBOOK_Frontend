import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { patient,logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-100 shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-sky-600"
          >
            DOC<span className="text-sky-400">BOOK</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-[17px] items-center">
            <Link
              to="/"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              Doctors
            </Link>
            <Link
              to="/patient"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              Appointments
            </Link>
            <Link
              to="/about"
              className="text-sky-700 hover:text-sky-500 font-medium"
            >
              About
            </Link>
            {patient ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sky-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sky-50 shadow-inner">
          <div className="flex flex-col w-full justify-center items-center px-4 text-lg font-medium py-3 space-y-2">
            <Link
              to="/"
              className="text-sky-700 hover:bg-sky-500/10 w-full pl-3"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className="text-sky-700 hover:bg-sky-500/10 w-full pl-3"
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </Link>
            <Link
              to="/appointments"
              className="text-sky-700 hover:bg-sky-500/10 w-full pl-3"
              onClick={() => setIsOpen(false)}
            >
              Appointments
            </Link>
            <Link
              to="/about"
              className="text-sky-700 hover:bg-sky-500/10 w-full pl-3"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {patient ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 w-[50%] text-white px-4 py-2 rounded-full text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-sky-500 hover:bg-sky-600 w-[50%] text-white px-4 py-2 rounded-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
