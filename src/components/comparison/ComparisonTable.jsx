import { Check, X } from 'lucide-react';

const ComparisonTable = ({ selectedItems }) => {
  if (selectedItems.length < 2) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Select at least 2 equipments to start comparison
      </div>
    );
  }

  const highlightLowestPrice = Math.min(...selectedItems.map(item => item.price));
  const highlightHighestRating = Math.max(...selectedItems.map(item => item.rating));

  const rows = [
    { label: "Name", key: "name" },
    { label: "Brand", key: "brand" },
    { 
      label: "Price", 
      key: "price",
      render: (value) => `₹${value.toLocaleString('en-IN')}`,
      highlight: (value) => value === highlightLowestPrice
    },
    { 
      label: "Rating", 
      key: "rating",
      render: (value) => `★ ${value}`,
      highlight: (value) => value === highlightHighestRating
    },
    { 
      label: "Availability", 
      key: "availability",
      render: (value) => value ? <Check className="text-green-500" /> : <X className="text-red-500" />
    },
    { 
      label: "Key Features", 
      key: "features",
      render: (features) => (
        <div className="flex flex-wrap gap-1">
          {features.map((f, i) => (
            <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
              {f}
            </span>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium w-48">Features</th>
            {selectedItems.map((item) => (
              <th key={item.id} className="p-4 text-center border-l font-semibold">
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
              {selectedItems.map((item) => {
                const value = item[row.key];
                const isHighlighted = row.highlight ? row.highlight(value) : false;
                
                return (
                  <td
                    key={item.id}
                    className={`p-4 border-l text-center ${isHighlighted ? 'bg-primary/10 font-semibold' : ''}`}
                  >
                    {row.render ? row.render(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;