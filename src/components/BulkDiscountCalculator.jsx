import { useState, useEffect } from 'react';
import { calculateBulkDiscount } from '../data/recommendations';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const BulkDiscountCalculator = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    if (product) {
      const pricing = calculateBulkDiscount(product.id, quantity);
      setPricing(pricing);
      if (onQuantityChange) {
        onQuantityChange(quantity, pricing);
      }
    }
  }, [quantity, product, onQuantityChange]);

  if (!product) return null;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= (product.moq || 1)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    const newQty = quantity - 1;
    if (newQty >= (product.moq || 1)) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Bulk Discount Calculator
      </h3>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order Quantity
        </label>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
          <button
            onClick={decrementQuantity}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            −
          </button>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={product.moq || 1}
            className="border-0 focus:ring-0 text-center font-semibold text-lg flex-1"
          />
          <button
            onClick={incrementQuantity}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Minimum order: {product.moq || 1} unit(s)
        </p>
      </div>

      {/* Pricing Info */}
      {pricing && (
        <div className="space-y-4">
          {/* Unit Price */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Unit Price:</span>
            <span className="font-semibold text-gray-900">
              ₹{pricing.price.toLocaleString()}
            </span>
          </div>

          {/* Discount Badge */}
          {pricing.discountPercentage > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-green-900 font-medium">
                  Discount Applied
                </span>
                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                  {pricing.discountPercentage}% OFF
                </span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                You save ₹{pricing.discount.toLocaleString()} per unit
              </p>
            </div>
          )}

          {/* Bulk Pricing Tiers */}
          {product.bulkPrices && product.bulkPrices.length > 0 && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Available Bulk Tiers:
              </p>
              <div className="space-y-1">
                {product.bulkPrices.map((tier, idx) => {
                  const savings = ((product.price - tier.price) / product.price * 100).toFixed(0);
                  return (
                    <div
                      key={idx}
                      className={`text-xs p-2 rounded flex justify-between items-center ${
                        quantity >= tier.quantity
                          ? 'bg-blue-100 border border-blue-300'
                          : 'bg-gray-100'
                      }`}
                    >
                      <span className="text-gray-700">
                        {tier.quantity}+ units
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            quantity >= tier.quantity
                              ? 'font-semibold text-blue-700'
                              : 'text-gray-600'
                          }
                        >
                          ₹{tier.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500">({savings}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
            <p className="text-gray-600 text-sm mb-1">Total Order Value</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-blue-600">
                ₹{pricing.total.toLocaleString()}
              </span>
              <div className="text-right">
                <p className="text-xs text-gray-500">for {quantity} unit(s)</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full" size="lg">
            Get Detailed Quote
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkDiscountCalculator;
