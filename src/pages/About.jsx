import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Award,
  Users,
  Globe,
  Heart,
  Target,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Established 1995
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Trusted Medical Equipment Partner for Healthcare Professionals
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              For over 25 years, MedSupply has been at the forefront of
              providing healthcare facilities with reliable, FDA-approved
              medical equipment and supplies. Our commitment to quality and
              service has made us a trusted partner for over 5,000 healthcare
              facilities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Healthcare Facilities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">
                    Our Mission
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower healthcare professionals with reliable, innovative
                  medical equipment that saves lives and improves patient
                  outcomes. We are committed to ensuring that every healthcare
                  facility, from large hospitals to small clinics, has access to
                  the highest quality medical technology at competitive prices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">
                    Our Vision
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted partner in medical equipment
                  supply, recognized for our unwavering commitment to quality,
                  innovation, and customer service. We envision a future where
                  every healthcare provider has seamless access to the tools
                  they need to deliver exceptional patient care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide every decision we make and every
              relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality & Safety</h3>
              <p className="text-muted-foreground">
                Every product we sell meets the highest standards of quality and
                safety, with FDA approval and rigorous testing.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">
                Our customers' success is our success. We listen, understand,
                and deliver solutions that exceed expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We continuously strive for excellence in everything we do, from
                product selection to customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of compliance and certification
              to ensure our customers receive only the best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FDA Approved</h3>
                <p className="text-sm text-muted-foreground">
                  All medical devices comply with FDA regulations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">ISO 13485</h3>
                <p className="text-sm text-muted-foreground">
                  Quality management system for medical devices
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">CE Marked</h3>
                <p className="text-sm text-muted-foreground">
                  European conformity certification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Data protection and privacy compliance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to partner with us? Our team is here to help you find the
              right medical equipment solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  24/7 customer support available
                </p>
                <Button variant="outline">1-800-MEDICAL</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  Get expert advice from our team
                </p>
                <Button variant="outline">support@medsupply.com</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground mb-4">
                  123 Medical Center Drive
                  <br />
                  Healthcare City, HC 12345
                </p>
                <Button variant="outline">Get Directions</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
