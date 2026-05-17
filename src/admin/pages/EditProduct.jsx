import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../services/productApi";

// ── Icons ──────────────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const SaveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const ChefHatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 019.18 0A4 4 0 0118 13.87V21H6z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);
const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const RupeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M6 13l6 8" /><path d="M6 8a6 6 0 010-5h12" /><path d="M6 13h6a6 6 0 000-5" />
  </svg>
);
const TextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const CoffeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

// ── Reusable field wrapper ─────────────────────────────────────
const Field = ({ label, icon, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase font-['Jost',sans-serif] text-[#c9a96e]/70">
      <span className="text-[#c9a96e]/50">{icon}</span>
      {label}
    </label>
    {children}
    {hint && (
      <p className="text-[10px] font-['Jost',sans-serif] text-[#f5f0e8]/30 mt-0.5">{hint}</p>
    )}
  </div>
);

// ── Shared input class — brighter text than AddProduct ─────────
const inputCls = `
  w-full bg-[#0a0705] border border-[#c9a96e]/20
  px-4 py-3 text-[#f5f0e8] text-[13px] font-light
  font-['Jost',sans-serif] placeholder:text-[#f5f0e8]/25
  focus:outline-none focus:border-[#c9a96e]/50
  transition-colors duration-200
`;

// ── Main ───────────────────────────────────────────────────────
export default function EditProduct() {
  const navigate  = useNavigate();
  const { id }    = useParams();

  const [product, setProduct] = useState({
    name: "", category: "", basePrice: "",
    stock: 0, baseCalories: 0,
    image: "", description: "", healthBenefits: "",
  });
  const [loading,    setLoading]    = useState(false);
  const [fetching,   setFetching]   = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const data = await getProductById(id);
      setProduct({
        ...data,
        basePrice:String(data.basePrice ?? data.price ?? ""),
        stock:        data.stockQuantity  || 0,
        baseCalories: data.baseCalories   || 0,
      });
    } catch (err) {
      console.error(err);
      toast.error("Product not found");
      navigate("/admin/products-management");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    if (e.target.name === "image") setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.basePrice || !product.category) {
      toast.error("Name, category and price are required");
      return;
    }
    try {
      setLoading(true);
      const payload = {
          name: product.name,
          description: product.description,
          price: Number(product.basePrice),
          stockQuantity:
            Number(product.stock || 0),
          category: product.category,
          image: product.image,
          baseCalories:
            Number(product.baseCalories || 0),
          healthBenefits:
            product.healthBenefits,
      };
      if (id) {
        await updateProduct(id, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product added successfully");
      }
      navigate("/admin/products-management");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  // Loading spinner while fetching existing product
  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center">
        <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
      </div>
    );
  }

  const benefits = product.healthBenefits
    .split(",").map((b) => b.trim()).filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ep-in { animation: fadeUp 0.45s ease forwards; }

        textarea { resize: none; }
        select option { background: #110d07; color: #f5f0e8; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-10 ep-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
              Admin · Inventory
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8] leading-none">
                {id ? "Edit" : "Add"}
                <span className="italic text-[#c9a96e]"> Product</span>
              </h1>
              <Link
                to="/admin/dashboard"
                className="group flex items-center gap-3 text-[#c9a96e]/60 hover:text-[#c9a96e] transition-all uppercase tracking-[0.35em] text-[10px] font-['Jost',sans-serif]"
              >
                <span className="w-10 h-px bg-[#c9a96e]/35 group-hover:w-14 group-hover:bg-[#c9a96e] transition-all duration-300" />
                Dashboard
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/30 text-[10px] tracking-[0.3em] uppercase">
                {id
                  ? "Update the product details below"
                  : "Fill in the details below to add a new item to your menu"}
              </p>
            </div>
          </div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ep-in">

            {/* ── LEFT: Form panel ── */}
            <div className="lg:col-span-2 bg-[#0d0a05] border border-[#c9a96e]/12">

              {/* Panel header */}
              <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
                  <ChefHatIcon />
                </div>
                <div>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8] leading-tight">
                    Product Details
                  </h2>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/35 mt-0.5 font-['Jost',sans-serif]">
                    {id ? "Edit existing product" : "Basic information about your product"}
                  </p>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="px-6 py-7 flex flex-col gap-7">

                {/* Name + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Product Name" icon={<CoffeeIcon />}>
                    <input
                      type="text" name="name" value={product.name}
                      onChange={handleChange} placeholder="e.g. Cold Brew Reserve"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Category" icon={<TagIcon />}>
                    <select
                      name="category" value={product.category} onChange={handleChange}
                      className={`${inputCls} appearance-none cursor-pointer`}
                      style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(201,169,110,0.5)' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                      }}
                    >
                      <option value="">Select a category</option>
                      <option value="Hot Coffee">Hot Coffee</option>
                      <option value="Cold Coffee">Cold Coffee</option>
                      <option value="Croissant">Croissant</option>
                    </select>
                  </Field>
                </div>

                {/* Price */}
                <Field label="Base Price (₹)" icon={<RupeeIcon />}>
                  <div className="relative max-w-[200px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/60 pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="number" name="basePrice" value={product.basePrice}
                      onChange={handleChange} placeholder="0" min="0" step="0.5"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </Field>

                {/* Description */}
                <Field
                  label="Description" icon={<TextIcon />}
                  hint={`${product.description.length} / 500 characters`}
                >
                  <textarea
                    name="description" value={product.description}
                    onChange={handleChange} rows={3} maxLength={500}
                    placeholder="Describe the flavour, origin, preparation…"
                    className={inputCls}
                  />
                </Field>

                {/* Health Benefits */}
                <Field
                  label="Health Benefits" icon={<HeartIcon />}
                  hint="Separate with commas — e.g. Boosts energy, Rich in antioxidants"
                >
                  <textarea
                    name="healthBenefits" value={product.healthBenefits}
                    onChange={handleChange} rows={2}
                    placeholder="e.g. Boosts energy, Rich in antioxidants, Improves focus"
                    className={inputCls}
                  />
                </Field>

                {/* Image URL */}
                <Field
                  label="Image URL" icon={<ImageIcon />}
                  hint="Paste a direct image URL. High-quality product photos recommended."
                >
                  <input
                    type="text" name="image" value={product.image}
                    onChange={handleChange} placeholder="https://example.com/product.jpg"
                    className={inputCls}
                  />
                </Field>

                {/* Divider */}
                <div className="h-px bg-[#c9a96e]/08" />

                {/* Actions */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="submit" disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#c9a96e] hover:bg-[#d4b87a] disabled:opacity-50 text-[#0d0a05] text-[9px] tracking-[0.35em] uppercase font-['Jost',sans-serif] transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                        {id ? "Updating…" : "Saving…"}
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        {id ? "Update Product" : "Add to Menu"}
                      </>
                    )}
                  </button>

                  <Link
                    to="/admin/products-management"
                    className="flex items-center gap-2 py-3 px-4 border border-[#c9a96e]/15 text-[#c9a96e]/60 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase transition-all font-['Jost',sans-serif]"
                  >
                    <ArrowLeftIcon /> Back to Products
                  </Link>
                </div>

              </form>
            </div>

            {/* ── RIGHT: Preview + Tips ── */}
            <div className="lg:col-span-1 flex flex-col gap-5">

              {/* Live preview card */}
              <div className="bg-[#0d0a05] border border-[#c9a96e]/12 sticky top-8">

                {/* Panel header */}
                <div className="px-5 py-4 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e]/50 font-['Jost',sans-serif]">
                    Live Preview
                  </p>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] mt-0.5">
                    Card Preview
                  </h3>
                </div>

                {/* Thumbnail */}
                <div className="border-b border-[#c9a96e]/08">
                  <div className="relative aspect-square w-full bg-[#110d07] overflow-hidden">
                    {product.image && !imageError ? (
                      <img
                        src={product.image} alt="Preview"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover opacity-85"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 border border-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e]/30">
                          <ImageIcon />
                        </div>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/25 font-['Jost',sans-serif]">
                          {product.image ? "Failed to load" : "No image yet"}
                        </p>
                      </div>
                    )}

                    {/* Price badge overlay */}
                    {product.basePrice && (
                      <div className="absolute top-3 right-3 bg-[#0d0a05]/85 border border-[#c9a96e]/20 px-2.5 py-1">
                        <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/90">
                          ₹{Number(product.basePrice).toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-5 flex flex-col gap-3">

                  {/* Status dot + name — mirrors ProductList row */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-[7px] h-[7px] rounded-full bg-[#c9a96e]/65 mt-[6px] flex-shrink-0"
                      style={{ boxShadow: "0 0 5px rgba(201,169,110,0.3)" }}
                    />
                    <div className="min-w-0">
                      <p className="font-['Cormorant_Garamond',serif] text-[1.05rem] font-light text-[#f5f0e8] leading-tight">
                        {product.name || (
                          <span className="italic text-[#f5f0e8]/25">Product name</span>
                        )}
                      </p>
                      <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/40 mt-0.5">
                        {product.category || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Description preview */}
                  {product.description && (
                    <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/45 leading-relaxed line-clamp-3 border-t border-[#c9a96e]/06 pt-3">
                      {product.description}
                    </p>
                  )}

                  {/* Benefit tags */}
                  {benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-[#c9a96e]/06 pt-3">
                      {benefits.slice(0, 3).map((b, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 border border-[#c9a96e]/18 text-[#c9a96e]/65 text-[9px] tracking-[0.18em] uppercase font-['Jost',sans-serif]"
                        >
                          {b}
                        </span>
                      ))}
                      {benefits.length > 3 && (
                        <span className="text-[#f5f0e8]/25 text-[9px] font-['Jost',sans-serif] self-center">
                          +{benefits.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips panel */}
              <div className="bg-[#0d0a05] border border-[#c9a96e]/12">
                <div className="px-5 py-4 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e]/50 font-['Jost',sans-serif]">
                    Tips
                  </p>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] mt-0.5">
                    Better Listings
                  </h3>
                </div>
                <div className="px-5 py-5 flex flex-col gap-3">
                  {[
                    "Use high-quality, appetizing product images",
                    "Keep descriptions clear and enticing",
                    "Highlight unique selling points",
                    "Ensure accurate pricing and categories",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#c9a96e]/45 mt-[5px] flex-shrink-0" />
                      <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/40 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}