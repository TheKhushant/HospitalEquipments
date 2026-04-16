import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "../components/ui/Separator";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useComparison } from "@/context/ComparisonContext";
import { products } from "@/data/products";
import BulkDiscountCalculator from "@/components/BulkDiscountCalculator";
import FrequentlyBoughtTogether from "@/components/FrequentlyBoughtTogether";
import RFQDialog from "@/components/RFQDialog";
import {
  Star,
  Heart,
  ShoppingCart,
  Shield,
  Truck,
  RotateCcw,
  Phone,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/Utils";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleComparison, isInComparison } = useComparison();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-border/50">/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="text-border/50">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground" asChild>
          <Link to="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-secondary/50 rounded-lg overflow-hidden border border-border/50 h-96">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  -{discountPercentage}%
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-4 right-4 bg-white/80 hover:bg-white",
                  isLiked && "text-red-500"
                )}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-display font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    product.inStock ? "bg-success" : "bg-destructive"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    product.inStock ? "text-success" : "text-destructive"
                  )}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* MOQ Info */}
              {product.moq && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    Minimum Order Quantity: <span className="font-bold text-primary">{product.moq}</span> unit{product.moq > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>

            {/* Certifications */}
            {product.certifications && (
              <div className="space-y-2">
                <h3 className="font-semibold">Certifications</h3>
                <div className="flex gap-2">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      <Shield className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: {formatPrice(product.price * quantity)}
                </span>
              </div>

              <div className="flex gap-2 flex-col sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRFQOpen(true)}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Get Quote
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toggleComparison(product)}
                  className={cn(
                    "flex-1",
                    isInComparison(product.id) && "bg-blue-50 border-blue-500"
                  )}
                >
                  <Scale className="h-4 w-4 mr-2" />
                  {isInComparison(product.id) ? "In Comparison" : "Compare"}
                </Button>
              </div>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">FDA Approved</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Fast Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Discount Calculator */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold mb-8">
            Bulk Pricing & Discounts
          </h2>
          <BulkDiscountCalculator product={product} onQuantityChange={(qty, pricing) => {
            setQuantity(qty);
          }} />
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Key Benefits:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-success" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b last:border-b-0"
                          >
                            <span className="font-medium">{key}</span>
                            <span className="text-muted-foreground">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Detailed specifications available upon request.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <h4 className="font-medium">{feature}</h4>
                          <p className="text-sm text-muted-foreground">
                            Professional grade feature ensuring optimal
                            performance and reliability.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{product.rating}</div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.reviewCount} reviews
                      </p>
                    </div>
                    <Separator />
                    <p className="text-center text-muted-foreground">
                      Detailed reviews coming soon. Contact our sales team for
                      customer references.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-16">
          <FrequentlyBoughtTogether productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* RFQ Dialog */}
        <RFQDialog
          isOpen={isRFQOpen}
          onClose={() => setIsRFQOpen(false)}
          product={product}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
