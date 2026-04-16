import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { rfqStorage } from '../utils/rfqStorage';
import { toast } from 'sonner';

const RFQDialog = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    hospitalName: '',
    email: '',
    phone: '',
    quantity: product?.moq || 1,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const rfqData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        items: [
          {
            productId: product.id,
            productName: product.name,
            quantity: parseInt(formData.quantity),
            price: product.price,
          },
        ],
      };

      const result = rfqStorage.createRFQ(rfqData);
      if (result) {
        toast.success('RFQ submitted successfully! We will contact you soon.');
        setFormData({
          contactName: '',
          hospitalName: '',
          email: '',
          phone: '',
          quantity: product?.moq || 1,
          message: '',
        });
        onClose();
      } else {
        toast.error('Failed to submit RFQ. Please try again.');
      }
    } catch (error) {
      console.error('RFQ submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Request for Quote</DialogTitle>
        </DialogHeader>

        <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mb-4">
          <p className="text-sm font-semibold text-foreground mb-1">
            {product.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Base Price: <span className="font-bold text-primary">₹{product.price.toLocaleString()}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              Contact Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Your name"
              className="border-border/50 bg-secondary/30"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              Hospital/Organization Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Hospital name"
              className="border-border/50 bg-secondary/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-border/50 bg-secondary/30"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Phone <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border-border/50 bg-secondary/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              Quantity <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={product.moq || 1}
              className="border-border/50 bg-secondary/30"
              required
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Minimum order: {product.moq || 1} unit{product.moq > 1 ? 's' : ''}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requirements or questions?"
              className="w-full px-3 py-2 border border-border/50 rounded-md bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              rows="3"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit RFQ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RFQDialog;
