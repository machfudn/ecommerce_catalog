import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiErrorCircle, BiArrowBack } from "react-icons/bi";
import api from "../utils/Api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

function ProdukDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/product/${id}`);
        setProduk(res.data);
      } catch (err) {
        toast.error("Produk tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tombol Kembali & Breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <BiArrowBack size={20} />
          <span>Kembali</span>
        </button>
        <div className="h-4 w-[1px] bg-gray-300"></div>{" "}
        {/* Pembatas vertikal */}
        <p className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{produk.nama}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={produk.image_url}
            alt={produk.nama_produk}
            className="w-full h-[420px] object-fit"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x400?text=No+Image")
            }
          />
        </div>

        {/* DETAIL */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {produk.nama}
          </h1>

          <p className="text-2xl font-semibold text-blue-600 mb-4">
            Rp {Number(produk.harga).toLocaleString("id-ID")}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {produk.deskripsi || "Tidak ada deskripsi produk"}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <InfoItem label="Berat" value={`${produk.berat} gram`} />
            <InfoItem label="Kategori" value={produk.nama_kategori} />
            <InfoItem label="Stok" value={`${produk.stok}`} />
            <InfoItem label="Ukuran" value={produk.ukuran} />
            <InfoItem label="Temperamen" value={produk.temperamen} />
            <InfoItem label="Perawatan" value={produk.perawatan} />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-100 rounded-lg p-3">
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default ProdukDetail;
