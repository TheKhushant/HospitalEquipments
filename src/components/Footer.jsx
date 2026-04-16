import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "../components/ui/Separator";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Truck,
  CreditCard,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Trust Badges */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Trust Items */}
            {[
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "FDA Approved",
                desc: "All products certified",
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "ISO 13485",
                desc: "Quality management",
              },
              {
                icon: <Truck className="h-8 w-8 text-primary" />,
                title: "Fast Shipping",
                desc: "Next-day delivery",
              },
              {
                icon: <CreditCard className="h-8 w-8 text-primary" />,
                title: "Secure Payment",
                desc: "256-bit encryption",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <h3 className="font-display font-bold text-lg">MedSupply</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in medical equipment and supplies. Providing
              healthcare professionals with reliable, FDA-approved products
              since 1995.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <Button key={idx} variant="outline" size="icon">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/shop" className="footer-link">
                All Products
              </Link>
              <Link to="/shop?category=monitoring" className="footer-link">
                Patient Monitoring
              </Link>
              <Link to="/shop?category=diagnostics" className="footer-link">
                Diagnostic Equipment
              </Link>
              <Link to="/shop?category=surgical" className="footer-link">
                Surgical Instruments
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <nav className="space-y-2">
              {[
                "Contact Support",
                "Track Your Order",
                "Returns & Exchanges",
                "Shipping Information",
                "Warranty Claims",
              ].map((text, idx) => (
                <a key={idx} href="#" className="footer-link">
                  {text}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-MEDICAL</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@medsupply.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p>123 Medical Center Drive</p>
                  <p>Healthcare City, HC 12345</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <p className="text-xs text-muted-foreground">
                Get updates on new products and special offers
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="text-sm"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <Separator />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 MedSupply. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (text, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  {text}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
