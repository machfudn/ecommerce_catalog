import { saveToken } from "../utils/Auth";
import { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Sedang login...");

    try {
      const res = await api.post("/auth/login", form);

      saveToken(res.data.token);

      toast.success("Login berhasil", { id: toastId });

      navigate("/");
    } catch (error) {
      const message = "Login gagal, cek email dan password";
      toast.error(message, { id: toastId });
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
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang</h2>
          <p className="text-gray-500 mt-2">Silakan login ke akun Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2.5 rounded-lg transition
              flex justify-center items-center gap-2
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <HiLockClosed className="w-5 h-5" />
                Login
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-1 text-sm text-gray-600 mt-6">
          <p>Belum punya akun?</p>
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
