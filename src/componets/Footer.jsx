import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaHeartbeat,
  FaHome,
  FaUserMd,
  FaInfoCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { to: "/", icon: FaHome, text: "Home" },
    { to: "/doctors", icon: FaUserMd, text: "Doctors" },
    { to: "/appointments", icon: FaCalendarCheck, text: "Appointments" },
    { to: "/about", icon: FaInfoCircle, text: "About" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-emerald-50 to-sky-100 text-gray-800">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl text-emerald-500"
              >
                <FaHeartbeat />
              </motion.div>
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                  DOCBOOK
                </span>
              </h2>
            </motion.div>
            <p className="text-gray-600">
              Your trusted platform for booking appointments with qualified healthcare professionals.
              Quick, easy, and convenient healthcare solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-500 transition-colors duration-300"
                  >
                    <link.icon className="text-emerald-400" />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-emerald-500 to-sky-500 p-3 rounded-full text-white hover:shadow-lg transition-shadow"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-emerald-500 to-sky-500 p-3 rounded-full text-white hover:shadow-lg transition-shadow"
              >
                <FaLinkedinIn size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <p>© 2025 DOCBOOK. All rights reserved.</p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-red-500"
              >
                ❤️
              </motion.span>{" "}
              by{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent font-semibold">
                Dharamraj
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
