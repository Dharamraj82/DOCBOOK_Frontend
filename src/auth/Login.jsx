import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { patientLogin } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
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
        setTimeout(() => navigate("/patient"), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("server not responding.");
    }
  };

  return (
    <section className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="bg-white relative p-8 rounded-2xl shadow-md w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Login to <span className="text-sky-500">DOCBOOK</span>
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-sky-50">
              <FaEnvelope className="text-sky-400 mr-2" />
              <input
                onChange={changeHandler}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-sky-50">
              <FaLock className="text-sky-400 mr-2" />
              <input
                onChange={changeHandler}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-600 hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-4">
          <Link to="/forgot-password" className="text-sky-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
