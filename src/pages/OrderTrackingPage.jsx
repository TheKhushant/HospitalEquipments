import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle, Clock, Truck, Package, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock order data
const mockOrders = {
  'ORD-001': {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    date: '2024-04-10',
    status: 'delivered',
    items: [
      { name: 'Advanced Patient Monitor Pro', quantity: 2, price: 12999 },
      { name: 'Vital Signs Monitor', quantity: 1, price: 1899 },
    ],
    total: 27897,
    timeline: [
      {
        status: 'order_placed',
        label: 'Order Placed',
        description: 'Your order has been confirmed',
        date: '2024-04-10',
        completed: true,
      },
      {
        status: 'processing',
        label: 'Processing',
        description: 'Order is being prepared for shipment',
        date: '2024-04-11',
        completed: true,
      },
      {
        status: 'shipped',
        label: 'Shipped',
        description: 'Package is on the way',
        date: '2024-04-13',
        completed: true,
      },
      {
        status: 'in_transit',
        label: 'In Transit',
        description: 'Package is out for delivery',
        date: '2024-04-15',
        completed: true,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        description: 'Package delivered successfully',
        date: '2024-04-16',
        completed: true,
      },
    ],
  },
  'ORD-002': {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    date: '2024-04-14',
    status: 'in_transit',
    items: [{ name: 'Digital X-Ray System', quantity: 1, price: 89999 }],
    total: 89999,
    timeline: [
      {
        status: 'order_placed',
        label: 'Order Placed',
        description: 'Your order has been confirmed',
        date: '2024-04-14',
        completed: true,
      },
      {
        status: 'processing',
        label: 'Processing',
        description: 'Order is being prepared for shipment',
        date: '2024-04-14',
        completed: true,
      },
      {
        status: 'shipped',
        label: 'Shipped',
        description: 'Package is on the way',
        date: '2024-04-15',
        completed: true,
      },
      {
        status: 'in_transit',
        label: 'In Transit',
        description: 'Package is out for delivery',
        date: '2024-04-16',
        completed: true,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        description: 'Estimated delivery soon',
        date: '2024-04-18',
        completed: false,
      },
    ],
  },
};

const OrderTrackingPage = () => {
  const [searchOrder, setSearchOrder] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = mockOrders[searchOrder];
    if (order) {
      setSelectedOrder(order);
      setSearchOrder('');
    } else {
      alert('Order not found. Try: ORD-001 or ORD-002');
    }
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    if (status === 'in_transit') {
      return <Truck className="w-6 h-6 text-blue-500 animate-pulse" />;
    }
    if (status === 'processing' || status === 'shipped') {
      return <Package className="w-6 h-6 text-blue-500" />;
    }
    return <Clock className="w-6 h-6 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your order number to see the current status and timeline
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value.toUpperCase())}
              placeholder="Enter order number (e.g., ORD-001)"
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Demo orders: ORD-001 (Delivered), ORD-002 (In Transit)
          </p>
        </div>

        {selectedOrder ? (
          <div className="space-y-8">
            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedOrder.orderNumber}
                  </h2>
                  <p className="text-gray-600">
                    Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{selectedOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                selectedOrder.status === 'delivered'
                  ? 'bg-green-500'
                  : selectedOrder.status === 'in_transit'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500'
              }`}>
                {selectedOrder.status === 'delivered'
                  ? 'Delivered'
                  : selectedOrder.status === 'in_transit'
                    ? 'In Transit'
                    : selectedOrder.status === 'shipped'
                      ? 'Shipped'
                      : selectedOrder.status === 'processing'
                        ? 'Processing'
                        : 'Order Placed'}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-8">
                Order Timeline
              </h3>

              <div className="space-y-8">
                {selectedOrder.timeline.map((step, index) => (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0">
                        {getStatusIcon(step.status, step.completed)}
                      </div>
                      {index < selectedOrder.timeline.length - 1 && (
                        <div
                          className={`w-1 h-12 mt-2 ${
                            step.completed ? 'bg-green-200' : 'bg-gray-200'
                          }`}
                        ></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h4 className="font-semibold text-gray-900">
                        {step.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(step.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    If you have any questions about your order, contact our support team or use WhatsApp for quick assistance.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">Chat on WhatsApp</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Back to Search
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Enter an order number to view status and timeline
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
