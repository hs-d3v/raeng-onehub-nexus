
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-brand-blue" />
              <h1 className="text-lg font-medium text-brand-blue hidden md:block">RAENG OneHub</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">3</span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-brand-blue flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RA</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">Administrador</div>
                  <div className="text-xs text-gray-500">admin@raeng.com.br</div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
