import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, PackageX } from 'lucide-react';

const InventoryAlert = ({ lowStock }) => {
  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">Inventory Alerts</span>
        </div>
        <div className="space-y-4">
          {lowStock.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.stock === 0 ? 'Out of Stock' : `${item.stock} left`}
                </p>
              </div>
              {item.stock === 0 ? (
                <PackageX className="h-5 w-5 text-red-500" />
              ) : (
                <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Low Stock
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlert;