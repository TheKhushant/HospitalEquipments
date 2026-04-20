import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductTable = ({ title, data, columns }) => {
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    return (a[sortField] > b[sortField] ? 1 : -1) * (sortAsc ? 1 : -1);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => {
                    if (sortField === col.key) setSortAsc(!sortAsc);
                    else setSortField(col.key);
                  }}
                  className="text-left py-3 px-4 cursor-pointer hover:bg-muted"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-muted/50">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ProductTable;