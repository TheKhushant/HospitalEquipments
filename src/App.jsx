import { Toaster } from "./components/ui/Toaster.jsx";
import { Toaster as Sonner } from "./components/ui/Sonner.jsx";
import { TooltipProvider } from "./components/ui/Tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart";
import About from "./pages/About";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CompareEquip from "./components/comparison/CompareEquip.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/compare" element={<CompareEquip />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
