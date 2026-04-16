import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useComparison } from "@/context/ComparisonContext";
import { Heart, Star, ShoppingCart, Checkbox } from "lucide-react";
import { cn } from "@/lib/Utils";

export function ProductCard({ product, className }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { toggleComparison, isInComparison } = useComparison();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem(product);
    setIsAddingToCart(false);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      className={cn(
        "group overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-secondary h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground font-semibold px-3">
              Save {discountPercentage}%
            </Badge>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow-sm",
              isLiked && "text-red-500"
            )}
            onClick={toggleLike}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category & SubCategory */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs font-medium">
              {product.category}
            </Badge>
            {product.subCategory && (
              <Badge variant="outline" className="text-xs">
                {product.subCategory}
              </Badge>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-foreground">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating} <span className="text-gray-400">({product.reviewCount})</span>
            </span>
          </div>

          {/* Price Section */}
          <div className="pt-1 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* MOQ & Certifications */}
          <div className="space-y-2 pt-1">
            {product.moq && (
              <div className="text-xs font-semibold text-primary/80 bg-primary/5 px-2 py-1 rounded w-fit">
                MOQ: {product.moq} unit{product.moq > 1 ? 's' : ''}
              </div>
            )}

            {product.certifications && product.certifications.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {product.certifications.slice(0, 2).map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Adding...
            </>
          ) : (
            <>
              {product.inStock ? (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </>
              ) : (
                "Out of Stock"
              )}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleComparison(product);
          }}
          className={cn(
            isInComparison(product.id) && "bg-blue-50 border-blue-500"
          )}
          title="Add to comparison"
        >
          <Checkbox size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}
