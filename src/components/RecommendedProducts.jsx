import { useEffect, useState } from 'react';
import { getRecommendedForYou } from '../data/recommendations';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendedProducts = ({ viewedProductIds = [], title = 'Recommended For You' }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const recommended = getRecommendedForYou(viewedProductIds, 4);
    setProducts(recommended);
  }, [viewedProductIds]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp size={24} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 object-contain hover:scale-110 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Sale
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-xs text-gray-500 mt-1">{product.subCategory}</p>

                <div className="flex items-center justify-between my-3">
                  <div>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {product.rating}
                    </span>
                  </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
