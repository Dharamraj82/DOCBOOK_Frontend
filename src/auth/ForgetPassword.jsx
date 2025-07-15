import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
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
    <section className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="w-full max-w-md relative bg-white shadow-xl rounded-xl p-8">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={changeHandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={changeHandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              onChange={changeHandler}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
         <p className="text-center text-gray-600 mt-4">
          Doctor remmbered password?{" "}
          <Link to="/doctors" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ForgetPassword;
