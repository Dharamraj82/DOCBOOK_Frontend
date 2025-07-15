import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedDoctorRoute = ({ children }) => {
  const { doctor } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return null; 

  if (!doctor || !token) {
    return <Navigate to="/doctors" replace />;
  }

  return children;
};

export default ProtectedDoctorRoute;
