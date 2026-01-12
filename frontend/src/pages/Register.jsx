import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault(); // Mencegah reload
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Register berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Sidebar />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Buat Akun</h2>
          <p className="text-gray-500 mt-2">
            Daftar untuk mulai mengelola aplikasi
          </p>
        </div>

        {/* Form */}
        <form onSubmit={register} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="usernameanda"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="nama@email.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <HiUserAdd className="w-5 h-5" />
                Daftar Sekarang
              </>
            )}
          </button>
        </form>

        <div className="flex justify-center gap-1 text-sm text-gray-600 mt-6">
          <p>Sudah punya akun?</p>
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
