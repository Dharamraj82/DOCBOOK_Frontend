import { useContext } from "react"; 
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DocHeader = () => {
  const { doctor, logout } = useContext(AuthContext);

  return (
    <header className="bg-white fixed top-0 shadow-md border-b w-full px-4 py-4 flex items-center justify-between md:px-8 z-50">
      <Link to={'/'} className="text-2xl font-extrabold text-sky-600">
        DOC<span className="text-sky-400">BOOK</span>
      </Link>

      <div className="text-sm sm:text-base text-gray-700 font-medium">
        Welcome,{" "}
        <span className="text-sky-600 font-semibold"> {doctor?.name}👨‍⚕️</span>
      </div>

      <button
        onClick={logout}
        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-2"
      >
        <FaSignOutAlt />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default DocHeader;
