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
          <DialogTitle>Request for Quote (RFQ)</DialogTitle>
        </DialogHeader>

        <div className="bg-blue-50 p-3 rounded mb-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            {product.name}
          </p>
          <p className="text-sm text-blue-700">
            Base Price: ₹{product.price.toLocaleString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Contact Name *
            </label>
            <Input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Hospital/Organization Name *
            </label>
            <Input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Hospital name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Phone *
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Quantity *
            </label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={product.moq || 1}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum order: {product.moq || 1} unit(s)
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requirements or questions?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
