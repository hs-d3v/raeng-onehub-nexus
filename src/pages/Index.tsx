import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandingColumn from '@/components/BrandingColumn';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Lock, LogIn, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/theme-toggle';
const Index = () => {
  const {
    login,
    isLoading
  } = useAuth();
  const [email, setEmail] = useState('admin@raeng.com.br');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    theme
  } = useTheme();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo ao sistema RAENG SafeHub."
      });
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro ao fazer login');
      }
    }
  };
  return <div className="min-h-screen flex">
      {/* Coluna de Branding (lado esquerdo) */}
      <div className="flex-1 hidden lg:block">
        <BrandingColumn />
      </div>
      
      {/* Coluna de Login (lado direito) */}
      <div className="flex-1 flex flex-col justify-center bg-white dark:bg-gray-900 p-4 sm:p-8 md:p-12 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="max-w-md mx-auto w-full">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-brand-blue/10 mb-4">
              <Shield className="h-10 w-10 text-brand-blue rounded-none" />
            </div>
            <h1 className="text-2xl font-bold mb-1">RAENG OneHUB</h1>
            <p className="text-gray-500 dark:text-gray-400">Sistema integrado de gestão de segurança do trabalho</p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="seu.email@empresa.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <AnimatePresence>
                {error && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} exit={{
                opacity: 0,
                height: 0
              }} className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    {error}
                  </motion.div>}
              </AnimatePresence>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-500">
                    Lembrar-me
                  </label>
                </div>
                
                <a href="#" className="text-sm font-medium text-brand-blue hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              
              <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
                {isLoading ? <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Entrando...
                  </> : <>
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </>}
              </Button>
            </form>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Credenciais de demonstração:</p>
              <p className="font-mono mt-1">admin@raeng.com.br / admin</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Index;