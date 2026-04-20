import { useState } from 'react';
import EquipmentSelector from './EquipmentSelector';
import ComparisonTable from './ComparisonTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompareEquip = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddEquipment = (equipment) => {
    if (selectedItems.length >= 4) return;
    if (!selectedItems.find(item => item.id === equipment.id)) {
      setSelectedItems([...selectedItems, equipment]);
    }
  };

  const handleRemoveEquipment = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/shop" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                Back to Shop
              </Link>
              <div>
                <h1 className="text-3xl font-display font-bold">Equipment Comparison</h1>
                <p className="text-muted-foreground">Compare up to 4 medical equipments side by side</p>
              </div>
            </div>
            
            {selectedItems.length > 0 && (
              <Button variant="outline" onClick={clearAll}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <EquipmentSelector
          selectedItems={selectedItems}
          onAdd={handleAddEquipment}
          onRemove={handleRemoveEquipment}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Comparison Result</h2>
          <ComparisonTable selectedItems={selectedItems} />
        </div>

        {selectedItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-2xl font-semibold mb-2">Start Comparing</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search and select 2 to 4 equipments above to see detailed comparison
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareEquip;