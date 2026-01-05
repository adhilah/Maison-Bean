// admin/pages/products/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Package, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header with Manage Button */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">View and manage all products</p>
            </div>

            {/* Navigate to Management Page */}
            <Link
              to="/admin/products/manage"
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition shadow-md"
            >
              <Package size={20} />
              Manage Products
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-8 py-6"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                    <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-20 inline-block"></div></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No products found</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    {/* Product Image + Name */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.description?.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-8 py-6 text-gray-700">
                      {product.category || "Uncategorized"}
                    </td>

                    {/* Price */}
                    <td className="px-8 py-6 font-semibold text-gray-900">
                      ${parseFloat(product.basePrice).toFixed(2)}
                    </td>

                    {/* Status (Simple Active) */}
                    <td className="px-8 py-6">
                      <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/admin/products/manage?edit=${product.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          title="Delete"
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
  );
}