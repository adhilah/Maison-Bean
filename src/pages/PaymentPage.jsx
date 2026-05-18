import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const LockIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

/* ─────────── Styles ─────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .payment-root {
    min-height: 100vh;
    background: #0b0804;
    font-family: 'Jost', sans-serif;
    color: #f5f0e8;
    position: relative;
    overflow-x: hidden;
  }

  /* Ambient glow */
  .payment-root::before {
    content: '';
    position: fixed;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .payment-inner {
    position: relative;
    z-index: 1;
    max-width: 1140px;
    margin: 0 auto;
    padding: 88px 24px 80px;
  }

  /* ── Header ── */
  .payment-header {
    margin-bottom: 52px;
  }

  .payment-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .payment-step-badge {
    font-size: 9px;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: #c9a96e;
    border: 1px solid rgba(201,169,110,0.25);
    padding: 4px 10px;
    border-radius: 2px;
  }

  .payment-step-line {
    flex: 1;
    max-width: 48px;
    height: 1px;
    background: rgba(201,169,110,0.2);
  }

  .payment-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    color: #f5f0e8;
    line-height: 1;
  }

  .payment-title em {
    font-style: italic;
    color: #c9a96e;
  }

  /* ── Grid ── */
  .payment-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 36px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .payment-grid { grid-template-columns: 1fr; }
    .payment-summary { order: -1; }
  }

  /* ── Section Label ── */
  .section-label {
    font-size: 9px;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: rgba(201,169,110,0.55);
    margin-bottom: 20px;
  }

  /* ── Payment Methods ── */
  .methods-wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 36px;
  }

  .method-card {
    position: relative;
    background: transparent;
    border: 1px solid rgba(201,169,110,0.12);
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.25s, background 0.25s;
    overflow: hidden;
    border-radius: 2px;
  }

  .method-card:hover {
    border-color: rgba(201,169,110,0.3);
  }

  .method-card.active {
    border-color: rgba(201,169,110,0.7);
    background: rgba(201,169,110,0.03);
  }

  .method-card-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 22px 24px;
  }

  .method-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: rgba(201,169,110,0.6);
    transition: border-color 0.25s, color 0.25s;
  }

  .method-card.active .method-icon-wrap {
    border-color: rgba(201,169,110,0.45);
    color: #c9a96e;
  }

  .method-name {
    font-size: 1rem;
    font-weight: 400;
    color: #f5f0e8;
    margin-bottom: 3px;
    letter-spacing: 0.01em;
  }

  .method-desc {
    font-size: 0.75rem;
    color: rgba(245,240,232,0.35);
    letter-spacing: 0.02em;
  }

  .method-selector {
    margin-left: auto;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .method-card.active .method-selector {
    background: #c9a96e;
    border-color: #c9a96e;
    color: #0b0804;
  }

  /* Active indicator bar */
  .method-card.active::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #c9a96e, #a07840);
  }

  /* ── Trust Badges ── */
  .trust-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.72rem;
    color: rgba(245,240,232,0.35);
    letter-spacing: 0.03em;
  }

  .trust-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(201,169,110,0.4);
    flex-shrink: 0;
  }

  /* ── Order Summary ── */
  .payment-summary {
    background: #100c07;
    border: 1px solid rgba(201,169,110,0.1);
    border-radius: 2px;
    overflow: hidden;
    position: sticky;
    top: 24px;
  }

  .summary-header {
    padding: 22px 24px 18px;
    border-bottom: 1px solid rgba(201,169,110,0.08);
  }

  .summary-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 400;
    color: #f5f0e8;
    letter-spacing: 0.01em;
  }

  .summary-items {
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-height: 280px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(201,169,110,0.15) transparent;
  }

  .summary-item {
    display: flex;
    align-items: flex-start;
    gap: 13px;
  }

  .summary-item-img-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .summary-item-img {
    width: 52px;
    height: 52px;
    object-fit: cover;
    border-radius: 2px;
    display: block;
  }

  .summary-item-qty-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 18px;
    height: 18px;
    background: #c9a96e;
    color: #0b0804;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .summary-item-info {
    flex: 1;
    min-width: 0;
  }

  .summary-item-name {
    font-size: 0.82rem;
    color: #f5f0e8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .summary-item-meta {
    font-size: 0.7rem;
    color: rgba(201,169,110,0.55);
    line-height: 1.6;
  }

  .summary-item-price {
    font-size: 0.88rem;
    color: #c9a96e;
    font-weight: 500;
    flex-shrink: 0;
  }

  /* ── Totals ── */
  .summary-totals {
    padding: 18px 24px;
    border-top: 1px solid rgba(201,169,110,0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: rgba(245,240,232,0.45);
  }

  .totals-row.grand {
    font-size: 1.1rem;
    color: #f5f0e8;
    padding-top: 12px;
    border-top: 1px solid rgba(201,169,110,0.1);
    margin-top: 4px;
  }

  .totals-row.grand .grand-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: #c9a96e;
    font-weight: 400;
  }

  /* ── CTA Button ── */
  .cta-wrap {
    padding: 0 24px 24px;
  }

  .cta-btn {
    width: 100%;
    padding: 16px 24px;
    background: #c9a96e;
    color: #0b0804;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background 0.2s, transform 0.15s;
    position: relative;
    overflow: hidden;
  }

  .cta-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s;
  }

  .cta-btn:hover:not(:disabled) {
    background: #d6bb80;
  }

  .cta-btn:active:not(:disabled) {
    transform: scale(0.99);
  }

  .cta-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* ── Empty State ── */
  .empty-state {
    min-height: 100vh;
    background: #0b0804;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: 'Jost', sans-serif;
  }

  .empty-state-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-style: italic;
    color: rgba(245,240,232,0.2);
    font-weight: 300;
  }

  /* Separator */
  .ornament {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }
  .ornament-line {
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(201,169,110,0.25));
  }
  .ornament-line.rev {
    background: linear-gradient(to left, transparent, rgba(201,169,110,0.25));
  }
  .ornament-diamond {
    width: 5px;
    height: 5px;
    background: rgba(201,169,110,0.45);
    transform: rotate(45deg);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s ease both; }
  .fade-up-1 { animation-delay: 0.05s; }
  .fade-up-2 { animation-delay: 0.15s; }
  .fade-up-3 { animation-delay: 0.25s; }
