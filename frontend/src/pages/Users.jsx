import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import ResponsiveList from "../components/ResponsiveList";
import ActionButton from "../components/ActionButton";
import { BiUser, BiPlus } from "react-icons/bi";
import { getToken } from "../utils/Auth";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Users = () => {
  const token = getToken();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data users:", err);
    }
  };

  /* ================= CREATE & UPDATE ================= */
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      selectedId ? "Mengupdate user..." : "Menyimpan user..."
    );

    try {
      if (selectedId) {
        // UPDATE
        await api.put(
          `/users/${selectedId}`,
          {
            username: form.username,
            email: form.email,
            ...(form.password && { password: form.password }),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("User berhasil diupdate", { id: toastId });
      } else {
        // CREATE
        await api.post("/users", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("User berhasil ditambahkan", { id: toastId });
      }

      handleCloseModal();
      loadData();
    } catch (err) {
      toast.error("Gagal menyimpan user:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus User?",
      text: "Apakah kamu yakin menghapus user ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // merah
      cancelButtonColor: "#6b7280", // abu
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Berhasil!",
        text: "User berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      loadData();
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus user.",
        icon: "error",
      });
    }
  };

  /* ================= MODAL ================= */
  const handleOpenModal = (user = null) => {
    if (user) {
      setSelectedId(user.id);
      setForm({
        username: user.username,
        email: user.email,
        password: "",
      });
    } else {
      setSelectedId(null);
      setForm({
        username: "",
        email: "",
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setForm({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0 lg:ml-64">
      <Sidebar />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
            <BiUser className="text-blue-600" /> Manajemen User
          </h2>
          <p className="bg-blue-600 p-1 text-white rounded-md">
            {users.length}
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
        >
          <BiPlus size={20} /> Tambah User
        </button>
      </div>

      {/* DATA */}
      <ResponsiveList
        data={users}
        tableHeader={
          <tr>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        }
        renderTableRow={(user) => (
          <>
            <td className="p-4 font-medium text-gray-700">{user.username}</td>
            <td className="p-4 text-gray-600">{user.email}</td>
            <td className="p-4 text-center">
              <ActionButton
                p={user}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            </td>
          </>
        )}
        renderCard={(user) => (
          <div>
            <p className="font-semibold text-gray-700">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>

            <ActionButton
              p={user}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </div>
        )}
      />

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedId ? "Edit User" : "Tambah User"}
      >
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Username
            </label>
            <input
              type="text"
              required
              className="input"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500">Email</label>
            <input
              type="email"
              required
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500">
              Password {selectedId && "(kosongkan jika tidak diubah)"}
            </label>
            <input
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              BATAL
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {selectedId ? "UPDATE" : "SIMPAN"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
