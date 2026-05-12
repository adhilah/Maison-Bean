import { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.69a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const CityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <rect x="9" y="2" width="6" height="20" />
    <rect x="3" y="7" width="6" height="15" />
    <rect x="15" y="10" width="6" height="12" />
  </svg>
);

/* ─────────── Field Components ─────────── */
const Field = ({ label, name, type = "text", placeholder, value, onChange, error, maxLength }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full bg-[#0d0a05] px-4 py-3
        border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
        hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
        text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
        transition-all duration-200 font-['Jost',sans-serif]`}
    />
    {error && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em]">{error}</p>}
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange, error }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full bg-[#0d0a05] px-4 py-3
        border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
        hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
        text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
        transition-all duration-200 font-['Jost',sans-serif]
        resize-none`}
    />
    {error && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em]">{error}</p>}
  </div>
);

/* ─────────── Main ─────────── */
const DeliveryDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

const buyNowProduct =
  location.state?.product;

const isBuyNow =
  location.state?.buyNow;

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity]                       = useState("");
  const [phone, setPhone]                     = useState("");
  const [errors, setErrors]                   = useState({});
  const [savedAddresses, setSavedAddresses]   = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const items = isBuyNow
  ? [buyNowProduct]
  : cart;

  const subtotal = items.reduce(
  (sum, item) =>
    sum +
    Number(
      item.totalPrice ||
      item.price ||
      0
    ),
  0
);

  const shipping = 49;
  const total    = subtotal + shipping;

  const validateForm = () => {
    const err = {};
    if (!deliveryAddress.trim())          err.deliveryAddress = "Delivery address is required";
    if (!city.trim())                     err.city = "City is required";
    if (!phone || phone.length !== 10)    err.phone = "Valid 10-digit phone number required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleProceed = async () => {

  try {

    setLoading(true);

    let addressId =
      selectedAddressId;

    // =========================
    // NEW ADDRESS
    // =========================

    if (!selectedAddressId) {

      if (!validateForm()) {

        toast.error(
          "Please fill all required fields"
        );

        setLoading(false);

        return;
      }

      const res =
        await api.post(
          "/address",
          {
            deliveryAddress,
            city,
            phone,
          }
        );

      addressId =
        res.data.addressId;

      toast.success(
        "Address saved successfully"
      );
    }

    // =========================
    // STORE ADDRESS
    // =========================

    localStorage.setItem(
      "selectedAddressId",
      addressId
    );

    // =========================
    // BUY NOW FLOW
    // =========================

    if (isBuyNow) {

      navigate("/payment", {
        state: {
          buyNow: true,

          product:
            buyNowProduct,

          addressId
        }
      });

      return;
    }

    // =========================
    // CART FLOW
    // =========================

    navigate("/payment", {
      state: {
        addressId
      }
    });

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Failed to save address"
    );

  } finally {

    setLoading(false);
  }
};

 useEffect(() => {

  const fetchAddresses =
    async () => {

      try {

        const res =
          await api.get("/address");

        console.log(
          "ADDRESSES:",
          res.data
        );

        setSavedAddresses(
          res.data || []
        );

      } catch (err) {

        console.error(
          "ADDRESS ERROR:",
          err
        );
      }
    };

  fetchAddresses();

}, []);

  /* ── Empty cart ── */
  if (!items.length) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex flex-col items-center justify-center gap-6 font-['Jost',sans-serif]">
        <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/30">Your cart is empty</p>
        <Link to="/menu" className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase transition-colors">
          Explore Menu →
        </Link>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px) scaleY(0.95)} to{opacity:1;transform:translateY(0) scaleY(1)} }

        .page-in  { animation: fadeUp  0.45s ease forwards; }
        .panel-in { animation: fadeUp  0.45s ease 0.08s both; }
        .extra-in { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: top; }

        textarea:-webkit-autofill,
        input:-webkit-autofill, input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
          border-color: rgba(201,169,110,0.4) !important;
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover:not(:disabled)  { background: #d4b87a; }
        .gold-btn:active:not(:disabled) { transform: scale(0.98); }

        .slim-scroll::-webkit-scrollbar { width: 3px; }
        .slim-scroll::-webkit-scrollbar-track { background: transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "12px", padding: "12px 18px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.022] blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ HEADER ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-14 pb-6 page-in">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
                  STEP 1 OF 2
                </p>
                <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                  Delivery <span className="italic text-[#c9a96e]">Details</span>
                </h1>
              </div>
              <Link to="/cart"
                className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto">
                ← BACK TO CART
                <span className="group-hover:w-10 transition-all duration-300 w-0 h-px bg-current inline-block" />
              </Link>
            </div>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>

            {/* Progress Steps */}
            <div className="mt-6 flex items-center gap-0">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 border border-[#c9a96e] flex items-center justify-center">
                  <span className="text-[#c9a96e] text-[9px] tracking-widest">01</span>
                </div>
                <span className="text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase">Delivery</span>
              </div>
              <div className="mx-4 h-px w-12 bg-[#c9a96e]/25" />
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 border border-[#f5f0e8]/12 flex items-center justify-center">
                  <span className="text-[#f5f0e8]/25 text-[9px] tracking-widest">02</span>
                </div>
                <span className="text-[#f5f0e8]/25 text-[9px] tracking-[0.35em] uppercase">Payment</span>
              </div>
            </div>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-px bg-[#c9a96e]/10">

              {/* ── LEFT: Delivery Form ── */}
              <div className="bg-[#0d0a05] panel-in">

                {/* SAVED ADDRESSES */}
                {savedAddresses.length > 0 && (
                  <div className="bg-[#110d07] border border-[#c9a96e]/10 p-7 mb-px">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0">
                        <LocationIcon />
                      </span>
                      <div>
                        <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">
                          SAVED LOCATIONS
                        </p>
                        <h2 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
                          Choose Previous <span className="italic text-[#c9a96e]">Address</span>
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {savedAddresses.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedAddressId(item.id);
                            setDeliveryAddress(item.deliveryAddress);
                            setCity(item.city);
                            setPhone(item.phone);
                            setErrors({});
                          }}
                          className={`w-full text-left p-4 border transition-all
                            ${selectedAddressId === item.id
                              ? "border-[#c9a96e] bg-[#c9a96e]/05"
                              : "border-[#c9a96e]/10 hover:border-[#c9a96e]/30"
                            }`}
                        >
                          <p className="text-[#f5f0e8] text-sm leading-relaxed">
                            {item.deliveryAddress}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-[#c9a96e]/60 text-[10px] tracking-[0.2em] uppercase">
                              {item.city}
                            </p>
                            <p className="text-[#f5f0e8]/35 text-[10px]">
                              {item.phone}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Address Section ── */}
                <div className="bg-[#110d07] border border-[#c9a96e]/10 p-7">
                  <div className="flex items-start gap-4 mb-7">
                    <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0"><LocationIcon /></span>
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">STEP 1</p>
                      <h2 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
                        Delivery <span className="italic text-[#c9a96e]">Address</span>
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <TextAreaField
                      label="Full Delivery Address *"
                      placeholder="House / Flat No., Street, Area, Landmark, Pincode"
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: "" });
                      }}
                      error={errors.deliveryAddress}
                    />

                    <Field
                      label="City *"
                      name="city"
                      type="text"
                      placeholder="e.g. Kochi"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: "" });
                      }}
                      error={errors.city}
                    />
                  </div>

                  <div className="mt-5 flex items-center gap-2 p-3 border border-[#c9a96e]/10 bg-[#c9a96e]/03">
                    <span className="text-[#c9a96e]/35 flex-shrink-0"><TruckIcon /></span>
                    <p className="text-[#f5f0e8]/28 text-[10px] tracking-wide leading-relaxed">
                      Please include a nearby landmark to help our delivery partner find you easily.
                    </p>
                  </div>
                </div>

                {/* ── Contact Section ── */}
                <div className="extra-in bg-[#110d07] border border-[#c9a96e]/10 border-t-0 p-7 space-y-5">
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0"><PhoneIcon /></span>
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">STEP 2</p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8]">
                        Contact <span className="italic text-[#c9a96e]">Number</span>
                      </h3>
                    </div>
                  </div>

                  <Field
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    error={errors.phone}
                    maxLength={10}
                  />

                  <p className="text-[#f5f0e8]/22 text-[10px] tracking-wide">
                    Our delivery partner may call you for directions — please ensure your number is reachable.
                  </p>
                </div>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2.5 py-5 text-[#f5f0e8]/20 border-t border-[#c9a96e]/08">
                  <LockIcon size={11} />
                  <span className="text-[9px] tracking-[0.3em] uppercase">Your information is encrypted and secure</span>
                </div>
              </div>

              {/* ── RIGHT: Order Summary ── */}
              <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
                <div className="sticky top-6 p-7">
                  <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2 opacity-65">OVERVIEW</p>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.7rem] font-light text-[#f5f0e8] mb-7">
                    Order <span className="italic text-[#c9a96e]">Summary</span>
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1 slim-scroll">
                    {items.map((item, i) => {
                      const price = Number(
  item.totalPrice ||
  item.price ||
  0
);
                      return (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="relative w-12 h-10 flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
                            <img
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Cormorant_Garamond',serif] text-[0.95rem] font-light text-[#f5f0e8]/70 group-hover:text-[#c9a96e] transition-colors truncate">
                              {item?.name}
                            </p>
                            <p className="text-[#f5f0e8]/25 text-[10px]">× {item.quantity}</p>
                          </div>
                          <span className="font-['Cormorant_Garamond',serif] text-[0.95rem] text-[#c9a96e] flex-shrink-0">
                            ${price.toFixed(0)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-px bg-gradient-to-r from-[#c9a96e]/25 to-transparent mb-5" />

                  {/* Totals */}
                  <div className="space-y-3 mb-7">
                    <div className="flex justify-between">
                      <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Subtotal</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">${subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Delivery</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">${shipping}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#f5f0e8]/70 text-[10px] tracking-[0.2em] uppercase">Total</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[2rem] font-light text-[#c9a96e]">${total.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleProceed}
                    disabled={loading}
                    className="gold-btn w-full flex items-center justify-between
                      px-6 py-4 bg-[#c9a96e] text-[#0d0a05]
                      text-[0.62rem] tracking-[0.38em] uppercase
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Jost',sans-serif" }}
                  >
                    <span className="flex items-center gap-2.5">
                      {loading
                        ? <div className="w-3.5 h-3.5 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                        : <TruckIcon />}
                      {loading ? "Saving..." : "Proceed to Payment"}
                    </span>
                    {!loading && <ArrowRight />}
                  </button>

                  <p className="text-center text-[#f5f0e8]/18 text-[9px] tracking-[0.2em] mt-4">
                    Free cancellation before your order is dispatched
                  </p>

                  {/* Trust badges */}
                  <div className="mt-6 pt-5 border-t border-[#c9a96e]/08 flex justify-center gap-3">
                    {["Fast Delivery", "Easy Returns", "Secure Pay"].map((b) => (
                      <span key={b} className="text-[#c9a96e]/25 text-[8px] tracking-widest uppercase border border-[#c9a96e]/08 px-2 py-1">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;