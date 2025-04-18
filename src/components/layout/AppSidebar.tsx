
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  Users,
  HardHat,
  Wrench,
  Truck,
  Package2,
  QrCode,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: "Chat",
      icon: MessageCircle,
      url: "/chat",
    },
    {
      title: "Contratos",
      icon: FileText,
      url: "/contracts",
    },
    {
      title: "Colaboradores",
      icon: Users,
      url: "/employees",
    },
    {
      title: "EPIs",
      icon: HardHat,
      url: "/epi",
    },
    {
      title: "Ferramentas",
      icon: Wrench,
      url: "/tools",
    },
    {
      title: "Máquinas",
      icon: Truck,
      url: "/machines",
    },
    {
      title: "Insumos",
      icon: Package2,
      url: "/supplies",
    },
    {
      title: "Leitor QR",
      icon: QrCode,
      url: "/qr-reader",
    },
    {
      title: "Relatórios",
      icon: BarChart3,
      url: "/reports",
    },
    {
      title: "Notificações",
      icon: Bell,
      url: "/notifications",
    },
    {
      title: "Configurações",
      icon: Settings,
      url: "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-md">
              <Logo />
            </div>
            <span className="text-lg font-bold text-gray-800">RAENG</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-bold text-gray-400 uppercase">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-3">
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg text-white">
                        <item.icon size={16} />
                      </span>
                      <span className="font-medium text-gray-700">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-red-400 to-red-500 text-white border-none hover:from-red-500 hover:to-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
