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
    <footer className="bg-foreground text-white">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Trust Items */}
            {[
              {
                icon: <Shield className="h-8 w-8 text-accent" />,
                title: "FDA Approved",
                desc: "All products certified",
              },
              {
                icon: <Award className="h-8 w-8 text-accent" />,
                title: "ISO 13485",
                desc: "Quality management",
              },
              {
                icon: <Truck className="h-8 w-8 text-accent" />,
                title: "Fast Shipping",
                desc: "Next-day delivery",
              },
              {
                icon: <CreditCard className="h-8 w-8 text-accent" />,
                title: "Secure Payment",
                desc: "256-bit encryption",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-white/70">{item.desc}</p>
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
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg">AllCare Medical</h3>
            </div>
            <p className="text-sm text-white/80">
              Your trusted partner in medical equipment and supplies. Providing
              healthcare professionals with reliable, FDA-approved products
              globally.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <Button key={idx} variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { label: "All Products", to: "/shop" },
                { label: "Patient Monitoring", to: "/shop?category=monitoring" },
                { label: "Diagnostic Equipment", to: "/shop?category=diagnostics" },
                { label: "Surgical Instruments", to: "/shop?category=surgical" },
                { label: "About Us", to: "/about" },
              ].map((item, idx) => (
                <Link key={idx} to={item.to} className="text-white/70 hover:text-white transition-colors text-sm">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Customer Service</h3>
            <nav className="space-y-2">
              {[
                "Contact Support",
                "Track Your Order",
                "Returns & Exchanges",
                "Shipping Information",
                "Warranty Claims",
              ].map((text, idx) => (
                <a key={idx} href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  {text}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-white/90">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-white/90">support@allcare.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-white/90">
                  <p>123 Medical Center Drive</p>
                  <p>Healthcare City, HC 12345</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-white">Newsletter</h4>
              <p className="text-xs text-white/70">
                Get updates on new products and special offers
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button size="sm" className="bg-accent text-foreground hover:bg-accent/90">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2024 AllCare Medical. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (text, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {text}
                </a>
              )
            )}
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
