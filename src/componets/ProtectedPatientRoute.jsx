import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedPatientRoute = ({ children }) => {
  const { patient } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return null; 

  if (!patient || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedPatientRoute;
