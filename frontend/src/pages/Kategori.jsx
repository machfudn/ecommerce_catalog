import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { BiCategoryAlt, BiPlus, BiPencil, BiTrash } from "react-icons/bi";
import Sidebar from "../components/Sidebar";
import ResponsiveList from "../components/ResponsiveList";
import ActionButton from "../components/ActionButton";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  // Ambil Data
  const loadData = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Gagal mengambil Kategori");
    }
  };

  // Tambah & Update Data
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      selectedId ? "Mengupdate kategori..." : "Menyimpan kategori..."
    );
    try {
      if (selectedId) {
        // Logika UPDATE
        await api.put(`/category/${selectedId}`, { nama });
        toast.success("Kategori berhasil diupdate", { id: toastId });
      } else {
        // Logika CREATE
        await api.post("/category", { nama });
        toast.success("Kategori berhasil ditambahkan", { id: toastId });
      }
      handleCloseModal();
      loadData();
    } catch (err) {
      toast.error("Gagal menyimpan data:", err);
    }
  };

  // Hapus Data
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Kategori?",
      text: "Apakah kamu yakin menghapus kategori ini.",
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
      await api.delete(`/category/${id}`);

      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      loadData();
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus kategori.",
        icon: "error",
      });
    }
  };

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setSelectedId(cat.id);
      setNama(cat.nama);
    } else {
      setSelectedId(null);
      setNama("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNama("");
    setSelectedId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0 lg:ml-64">
      <Sidebar />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
            <BiCategoryAlt className="text-blue-600" /> Manajemen Kategori
          </h2>
          <p className="bg-blue-600 p-1 text-white rounded-md ">
            {categories.length}
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
        >
          <BiPlus size={20} /> Tambah Kategori
        </button>
      </div>

      {/* Grid Data */}
      <ResponsiveList
        data={categories}
        tableHeader={
          <tr>
            <th className="p-4">Nama Kategori</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        }
        renderTableRow={(cat) => (
          <>
            <td className="p-4 font-medium text-gray-700">{cat.nama}</td>
            <td className="p-4 text-center">
              <ActionButton
                p={cat}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            </td>
          </>
        )}
        renderCard={(cat) => (
          <div className="">
            <span className="font-semibold text-gray-700">{cat.nama}</span>

            <ActionButton
              p={cat}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </div>
        )}
      />

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedId ? "Edit Kategori" : "Tambah Kategori"}
      >
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-500">
              Nama Kategori
            </label>
            <input
              type="text"
              required
              value={nama}
              placeholder="Contoh: Air Tawar, Air Laut, dll"
              className="input"
              onChange={(e) => setNama(e.target.value)}
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

export default Kategori;
