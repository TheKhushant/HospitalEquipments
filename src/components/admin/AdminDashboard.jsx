import { useMemo, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";
import RevenueChart from "@/components/admin/RevenueChart";
import ProductTable from "@/components/admin/ProductTable";
import InventoryAlert from "@/components/admin/InventoryAlert";
import {
  Package,
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Download,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const revenueByPeriod = {
  7: [
    { date: "Apr 14", revenue: 2450000 },
    { date: "Apr 15", revenue: 3180000 },
    { date: "Apr 16", revenue: 2890000 },
    { date: "Apr 17", revenue: 4120000 },
    { date: "Apr 18", revenue: 3650000 },
    { date: "Apr 19", revenue: 4280000 },
    { date: "Apr 20", revenue: 3910000 },
  ],
  30: [
    { date: "Mar 22", revenue: 1840000 },
    { date: "Mar 29", revenue: 2210000 },
    { date: "Apr 05", revenue: 2670000 },
    { date: "Apr 12", revenue: 3120000 },
    { date: "Apr 19", revenue: 3910000 },
  ],
  90: [
    { date: "Jan 15", revenue: 1450000 },
    { date: "Feb 10", revenue: 1890000 },
    { date: "Mar 05", revenue: 2340000 },
    { date: "Apr 20", revenue: 3910000 },
  ],
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState("30");

  const dashboardData = useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount);
    const inStockProducts = products.filter((product) => product.inStock);
    const lowStock = products
      .filter((product) => product.reviewCount < 150)
      .slice(0, 3)
      .map((product) => ({
        id: product.id,
        name: product.name,
        stock: product.inStock ? Math.max(1, Math.floor(product.reviewCount / 60)) : 0,
      }));

    return {
      totalProducts: products.length,
      totalSales: products.reduce((sum, product) => sum + product.reviewCount, 0),
      totalRevenue: products.reduce((sum, product) => sum + product.price * product.reviewCount, 0),
      totalOrders: sortedProducts.length * 48,
      topProducts: sortedProducts.slice(0, 4).map((product) => ({
        id: product.id,
        name: product.name,
        sales: product.reviewCount,
        revenue: product.price * product.reviewCount,
      })),
      mostViewed: sortedProducts.slice(0, 4).map((product) => ({
        id: product.id,
        name: product.name,
        views: product.reviewCount * 10,
      })),
      lowStock,
      inStockCount: inStockProducts.length,
      averageRating:
        products.reduce((sum, product) => sum + product.rating, 0) / products.length,
    };
  }, []);

  const exportCSV = () => {
    const csv = [
      ["Name", "Sales", "Revenue"],
      ...dashboardData.topProducts.map((product) => [product.name, product.sales, product.revenue]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `report-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <h1 className="text-4xl font-display font-bold">Product Dashboard</h1>
            <p className="text-muted-foreground">
              Static overview of your product catalog, featured items, and availability
            </p>
          </div>

          <Button onClick={exportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 border border-blue-200 rounded-3xl p-6 mb-10 flex items-center gap-4">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <div>
            <span className="font-semibold">Static Insight:</span>{" "}
            Your catalog contains <span className="text-green-600 font-bold">{dashboardData.totalProducts}</span> products and <span className="text-green-600 font-bold">{dashboardData.inStockCount}</span> are available now.
            <span className="ml-2 text-muted-foreground">
              Average rating is {dashboardData.averageRating.toFixed(1)} stars.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            title="Total Products"
            value={dashboardData.totalProducts}
            description="Active in catalog"
            icon={Package}
            color="blue"
          />
          <DashboardCard
            title="Total Reviews"
            value={dashboardData.totalSales.toLocaleString("en-IN")}
            description="Static engagement count"
            icon={TrendingUp}
            color="green"
          />
          <DashboardCard
            title="Catalog Value"
            value={`₹${(dashboardData.totalRevenue / 100000).toFixed(1)}L`}
            description="Price x review volume"
            icon={IndianRupee}
            color="purple"
          />
          <DashboardCard
            title="In Stock"
            value={dashboardData.inStockCount}
            description="Currently available"
            icon={ShoppingCart}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RevenueChart period={period} onPeriodChange={setPeriod} data={revenueByPeriod[period]} />

          <ProductTable
            title="Top Products"
            data={dashboardData.topProducts}
            columns={[
              { key: "name", label: "Product" },
              { key: "sales", label: "Reviews" },
              {
                key: "revenue",
                label: "Value",
                render: (row) => `₹${(row.revenue / 100000).toFixed(1)}L`,
              },
            ]}
          />

          <div className="space-y-6">
            <InventoryAlert lowStock={dashboardData.lowStock} />

            <ProductTable
              title="Most Viewed"
              data={dashboardData.mostViewed}
              columns={[
                { key: "name", label: "Product" },
                { key: "views", label: "Views" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;