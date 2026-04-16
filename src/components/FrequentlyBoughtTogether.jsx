import { getFrequentlyBoughtTogether } from '../data/recommendations';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FrequentlyBoughtTogether = ({ productId }) => {
  const products = getFrequentlyBoughtTogether(productId);
  const { addToCart } = useCart();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Frequently Bought Together
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-32 object-contain mb-3 hover:scale-105 transition"
              />
            </Link>

            <Link to={`/product/${product.id}`}>
              <h4 className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition">
                {product.name}
              </h4>
            </Link>

            <p className="text-xs text-gray-500 my-2">{product.subCategory}</p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-blue-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-gray-400">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-xs text-yellow-500 font-semibold">
                ★ {product.rating}
              </span>
            </div>

            <Button
              onClick={() => addToCart(product)}
              size="sm"
              className="w-full"
            >
              <ShoppingCart size={14} className="mr-1" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
