import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useCartCount } from "../hooks/useCartCount";
import { useCart } from "../context/CartContext";


const API = "http://localhost:3000";

const CartPage = () => {

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
const { cartCount, fetchCart } = useCart();
const [shippingMode, setShippingMode] = useState("pickup");
  const navigation=useNavigate();

  useEffect(() => {
    Promise.all([
      fetch(`${API}/cart`).then((res) => res.json()),
      fetch(`${API}/products`).then((res) => res.json()),
    ]).then(([cartData, productData]) => {
      setCart(cartData);
      setProducts(productData);
    });
  }, []);

  const getProduct = (productId) =>
    products.find((p) => p.id === String(productId));

  const increaseQty = (item) => {
    fetch(`${API}/cart/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    }).then(() =>
      setCart((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      )
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    fetch(`${API}/cart/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    }).then(() =>
      setCart((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      )
    );
  };

  const removeItem = (id) => {
    fetch(`${API}/cart/${id}`, { method: "DELETE" }).then(() =>
      setCart((prev) => prev.filter((i) => i.id !== id))
    );
  };

  const subtotal = cart.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.basePrice * item.quantity : sum;
  }, 0);


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Cart</h1>
           <Link to="/">
          <button className="border px-4 py-2 rounded-lg text-sm">
            ← Continue shopping
          </button>
          </Link>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 border-b pb-3">
          <div className="col-span-6">PRODUCT</div>
          <div className="col-span-2 text-center">PRICE</div>
          <div className="col-span-2 text-center">QTY</div>
          <div className="col-span-2 text-right">TOTAL</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mt-6">
          {cart.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 grid grid-cols-12 items-center gap-4 shadow-sm"
              >
                {/* Product */}
                <div className="col-span-6 flex gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    {/* <p className="text-sm text-gray-400">
                      #{product.id}
                    </p> */}

                    {/* ❌ NO BEAN TYPE SHOWN */}
                    <p className="text-sm text-gray-600">
                      Category: {product.category}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center font-semibold">
                  €{product.basePrice.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex justify-center gap-3">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="w-8 h-8 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item)}
                    className="w-8 h-8 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right font-bold">
                  €
                  {(product.basePrice * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 text-xl"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-gray-100 rounded-2xl p-8 max-w-6xl ml-auto mt-10">
          <h2 className="text-xl font-semibold mb-6">
            Choose shipping mode:
          </h2>

          {/* <div className="space-y-4 mb-8">
            <label className="flex gap-4">
              <input type="radio" checked readOnly />
              <div>
                <p className="font-medium">
                  Store pickup
                </p>
                
              </div>
            </label>

            <label className="flex gap-4 text-gray-600">
              <input type="radio" readOnly />
              <div>
                <p className="font-medium">
                  Delivery at home (30 min) - €9.90
                </p>
              </div>
            </label>
          </div> */}


          <div className="space-y-4 mb-8">
  <label className="flex gap-4 cursor-pointer">
    <input
      type="radio"
      name="shipping"
      value="pickup"
      checked={shippingMode === "pickup"}
      onChange={() => setShippingMode("pickup")}
    />
    <div>
      <p className="font-medium">Store pickup</p>
    </div>
  </label>

  <label className="flex gap-4 cursor-pointer text-gray-600">
    <input
      type="radio"
      name="shipping"
      value="delivery"
      checked={shippingMode === "delivery"}
      onChange={() => setShippingMode("delivery")}
    />
    <div>
      <p className="font-medium">
        Delivery at home (30 min) - €9.90
      </p>
    </div>
  </label>
</div>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal TTC</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 border-t">
              <span>Total</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-orange-800 hover:bg-orange-900 text-white py-4 rounded-lg text-xl font-bold">
            Checkout €{subtotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
