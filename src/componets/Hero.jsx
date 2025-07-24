import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserMd, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    { icon: <FaUserMd />, text: "Expert Doctors" },
    { icon: <FaCalendarAlt />, text: "Easy Booking" },
    { icon: <FaClock />, text: "24/7 Support" },
  ];

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center text-white px-4 md:px-10 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-sky-950/75 to-black/80 backdrop-blur-sm z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="relative z-10 text-center flex flex-col items-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg"
          variants={itemVariants}
        >
          Book Your{" "}
          <span className="inline-block bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">
            Doctor Appointment
          </span>{" "}
          Instantly
        </motion.h1>

        <motion.p
          className="mt-6 text-white/90 text-lg md:text-xl max-w-2xl"
          variants={itemVariants}
        >
          Welcome to{" "}
          <span className=" font-bold">
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              DOCBOOK
            </span>
          </span>{" "}
          your trusted platform to find verified doctors and book appointments
          hassle-free.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-8"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-emerald-400 text-xl">
                {feature.icon}
              </span>
              <span className="text-white/90 font-medium">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <Link to="/doctorList">
            <motion.button
              className="flex items-center cursor-pointer gap-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt className="text-xl" />
              <span className="text-lg">Find a Doctor Now</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
