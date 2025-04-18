
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
          <Logo />
          <Button variant="ghost" size="icon" className="md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
