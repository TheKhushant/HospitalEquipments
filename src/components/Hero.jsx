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
    <section className="relative overflow-hidden bg-white">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-16 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">FDA & CE Approved Products</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Professional Medical Equipment For Modern Healthcare
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Trusted by 500+ hospitals and healthcare facilities worldwide. We provide hospital-grade medical equipment, diagnostic systems, and surgical instruments backed by expert support.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                {
                  icon: <Shield className="h-6 w-6 text-primary" />,
                  title: "FDA Certified",
                  desc: "All products approved",
                },
                {
                  icon: <Award className="h-6 w-6 text-primary" />,
                  title: "ISO 13485",
                  desc: "Quality certified",
                },
                {
                  icon: <Clock className="h-6 w-6 text-primary" />,
                  title: "24/7 Support",
                  desc: "Expert assistance",
                },
              ].map((item, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-3 border border-border/50">
                  <div className="flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-center text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground text-center">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/shop">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link to="/hospital-planner">
                  Hospital Planning
                </Link>
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
