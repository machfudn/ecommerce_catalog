import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdScale, MdStraighten } from "react-icons/md";
import { GiFishEggs } from "react-icons/gi";
import Sidebar from "../components/Sidebar";
import api from "../utils/Api";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const aktifProducts = products.filter((p) => p.status_tampil === "Aktif");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (err) {
      toast.error("Gagal memuat data produk. Pastikan Rest API berjalan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl mb-2" />
        <p className="text-gray-500 text-sm">Loading Katalog...</p>
      </div>
    );
  }

  return (
    <div className="mt-10 lg:ml-64 md:mt-0 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <Sidebar />
      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          🐟 Katalog Ikan
        </h1>

        <span className="inline-flex items-center justify-center bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow w-fit">
          {aktifProducts.length} Aktif
        </span>
      </div>

      {/* GRID PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {aktifProducts.map((p) => (
          <Link
            to={`/produk/detail/${p.id}`}
            key={p.id}
            className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={p.image_url}
                alt={p.nama}
                className="w-full h-40 sm:h-44 object-cover group-hover:scale-105 transition duration-300"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image")
                }
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                {p.nama}
              </h3>

              <p className="text-blue-600 font-bold text-base md:text-lg mt-1">
                Rp {Number(p.harga).toLocaleString("id-ID")}
              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs text-gray-600 mt-3">
                <div className="flex items-center gap-1">
                  <MdScale /> {p.berat || 0} gr
                </div>
                <div className="flex items-center gap-1">
                  <MdStraighten /> {p.ukuran || "-"}
                </div>
                <div className="flex items-center gap-1">
                  <GiFishEggs /> {p.perawatan || "Mudah"}
                </div>
                <div className="flex items-center gap-1">
                  ⚡ {p.temperamen || "Damai"}
                </div>
              </div>

              {/* DESKRIPSI */}
              <p className="text-[11px] md:text-xs text-gray-500 line-clamp-2 mt-3">
                {p.deskripsi || "Tidak ada Deskripsi"}
              </p>

              {/* CTA */}
              <div className="mt-auto pt-4">
                <span className="block text-center text-xs md:text-sm font-semibold text-white bg-blue-600 rounded-lg py-2 group-hover:bg-blue-700 transition">
                  Lihat Detail
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
