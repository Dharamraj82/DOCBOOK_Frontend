import { useContext } from "react";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  const { doctor, patient, logout } = useContext(AuthContext);

  return (
    <motion.header
      className="bg-gradient-to-r from-sky-50 to-sky-100 fixed top-0 shadow-lg w-full px-4 py-4 flex items-center justify-between md:px-8 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to={"/"}
          className="text-2xl font-extrabold text-sky-600 flex items-center"
        >
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              DOCBOOK
            </span>
          </h2>
          <motion.div
            className="ml-2 text-sky-400"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaUserMd />
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        className="text-sm sm:text-base text-sky-700 font-medium flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome,{" "}
        <span className="text-sky-600 font-semibold flex items-center gap-1">
          {doctor?.name || patient?.name}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            👨
          </motion.span>
        </span>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2"
      >
        <FaSignOutAlt />
        <span className="hidden sm:inline">Logout</span>
      </motion.button>
    </motion.header>
  );
};

export default DashboardHeader;
