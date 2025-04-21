
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Lazy loaded components
const Index = lazy(() => import("./pages/Index"));
const DashboardPage = lazy(() => import("./components/dashboard/DashboardPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ContratosPage = lazy(() => import("./pages/ContratosPage"));
const ColaboradoresPage = lazy(() => import("./pages/ColaboradoresPage"));
const DetalhesColaborador = lazy(() => import("./components/colaboradores/DetalhesColaborador"));
const EPIsPage = lazy(() => import("./pages/EPIsPage"));
const FerramentasPage = lazy(() => import("./pages/FerramentasPage"));
const MaquinasPage = lazy(() => import("./pages/MaquinasPage"));
const InsumosPage = lazy(() => import("./pages/InsumosPage"));
const LeitorQRPage = lazy(() => import("./pages/LeitorQRPage"));
const RelatoriosPage = lazy(() => import("./pages/RelatoriosPage"));
const NotificacoesPage = lazy(() => import("./pages/NotificacoesPage"));
const ConfiguracoesPage = lazy(() => import("./pages/ConfiguracoesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 border-4 border-t-brand-blue border-r-transparent border-b-brand-purple border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Carregando...</p>
    </motion.div>
  </div>
);

// AppContent component that will have access to navigation
const AppContent = () => {
  const navigate = useNavigate();
  
  return (
    <ThemeProvider>
      <AuthProvider navigate={navigate}>
        <TooltipProvider>
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/contratos" element={<ContratosPage />} />
                <Route path="/colaboradores" element={<ColaboradoresPage />} />
                <Route path="/colaboradores/:id" element={<DetalhesColaborador />} />
                <Route path="/epis" element={<EPIsPage />} />
                <Route path="/ferramentas" element={<FerramentasPage />} />
                <Route path="/maquinas" element={<MaquinasPage />} />
                <Route path="/insumos" element={<InsumosPage />} />
                <Route path="/leitor-qr" element={<LeitorQRPage />} />
                <Route path="/relatorios" element={<RelatoriosPage />} />
                <Route path="/notificacoes" element={<NotificacoesPage />} />
                <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
