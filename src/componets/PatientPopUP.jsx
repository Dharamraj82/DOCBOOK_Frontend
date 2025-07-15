import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const PatientPopUP = () => {
  const { patient } = useContext(AuthContext);
  const { patientLogin } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ phone: "", age: "" });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_ROUTES}patient/${patient._id}`);
        const data = await res.json();

        if (data.success) {
          const { phone, age } = data.data;

          if (!phone || !age) {
            setShowModal(true);
            setFormData({
              phone: phone || "",
              age: age || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to check profile completeness", error);
      }
    };

    if (patient?._id) {
      checkProfile();
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_ROUTES}patient/update/${patient._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      const { updatedPatient } = result;

      if (result.success) {
        patientLogin(updatedPatient);
        toast.success("Profile updated successfully");
        setShowModal(false);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
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
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
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

export default PatientPopUP;
