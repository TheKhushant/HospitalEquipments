import { useMemo, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';

const EquipmentSelector = ({ selectedItems, onAdd, onRemove, maxItems = 4 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const equipments = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return products;
    }

    return products.filter((equipment) => {
      return [equipment.name, equipment.description, equipment.category, equipment.subCategory]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [searchTerm]);

  const isSelected = (id) => selectedItems.some(item => item.id === id);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medical equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => {}} disabled={selectedItems.length >= maxItems}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipments.map((eq) => (
          <Card
            key={eq.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected(eq.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => !isSelected(eq.id) && onAdd(eq)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold line-clamp-1">{eq.name}</h3>
                  <p className="text-sm text-muted-foreground">{eq.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{eq.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-yellow-500">★ {eq.rating}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  eq.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {eq.availability ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Items as removable tags */}
      {selectedItems.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm"
            >
              {item.name}
              <button onClick={() => onRemove(item.id)} className="hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;