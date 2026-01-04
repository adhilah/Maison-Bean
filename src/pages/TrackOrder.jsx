// App.jsx
import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Search, Filter } from 'lucide-react';

function App() {
  const [search, setSearch] = useState('');
  
  // Sample order data
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', status: 'delivered', date: '2024-03-15', items: 2, amount: '$89.99' },
    { id: 'ORD-002', customer: 'Jane Smith', status: 'shipped', date: '2024-03-16', items: 1, amount: '$45.50' },
    { id: 'ORD-003', customer: 'Bob Wilson', status: 'processing', date: '2024-03-17', items: 3, amount: '$120.75' },
    { id: 'ORD-004', customer: 'Alice Brown', status: 'pending', date: '2024-03-17', items: 1, amount: '$29.99' },
    { id: 'ORD-005', customer: 'Charlie Lee', status: 'delivered', date: '2024-03-14', items: 4, amount: '$210.00' },
  ];

  // Status colors
  const statusColors = {
    delivered: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  // Filter orders based on search
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Package className="text-blue-600 mr-3" size={28} />
          <h1 className="text-2xl font-bold">Order Tracking</h1>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders by ID or customer name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Orders Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-gray-600">{order.customer}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              {/* Order Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Items:</span>
                  <span className="font-medium">{order.items} item{order.items > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-bold text-blue-600">{order.amount}</span>
                </div>
              </div>

              {/* Tracking Button */}
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                <Truck size={18} />
                Track Order
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-300" size={48} />
            <h3 className="text-lg font-medium mt-4">No orders found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}

        {/* Status Legend */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold mb-3">Order Status</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Delivered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Shipped</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Processing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;