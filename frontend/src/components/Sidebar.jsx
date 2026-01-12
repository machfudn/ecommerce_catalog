import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { BiLayer } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import AuthButton from "./AuthButton";
import { getToken } from "../utils/Auth";

const Sidebar = () => {
  const [isLogin, setIsLogin] = useState(!!getToken());
  const [open, setOpen] = useState(false);

  // Pantau perubahan token jika perlu
  useEffect(() => {
    setIsLogin(!!getToken());
  }, []);

  const activeLink =
    "flex items-center gap-4 px-4 py-3 rounded-lg bg-blue-600 text-white shadow-md";
  const normalLink =
    "flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <>
      {/* HAMBURGER */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg lg:hidden"
      >
        <AiOutlineMenu size={22} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-gray-900 text-white
          w-64 p-4 flex flex-col justify-between
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div>
          <div className="flex items-center justify-between px-2 mb-10 mt-4">
            <span className="text-xl font-bold">
              AQUA<span className="text-blue-500">STORE</span>
            </span>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-gray-400"
            >
              <HiX size={22} />
            </button>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {/* HOME (SELALU) */}
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineHome size={22} />
              <span>Home</span>
            </NavLink>

            {/* MENU ADMIN */}
            {isLogin && (
              <>
                <NavLink
                  to="/produk"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <MdInventory size={22} />
                  <span>Produk</span>
                </NavLink>

                <NavLink
                  to="/kategori"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <BiLayer size={22} />
                  <span>Kategori</span>
                </NavLink>

                <NavLink
                  to="/users"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <FaUsers size={22} />
                  <span>Users</span>
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* LOGIN / LOGOUT */}
        <AuthButton />
      </aside>
    </>
  );
};

export default Sidebar;
