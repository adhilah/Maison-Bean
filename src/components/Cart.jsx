import React from "react";

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Cart</h1>
          <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
            ← Continue shopping
          </button>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-10">
          {/* Item 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Xiaomi 365"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Xiaomi 365</h3>
              <p className="text-sm text-gray-500">#21433254354532</p>
              <p className="text-sm text-gray-600">
                Color: White // Extra: Sport Tire + Battery High 100
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="line-through">€ 50.99€ Sport Tire</span>
                <br />
                <span>+ 35€ Battery High</span>
              </div>
            </div>
            <div className="text-right md:text-left">
              <p className="text-lg font-semibold">484.99€</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
              <span className="w-8 text-center">1</span>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">484.99€</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 text-2xl">×</button>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-6">
            <img
              src="https://via.placeholder.com/120"
              alt="Ninebot ES2"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Ninebot ES2</h3>
              <p className="text-sm text-gray-500">#21432332246353</p>
              <p className="text-sm text-gray-600">
                Color: Black // Extra: Full Tire
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="line-through">€ 80.99€ Full Tire</span>
              </div>
            </div>
            <div className="text-right md:text-left">
              <p className="text-lg font-semibold">489.99€</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
              <span className="w-8 text-center">3</span>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">1469.97€</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 text-2xl">×</button>
          </div>
        </div>

        {/* Summary & Shipping Box */}
        <div className="bg-gray-100 rounded-2xl p-8 max-w-2xl ml-auto">
          <h2 className="text-xl font-semibold mb-6">Choose shipping mode:</h2>

          {/* Shipping Options */}
          <div className="space-y-4 mb-8">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked
                readOnly
                className="w-6 h-6 text-red-600"
              />
              <div>
                <p className="font-medium">Store pickup (in 20 min) - FREE</p>
                <p className="text-sm text-gray-600">
                  At 45 Glenridge Ave. Brooklyn, NY 11220
                </p>
              </div>
            </label>

            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                readOnly
                className="w-6 h-6 text-red-600"
              />
              <div>
                <p className="font-medium">Delivery at home (Under 2 - 4 day) - 9.90€</p>
                <p className="text-sm text-gray-600">
                  At 45 Glenridge Ave. Brooklyn, NY 11220
                </p>
              </div>
            </label>
          </div>

          {/* Totals */}
          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal TTC</span>
              <span>1954.97€</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-300">
              <span>Total</span>
              <span>1954.97€</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg text-xl">
            Checkout 1954.97 €
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;