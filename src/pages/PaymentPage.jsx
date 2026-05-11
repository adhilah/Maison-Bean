import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";

const PaymentPage = () => {

  const { cart, clearCart } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [loading, setLoading] =
    useState(false);

  // ───────── PRICE CALCULATION ─────────

  const subtotal = useMemo(() => {

    return cart.reduce((sum, item) => {

      return (
        sum + Number(item.totalPrice || 0)
      );

    }, 0);

  }, [cart]);

  const shipping = 49;

  const total = subtotal + shipping;

  // ───────── BUILD ORDER ITEMS ─────────

  const buildItems = () => {

    return cart.map((item) => ({

      productId:
        item.product?.id,

      productName:
        item.product?.name,

      productImage:
        item.product?.image,

      productCategory:
        item.product?.category || null,

      basePrice:
        item.product?.basePrice || 0,

      quantity:
        item.quantity,

      beanId:
        item.bean?.id || null,

      beanName:
        item.bean?.name || null,

      beanPriceAdd:
        item.bean?.priceAdd || 0,

      milkId:
        item.milk?.id || null,

      milkName:
        item.milk?.name || null,

      milkPriceAdd:
        item.milk?.priceAdd || 0,

    }));
  };

  // ───────── HANDLE PAYMENT ─────────

  const handlePayment = async () => {

    const user = JSON.parse(
      localStorage.getItem("authUser") || "null"
    );

    if (!user) {

      toast.error("Please login");

      return;
    }

    try {

      setLoading(true);

      // ───────── CREATE ORDER ─────────

      const orderRequest = {

        userId: user.id,

        userEmail: user.email,

        paymentMethod:
          paymentMethod === "cod"
            ? "cod"
            : "razorpay",

        subtotal,

        shipping,

        total,

        items: buildItems()
      };

      console.log(
        "ORDER REQUEST:",
        orderRequest
      );

      // IMPORTANT
      // Make sure token is sent
      // in api.js interceptor

      const orderResponse =
        await api.post(
          "/Order",
          orderRequest
        );

      console.log(
        "ORDER RESPONSE:",
        orderResponse.data
      );

      const createdOrder =
        orderResponse.data;

      const orderId =
        createdOrder.id ||
        createdOrder.orderId ||
        createdOrder.data?.id;

      if (!orderId) {

        toast.error(
          "Order ID not found"
        );

        return;
      }

      // ───────── COD ─────────

      if (paymentMethod === "cod") {

        await clearCart();

        toast.success(
          "Order placed successfully"
        );

        navigate("/orders");

        return;
      }

      // ───────── CREATE RAZORPAY ORDER ─────────

      const paymentResponse =
        await api.post(
          `/payment/create/${orderId}`
        );

      console.log(
        "PAYMENT RESPONSE:",
        paymentResponse.data
      );

      const paymentOrder =
        paymentResponse.data;

      const razorpayOrderId =
        paymentOrder.orderId ||
        paymentOrder.razorpayOrderId ||
        paymentOrder.id;

      if (!razorpayOrderId) {

        toast.error(
          "Razorpay Order ID missing"
        );

        return;
      }

      // ───────── CHECK SDK ─────────

      if (!window.Razorpay) {

        toast.error(
          "Razorpay SDK failed to load"
        );

        return;
      }

      // ───────── OPEN RAZORPAY ─────────

      const options = {

        key: "rzp_test_xxxxxxxxx",

        amount: total * 100,

        currency: "INR",

        name: "Maison Bean",

        description:
          "Coffee Order Payment",

        order_id:
          razorpayOrderId,

        handler: async function (response) {

          try {

            console.log(
              "RAZORPAY RESPONSE:",
              response
            );

            await api.post(
              "/payment/verify",
              {
                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature
              }
            );

            await clearCart();

            toast.success(
              "Payment successful"
            );

            navigate("/orders");

          } catch (error) {

            console.log(error);

            toast.error(
              "Payment verification failed"
            );
          }
        },

        modal: {

          ondismiss: function () {

            toast.error(
              "Payment cancelled"
            );
          }
        },

        prefill: {

          name:
            "Maison Bean Customer",

          email:
            user.email,

          contact:
            "9999999999"
        },

        theme: {
          color: "#c9a96e"
        }
      };

      console.log(
        "RAZORPAY OPTIONS:",
        options
      );

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // ───────── EMPTY CART ─────────

  if (cart.length === 0) {

    return (

      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center text-white">

        Cart is empty

      </div>
    );
  }

  // ───────── UI ─────────

  return (

    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-[#0d0a05] text-white">

        <Navbar />

        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl mb-10">
            Payment Details
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT */}

            <div className="space-y-4">

              {/* COD */}

              <label className="border border-zinc-700 p-5 block cursor-pointer rounded">

                <input
                  type="radio"
                  checked={
                    paymentMethod === "cod"
                  }
                  onChange={() =>
                    setPaymentMethod("cod")
                  }
                />

                <div className="mt-2">

                  <p className="text-lg">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-zinc-400">
                    Pay when delivered
                  </p>

                </div>

              </label>

              {/* ONLINE */}

              <label className="border border-zinc-700 p-5 block cursor-pointer rounded">

                <input
                  type="radio"
                  checked={
                    paymentMethod === "online"
                  }
                  onChange={() =>
                    setPaymentMethod("online")
                  }
                />

                <div className="mt-2">

                  <p className="text-lg">
                    Online Payment
                  </p>

                  <p className="text-sm text-zinc-400">
                    UPI, Cards, Wallets
                  </p>

                </div>

              </label>

            </div>

            {/* RIGHT */}

            <div className="border border-zinc-800 p-6 rounded">

              <h2 className="text-2xl mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-zinc-800 pb-4"
                  >

                    <img
                      src={
                        item.product?.image
                      }
                      alt={
                        item.product?.name
                      }
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">

                      <p className="font-medium">
                        {item.product?.name}
                      </p>

                      <p className="text-sm text-zinc-400">
                        Qty: {item.quantity}
                      </p>

                      {item.bean?.name && (

                        <p className="text-xs text-zinc-500">
                          Bean:
                          {" "}
                          {item.bean.name}
                        </p>

                      )}

                      {item.milk?.name && (

                        <p className="text-xs text-zinc-500">
                          Milk:
                          {" "}
                          {item.milk.name}
                        </p>

                      )}

                    </div>

                    <p className="font-semibold">
                      ₹{item.totalPrice}
                    </p>

                  </div>
                ))}

              </div>

              {/* TOTALS */}

              <div className="border-t border-zinc-800 mt-6 pt-6 space-y-3">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>
                    ₹{subtotal}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span>
                    ₹{shipping}
                  </span>

                </div>

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    ₹{total}
                  </span>

                </div>

              </div>

              {/* BUTTON */}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 transition text-black py-4 font-semibold rounded"
              >

                {loading
                  ? "Processing..."
                  : paymentMethod === "cod"
                  ? "Place Order"
                  : "Pay Securely"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </>
  );
};

export default PaymentPage;