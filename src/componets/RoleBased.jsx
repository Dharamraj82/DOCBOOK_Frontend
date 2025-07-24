import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaUser, FaCalendarCheck, FaHospital, FaClock, FaUserCheck } from 'react-icons/fa';

function RoleBased() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const features = {
    doctor: [
      { icon: <FaHospital />, text: "Manage your virtual clinic" },
      { icon: <FaCalendarCheck />, text: "Handle appointments efficiently" },
      { icon: <FaClock />, text: "Set your availability" }
    ],
    patient: [
      { icon: <FaUserMd />, text: "Find the right doctor" },
      { icon: <FaCalendarCheck />, text: "Book appointments easily" },
      { icon: <FaUserCheck />, text: "Get quick consultations" }
    ]
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-20 md:py-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-sky-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join DOCBOOK as a...
        </motion.h1>
        
        <motion.p 
          className="text-sky-600 text-center text-lg mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose how you want to be part of our healthcare community
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Doctor Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="text-sky-600 text-5xl mb-4">
                <FaUserMd />
              </div>
              <h2 className="text-2xl font-bold text-sky-900 mb-4">I'm a Doctor</h2>
              <p className="text-gray-600 mb-6">Join our network of healthcare professionals and expand your practice reach.</p>
              
              <div className="space-y-3 mb-8">
                {features.doctor.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-sky-500">{feature.icon}</span>
                    {feature.text}
                  </motion.div>
                ))}
              </div>

              <Link to="/doctors">
                <motion.button
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-500 text-white py-3 px-6 rounded-lg font-medium hover:from-sky-700 hover:to-sky-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join as Doctor
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Patient Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 relative overflow-hidden group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="text-emerald-600 text-5xl mb-4">
                <FaUser />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-4">I'm a Patient</h2>
              <p className="text-gray-600 mb-6">Get easy access to healthcare professionals and book appointments online.</p>
              
              <div className="space-y-3 mb-8">
                {features.patient.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-emerald-500">{feature.icon}</span>
                    {feature.text}
                  </motion.div>
                ))}
              </div>

              <Link to="/register">
                <motion.button
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join as Patient
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.p 
          className="text-center text-gray-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Patient have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:text-sky-700 font-medium">
            Login here
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}

export default RoleBased;