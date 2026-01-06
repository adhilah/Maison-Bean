import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Package, Edit, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

/**
 * ProductList
 * -----------
 * Admin page to view, search, edit, and delete products.
 * Features:
 * - Product search (name or ID)
 * - Image fallback handling
 * - Structured table layout
 * - Skeleton loading
 */
export default function ProductList() {
  // Stores all products from API
  const [products, setProducts] = useState([]);

  // Loading state for skeleton UI
  const [loading, setLoading] = useState(true);

  // Search input value
  const [search, setSearch] = useState("");

  // Fetch products once on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products from backend
   */
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a product by ID
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  /**
   * Filter products based on search (name or ID)
   */
  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      String(product.id).includes(term)
    );
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="px-8 py-5 border-b border-gray-100">
          {/*Search Bar */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by product name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-2xl
                 focus:outline-none focus:ring-2 focus:ring-[#9c7635]"
            />
          </div>

          {/* Title + Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                View and manage all products in the store
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1 text-[#9c7635] font-medium hover:underline"
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </Link>

              <Link
                to="/admin/add-to-cart"
                className="flex items-center gap-2 px-6 py-3 bg-[#9c7635]
                   text-white rounded-xl font-medium hover:bg-[#7a5d2c]"
              >
                <Package size={18} />
                Add Product
              </Link>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-8 py-4 text-left w-[280px]">Product</th>
                <th className="px-8 py-4 text-left">Category</th>
                <th className="px-8 py-4 text-left">Price</th>
                <th className="px-8 py-4 text-left w-[320px]">Description</th>
                <th className="px-8 py-4 text-left w-[280px]">
                  Health Benefits
                </th>
                <th className="px-8 py-4 text-left">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {/* Loading State */}
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-8 py-16 text-center text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                /* Empty State */
                <tr>
                  <td
                    colSpan={6}
                    className="px-8 py-16 text-center text-gray-500"
                  >
                    No products match your search
                  </td>
                </tr>
              ) : (
                /* Product Rows */
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* Product Image + Name */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                          className="h-16 w-16 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-8 py-6 text-gray-700">
                      {product.category || "Uncategorized"}
                    </td>

                    {/* Price */}
                    <td className="px-8 py-6 font-semibold text-gray-900">
                      ${Number(product.basePrice || 0).toFixed(2)}
                    </td>

                    {/* Description */}
                    <td className="px-8 py-6 text-sm text-gray-600">
                      {product.description || "No description available"}
                    </td>
                    {/* Health Benefits */}
                    <td className="px-8 py-6 text-sm text-gray-600">
                      {product.healthBenefits ? (
                        <ul className="list-disc list-inside space-y-1">
                          {product.healthBenefits
                            .split(",")
                            .map((benefit, index) => (
                              <li key={index}>{benefit.trim()}</li>
                            ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">
                          No health benefits
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        {/* <Link
                          to={`/admin/products/manage?edit=${product.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link> */}

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
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
  );
}
