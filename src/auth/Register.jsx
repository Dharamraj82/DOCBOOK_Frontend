import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaLock, FaVenusMars } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copyRegisterInfo = { ...registerInfo };
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, gender } = registerInfo;
    if (!name || !email || !password || !gender) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const url = `${import.meta.env.VITE_ROUTES}auth/patient-signUp`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });

      const result = await res.json();
      const { message, success, error } = result;

      if (success) {
        toast.success(message);
        setTimeout(() => navigate("/login"), 1500);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("server not responding.");
    }
  };
  return (
    <section className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 relative rounded-2xl shadow-md w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-sky-50">
              {/* <Fapatient className="text-sky-400 mr-2" /> */}
              <input
                onChange={changeHandler}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <FaVenusMars className="text-sky-400" /> Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  onChange={changeHandler}
                  type="radio"
                  name="gender"
                  value="male"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  onChange={changeHandler}
                  type="radio"
                  name="gender"
                  value="female"
                />
                Female
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  onChange={changeHandler}
                  type="radio"
                  name="gender"
                  value="other"
                />
                Other
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
