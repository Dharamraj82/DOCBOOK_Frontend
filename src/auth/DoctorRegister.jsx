import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaUser, FaEnvelope, FaLock, FaStethoscope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

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

  return (
    <section className="min-h-screen bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white  p-8 rounded-2xl shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Doctor Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-sky-50">
              <FaUser className="text-sky-400 mr-2" />
              <input
                type="text"
                name="name"
                onChange={changeHandler}
                placeholder="Dr. Dharamraj"
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
                type="email"
                name="email"
                onChange={changeHandler}
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
                type="password"
                name="password"
                onChange={changeHandler}
                placeholder="Enter your password"
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Specialization
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-sky-50">
              <FaStethoscope className="text-sky-400 mr-2" />
              <select
                name="specialization"
                onChange={changeHandler}
                className="bg-transparent w-full outline-none"
              >
                <option value="">Select specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="General Physician">General Physician</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Gender
            </label>
            <div className="flex gap-6 pl-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={changeHandler}
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={changeHandler}
                />
                Female
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={changeHandler}
                />
                Other
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              onChange={changeHandler}
              min="0"
              placeholder="e.g. 5"
              className="w-full border rounded-xl px-3 py-2 bg-sky-50 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DoctorRegister;
