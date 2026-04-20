import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  featuredProducts,
  bestSellers,
  onSale,
} from "@/data/products";
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  Star,
  Users,
  Award,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import BulkDiscountSection from "../components/BulkDiscountSection";
import LocationDeliverySection from "@/components/comparison/LocationDeliverySection.jsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      <LocationDeliverySection />

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the exact medical equipment you need from our comprehensive
              categories, all backed by our quality guarantee.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-16 w-16 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Our most popular and trusted medical equipment
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Best Sellers
              </h2>
              <p className="text-lg text-muted-foreground">
                Most trusted by healthcare professionals
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {onSale.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-warning text-warning-foreground">
                Limited Time Offers
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Special Deals
              </h2>
              <p className="text-lg text-muted-foreground">
                Save on professional medical equipment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSale.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BulkDiscountSection/>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Why Healthcare Professionals Choose Us
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We understand the critical nature of medical equipment and provide
              unmatched quality, service, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                FDA Approved Products
              </h3>
              <p className="opacity-90">
                All our products meet strict FDA standards and regulations for
                medical devices.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="opacity-90">
                Next-day delivery available for urgent medical equipment needs.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="opacity-90">
                Expert technical support available around the clock for critical
                situations.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
              <p className="opacity-90">
                ISO 13485 certified quality management ensures consistent
                excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              See what medical professionals say about our products and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {index === 0 &&
                      `"The patient monitor we purchased has been incredibly reliable. The technical support team is knowledgeable and responsive."`}
                    {index === 1 &&
                      `"Fast delivery and excellent quality surgical instruments. Our surgical team is very satisfied with the precision and durability."`}
                    {index === 2 &&
                      `"Outstanding customer service and competitive pricing. The FDA approval process documentation was thorough and professional."`}
                  </p>
                  <div>
                    <p className="font-semibold">
                      {index === 0 && "Dr. Sarah Johnson"}
                      {index === 1 && "Dr. Michael Chen"}
                      {index === 2 && "Lisa Thompson"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 &&
                        "Chief Medical Officer, City General Hospital"}
                      {index === 1 &&
                        "Head of Surgery, Regional Medical Center"}
                      {index === 2 &&
                        "Procurement Manager, Metro Health System"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Stay Updated with Latest Medical Equipment
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Get notified about new product launches, special offers, and
                important updates in medical technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground"
                />
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 mt-8 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