`;

/* ─────────── SVG Icons ─────────── */

const CodSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    <line x1="6" y1="15" x2="10" y2="15"/>
  </svg>
);

const OnlineSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 010 20M2 12h20"/>
  </svg>
);

const CheckSvg = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ─────────── Component ─────────── */

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();

  const buyNow = location.state?.buyNow;
  const buyNowProduct = location.state?.product;
  const addressId = location.state?.addressId;

  const finalCart =
    buyNow && buyNowProduct
      ? [{ ...buyNowProduct, quantity: buyNowProduct.quantity || 1 }]
      : cart;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => finalCart.reduce((sum, item) => sum + Number(item.totalPrice || item.price || 0), 0),
    [finalCart]
  );
  const shipping = 2;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    try {
      setLoading(true);
      const selectedAddressId = addressId ?? localStorage.getItem("selectedAddressId");
      if (!selectedAddressId) { toast.error("Please select delivery address"); return; }

      let orderResponse;
      if (buyNow) {
        orderResponse = await api.post("/order/single", {
          productId: buyNowProduct.productId || buyNowProduct.id,
          quantity: buyNowProduct.quantity || 1,
          isCustomized: buyNowProduct.isCustomized || false,
          beanId: buyNowProduct.beanId || null,
          milkId: buyNowProduct.milkId || null,
          addressId: Number(selectedAddressId),
          paymentMethod: paymentMethod === "cod" ? "cod" : "razorpay",
          upiId: null,
        });
      } else {
        orderResponse = await api.post("/order", {
          addressId: Number(selectedAddressId),
          paymentMethod: paymentMethod === "cod" ? "cod" : "razorpay",
          upiId: null,
          items: finalCart.map((item) => ({
            productId: item.productId || item.id,
            quantity: item.quantity || 1,
            beanId: item.beanId || null,
            milkId: item.milkId || null,
          })),
        });
      }

      const createdOrder = orderResponse.data;
      const orderId = createdOrder.id || createdOrder.orderId || createdOrder.data?.id;
      if (!orderId) { toast.error("Order ID not found"); return; }

      if (paymentMethod === "cod") {
        if (!buyNow) await clearCart();
        toast.success("Order placed successfully");
        window.location.replace("/orders");
        return;
      }

      const paymentResponse = await api.post(`/payment/create/${orderId}`);
      const paymentOrder = paymentResponse.data;
      const razorpayOrderId = paymentOrder.razorpayOrderId || paymentOrder.id;
      if (!razorpayOrderId) { toast.error("Razorpay Order ID missing"); return; }
      if (!window.Razorpay) { toast.error("Razorpay SDK failed to load"); return; }

      const options = {
        key: "rzp_test_SoWqac341UeFbs",
        amount: total * 100,
        currency: "INR",
        name: "Maison Bean",
        description: "Coffee Order Payment",
        order_id: razorpayOrderId,
        handler: async function () {
          try {
            if (!buyNow) await clearCart();
            window.location.replace("/orders");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        modal: { ondismiss: () => toast.error("Payment cancelled") },
        theme: { color: "#c9a96e" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (finalCart.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="empty-state">
          <p className="empty-state-title">Your cart is empty</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="payment-root">
        <Navbar />
        <div className="payment-inner">

          {/* Header */}
          <div className="payment-header fade-up">
            <div className="payment-eyebrow">
              <span className="payment-step-badge">Step 2 of 2</span>
              <div className="payment-step-line" />
            </div>
            <h1 className="payment-title">
              Payment <em>Details</em>
            </h1>
          </div>

          <div className="payment-grid">

            {/* ── LEFT ── */}
            <div>
              <p className="section-label fade-up fade-up-1">Select payment method</p>

              <div className="methods-wrapper fade-up fade-up-2">

                {/* COD */}
                <button
                  className={`method-card ${paymentMethod === "cod" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="method-card-inner">
                    <div className="method-icon-wrap"><CodSvg /></div>
                    <div>
                      <div className="method-name">Cash on Delivery</div>
                      <div className="method-desc">Pay when your order arrives at the door</div>
                    </div>
                    <div className="method-selector">
                      {paymentMethod === "cod" && <CheckSvg />}
                    </div>
                  </div>
                </button>

                {/* Online */}
                <button
                  className={`method-card ${paymentMethod === "online" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("online")}
                >
                  <div className="method-card-inner">
                    <div className="method-icon-wrap"><OnlineSvg /></div>
                    <div>
                      <div className="method-name">Online Payment</div>
                      <div className="method-desc">Razorpay · UPI · Cards · Net Banking</div>
                    </div>
                    <div className="method-selector">
                      {paymentMethod === "online" && <CheckSvg />}
                    </div>
                  </div>
                </button>

              </div>

              {/* Trust row */}
              <div className="trust-row fade-up fade-up-3">
                {["256-bit SSL encryption", "Secure checkout", "No card data stored"].map((t) => (
                  <div className="trust-item" key={t}>
                    <div className="trust-dot" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT (Summary) ── */}
            <div className="payment-summary fade-up fade-up-2">

              <div className="summary-header">
                <div className="summary-title">Order Summary</div>
              </div>

              <div className="summary-items">
                {finalCart.map((item, index) => {
                  const price = Number(item.totalPrice || item.price || 0);
                  return (
                    <div className="summary-item" key={index}>
                      <div className="summary-item-img-wrap">
                        <img
                          className="summary-item-img"
                          src={item?.image || item?.product?.image}
                          alt={item?.name || item?.product?.name}
                        />
                        <div className="summary-item-qty-badge">{item.quantity}</div>
                      </div>
                      <div className="summary-item-info">
                        <div className="summary-item-name">{item?.name || item?.product?.name}</div>
                        <div className="summary-item-meta">
                          {item.bean?.name && <>Bean: {item.bean.name}<br /></>}
                          {item.milk?.name && <>Milk: {item.milk.name}</>}
                        </div>
                      </div>
                      <div className="summary-item-price">${price.toFixed(0)}</div>
                    </div>
                  );
                })}
              </div>

              <div className="summary-totals">
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>
                <div className="totals-row">
                  <span>Delivery</span>
                  <span>${shipping.toFixed(0)}</span>
                </div>
                <div className="totals-row grand">
                  <span>Total</span>
                  <span className="grand-amount">${total.toFixed(0)}</span>
                </div>
              </div>

              <div className="cta-wrap">
                <button className="cta-btn" onClick={handlePayment} disabled={loading}>
                  {loading ? (
                    <><SpinnerIcon /> Processing…</>
                  ) : (
                    <>
                      <LockIcon size={13} />
                      {paymentMethod === "cod" ? "Place Order" : "Pay Securely"}
                      <ArrowRight />
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;