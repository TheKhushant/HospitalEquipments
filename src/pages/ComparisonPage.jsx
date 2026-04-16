import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparisonPage = () => {
  const { comparisonItems, removeFromComparison, clearComparison } =
    useComparison();
  const { addToCart } = useCart();

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Product Comparison
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 mb-6">
              No products selected for comparison. Add products from the shop to
              compare them.
            </p>
            <Link to="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get all unique specification keys
  const allKeys = new Set();
  comparisonItems.forEach((product) => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach((key) =>
        allKeys.add(key)
      );
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Compare Products ({comparisonItems.length})
          </h1>
          <Button variant="outline" onClick={clearComparison}>
            Clear All
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <tbody>
              {/* Product Cards Header */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-900 bg-gray-50 w-48">
                  Product
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l min-w-56">
                    <div className="flex flex-col items-start">
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="text-gray-400 hover:text-red-500 mb-2"
                      >
                        <X size={20} />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-40 object-contain mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {product.subCategory}
                      </p>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price Row */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  Price
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  Rating
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-yellow-500">
                        ★
                      </span>
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* MOQ Row */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  Min. Order Qty
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <span className="text-gray-900 font-semibold">
                      {product.moq || 1} unit(s)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Certifications Row */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  Certifications
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <div className="flex flex-wrap gap-1">
                      {product.certifications?.map((cert) => (
                        <span
                          key={cert}
                          className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Specifications */}
              {Array.from(allKeys).map((key) => (
                <tr key={key} className="border-b">
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                    {key}
                  </td>
                  {comparisonItems.map((product) => (
                    <td key={product.id} className="p-4 border-l">
                      <span className="text-gray-900">
                        {product.specifications?.[key] || '-'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Features Row */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                  Key Features
                </td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <ul className="space-y-1">
                      {product.features?.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start">
                          <span className="mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {product.features?.length > 4 && (
                        <li className="text-xs text-gray-500">
                          +{product.features.length - 4} more
                        </li>
                      )}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Add to Cart Row */}
              <tr>
                <td className="p-4 bg-gray-50"></td>
                {comparisonItems.map((product) => (
                  <td key={product.id} className="p-4 border-l">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <Link to="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
