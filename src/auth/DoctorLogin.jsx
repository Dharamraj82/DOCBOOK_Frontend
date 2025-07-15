import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const DoctorLogin = ({ onClose }) => {
  const [doctorLogin, setDoctorLogin] = useState({
    email: "",
    password: "",
  });
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
    }
  };
  return (
    <section className="min-h-screen bg-black/70 flex items-center justify-center px-4">
      <div className="relative p-6 bg-white rounded-2xl shadow-xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          Doctor Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>   
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <div className="flex items-center px-3 py-2 border rounded-xl bg-sky-50">
              <FaEnvelope className="text-sky-400 mr-2" />
              <input
                type="email"
                name="email"
                onChange={changeHandler}
                placeholder="Enter your email"
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <div className="flex items-center px-3 py-2 border rounded-xl bg-sky-50">
              <FaLock className="text-sky-400 mr-2" />
              <input
                type="password"
                name="password"
                onChange={changeHandler}
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

        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot your password?{" "}
          <Link
            to={"/forgot-password"}
            className="text-sky-600 hover:underline cursor-pointer"
          >
            Reset Here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DoctorLogin;
