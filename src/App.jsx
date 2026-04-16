import { Toaster } from "./components/ui/Toaster.jsx";
import { Toaster as Sonner } from "./components/ui/Sonner.jsx";
import { TooltipProvider } from "./components/ui/Tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { ComparisonProvider } from "./context/ComparisonContext.jsx";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart";
import About from "./pages/About";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";
import HospitalSetupPlannerPage from "./pages/HospitalSetupPlannerPage.jsx";
import OrderTrackingPage from "./pages/OrderTrackingPage.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <WhatsAppButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/hospital-planner" element={<HospitalSetupPlannerPage />} />
            <Route path="/order-tracking" element={<OrderTrackingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ComparisonProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
