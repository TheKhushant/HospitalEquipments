// Hospital Setup Templates for B2B platform

export const hospitalTemplates = [
  {
    id: 'icu-setup',
    name: 'ICU Setup (20 beds)',
    description: 'Complete equipment package for a 20-bed ICU facility',
    bedCount: 20,
    type: 'ICU',
    equipmentList: [
      { productId: 'pm-001', quantity: 15, category: 'monitoring' },
      { productId: 'rp-001', quantity: 10, category: 'respiratory' },
      { productId: 'dg-001', quantity: 2, category: 'diagnostics' },
      { productId: 'em-001', quantity: 5, category: 'emergency' },
      { productId: 'sg-001', quantity: 8, category: 'surgical' },
      { productId: 'sp-001', quantity: 50, category: 'supplies' },
    ],
    estimatedCost: 1250000,
    deliveryTime: '45-60 days',
  },
  {
    id: 'general-ward',
    name: 'General Ward Setup (40 beds)',
    description: 'Equipment for a standard general ward facility',
    bedCount: 40,
    type: 'General Ward',
    equipmentList: [
      { productId: 'pm-002', quantity: 25, category: 'monitoring' },
      { productId: 'dg-002', quantity: 2, category: 'diagnostics' },
      { productId: 'em-001', quantity: 8, category: 'emergency' },
      { productId: 'sg-001', quantity: 15, category: 'surgical' },
      { productId: 'sp-001', quantity: 100, category: 'supplies' },
    ],
    estimatedCost: 850000,
    deliveryTime: '30-45 days',
  },
  {
    id: 'emergency-dept',
    name: 'Emergency Department',
    description: 'Complete emergency and trauma care setup',
    bedCount: 12,
    type: 'Emergency',
    equipmentList: [
      { productId: 'pm-001', quantity: 8, category: 'monitoring' },
      { productId: 'em-001', quantity: 10, category: 'emergency' },
      { productId: 'rp-001', quantity: 3, category: 'respiratory' },
      { productId: 'dg-001', quantity: 1, category: 'diagnostics' },
      { productId: 'sg-001', quantity: 5, category: 'surgical' },
      { productId: 'sp-001', quantity: 30, category: 'supplies' },
    ],
    estimatedCost: 650000,
    deliveryTime: '30-40 days',
  },
  {
    id: 'clinic-setup',
    name: 'Diagnostic Clinic',
    description: 'Basic diagnostic and consultation setup',
    bedCount: 4,
    type: 'Clinic',
    equipmentList: [
      { productId: 'pm-002', quantity: 4, category: 'monitoring' },
      { productId: 'dg-002', quantity: 1, category: 'diagnostics' },
      { productId: 'sg-001', quantity: 2, category: 'surgical' },
      { productId: 'sp-001', quantity: 10, category: 'supplies' },
    ],
    estimatedCost: 180000,
    deliveryTime: '14-21 days',
  },
  {
    id: 'respiratory-center',
    name: 'Respiratory Care Center',
    description: 'Specialized respiratory and ventilation setup',
    bedCount: 15,
    type: 'Respiratory',
    equipmentList: [
      { productId: 'rp-001', quantity: 12, category: 'respiratory' },
      { productId: 'pm-001', quantity: 10, category: 'monitoring' },
      { productId: 'dg-001', quantity: 1, category: 'diagnostics' },
      { productId: 'em-001', quantity: 3, category: 'emergency' },
      { productId: 'sp-001', quantity: 40, category: 'supplies' },
    ],
    estimatedCost: 720000,
    deliveryTime: '40-50 days',
  },
];

export const getTemplateById = (id) => {
  return hospitalTemplates.find((template) => template.id === id);
};

export const getTemplatesByBedCount = (bedCount) => {
  // Return templates closest to the requested bed count
  return hospitalTemplates.sort(
    (a, b) => Math.abs(a.bedCount - bedCount) - Math.abs(b.bedCount - bedCount)
  );
};

export const getEstimatedCost = (templateId) => {
  const template = getTemplateById(templateId);
  return template ? template.estimatedCost : 0;
};

export default hospitalTemplates;
