import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaHome, FaArrowLeft, FaUserMd, FaBandAid } from 'react-icons/fa';

function Page404() {
  const heartbeatVariants = {
    beat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4"
    >
      <div className="text-center max-w-2xl mx-auto relative">
        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 text-sky-200 text-8xl opacity-50"
        >
          <FaUserMd />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 text-sky-200 text-8xl opacity-50"
        >
          <FaBandAid />
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            variants={heartbeatVariants}
            animate="beat"
            className="text-red-500 text-7xl mb-8 mx-auto w-fit"
          >
            <FaHeartbeat />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-8xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-3xl font-semibold mb-6 text-gray-700"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 mb-8 text-lg"
        >
          Oops! Looks like this page needs medical attention.
          Our team of virtual doctors is working on it!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 mx-auto hover:shadow-lg transition-shadow"
            >
              <FaHome />
              Return Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="text-sky-600 flex items-center justify-center gap-2 mx-auto mt-4 hover:text-sky-700 transition-colors"
          >
            <FaArrowLeft />
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Page404;