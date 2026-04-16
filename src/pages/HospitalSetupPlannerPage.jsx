import { useState, useMemo } from 'react';
import { hospitalTemplates, getTemplateById, getEstimatedCost } from '../data/hospitals';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from 'sonner';

const HospitalSetupPlannerPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customBeds, setCustomBeds] = useState('');
  const [facilityType, setFacilityType] = useState('general');
  const { addToCart } = useCart();

  const templateEquipment = useMemo(() => {
    if (!selectedTemplate) return [];

    const template = getTemplateById(selectedTemplate);
    if (!template) return [];

    return template.equipmentList
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          ...item,
          product,
          totalPrice: product ? product.price * item.quantity : 0,
        };
      })
      .filter((item) => item.product);
  }, [selectedTemplate]);

  const totalEstimate = useMemo(() => {
    return templateEquipment.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [templateEquipment]);

  const handleAddAllToCart = () => {
    templateEquipment.forEach((item) => {
      if (item.product) {
        for (let i = 0; i < item.quantity; i++) {
          addToCart(item.product);
        }
      }
    });
    toast.success(
      `${templateEquipment.length} product types added to cart!`
    );
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Hospital Equipment Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Select a facility template or customize equipment for your specific healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border/50 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-border/50">
                Select Setup
              </h2>

              {/* Templates */}
              <div className="space-y-3 mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Predefined Templates:
                </p>
                {hospitalTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {template.equipmentList.length} equipment types
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      ₹{getEstimatedCost(template.id).toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Custom Setup */}
              <p className="text-sm text-gray-600 mb-3">Custom Setup:</p>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Number of Beds
                </label>
                <Input
                  type="number"
                  value={customBeds}
                  onChange={(e) => setCustomBeds(e.target.value)}
                  placeholder="e.g., 30"
                  min="1"
                  max="500"
                  className="mb-3"
                />

                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Facility Type
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="general">General Hospital</option>
                  <option value="icu">ICU</option>
                  <option value="emergency">Emergency</option>
                  <option value="clinic">Clinic</option>
                  <option value="respiratory">Respiratory Center</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Equipment List */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Template Header */}
                {(() => {
                  const template = getTemplateById(selectedTemplate);
                  return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {template.name}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {template.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Beds</p>
                          <p className="text-xl font-bold text-blue-600">
                            {template.bedCount}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {template.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Delivery</p>
                          <p className="text-sm text-gray-900">
                            {template.deliveryTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Est. Cost</p>
                          <p className="text-lg font-bold text-green-600">
                            ₹{template.estimatedCost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Equipment List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Equipment List
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {templateEquipment.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.product.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {item.product.certifications?.slice(0, 2).map((cert) => (
                                <span
                                  key={cert}
                                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-gray-600 mb-1">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              ₹{item.totalPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              ₹{item.product.price.toLocaleString()}/unit
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary and CTA */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order Summary
                    </h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {templateEquipment.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Equipment Types:</span>
                      <span className="font-semibold text-gray-900">
                        {templateEquipment.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Estimated Total:
                      </span>
                      <span className="text-3xl font-bold text-blue-600">
                        ₹{totalEstimate.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddAllToCart}
                    className="w-full"
                    size="lg"
                  >
                    Add All to Cart
                  </Button>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    You can adjust quantities in your cart
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 mb-4">
                  Select a template to view equipment and pricing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSetupPlannerPage;
