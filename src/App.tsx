import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QRReader from "./pages/QRReader";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          {/* Placeholder routes */}
          <Route path="/chat" element={<DashboardLayout><div className="py-12 text-center">Módulo de Chat em desenvolvimento</div></DashboardLayout>} />
          <Route path="/contracts" element={<DashboardLayout><div className="py-12 text-center">Módulo de Contratos em desenvolvimento</div></DashboardLayout>} />
          <Route path="/employees" element={<DashboardLayout><div className="py-12 text-center">Módulo de Colaboradores em desenvolvimento</div></DashboardLayout>} />
          <Route path="/epi" element={<DashboardLayout><div className="py-12 text-center">Módulo de EPIs em desenvolvimento</div></DashboardLayout>} />
          <Route path="/tools" element={<DashboardLayout><div className="py-12 text-center">Módulo de Ferramentas em desenvolvimento</div></DashboardLayout>} />
          <Route path="/machines" element={<DashboardLayout><div className="py-12 text-center">Módulo de Máquinas em desenvolvimento</div></DashboardLayout>} />
          <Route path="/supplies" element={<DashboardLayout><div className="py-12 text-center">Módulo de Insumos em desenvolvimento</div></DashboardLayout>} />
          <Route path="/qr-reader" element={<DashboardLayout><QRReader /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><div className="py-12 text-center">Módulo de Relatórios em desenvolvimento</div></DashboardLayout>} />
          <Route path="/notifications" element={<DashboardLayout><div className="py-12 text-center">Módulo de Notificações em desenvolvimento</div></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><div className="py-12 text-center">Módulo de Configurações em desenvolvimento</div></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
