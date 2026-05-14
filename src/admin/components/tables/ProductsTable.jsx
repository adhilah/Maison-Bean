import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllProductsForAdmin,
  deleteProduct,
} from "../../../services/productApi";
import { Package, Edit, Trash2, ArrowLeft, Plus } from "lucide-react"; // Added Plus icon
import toast from "react-hot-toast";

export default function ProductList() {
  const navigate = useNavigate(); // Now properly imported

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProductsForAdmin();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    const loadingToast =
      toast.loading(
        "Deleting product..."
      );

    try {

      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter(
          (p) => p.id !== id
        )
      );

      toast.dismiss(
        loadingToast
      );

      toast.success(
        "Product deleted successfully"
      );

    } catch (err) {

      console.error(err);

      toast.dismiss(
        loadingToast
      );

      toast.error(
        "Failed to delete product"
      );
    }
};

  const handleEdit = (id) => {
  navigate(`/admin/edit-product?edit=${id}`);
  };

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      String(product.id).includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
          {/* ================= HEADER ================= */}
          <div className="px-6 md:px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm">
                    <Package className="text-[#a77c3b]" size={24} />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                </div>
                <p className="text-gray-600 ml-12">
                  View and manage all products in your menu
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-3 text-[#a77c3b] font-medium rounded-xl hover:bg-amber-50 border border-amber-100 transition-all"
                >
                  <ArrowLeft size={18} />
                  Back to Dashboard
                </Link>

                <Link
                  to="/admin/products/manage" 
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a77c3b] to-[#c5a068] text-white rounded-xl font-semibold hover:from-[#a57835] hover:to-[#a2732e] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus size={20} />
                  Add New Product
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mt-6">
              <input
                type="text"
                placeholder="Search by product name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all bg-gray-50/50"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50/50 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-8 py-4 text-left">Product</th>
                  <th className="px-8 py-4 text-left">Category</th>
                  <th className="px-8 py-4 text-left">Price</th>
                  <th className="px-8 py-4 text-left">Description</th>
                  <th className="px-8 py-4 text-left">Health Benefits</th>
                  <th className="px-8 py-4 text-left">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#a77c3b] border-t-transparent mb-4"></div>
                        Loading products...
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center text-gray-500">
                      <Package size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm mt-2">
                        {search
                          ? "Try adjusting your search term"
                          : "Start by adding your first product!"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                            onError={(e) => (e.target.src = "/placeholder.png")}
                            className="h-16 w-16 object-cover rounded-xl border border-gray-200 shadow-sm"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-gray-700">{product.category || "—"}</td>

                      <td className="px-8 py-6 font-bold text-gray-900">
                        ${Number(product.basePrice || 0).toFixed(2)}
                      </td>

                      <td className="px-8 py-6 text-sm text-gray-600 max-w-xs">
                        {product.description || <span className="text-gray-400">No description</span>}
                      </td>

                      <td className="px-8 py-6 text-sm text-gray-600 max-w-xs">
                        {product.healthBenefits ? (
                          <div className="flex flex-wrap gap-1">
                            {product.healthBenefits
                              .split(",")
                              .slice(0, 3)
                              .map((benefit, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                                >
                                  {benefit.trim()}
                                </span>
                              ))}
                            {product.healthBenefits.split(",").length > 3 && (
                              <span className="text-xs text-gray-500">+ more</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="p-2.5 bg-amber-100 text-[#a77c3b] rounded-xl hover:bg-amber-200 transition-all"
                            title="Edit Product"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}