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
    <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
      <h3 className="text-lg font-bold text-foreground mb-6">
        Bulk Discount Calculator
      </h3>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Order Quantity
        </label>
        <div className="flex items-center gap-0 bg-card rounded-lg border border-border/50 overflow-hidden">
          <button
            onClick={decrementQuantity}
            className="px-4 py-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            −
          </button>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={product.moq || 1}
            className="border-0 focus:ring-0 text-center font-bold text-lg flex-1 bg-transparent"
          />
          <button
            onClick={incrementQuantity}
            className="px-4 py-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Minimum order: {product.moq || 1} unit{product.moq > 1 ? 's' : ''}
        </p>
      </div>

      {/* Pricing Info */}
      {pricing && (
        <div className="space-y-4">
          {/* Unit Price */}
          <div className="flex justify-between items-center py-2 border-b border-primary/10">
            <span className="text-sm text-muted-foreground">Unit Price:</span>
            <span className="font-semibold text-foreground">
              ₹{pricing.price.toLocaleString()}
            </span>
          </div>

          {/* Discount Badge */}
          {pricing.discountPercentage > 0 && (
            <div className="bg-success/10 border border-success/30 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-success">
                  Bulk Discount Applied
                </span>
                <span className="bg-success/20 text-success font-bold px-3 py-1 rounded-full text-sm">
                  {pricing.discountPercentage}% OFF
                </span>
              </div>
              <p className="text-xs text-success/80 mt-2">
                You save ₹{pricing.discount.toLocaleString()} per unit
              </p>
            </div>
          )}

          {/* Bulk Pricing Tiers */}
          {product.bulkPrices && product.bulkPrices.length > 0 && (
            <div className="bg-card rounded-lg p-3 border border-border/50">
              <p className="text-xs font-semibold text-foreground mb-3">
                Available Bulk Tiers:
              </p>
              <div className="space-y-2">
                {product.bulkPrices.map((tier, idx) => {
                  const savings = ((product.price - tier.price) / product.price * 100).toFixed(0);
                  return (
                    <div
                      key={idx}
                      className={`text-xs p-3 rounded-md flex justify-between items-center transition-colors ${
                        quantity >= tier.quantity
                          ? 'bg-primary/10 border border-primary/30'
                          : 'bg-secondary/30 border border-border/30'
                      }`}
                    >
                      <span className="text-foreground font-medium">
                        {tier.quantity}+ units
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            quantity >= tier.quantity
                              ? 'font-semibold text-primary'
                              : 'text-muted-foreground'
                          }
                        >
                          ₹{tier.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-xs">({savings}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="bg-primary rounded-lg p-4 border border-primary/20">
            <p className="text-primary-foreground/80 text-sm mb-2">Total Order Value</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary-foreground">
                ₹{pricing.total.toLocaleString()}
              </span>
              <div className="text-right">
                <p className="text-xs text-primary-foreground/70">for {quantity} unit{quantity > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full" size="lg" variant="default">
            Request Quote Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkDiscountCalculator;
