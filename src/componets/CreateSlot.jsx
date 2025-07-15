import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CreateSlot = ({ onClose }) => {
  const { doctor } = useContext(AuthContext);
  const [slotData, setSlotData] = useState({
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData({
      ...slotData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = slotData;
    if (!date || !time) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_ROUTES}doctor/appointments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            date,
            time,
          }),
        }
      );

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        toast.success(message || "Slot created successfully");
        setSlotData({ date: "", time: "" });
        setTimeout(() => onClose(), 1500);
      } else {
        toast.error(error || "Failed to create slot");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <section className="h-screen w-screen  z-[99] top-0 fixed  flex items-center justify-center">
      <div className="relative p-6 bg-sky-100 rounded-2xl shadow-xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-2xl"
          title="Close"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          Create New Slot
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Date</label>
            <div className="flex items-center px-3 py-2 border rounded-xl bg-sky-50">
              <FaCalendarAlt className="text-sky-400 mr-2" />
              <input
                type="date"
                name="date"
                value={slotData.date}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Time</label>
            <div className="flex items-center px-3 py-2 border rounded-xl bg-sky-50">
              <FaClock className="text-sky-400 mr-2" />
              <input
                type="time"
                name="time"
                value={slotData.time}
                onChange={handleChange}
                className="bg-transparent w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Add Slot
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateSlot;
