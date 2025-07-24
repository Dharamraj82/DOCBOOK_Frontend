import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaLock, FaEnvelope, FaUser, FaHeartbeat, FaNotesMedical } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Loader from "../hooks/Loader";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { patientLogin } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_ROUTES}auth/patient-signIn`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await res.json();
      const { message, success, error, jwttoken, patient } = result;

      if (success) {
        patientLogin(patient);
        localStorage.setItem("token", jwttoken);
        toast.success(message);
        setTimeout(() => {
          navigate("/patient");
        }, 1500);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
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
        className="min-h-screen bg-gradient-to-br from-emerald-900/90 to-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-10"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-tr-full -ml-16 -mb-16" />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
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
                className="text-emerald-600 text-4xl mb-4"
              >
                <FaHeartbeat />
              </motion.div>
              <h2 className="text-3xl font-bold text-center mb-2">
                Welcome to <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">DOCBOOK</span>
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-center"
              >
                Your health, our priority
              </motion.p>
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
                <div className="flex items-center px-4 py-3 border-2 border-emerald-100 rounded-xl bg-emerald-50/50 focus-within:border-emerald-300 transition-colors group">
                  <FaEnvelope className="text-emerald-400 mr-3 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    onChange={changeHandler}
                    name="email"
                    type="email"
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
                <div className="flex items-center px-4 py-3 border-2 border-emerald-100 rounded-xl bg-emerald-50/50 focus-within:border-emerald-300 transition-colors group">
                  <FaLock className="text-emerald-400 mr-3 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    onChange={changeHandler}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-transparent w-full outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-2"
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Login to Your Account
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
              <div className="flex flex-col space-y-3">
                <motion.p 
                  className="text-center text-gray-600"
                  whileHover={{ scale: 1.01 }}
                >
                  Don't have an account?{" "}
                  <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Register Here
                  </Link>
                </motion.p>
                <motion.p 
                  className="text-center text-gray-600"
                  whileHover={{ scale: 1.01 }}
                >
                  <Link to="/forgot-password" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot Password?
                  </Link>
                </motion.p>
              </div>

              <div className="flex items-center justify-center gap-4 text-emerald-600">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUser className="text-2xl" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaNotesMedical className="text-2xl" />
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

export default Login;
