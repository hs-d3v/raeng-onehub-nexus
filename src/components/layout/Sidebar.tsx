import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { Shield, LayoutDashboard, MessageSquare, FileText, Users, HardHat, Wrench, Truck, Package, QrCode, FileBarChart2, Bell, Settings, ChevronLeft, ChevronRight, LogOut, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  notification?: number;
};
const sidebarItems: SidebarItem[] = [{
  name: 'Dashboard',
  path: '/dashboard',
  icon: <LayoutDashboard size={20} />
}, {
  name: 'Chat',
  path: '/chat',
  icon: <MessageSquare size={20} />,
  notification: 3
}, {
  name: 'Contratos',
  path: '/contratos',
  icon: <FileText size={20} />
}, {
  name: 'Colaboradores',
  path: '/colaboradores',
  icon: <Users size={20} />
}, {
  name: 'EPIs',
  path: '/epis',
  icon: <HardHat size={20} />,
  notification: 2
}, {
  name: 'Ferramentas',
  path: '/ferramentas',
  icon: <Wrench size={20} />
}, {
  name: 'Máquinas',
  path: '/maquinas',
  icon: <Truck size={20} />
}, {
  name: 'Insumos',
  path: '/insumos',
  icon: <Package size={20} />
}, {
  name: 'Leitor QR',
  path: '/leitor-qr',
  icon: <QrCode size={20} />
}, {
  name: 'Relatórios',
  path: '/relatorios',
  icon: <FileBarChart2 size={20} />
}, {
  name: 'Notificações',
  path: '/notificacoes',
  icon: <Bell size={20} />,
  notification: 5
}, {
  name: 'Configurações',
  path: '/configuracoes',
  icon: <Settings size={20} />
}];
interface SidebarProps {
  expanded: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  expanded = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(sidebarItems);
  const location = useLocation();
  const {
    logout
  } = useAuth();
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(sidebarItems);
    } else {
      const filtered = sidebarItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredItems(filtered);
    }
  }, [searchQuery]);

  // Variantes para animação
  const sidebarVariants = {
    expanded: {
      width: '16rem'
    },
    collapsed: {
      width: '5rem'
    }
  };
  return <motion.div initial={{
    x: -20,
    opacity: 0
  }} animate={{
    x: 0,
    opacity: 1,
    width: expanded ? '16rem' : '5rem'
  }} transition={{
    duration: 0.3
  }} className={cn("h-screen bg-gradient-sidebar from-brand-blue-dark via-brand-blue to-brand-blue-light flex flex-col transition-all duration-300 text-white")}>
      {/* Logo e título */}
      <div className="px-4 border-b border-white/10 py-[15px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-white animate-float" />
            <AnimatePresence>
              {expanded && <motion.h1 initial={{
              opacity: 0,
              width: 0
            }} animate={{
              opacity: 1,
              width: 'auto'
            }} exit={{
              opacity: 0,
              width: 0
            }} transition={{
              duration: 0.2
            }} className="font-bold overflow-hidden text-2xl">OneHUB</motion.h1>}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="px-3 pt-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/60" />
          <Input type="text" placeholder={expanded ? "Buscar..." : ""} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={`pl-8 bg-white/10 border-white/20 placeholder:text-white/60 text-white focus-visible:ring-white/30 ${expanded ? '' : 'w-full'}`} />
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-6 px-2 overflow-y-auto scrollbar-none">
        <motion.ul className="space-y-2" variants={{
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }} initial="hidden" animate="show">
          {filteredItems.map((item, index) => <motion.li key={item.name} variants={{
          hidden: {
            opacity: 0,
            x: -20
          },
          show: {
            opacity: 1,
            x: 0
          }
        }} transition={{
          duration: 0.2
        }}>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.path} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 relative", location.pathname === item.path ? "bg-white/20 text-white font-medium" : "text-white/80 hover:bg-white/10", !expanded && "justify-center")}>
                      <span className="flex items-center justify-center">
                        {item.icon}
                      </span>
                      <AnimatePresence>
                        {expanded && <motion.span initial={{
                      opacity: 0,
                      width: 0
                    }} animate={{
                      opacity: 1,
                      width: 'auto'
                    }} exit={{
                      opacity: 0,
                      width: 0
                    }} transition={{
                      duration: 0.2
                    }} className="flex-1 whitespace-nowrap overflow-hidden">
                            {item.name}
                          </motion.span>}
                      </AnimatePresence>
                      
                      {item.notification && <span className={`bg-brand-orange text-white text-xs rounded-full h-5 flex items-center justify-center 
                          ${expanded ? 'w-5 px-0' : 'w-5 absolute -top-1 -right-1'}`}>
                          {item.notification}
                        </span>}
                    </Link>
                  </TooltipTrigger>
                  {!expanded && <TooltipContent side="right" className="bg-brand-blue-dark text-white">
                      <p>{item.name}</p>
                    </TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </motion.li>)}
        </motion.ul>
      </nav>

      {/* Perfil do usuário */}
      <div className="py-4 px-4 border-t border-white/10">
        <div className={cn("flex items-center gap-3", !expanded && "justify-center")}>
          <div className="h-8 w-8 bg-white/20 rounded-full overflow-hidden">
            <img src="/placeholder.svg" alt="Usuário" className="h-full w-full object-cover" />
          </div>
          <AnimatePresence>
            {expanded && <motion.div initial={{
            opacity: 0,
            width: 0
          }} animate={{
            opacity: 1,
            width: 'auto'
          }} exit={{
            opacity: 0,
            width: 0
          }} transition={{
            duration: 0.2
          }} className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium truncate">Administrador</p>
                <p className="text-xs text-white/70 truncate">admin@raeng.com.br</p>
              </motion.div>}
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10" onClick={logout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </motion.div>;
};
export default Sidebar;