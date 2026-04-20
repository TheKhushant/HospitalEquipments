import { useMemo, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";
import RevenueChart from "@/components/admin/RevenueChart";
import ProductTable from "@/components/admin/ProductTable";
import InventoryAlert from "@/components/admin/InventoryAlert";
import ProductAnalysisChart from "@/components/admin/ProductAnalysisChart";
import CustomerAnalysisChart from "@/components/admin/CustomerAnalysisChart";
import StockAnalysisChart from "@/components/admin/StockAnalysisChart";
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

// Mock data for customer growth
const customerGrowthData = [
  { month: "Jan", customers: 1250 },
  { month: "Feb", customers: 1420 },
  { month: "Mar", customers: 1680 },
  { month: "Apr", customers: 1950 },
  { month: "May", customers: 2310 },
  { month: "Jun", customers: 2780 },
  { month: "Jul", customers: 3250 },
  { month: "Aug", customers: 3680 },
  { month: "Sep", customers: 4120 },
  { month: "Oct", customers: 4580 },
  { month: "Nov", customers: 4950 },
  { month: "Dec", customers: 5340 },
];

const AdminDashboard = () => {
  const [period, setPeriod] = useState("30");

  const dashboardData = useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount);
    const inStockProducts = products.filter((product) => product.inStock);
    const outOfStockProducts = products.filter((product) => !product.inStock);
    const lowStockProducts = products.filter((product) => product.reviewCount < 150);
    
    const lowStock = products
      .filter((product) => product.reviewCount < 150)
      .slice(0, 3)
      .map((product) => ({
        id: product.id,
        name: product.name,
        stock: product.inStock ? Math.max(1, Math.floor(product.reviewCount / 60)) : 0,
      }));

    // Prepare top products data for ProductAnalysisChart
    const topProductsForChart = sortedProducts.slice(0, 6).map((product) => ({
      name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
      sales: product.reviewCount,
    }));

    // Prepare stock analysis data
    const stockAnalysisData = [
      { name: "In Stock", value: inStockProducts.length },
      { name: "Low Stock", value: lowStockProducts.length },
      { name: "Out of Stock", value: outOfStockProducts.length },
    ];

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
      outOfStockCount: outOfStockProducts.length,
      lowStockCount: lowStockProducts.length,
      averageRating:
        products.reduce((sum, product) => sum + product.rating, 0) / products.length,
      topProductsForChart,
      stockAnalysisData,
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
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Product Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Static overview of your product catalog, featured items, and availability
            </p>
          </div>

          <Button onClick={exportCSV} variant="outline" className="shadow-sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-6 mb-10 flex items-center gap-4 shadow-sm">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <div>
            <span className="font-semibold">Static Insight:</span>{" "}
            Your catalog contains <span className="text-green-600 font-bold">{dashboardData.totalProducts}</span> products and <span className="text-green-600 font-bold">{dashboardData.inStockCount}</span> are available now.
            <span className="ml-2 text-gray-600">
              Average rating is {dashboardData.averageRating.toFixed(1)} stars.
            </span>
          </div>
        </div>

        {/* KPI Cards */}
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

        {/* Existing Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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

        {/* New Advanced Analytics Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
            <p className="text-gray-600 mt-1">In-depth insights into product performance, customer growth, and inventory status</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProductAnalysisChart 
              data={dashboardData.topProductsForChart} 
              title="Product Performance"
            />
            <CustomerAnalysisChart 
              data={customerGrowthData} 
              title="Customer Growth"
            />
            <StockAnalysisChart 
              data={dashboardData.stockAnalysisData} 
              title="Stock Distribution"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;