import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt, FaClock, FaRegClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const CreateSlot = ({ onClose }) => {
  const { doctor } = useContext(AuthContext);
  const [slotData, setSlotData] = useState({
    date: "",
    time: "",
    duration: 60, // default 30 minutes slot
  });
  const [step, setStep] = useState(1); // 1: Select duration, 2: Select date, 3: Select time

  // Generate time slots from 7 AM to 7 PM based on duration
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(7, 0, 0); // 7 AM
    const endTime = new Date();
    endTime.setHours(19, 0, 0); // 7 PM

    while (startTime < endTime) {
      slots.push(format(startTime, "HH:mm"));
      startTime.setMinutes(startTime.getMinutes() + slotData.duration);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        toast.error(error || "Failed to create slot");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-screen z-[99] top-0 fixed flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative p-8 bg-white rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
          title="Close"
        >
          <IoClose />
        </motion.button>

        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-sky-700 mb-8 text-center"
        >
          Create New Appointment Slot
        </motion.h2>

        <div className="mb-6 flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`w-3 h-3 rounded-full ${
                step === s ? "bg-sky-500" : "bg-gray-200"
              }`}
              animate={{ scale: step === s ? 1.2 : 1 }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Select Slot Duration
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[30, 45, 60, 90, 120].map((duration) => (
                    <motion.button
                      key={duration}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSlotData({ ...slotData, duration });
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                        slotData.duration === duration
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                      }`}
                    >
                      <FaRegClock className="text-2xl" />
                      <span className="font-semibold">{duration} min</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Select Date
                </h3>
                <div className="flex items-center px-4 py-3 border rounded-xl bg-sky-50/50">
                  <FaCalendarAlt className="text-sky-400 mr-3 text-xl" />
                  <input
                    type="date"
                    name="date"
                    value={slotData.date}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value) {
                        setStep(3);
                      }
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-transparent w-full outline-none text-lg"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSlotData({ ...slotData, time });
                      }}
                      className={`p-3 rounded-xl text-center ${
                        slotData.time === time
                          ? "bg-sky-500 text-white"
                          : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-xl border border-sky-500 text-sky-500 font-medium hover:bg-sky-50"
              >
                Back
              </motion.button>
            )}
            {step === 3 && slotData.time && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 ml-auto"
              >
                Create Slot
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
      <ToastContainer />
    </motion.section>
  );
};

export default CreateSlot;
