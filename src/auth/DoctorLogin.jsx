import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaLock, FaUserMd, FaStethoscope, FaHospital } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Loader from "../hooks/Loader";
import { motion, AnimatePresence } from "framer-motion";

const DoctorLogin = ({ onClose }) => {
  const [doctorLogin, setDoctorLogin] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { docLogin } = useContext(AuthContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copyDoctorLogin = { ...doctorLogin };
    copyDoctorLogin[name] = value;
    setDoctorLogin(copyDoctorLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = doctorLogin;
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoader(true);
    try {
      const url = `${import.meta.env.VITE_ROUTES}auth/doc-signIn`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorLogin),
      });

      const result = await res.json();
      const { message, success, error, jwttoken, doctor } = result;

      if (success) {
        toast.success(message);
        docLogin(doctor);
        localStorage.setItem("token", jwttoken);
        setTimeout(() => onClose(), 1500);
        navigate("/doctors/dashboard");
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("server not responding.");
    } finally {
      setLoader(false);
    }
  };
  return (
    <AnimatePresence>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-sky-900/90 to-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-10"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
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
              className="flex flex-col items-center mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-sky-600 text-4xl mb-4"
              >
                <FaUserMd />
              </motion.div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent">
                Doctor Login
              </h2>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block mb-2 text-gray-700 font-medium">
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
                <label className="block mb-2 text-gray-700 font-medium">
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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {loader ? (
                  <div className="w-full flex justify-center flex-col items-center p-2">
                    <Loader />
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Login to Dashboard
                  </motion.button>
                )}
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 space-y-4"
            >
              <p className="text-center text-gray-500">
                Forgot your password?{" "}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link
                    to={"/forgot-password"}
                    className="text-sky-600 hover:text-sky-700 font-medium cursor-pointer"
                  >
                    Reset Here
                  </Link>
                </motion.span>
              </p>

              <div className="flex items-center justify-center gap-4 text-sky-600">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaStethoscope className="text-2xl" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaHospital className="text-2xl" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <ToastContainer />
      </motion.section>
    </AnimatePresence>
  );
};

export default DoctorLogin;
