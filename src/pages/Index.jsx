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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find the exact medical equipment you need from our comprehensive
              categories, all backed by our quality guarantee.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group"
              >
                <Card className="text-center hover:shadow-md hover:border-primary/30 transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center h-20 items-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-16 w-16 object-contain group-hover:scale-125 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Our most popular and trusted medical equipment, selected for hospitals worldwide
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0">
              <Link to="/shop" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
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
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Sellers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Most trusted and recommended by healthcare professionals
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0">
              <Link to="/shop" className="gap-2">
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

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Why Healthcare Professionals Choose AllCare
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              We understand the critical nature of medical equipment and provide
              unmatched quality, service, and support backed by decades of experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "FDA Approved", desc: "All products meet strict FDA standards and medical device regulations" },
              { icon: Truck, title: "Fast Delivery", desc: "Next-day delivery available for urgent medical equipment needs" },
              { icon: Clock, title: "24/7 Support", desc: "Expert technical support available around the clock" },
              { icon: Award, title: "Quality Certified", desc: "ISO 13485 certified for consistent excellence" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="h-20 w-20 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <item.icon className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                <p className="opacity-90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/20 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground border-0 shadow-lg">
            <CardContent className="p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 text-balance">
                Get the Latest Medical Equipment Updates
              </h2>
              <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our newsletter for new product launches, special offers, and
                important updates in medical technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white/95"
                />
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm opacity-90 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No spam</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Unsubscribe anytime</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Secure & encrypted</span>
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
