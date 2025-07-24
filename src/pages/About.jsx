import React from "react";
import Header from "../componets/Header";
import { motion } from "framer-motion";
import { FaStethoscope, FaUserMd, FaCalendarCheck, FaLock } from "react-icons/fa";
import Footer from "../componets/Footer";

const About = () => {
  return (
    <>
    <Header/>
    <div className="w-full bg-gradient-to-b from-emerald-50 via-white to-sky-50 py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            className="inline-block mb-6 p-4 rounded-full bg-gradient-to-r from-emerald-100 to-sky-100"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <FaStethoscope className="text-4xl text-transparent fill-emerald-600" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            About{" "}
              <span className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                  DOCBOOK
                </span>
              </span>
          </motion.h1>

          <motion.p 
            className="text-center text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DOCBOOK is a reliable, feature-rich doctor appointment booking platform that connects patients with trusted doctors. Designed to simplify the healthcare process, DOCBOOK empowers both patients and medical professionals to communicate and manage appointments seamlessly.
          </motion.p>
        </motion.div>

        {/* Our Vision Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-10 items-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <img
              src="public/aboutImg1.webp"
              alt="Doctors at work"
              className="rounded-2xl shadow-xl relative"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to revolutionize healthcare access by offering a centralized platform where doctors can register, manage their availability, and connect with patients. Patients can discover the right doctor using filters like location, specialty, or availability—and book or cancel appointments effortlessly.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent text-center mb-10">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Doctor Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-lg">
                    <FaUserMd className="text-2xl text-emerald-600" />
                  </span>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-sky-700 bg-clip-text text-transparent">
                    Doctor Functionality
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Register and login securely",
                    "Set and manage appointment slots",
                    "View all upcoming or past appointments",
                    "Cancel or mark appointments as completed"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Patient Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-gradient-to-r from-sky-100 to-emerald-100 rounded-lg">
                    <FaCalendarCheck className="text-2xl text-sky-600" />
                  </span>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-sky-700 to-emerald-700 bg-clip-text text-transparent">
                    Patient Functionality
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Register and login with security",
                    "Search doctors by name, specialty, or location",
                    "Book or cancel appointments instantly",
                    "Apply filters to find available slots"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Upcoming Features */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-emerald-50/50 to-sky-50/50 rounded-2xl shadow-lg relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative">
              <motion.div
                className="inline-block mb-6 p-3 rounded-full bg-gradient-to-r from-emerald-100 to-sky-100"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <FaLock className="text-3xl text-emerald-600" />
              </motion.div>
              
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-6">
                Upcoming Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  "Advanced filtering by specialization",
                  "Live availability-based search",
                  "Email & SMS appointment reminders"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <p className="text-gray-700">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div 
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <img
              src="public/Developer.png"
              alt="Developer profile"
              className="rounded-2xl shadow-xl w-full object-cover relative"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group p-6 bg-gradient-to-br from-emerald-50/50 to-sky-50/50 rounded-2xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-4">
                Meet the Developer
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                DOCBOOK is crafted with dedication and vision by{" "}
                <motion.span 
                  className="font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Dharamraj Pd. Yadav
                </motion.span>
                , a passionate full-stack developer focused on solving real-world problems using the MERN stack. He is committed to delivering smart, scalable, and user-centric web applications.
              </p>
              <motion.p 
                className="text-gray-600 flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Connect on GitHub:{" "}
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full hover:shadow-lg transition-shadow"
                  href="https://github.com/Dharamraj82"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Dharamraj82
                </a>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
