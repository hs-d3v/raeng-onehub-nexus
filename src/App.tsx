
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QRReader from "./pages/QRReader";
import Chat from "./pages/Chat";
import Contracts from "./pages/Contracts";
import Employees from "./pages/Employees";
import Epi from "./pages/Epi";
import Tools from "./pages/Tools";
import Machines from "./pages/Machines";
import Supplies from "./pages/Supplies";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
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
          <Route path="/chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
          <Route path="/contracts" element={<DashboardLayout><Contracts /></DashboardLayout>} />
          <Route path="/employees" element={<DashboardLayout><Employees /></DashboardLayout>} />
          <Route path="/epi" element={<DashboardLayout><Epi /></DashboardLayout>} />
          <Route path="/tools" element={<DashboardLayout><Tools /></DashboardLayout>} />
          <Route path="/machines" element={<DashboardLayout><Machines /></DashboardLayout>} />
          <Route path="/supplies" element={<DashboardLayout><Supplies /></DashboardLayout>} />
          <Route path="/qr-reader" element={<DashboardLayout><QRReader /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
          <Route path="/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
