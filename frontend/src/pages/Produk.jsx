import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { MdAdd, MdInventory } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { HiOutlinePhotograph } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import ActionButton from "../components/ActionButton";
import StatusBadge from "../components/StatusBadge";
import ResponsiveList from "../components/ResponsiveList";
import api from "../utils/Api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const Produk = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    sku: "",
    nama: "",
    id_kategori: "",
    harga: "",
    stok: "",
    ukuran: "",
    perawatan: "",
    temperamen: "",
    deskripsi: "",
    berat: "",
    status_tampil: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Gagal memuat kategori:", err);
    }
  };
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (err) {
      toast.error("Gagal memuat produk:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setSelectedId(product.id);
      setFormData({
        nama: product.nama,
        harga: product.harga,
        stok: product.stok,
        sku: product.sku,
        ukuran: product.ukuran,
        perawatan: product.perawatan,
        temperamen: product.temperamen,
        deskripsi: product.deskripsi,
        berat: product.berat,
        status_tampil: product.status_tampil,
        id_kategori: String(product.id_kategori),
      });
      setPreviewImage(product.image_url);
    } else {
      setSelectedId(null);
      setFormData({
        sku: "",
        nama: "",
        id_kategori: "",
        harga: "",
        stok: "",
        ukuran: "",
        perawatan: "",
        temperamen: "",
        deskripsi: "",
        berat: "",
        status_tampil: "",
      });
      setPreviewImage(null);
      setFile(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append data teks
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    // Append file jika ada
    if (file) data.append("gambar", file);
    const toastId = toast.loading(
      selectedId ? "Mengupdate produk..." : "Menyimpan produk..."
    );

    try {
      if (selectedId) {
        // Logika UPDATE
        await api.put(`/product/${selectedId}`, data);
        toast.success("Produk berhasil diupdate", { id: toastId });
      } else {
        // Logika CREATE
        await api.post("/product", data);
        toast.success("Produk berhasil ditambahkan", { id: toastId });
      }
      setIsModalOpen(false);
      loadProducts();
      setFile(null);
    } catch (err) {
      toast.error("Gagal menyimpan produk", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Produk?",
      text: "Apakah kamu yakin menghapus produk ini.",
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
      await api.delete(`/product/${id}`);

      Swal.fire({
        title: "Berhasil!",
        text: "Produk berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      loadProducts();
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus produk.",
        icon: "error",
      });
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0 lg:ml-64">
      <Sidebar />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
            <MdInventory className="text-blue-600" />
            Manajemen Produk
          </h2>

          <span className="bg-blue-600 px-2 py-1 text-white text-sm rounded-md">
            {products.length}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
        >
          <MdAdd size={20} />
          Tambah Ikan
        </button>
      </div>

      <ResponsiveList
        data={products}
        tableHeader={
          <tr>
            <th className="p-4">Produk</th>
            <th className="p-4">SKU</th>
            <th className="p-4">Harga</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        }
        renderTableRow={(p) => (
          <>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={p.image_url}
                  alt={p.nama}
                  className="w-10 h-10 rounded object-fit"
                />
                <span className="font-medium">{p.nama}</span>
              </div>
            </td>
            <td className="p-4 uppercase text-gray-500">{p.sku}</td>
            <td className="p-4 text-green-600 font-bold">
              Rp {Number(p.harga).toLocaleString("id-ID")}
            </td>
            <td className="p-4">
              <StatusBadge status={p.status_tampil} />
            </td>
            <td className="p-4">
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={`/produk/detail/${p.id}`}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm border border-blue-100"
                  title="Lihat Detail"
                >
                  <BiDetail size={18} />
                </Link>

                <ActionButton
                  p={p}
                  onEdit={handleOpenModal}
                  onDelete={handleDelete}
                />
              </div>
            </td>
          </>
        )}
        renderCard={(p) => (
          <>
            <div className="flex gap-3 items-center mb-3">
              <img
                src={p.image_url}
                className="w-16 h-16 rounded-lg object-fit"
              />
              <div>
                <h3 className="font-semibold">{p.nama}</h3>
                <p className="text-xs text-gray-500 uppercase">{p.sku}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <p className="text-green-600 font-bold">
                Rp {Number(p.harga).toLocaleString()}
              </p>
              <StatusBadge status={p.status_tampil} />
            </div>

            <div className="mb-2">
              <Link
                to={`/produk/detail/${p.id}`}
                className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
              >
                <BiDetail size={18} /> Lihat
              </Link>
            </div>

            <ActionButton
              p={p}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </>
        )}
      />

      {/* Modal CRUD */}
      <Modal
        isOpen={isModalOpen}
        size="max-w-xl"
        onClose={() => setIsModalOpen(false)}
        title={selectedId ? "Edit Produk" : "Tambah Produk Baru"}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto pr-1"
        >
          {/* ===== PREVIEW GAMBAR ===== */}
          {previewImage && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-44 h-32 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {/* ===== INFORMASI UTAMA ===== */}
          <div className="md:col-span-2 text-sm font-semibold text-gray-500">
            Informasi Utama
          </div>

          <div>
            <label
              htmlFor="nama"
              className="text-sm font-semibold text-gray-500"
            >
              Nama Produk
            </label>
            <input
              id="nama"
              name="nama"
              placeholder="Nama Produk"
              value={formData.nama}
              required
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="sku"
              className="text-sm font-semibold text-gray-500"
            >
              SKU
            </label>
            <input
              id="sku"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              required
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="text-sm font-semibold text-gray-500"
            >
              Kategori
            </label>
            <select
              id="kategori"
              name="id_kategori"
              required
              value={formData.id_kategori}
              onChange={(e) =>
                setFormData({ ...formData, id_kategori: e.target.value })
              }
              className="input"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="text-sm font-semibold text-gray-500"
            >
              Status Tampil
            </label>
            <select
              id="status"
              name="status_tampil"
              value={formData.status_tampil}
              onChange={(e) =>
                setFormData({ ...formData, status_tampil: e.target.value })
              }
              className="input"
            >
              <option value="" disabled>
                Pilih Status
              </option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          {/* ===== DETAIL PRODUK ===== */}
          <div className="md:col-span-2 text-sm font-semibold text-gray-500 pt-2">
            Detail Produk
          </div>

          <div>
            <label
              htmlFor="harga"
              className="text-sm font-semibold text-gray-500"
            >
              Harga
            </label>
            <input
              id="harga"
              name="harga"
              type="number"
              placeholder="Harga"
              value={formData.harga}
              required
              onChange={(e) =>
                setFormData({ ...formData, harga: e.target.value })
              }
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="stok"
              className="text-sm font-semibold text-gray-500"
            >
              Stok
            </label>
            <input
              id="stok"
              name="stok"
              type="number"
              placeholder="Stok"
              value={formData.stok}
              required
              onChange={(e) =>
                setFormData({ ...formData, stok: e.target.value })
              }
              className="input"
            />
          </div>

          {/* UKURAN */}
          <div>
            <label
              htmlFor="ukuran"
              className="text-sm font-semibold text-gray-500"
            >
              Ukuran
            </label>
            <select
              id="ukuran"
              name="ukuran"
              value={
                ["S", "M", "L", "XL", "XXL"].includes(formData.ukuran)
                  ? formData.ukuran
                  : "Custom"
              }
              onChange={(e) => {
                if (e.target.value === "Custom") {
                  setFormData({ ...formData, ukuran: "" });
                } else {
                  setFormData({ ...formData, ukuran: e.target.value });
                }
              }}
              className="input"
            >
              <option value="" disabled>
                Pilih Ukuran
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {formData.ukuran === "" && (
            <div>
              <label
                htmlFor="ukuran_custom"
                className="text-sm font-semibold text-gray-500"
              >
                Ukuran Custom
              </label>
              <input
                id="ukuran_custom"
                name="ukuran_custom"
                placeholder="Ukuran Custom (contoh: 15-20 cm)"
                onChange={(e) =>
                  setFormData({ ...formData, ukuran: e.target.value })
                }
                className="input"
              />
            </div>
          )}

          {/* PERAWATAN */}
          <div>
            <label
              htmlFor="perawatan"
              className="text-sm font-semibold text-gray-500"
            >
              Perawatan
            </label>
            <select
              id="perawatan"
              name="perawatan"
              required
              value={formData.perawatan}
              onChange={(e) =>
                setFormData({ ...formData, perawatan: e.target.value })
              }
              className="input"
            >
              <option value="" disabled>
                Pilih Perawatan
              </option>
              <option value="Mudah">Mudah</option>
              <option value="Menengah">Menengah</option>
              <option value="Ahli">Ahli</option>
            </select>
          </div>

          {/* TEMPERAMEN */}
          <div>
            <label
              htmlFor="temperamen"
              className="text-sm font-semibold text-gray-500"
            >
              Temperamen
            </label>
            <select
              id="temperamen"
              name="temperamen"
              required
              value={formData.temperamen}
              onChange={(e) =>
                setFormData({ ...formData, temperamen: e.target.value })
              }
              className="input"
            >
              <option value="" disabled>
                Pilih Temperamen
              </option>
              <option value="Damai">Damai</option>
              <option value="Semi-Agresif">Semi-Agresif</option>
              <option value="Agresif">Agresif</option>
            </select>
          </div>

          {/* BERAT */}
          <div>
            <label
              htmlFor="berat"
              className="text-sm font-semibold text-gray-500"
            >
              Berat (gram)
            </label>
            <input
              id="berat"
              name="berat"
              type="number"
              required
              placeholder="Berat (gram)"
              value={formData.berat}
              onChange={(e) =>
                setFormData({ ...formData, berat: e.target.value })
              }
              className="input"
            />
          </div>

          {/* DESKRIPSI */}
          <div className="md:col-span-2">
            <label
              htmlFor="deskripsi"
              className="text-sm font-semibold text-gray-500"
            >
              Deskripsi Produk
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows="3"
              placeholder="Deskripsi produk"
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className="input resize-none"
            />
          </div>

          {/* ===== UPLOAD GAMBAR ===== */}
          <div className="md:col-span-2 border-2 border-dashed border-gray-200 p-4 rounded-lg text-center">
            <label className="text-sm font-semibold text-gray-500 block mb-2">
              Gambar Produk
            </label>

            <input
              type="file"
              id="upload"
              name="gambar"
              hidden
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;
                setFile(selectedFile);
                setPreviewImage(URL.createObjectURL(selectedFile));
              }}
            />

            <label htmlFor="upload" className="cursor-pointer text-gray-400">
              <HiOutlinePhotograph size={36} className="mx-auto" />
              <p className="text-sm mt-1">
                {file ? file.name : "Klik untuk upload / ganti gambar"}
              </p>
            </label>
          </div>

          {/* ===== ACTION ===== */}
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-gray-300 text-gray-600 font-semibold py-3 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              {selectedId ? "Update Produk" : "Simpan Produk"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Produk;
