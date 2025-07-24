import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const DoctorPopUP = () => {
  const { doctor, docLogin } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ phone: "", address: "" });

  useEffect(() => {
    const checkDoctorProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_ROUTES}doctor/profile/${doctor._id}`
        );
        const data = await res.json();
        if (data.success) {
          const { phone, address } = data.doctor;
          if (!phone || !address) {
            setShowModal(true);
            setFormData({
              phone: phone || "",
              address: address || "",
            });
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    if (doctor?._id) {
      checkDoctorProfile();
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ROUTES}doctor/profile/update/${doctor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      const { updatedDoctor } = result;

      if (result.success) {
        docLogin(updatedDoctor);
        toast.success("Profile updated successfully");
        setShowModal(false);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorPopUP;
