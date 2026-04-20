import { useState, useEffect } from 'react';
import { TrendingUp, Save, Calculator } from 'lucide-react';

const BulkDiscountSection = ({
  basePrice = 1000,           // Configurable base price per unit
  title = "Bulk Discount Calculator",
  subtitle = "Buy more and save more on hospital equipment",
  productName = "Medical Equipment Unit"
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate discount percentage based on quantity
  const getDiscountPercentage = (qty) => {
    if (qty >= 50) return 25;
    if (qty >= 20) return 15;
    if (qty >= 10) return 10;
    return 0;
  };

  const discountPercent = getDiscountPercentage(quantity);

  // Calculations
  const totalBeforeDiscount = quantity * basePrice;
  const discountAmount = Math.round((totalBeforeDiscount * discountPercent) / 100);
  const finalPrice = totalBeforeDiscount - discountAmount;
  const savings = discountAmount;

  // Trigger subtle animation when values change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value)); // Prevent negative or zero
  };

  const handleSliderChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              BULK SAVINGS
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-3">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Main Calculator Card */}
          <div className="bg-card border rounded-3xl shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">{productName}</h3>
                <p className="text-sm text-muted-foreground">Base Price: ₹{basePrice.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Quantity Input + Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                <div className="text-2xl font-semibold tabular-nums">{quantity}</div>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={quantity}
                onChange={handleSliderChange}
                className="w-full accent-primary mb-4"
              />

              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full text-center text-4xl font-bold bg-background border rounded-2xl py-6 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">units</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-6">
              {/* Total Before Discount */}
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-muted-foreground">Total Price (before discount)</span>
                <span className="font-medium text-lg tabular-nums">
                  ₹{totalBeforeDiscount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Discount */}
              {discountPercent > 0 && (
                <div className="flex justify-between items-center py-3 border-b text-green-600">
                  <span className="font-medium">Bulk Discount ({discountPercent}%)</span>
                  <span className="font-medium tabular-nums">
                    -₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Final Price - Highlighted */}
              <div className="flex justify-between items-center py-5 bg-muted/50 rounded-2xl px-6 -mx-2">
                <span className="text-lg font-semibold">Final Price</span>
                <div className={`text-right transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}>
                  <div className="text-3xl font-bold text-primary tabular-nums">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-muted-foreground">incl. discount</div>
                </div>
              </div>

              {/* Savings Message */}
              {savings > 0 && (
                <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/30 py-3 rounded-2xl">
                  <Save className="h-5 w-5" />
                  <span className="font-medium">
                    You saved ₹{savings.toLocaleString('en-IN')} 🎉
                  </span>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <button
              onClick={() => alert(`Added ${quantity} units to cart at ₹${finalPrice.toLocaleString('en-IN')}`)}
              className="mt-10 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-2xl transition-all active:scale-[0.985]"
            >
              Add {quantity} Units to Cart - ₹{finalPrice.toLocaleString('en-IN')}
            </button>
          </div>

          {/* Trust / Info Footer */}
          <div className="text-center mt-8 text-xs text-muted-foreground">
            Discounts are automatically applied • Valid for bulk hospital orders • Prices are per unit
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkDiscountSection;