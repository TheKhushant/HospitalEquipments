import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button"; // Adjust path to your components
import { Badge } from "../components/ui/Badge";
import {
  Shield,
  Award,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                FDA Approved Products
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Professional{" "}
                <span className="text-primary">Medical Equipment</span> You Can
                Trust
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Discover our comprehensive range of hospital-grade medical
                equipment and supplies. From patient monitoring systems to
                surgical instruments, we provide healthcare professionals with
                reliable, certified solutions.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "FDA Certified",
                  desc: "All products approved",
                },
                {
                  icon: <Award className="h-8 w-8 text-primary" />,
                  title: "ISO 13485",
                  desc: "Quality certified",
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: "24/7 Support",
                  desc: "Expert assistance",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Browse Catalog
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold">5,000+</span>{" "}
                healthcare facilities
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <img
                src="./Home/img.png"
                alt="Medical Equipment"
                className="w-full h-auto rounded-lg"
              />

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">
                      FDA Approved
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Expert Support</p>
                    <p className="text-xs text-muted-foreground">
                      24/7 Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
