import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const toggleContentExpanded = () => {
    setIsContentExpanded(!isContentExpanded);
  };
  return <div className="flex h-screen w-full bg-gray-50/50 dark:bg-gray-900">
      <Sidebar expanded={!isContentExpanded} />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isContentExpanded ? 'ml-0' : ''}`}>
        {/* Header */}
        <motion.header initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.3
      }} className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleContentExpanded} className="mr-2">
              {isContentExpanded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
            <h1 className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent font-extrabold text-lg">RAENG OneHUB</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative hover:bg-brand-blue/5">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <AnimatePresence>
                  {[1, 2, 3].map(i => <motion.div key={i} initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} exit={{
                  opacity: 0,
                  height: 0
                }} transition={{
                  duration: 0.2
                }}>
                      <DropdownMenuItem className="py-3 cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">{i === 1 ? 'EPIs com validade próxima' : i === 2 ? 'Contrato em fase final' : 'Manutenção programada'}</p>
                          <p className="text-xs text-gray-500">{i === 1 ? '5 EPIs vencem nos próximos 30 dias' : i === 2 ? 'Contrato #1234 vence em 15 dias' : 'Máquina XYZ-123 tem manutenção amanhã'}</p>
                        </div>
                      </DropdownMenuItem>
                    </motion.div>)}
                </AnimatePresence>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver todas as notificações
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <motion.div initial={{
            scale: 0.95,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gradient-to-br from-brand-blue to-brand-purple rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                <img src="/placeholder.svg" alt="Usuário" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || 'Administrador'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@raeng.com.br'}</p>
              </div>
            </motion.div>
          </div>
        </motion.header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
            {children}
          </motion.div>
        </main>
      </div>
      
      <Toaster />
    </div>;
};
export default MainLayout;