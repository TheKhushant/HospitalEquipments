import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();

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
        "group hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Stock Status */}
          <Badge
            variant={product.inStock ? "default" : "secondary"}
            className="absolute top-2 right-2"
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute bottom-2 right-2 bg-white/80 hover:bg-white",
              isLiked && "text-red-500"
            )}
            onClick={toggleLike}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Category */}
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <br />
             {/* SubCategory */}
            <Badge variant="outline" className="text-xs">
              {product.subCategory}
            </Badge>
            {/* Product Name */}
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Features Preview */}
            <div className="text-xs text-muted-foreground">
              <p className="line-clamp-2">{product.description}</p>
            </div>
            
            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex gap-1">
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

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
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
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
