import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaStethoscope, 
  FaUserMd, 
  FaHeart, 
  FaBrain, 
  FaChild, 
  FaUserNurse,
  FaMars,
  FaVenus,
  FaTransgender,
  FaClock
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../hooks/Loader";
import { motion, AnimatePresence } from "framer-motion";

const DoctorRegister = ({ onClose }) => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    gender: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, specialization, gender, experience } =
      doctor;
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !gender ||
      !experience
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_ROUTES}auth/doc-signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });

      const result = await res.json();
      const { message, success, error } = result;

      if (success) {
        toast.success(message);
        setTimeout(() => {
          onClose();
          navigate("/doctors");
          l;
        }, 1500);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details || "Something went wrong");
      } else {
        toast.error(message || "Unknown error");
      }
    } catch (err) {
      toast.error("Server not responding.");
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    { value: "Cardiologist", icon: <FaHeart />, color: "text-red-400" },
    { value: "Dermatologist", icon: <FaUserMd />, color: "text-orange-400" },
    { value: "Neurologist", icon: <FaBrain />, color: "text-purple-400" },
    { value: "Pediatrician", icon: <FaChild />, color: "text-blue-400" },
    { value: "General Physician", icon: <FaUserNurse />, color: "text-green-400" },
  ];

  return (
    <AnimatePresence>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-sky-900/90 to-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-6"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-50 rounded-tr-full -ml-16 -mb-16" />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-2xl z-10"
            title="Close"
          >
            <IoClose />
          </motion.button>

          <div className="relative">
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex flex-col items-center mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-sky-600 text-4xl mb-2"
              >
                <FaUserMd />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent">
                Doctor Registration
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-0">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-sky-100 rounded-xl bg-sky-50/50 focus-within:border-sky-300 transition-colors group">
                  <FaUser className="text-sky-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="Dr. Dharamraj"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-sky-100 rounded-xl bg-sky-50/50 focus-within:border-sky-300 transition-colors group">
                  <FaEnvelope className="text-sky-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
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
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-sky-100 rounded-xl bg-sky-50/50 focus-within:border-sky-300 transition-colors group">
                  <FaLock className="text-sky-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    onChange={changeHandler}
                    placeholder="Enter your password"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Specialization
                </label>
                <div className="relative">
                  <select
                    name="specialization"
                    onChange={changeHandler}
                    className="w-full px-4 py-3 border-2 border-sky-100 rounded-xl bg-sky-50/50 focus:border-sky-300 transition-colors appearance-none cursor-pointer outline-none"
                  >
                    <option value="">Select specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec.value} value={spec.value} className="py-2">
                        {spec.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex gap-2">
                    {specializations.map((spec) => (
                      <motion.span
                        key={spec.value}
                        className={`${spec.color} ${
                          doctor.specialization === spec.value ? 'opacity-100' : 'opacity-0'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: doctor.specialization === spec.value ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {spec.icon}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Gender
                </label>
                <div className="flex justify-around">
                  {[
                    { value: 'male', label: 'Male', icon: <FaMars /> },
                    { value: 'female', label: 'Female', icon: <FaVenus /> },
                    { value: 'other', label: 'Other', icon: <FaTransgender /> }
                  ].map((option) => (
                    <motion.label
                      key={option.value}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${
                        doctor.gender === option.value
                          ? 'bg-sky-100 text-sky-600'
                          : 'text-gray-600 hover:bg-sky-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option.value}
                        onChange={changeHandler}
                        className="hidden"
                      />
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Experience (in years)
                </label>
                <div className="flex items-center px-4 py-3 border-2 border-sky-100 rounded-xl bg-sky-50/50 focus-within:border-sky-300 transition-colors group">
                  <FaClock className="text-sky-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    type="number"
                    name="experience"
                    onChange={changeHandler}
                    min="0"
                    placeholder="e.g. 5"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                {loading ? (
                  <div className="w-full flex justify-center flex-col items-center p-2">
                    <Loader />
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    Complete Registration
                  </motion.button>
                )}
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.section>
        <ToastContainer />
    </AnimatePresence>
  );
};export default DoctorRegister;
