import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "../components/ui/Separator";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Shield,
  Truck,
} from "lucide-react";

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const shippingCost = total > 5000 ? 0 : 150;
  const taxRate = 0.08;
  const tax = total * taxRate;
  const finalTotal = total + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Start browsing our medical equipment to add items to your cart.
            </p>
            <Button size="lg" asChild>
              <Link to="/shop">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} item{items.length > 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="hover:text-primary"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {item.product.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    <Truck className="h-4 w-4 inline mr-2" />
                    Free shipping on orders over ₹15,000
                  </div>
                )}
              </CardContent>
            </Card>

            <Button size="lg" className="w-full">
              <CreditCard className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Secure Checkout</p>
                      <p className="text-xs text-muted-foreground">
                        256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">
                        Next-day shipping available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Flexible Payment</p>
                      <p className="text-xs text-muted-foreground">
                        Credit cards & financing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm mb-2">Need help with your order?</p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
