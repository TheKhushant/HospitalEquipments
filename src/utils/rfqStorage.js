// RFQ Storage Utility - Mock backend using localStorage

const RFQ_STORAGE_KEY = 'rfq-requests';

export const rfqStorage = {
  // Get all RFQs
  getAllRFQs: () => {
    try {
      const data = localStorage.getItem(RFQ_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get RFQs:', error);
      return [];
    }
  },

  // Get single RFQ by ID
  getRFQById: (id) => {
    const rfqs = rfqStorage.getAllRFQs();
    return rfqs.find((rfq) => rfq.id === id);
  },

  // Create new RFQ
  createRFQ: (rfqData) => {
    const id = `RFQ-${Date.now()}`;
    const newRFQ = {
      id,
      ...rfqData,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const rfqs = rfqStorage.getAllRFQs();
      rfqs.push(newRFQ);
      localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(rfqs));
      return newRFQ;
    } catch (error) {
      console.error('Failed to create RFQ:', error);
      return null;
    }
  },

  // Update RFQ status
  updateRFQStatus: (id, status) => {
    try {
      const rfqs = rfqStorage.getAllRFQs();
      const rfq = rfqs.find((r) => r.id === id);
      if (rfq) {
        rfq.status = status;
        rfq.updatedAt = new Date().toISOString();
        localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(rfqs));
        return rfq;
      }
      return null;
    } catch (error) {
      console.error('Failed to update RFQ:', error);
      return null;
    }
  },

  // Delete RFQ
  deleteRFQ: (id) => {
    try {
      const rfqs = rfqStorage.getAllRFQs();
      const filtered = rfqs.filter((rfq) => rfq.id !== id);
      localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Failed to delete RFQ:', error);
      return false;
    }
  },

  // Get RFQs for specific product
  getRFQsByProduct: (productId) => {
    const rfqs = rfqStorage.getAllRFQs();
    return rfqs.filter(
      (rfq) => rfq.items && rfq.items.some((item) => item.productId === productId)
    );
  },

  // Clear all RFQs
  clearAllRFQs: () => {
    try {
      localStorage.removeItem(RFQ_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear RFQs:', error);
      return false;
    }
  },
};

export default rfqStorage;
