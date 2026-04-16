import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('comparison-items');
      if (saved) {
        setComparisonItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load comparison items:', error);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('comparison-items', JSON.stringify(comparisonItems));
    } catch (error) {
      console.error('Failed to save comparison items:', error);
    }
  }, [comparisonItems]);

  const addToComparison = useCallback((product) => {
    setComparisonItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      // Limit to 4 products for comparison
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  }, []);

  const removeFromComparison = useCallback((productId) => {
    setComparisonItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonItems([]);
  }, []);

  const toggleComparison = useCallback((product) => {
    setComparisonItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  }, []);

  const value = {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleComparison,
    isInComparison: (productId) =>
      comparisonItems.some((item) => item.id === productId),
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = React.useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};
