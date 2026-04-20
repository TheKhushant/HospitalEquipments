import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Truck, Clock, Navigation, AlertCircle, CheckCircle } from 'lucide-react';

const LocationDeliverySection = ({ 
  basePrice = 0, 
  productName = "Product",
  onPriceUpdate = null,
  className = "" 
}) => {
  const [pincode, setPincode] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [error, setError] = useState('');
  const [finalPrice, setFinalPrice] = useState(basePrice);

  // Mock warehouse mapping function
  const getWarehouseByPincode = useCallback((pincodeValue) => {
    const firstTwoDigits = pincodeValue.substring(0, 2);
    
    // Warehouse mapping based on pincode prefix
    const warehouseMap = {
      '44': {
        name: 'Nagpur Warehouse',
        city: 'Nagpur',
        distance: 'nearby',
        deliveryDays: 2,
        priceAdjustment: 0
      },
      '40': {
        name: 'Mumbai Warehouse',
        city: 'Mumbai',
        distance: 'medium',
        deliveryDays: 3,
        priceAdjustment: 5
      },
      '41': {
        name: 'Mumbai Warehouse',
        city: 'Mumbai',
        distance: 'medium',
        deliveryDays: 3,
        priceAdjustment: 5
      },
      '42': {
        name: 'Mumbai Warehouse',
        city: 'Mumbai',
        distance: 'medium',
        deliveryDays: 3,
        priceAdjustment: 5
      },
      '43': {
        name: 'Mumbai Warehouse',
        city: 'Mumbai',
        distance: 'medium',
        deliveryDays: 3,
        priceAdjustment: 5
      },
      '30': {
        name: 'Central Warehouse',
        city: 'Bhopal',
        distance: 'far',
        deliveryDays: 5,
        priceAdjustment: 10
      },
      '31': {
        name: 'Central Warehouse',
        city: 'Bhopal',
        distance: 'far',
        deliveryDays: 5,
        priceAdjustment: 10
      }
    };

    // Default warehouse for unmapped pincodes
    const defaultWarehouse = {
      name: 'Central Warehouse',
      city: 'Bhopal',
      distance: 'far',
      deliveryDays: 5,
      priceAdjustment: 10
    };

    return warehouseMap[firstTwoDigits] || defaultWarehouse;
  }, []);

  // Validate pincode format
  const isValidPincode = useCallback((pincodeValue) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincodeValue);
  }, []);

  // Calculate final price based on adjustment percentage
  const calculateFinalPrice = useCallback((base, adjustmentPercent) => {
    const adjustment = (base * adjustmentPercent) / 100;
    return base + adjustment;
  }, []);

  // Process pincode and update delivery info
  const processPincode = useCallback(async (pincodeValue) => {
    if (!pincodeValue || pincodeValue.length !== 6) {
      setDeliveryInfo(null);
      setFinalPrice(basePrice);
      setError('');
      return;
    }

    if (!isValidPincode(pincodeValue)) {
      setError('Please enter a valid 6-digit pincode');
      setDeliveryInfo(null);
      setFinalPrice(basePrice);
      return;
    }

    setIsValidating(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const warehouse = getWarehouseByPincode(pincodeValue);
    const newFinalPrice = calculateFinalPrice(basePrice, warehouse.priceAdjustment);
    
    setDeliveryInfo({
      pincode: pincodeValue,
      warehouse: warehouse.name,
      city: warehouse.city,
      distance: warehouse.distance,
      deliveryDays: warehouse.deliveryDays,
      priceAdjustment: warehouse.priceAdjustment,
      originalPrice: basePrice,
      finalPrice: newFinalPrice
    });
    
    setFinalPrice(newFinalPrice);
    setIsValidating(false);

    // Callback to parent component if provided
    if (onPriceUpdate && typeof onPriceUpdate === 'function') {
      onPriceUpdate(newFinalPrice, warehouse);
    }
  }, [basePrice, isValidPincode, getWarehouseByPincode, calculateFinalPrice, onPriceUpdate]);

  // Handle pincode input change
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    setError('');
  };

  // Handle pincode submission
  const handleSubmit = () => {
    if (pincode.length === 6) {
      processPincode(pincode);
    } else {
      setError('Please enter a valid 6-digit pincode');
    }
  };

  // Detect user location using browser geolocation
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // In a real app, you would reverse geocode the coordinates to get pincode
        // For demo purposes, we'll simulate pincode detection
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate detected pincode based on random or predefined logic
        // In production, you would call a reverse geocoding API
        const detectedPincode = '440001'; // Example pincode
        setPincode(detectedPincode);
        processPincode(detectedPincode);
        setIsDetecting(false);
      },
      (error) => {
        setIsDetecting(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError('Location permission denied. Please enter pincode manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable. Please enter pincode manually.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please enter pincode manually.');
            break;
          default:
            setError('Failed to detect location. Please enter pincode manually.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Get distance label and color
  const getDistanceInfo = (distance) => {
    switch(distance) {
      case 'nearby':
        return { label: 'Nearby', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
      case 'medium':
        return { label: 'Medium Distance', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Truck };
      case 'far':
        return { label: 'Far Location', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle };
      default:
        return { label: 'Standard', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Truck };
    }
  };

  // Effect to process pincode when it reaches 6 digits
  useEffect(() => {
    if (pincode.length === 6 && isValidPincode(pincode)) {
      processPincode(pincode);
    }
  }, [pincode, processPincode, isValidPincode]);

  const distanceInfo = deliveryInfo ? getDistanceInfo(deliveryInfo.distance) : null;
  const DistanceIcon = distanceInfo?.icon || Truck;

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery & Pricing Information
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Check delivery time and price for your location
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Pincode
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={pincode}
                onChange={handlePincodeChange}
                placeholder="Enter 6-digit pincode"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                  ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                maxLength="6"
              />
              {error && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={pincode.length !== 6 || isValidating}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isValidating ? 'Checking...' : 'Check'}
            </button>
            <button
              onClick={detectLocation}
              disabled={isDetecting}
              className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isDetecting ? 'Detecting...' : 'Detect'}</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *Enter pincode to see delivery options and final price
          </p>
        </div>

        {/* Delivery Information */}
        {deliveryInfo && !error && (
          <div className="space-y-4 animate-fadeIn">
            {/* Warehouse Info */}
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nearest Warehouse</p>
                <p className="text-sm text-gray-700">{deliveryInfo.warehouse}</p>
                <p className="text-xs text-gray-500">{deliveryInfo.city}</p>
              </div>
              {distanceInfo && (
                <div className={`px-2 py-1 ${distanceInfo.bgColor} rounded-full`}>
                  <span className={`text-xs font-medium ${distanceInfo.color}`}>
                    {distanceInfo.label}
                  </span>
                </div>
              )}
            </div>

            {/* Delivery Time */}
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Delivery Estimate</p>
                <p className="text-sm text-gray-700">
                  {deliveryInfo.deliveryDays === 1 ? 'Tomorrow' : `${deliveryInfo.deliveryDays} days`}
                </p>
                <p className="text-xs text-gray-500">
                  {deliveryInfo.distance === 'nearby' 
                    ? 'Fastest delivery from nearest warehouse' 
                    : deliveryInfo.distance === 'medium'
                    ? 'Standard delivery from regional warehouse'
                    : 'Extended delivery from central warehouse'}
                </p>
              </div>
            </div>

            {/* Price Information */}
            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Base Price:</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{deliveryInfo.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              
              {deliveryInfo.priceAdjustment > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Location Adjustment ({deliveryInfo.priceAdjustment}%):
                  </span>
                  <span className="text-sm text-orange-600">
                    +₹{(deliveryInfo.finalPrice - deliveryInfo.originalPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                <span className="text-base font-semibold text-gray-900">Final Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{deliveryInfo.finalPrice.toLocaleString('en-IN')}
                  </span>
                  {deliveryInfo.priceAdjustment === 0 && (
                    <p className="text-xs text-green-600 mt-1">No extra delivery charges</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Note */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                Free delivery on orders above ₹999
              </p>
            </div>
          </div>
        )}

        {/* No Pincode Entered State */}
        {!deliveryInfo && !error && pincode.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Enter pincode to see delivery options</p>
            <p className="text-xs mt-1">or click "Detect" to auto-detect your location</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LocationDeliverySection;