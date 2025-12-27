// src/pages/PaymentPage.jsx or src/components/PaymentPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product?.basePrice || 0;
    const addOns = (item.bean?.priceAdd || 0) + (item.milk?.priceAdd || 0);
    return sum + (price + addOns) * item.quantity;
  }, 0);

  const shipping = 9.9;
  const total = subtotal + shipping;

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "number") {
      formattedValue = value.replace(/\s?/g, "").replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "card") {
      if (!cardDetails.number.replace(/\s/g, "").length === 16)
        newErrors.number = "Card number must be 16 digits";
      if (!cardDetails.name.trim()) newErrors.name = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) newErrors.expiry = "Valid expiry required (MM/YY)";
      if (cardDetails.cvv.length < 3) newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validatePayment()) return;


    toast.success("Payment successful! Order placed.");
    navigate("/"); 
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/menu" className="text-[#9c7635] hover:underline text-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>

                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <span className="font-medium">UPI</span>
                </label>

                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="mt-8 space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635] focus:border-transparent"
                    />
                    {errors.number && <p className="text-rose-600 text-sm mt-1">{errors.number}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
                    />
                    {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
                      />
                      {errors.expiry && <p className="text-rose-600 text-sm mt-1">{errors.expiry}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength="3"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
                      />
                      {errors.cvv && <p className="text-rose-600 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mt-8 text-center py-8 text-gray-600">
                  <p className="text-lg">Scan QR or enter UPI ID on next screen</p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="mt-8 text-center py-8 text-gray-600">
                  <p className="text-lg">Pay with cash when your order arrives</p>
                </div>
              )}
            </div>

            {/* Secure Payment Badge */}
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Safe & Secure Payment</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold text-[#9c7635]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-8 bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-5 rounded-2xl font-bold text-xl transition transform hover:scale-105"
              >
                Complete Payment
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;