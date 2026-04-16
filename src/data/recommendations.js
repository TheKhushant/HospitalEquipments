// Smart Recommendation Logic for B2B Platform

import { products } from './products';

export const getFrequentlyBoughtTogether = (productId) => {
  const product = products.find((p) => p.id === productId);
  if (!product || !product.frequentlyBoughtWith) return [];

  return products.filter((p) => product.frequentlyBoughtWith.includes(p.id));
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  // Get products from same category, excluding current product
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== productId
  );

  return sameCategory.slice(0, limit);
};

export const getRecommendedForYou = (viewedProductIds = [], limit = 4) => {
  if (viewedProductIds.length === 0) {
    // Return best sellers if no history
    return products
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  const viewedProducts = products.filter((p) =>
    viewedProductIds.includes(p.id)
  );

  // Get frequently bought with from viewed products
  const recommendedSet = new Set();
  viewedProducts.forEach((p) => {
    if (p.frequentlyBoughtWith) {
      p.frequentlyBoughtWith.forEach((id) => {
        if (!viewedProductIds.includes(id)) {
          recommendedSet.add(id);
        }
      });
    }
  });

  // Get products from viewed categories
  viewedProducts.forEach((p) => {
    products.forEach((product) => {
      if (
        product.category === p.category &&
        !viewedProductIds.includes(product.id) &&
        !recommendedSet.has(product.id)
      ) {
        recommendedSet.add(product.id);
      }
    });
  });

  const recommended = Array.from(recommendedSet)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, limit);

  // Fill with bestsellers if not enough recommendations
  if (recommended.length < limit) {
    const bestsellers = products
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .filter((p) => !recommended.some((r) => r.id === p.id));
    recommended.push(...bestsellers.slice(0, limit - recommended.length));
  }

  return recommended;
};

export const searchProducts = (query, products_list = products) => {
  const lowerQuery = query.toLowerCase();

  return products_list.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.subCategory?.toLowerCase().includes(lowerQuery) ||
      p.features?.some((f) => f.toLowerCase().includes(lowerQuery))
  );
};

export const getSuggestions = (query, limit = 5) => {
  if (!query || query.length < 2) {
    return {
      products: [],
      categories: [],
      searches: [],
    };
  }

  const lowerQuery = query.toLowerCase();

  // Search products
  const matchedProducts = searchProducts(query)
    .slice(0, limit)
    .map((p) => ({
      type: 'product',
      title: p.name,
      value: p.id,
      icon: '🏥',
    }));

  // Suggest categories
  const categories = [
    'monitoring',
    'diagnostics',
    'surgical',
    'emergency',
    'supplies',
    'respiratory',
  ]
    .filter((c) => c.toLowerCase().includes(lowerQuery))
    .slice(0, 3)
    .map((c) => ({
      type: 'category',
      title: c.charAt(0).toUpperCase() + c.slice(1),
      value: c,
      icon: '📁',
    }));

  // Popular searches
  const searches = [
    'patient monitor',
    'surgical instruments',
    'ventilator',
    'x-ray',
    'defibrillator',
    'medical gloves',
    'ultrasound',
  ]
    .filter((s) => s.toLowerCase().includes(lowerQuery))
    .slice(0, 2)
    .map((s) => ({
      type: 'search',
      title: s,
      value: s,
      icon: '🔍',
    }));

  return {
    products: matchedProducts,
    categories,
    searches,
  };
};

export const calculateBulkDiscount = (productId, quantity) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return { price: 0, discount: 0, total: 0 };

  // Check bulk prices
  if (product.bulkPrices && product.bulkPrices.length > 0) {
    for (let i = product.bulkPrices.length - 1; i >= 0; i--) {
      if (quantity >= product.bulkPrices[i].quantity) {
        const bulkPrice = product.bulkPrices[i].price;
        const discount = product.price - bulkPrice;
        return {
          price: bulkPrice,
          discount: discount,
          discountPercentage: ((discount / product.price) * 100).toFixed(1),
          total: bulkPrice * quantity,
        };
      }
    }
  }

  // No bulk discount applicable
  return {
    price: product.price,
    discount: 0,
    discountPercentage: 0,
    total: product.price * quantity,
  };
};

export default {
  getFrequentlyBoughtTogether,
  getRelatedProducts,
  getRecommendedForYou,
  searchProducts,
  getSuggestions,
  calculateBulkDiscount,
};
