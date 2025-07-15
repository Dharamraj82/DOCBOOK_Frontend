import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sky-100 text-sky-800">
      <div className="max-w-8xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-sky-600">DOC<span className="text-sky-400">BOOK</span></h2>
          <p className="mt-2 text-md">
            Book appointments with trusted doctors. Quick, easy, and convenient.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-md">
            <li><Link to="/" className="hover:text-sky-500">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-sky-500">Doctors</Link></li>
            <li><Link to="/appointments" className="hover:text-sky-500">Appointments</Link></li>
            <li><Link to="/about" className="hover:text-sky-500">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-sky-600 hover:text-sky-500"><FaInstagram size={20} /></a>
            <a href="#" className="text-sky-600 hover:text-sky-500"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 bg-sky-200 text-sm">
        © 2025 DOCBOOK All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
