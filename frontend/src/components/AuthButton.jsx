import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { getToken, logout } from "../utils/Auth";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const AuthButton = () => {
  const isLogin = !!getToken();

  return (
    <div className="border-t border-gray-800 pt-4">
      {isLogin ? (
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition"
        >
          <HiOutlineLogout size={22} />
          <span>Logout</span>
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 hover:text-blue-400 transition"
          >
            <HiOutlineLogin size={22} />
            <span>Login</span>
          </Link>
          <Link
            to="/Register"
            className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 hover:text-blue-400 transition"
          >
            <FaUserPlus size={22} />
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
