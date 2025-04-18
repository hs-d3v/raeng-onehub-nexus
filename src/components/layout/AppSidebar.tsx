
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
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  
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
      badge: "3",
    },
    {
      title: "Configurações",
      icon: Settings,
      url: "/settings",
    },
  ];

  const isActiveRoute = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar className="bg-brand-blue border-r border-brand-blue/20">
      <SidebarHeader>
        <div className="flex justify-between items-center p-4">
          <Logo />
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActiveRoute(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="text-white group-data-[collapsible=icon]:text-white/80">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                      {item.badge && (
                        <div className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge}
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
