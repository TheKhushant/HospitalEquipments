import { useComparison } from '../context/ComparisonContext';
import { Link } from 'react-router-dom';
import { X, Maximize2 } from 'lucide-react';
import { Button } from './ui/Button';

const ComparisonWidget = () => {
  const { comparisonItems, removeFromComparison, clearComparison } =
    useComparison();

  if (comparisonItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">
          Comparison ({comparisonItems.length}/4)
        </h3>
        {comparisonItems.length > 0 && (
          <button
            onClick={clearComparison}
            className="text-xs text-gray-500 hover:text-red-500"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {comparisonItems.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
          >
            <span className="text-gray-700 truncate flex-1">{product.name}</span>
            <button
              onClick={() => removeFromComparison(product.id)}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <Link to="/comparison" className="block">
        <Button variant="outline" className="w-full mb-2">
          <Maximize2 size={16} className="mr-2" />
          View Comparison
        </Button>
      </Link>
    </div>
  );
};

export default ComparisonWidget;
