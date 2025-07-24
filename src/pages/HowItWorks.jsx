import React from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaCheckCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const iconMotion = {
    whileHover: { rotate: 360, scale: 1.2 },
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <>
      {/* Patients Section */}
      <div className="w-full bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-center mb-4">
              Empowering Patients with {" "}
              <span className="font-extrabold tracking-wide bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
                DOC<span className="text-sky-500">BOOK</span>
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              DOCBOOK helps patients easily find trusted doctors, book
              appointments in real time, and manage their visits with complete
              flexibility.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Smart Search */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-emerald-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-emerald-100/50 text-emerald-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaSearch className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent mb-3">
                  Smart Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Search doctors by specialization, location, or availability.
                  Find your perfect match within seconds.
                </p>
              </div>
            </motion.div>

            {/* Easy Booking */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-emerald-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-sky-100/50 text-sky-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaCalendarAlt className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent mb-3">
                  Easy Booking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pick a date and time from a doctor’s live availability slots.
                  Book in just one click with instant confirmation.
                </p>
              </div>
            </motion.div>

            {/* Full Control */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-emerald-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-emerald-100/50 text-emerald-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaClock className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent mb-3">
                  Full Control
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Cancel or reschedule your appointments anytime. Stay updated
                  with real-time booking status.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="w-full bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Helping Doctors Connect with Patients
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              DOCBOOK gives doctors the power to register, manage slots, and
              streamline patient care effortlessly.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Register */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-sky-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-sky-100/50 text-sky-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaUserMd className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Register & Setup
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily register on DOCBOOK and create your professional profile
                  visible to patients.
                </p>
              </div>
            </motion.div>

            {/* Slot Management */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-sky-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-emerald-100/50 text-emerald-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaClock className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Slot Management
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create, update, or delete your availability slots. Stay in full
                  control of your appointments.
                </p>
              </div>
            </motion.div>

            {/* Appointment Actions */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-sky-100/20 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
              <div className="relative">
                <span className="inline-block p-3 rounded-2xl bg-sky-100/50 text-sky-600 mb-4">
                  <motion.div {...iconMotion}>
                    <FaCheckCircle className="text-2xl" />
                  </motion.div>
                </span>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Appointment Actions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mark slots as completed, canceled, or upcoming to help patients
                  stay informed.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-8">
              Join DOCBOOK Today
            </h3>
            <Link to={"/join"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;