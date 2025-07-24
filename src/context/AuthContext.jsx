import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("logIndoctor");
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  useEffect(() => {
    const storedPatient = localStorage.getItem("logInpatient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  const docLogin = (doctor) => {
    localStorage.setItem("logIndoctor", JSON.stringify(doctor));
    setDoctor(doctor);
  };

  const patientLogin = (patient) => {
    localStorage.setItem("logInpatient", JSON.stringify(patient));
    setPatient(patient);
  };

  const logout = () => {
    localStorage.removeItem("logIndoctor");
    localStorage.removeItem("logInpatient");
    localStorage.removeItem("token");
    setDoctor(null);
    setPatient(null);
    toast.error("Logout");
  };

  return (
    <AuthContext.Provider
      value={{ patient, patientLogin, doctor, docLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
