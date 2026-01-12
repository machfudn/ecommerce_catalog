import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import ProdukDetail from "./pages/ProdukDetail";
import Kategori from "./pages/Kategori";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <div className="flex min-h-screen">
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/produk/detail/:id" element={<ProdukDetail />} />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/produk"
              element={
                <ProtectedRoute>
                  <Produk />
                </ProtectedRoute>
              }
            />

            <Route
              path="/kategori"
              element={
                <ProtectedRoute>
                  <Kategori />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
