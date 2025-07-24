import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  FaLock,
  FaUser,
  FaEnvelope,
  FaUserMd,
  FaUserInjured,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../hooks/Loader";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientData, setUseData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copypatientData = { ...patientData };
    copypatientData[name] = value;
    setUseData(copypatientData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = patientData;
    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_ROUTES}auth/forget-password`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const result = await res.json();
      const { message, success, error } = result;

      if (success) {
        toast.success(message);
        setTimeout(() => navigate("/"), 1500);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("server not responding.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-emerald-900/80 via-sky-900/80 to-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-emerald-100 to-sky-200 rounded-bl-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-emerald-50 to-green-200 rounded-tr-full -ml-16 -mb-16" />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl z-10 transition-colors duration-200"
            title="Close"
          >
            <IoClose />
          </motion.button>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                Reset Your{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                  Password
                </span>
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg"
              >
                We'll help you get back to your account
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 space-y-4"
              >
                <motion.p
                  className="text-gray-600"
                  whileHover={{ scale: 1.01 }}
                >
                  Remembered your password?{" "}
                </motion.p>
                <motion.p
                  className="text-gray-600"
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    to="/login"
                    className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
                  >
                    Login as Patient
                  </Link>
                </motion.p>
                <motion.p
                  className="text-gray-600"
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    to="/doctors"
                    className="text-sky-500 hover:text-sky-600 font-medium transition-colors"
                  >
                    Login as Doctor
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block mb-2 text-gray-700 font-medium">
                  Name
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-emerald-100 rounded-xl bg-gradient-to-r from-emerald-50/50 to-sky-50/50 focus-within:border-emerald-300 transition-colors group">
                  <FaUser className="text-emerald-400 mr-3 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="Enter your name"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block mb-2 text-gray-700 font-medium">
                  Email
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-emerald-100 rounded-xl bg-gradient-to-r from-emerald-50/50 to-sky-50/50 focus-within:border-emerald-300 transition-colors group">
                  <FaEnvelope className="text-emerald-400 mr-3 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block mb-2 text-gray-700 font-medium">
                  New Password
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-emerald-100 rounded-xl bg-gradient-to-r from-emerald-50/50 to-sky-50/50 focus-within:border-emerald-300 transition-colors group">
                  <FaLock className="text-emerald-400 mr-3 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    onChange={changeHandler}
                    placeholder="Enter new password"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 md:col-span-2"
              >
                <label className="block mb-2 text-gray-700 font-medium">
                  Who are you?
                </label>
                <motion.div
                  className="flex gap-4 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[
                    { value: "patient", icon: FaUserInjured, label: "Patient" },
                    { value: "doctor", icon: FaUserMd, label: "Doctor" },
                  ].map(({ value, icon: Icon, label }) => (
                    <motion.label
                      key={value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-sky-50/50 cursor-pointer hover:border-emerald-200 transition-colors"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={value}
                        onChange={changeHandler}
                        className="text-emerald-500 focus:ring-emerald-400"
                      />
                      <Icon className="text-emerald-500" />
                      <span className="text-gray-700">{label}</span>
                    </motion.label>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="md:col-span-2 pt-4"
              >
                {loading ? (
                  <div className="w-full flex justify-center py-2">
                    <Loader />
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Reset Password
                  </motion.button>
                )}
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
        <ToastContainer />
      </motion.section>
    </AnimatePresence>
  );
};

export default ForgetPassword;
