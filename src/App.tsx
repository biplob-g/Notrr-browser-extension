import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Set proper dimensions for Chrome extension popup
  useEffect(() => {
    // Check if running as Chrome extension
    const isExtension = window.location.protocol === "chrome-extension:";
    if (isExtension) {
      // Check if on mobile
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // For mobile, use a more adaptive approach
        document.body.style.width = "700px";
        document.body.style.height = "600px";
      } else {
        // For desktop extension popup
        document.body.style.width = "700px";
        document.body.style.height = "600px";
      }
      
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";
      
      // Add meta viewport tag for proper mobile scaling
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/index.html" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
