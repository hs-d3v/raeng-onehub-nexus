
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, EyeOff, Eye, User, Shield, Scan } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import QRScanner from '@/components/qr/QRScanner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('credentials');
  const [scanActive, setScanActive] = useState(false);
  const { toast } = useToast();
  const { login, loginWithQRCode, loginWithBiometrics, isLoading } = useAuth();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
    } catch (error) {
      // Error is handled in the Auth context
    }
  };

  const handleQRScan = async (data: string) => {
    try {
      await loginWithQRCode(data);
    } catch (error) {
      // Error is handled in the Auth context
      setScanActive(false);
    }
  };

  const handleBiometricLogin = async (type: 'facial' | 'digital') => {
    try {
      // In a real implementation, this would capture biometric data
      // For now, we'll just pass a mock biometric ID
      const mockBiometricId = `mock-${type}-id-${Date.now()}`;
      await loginWithBiometrics(mockBiometricId, type);
    } catch (error) {
      // Error is handled in the Auth context
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full p-8">
      <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
        <Shield className="h-8 w-8 text-brand-blue" />
        <h1 className="text-2xl font-bold">RAENG SafeHub</h1>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Bem-vindo ao RAENG OneHub</h2>
        <p className="text-muted-foreground">Escolha um método de autenticação</p>
      </div>

      <Tabs defaultValue="credentials" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="credentials" className="flex items-center gap-1">
            <User className="h-4 w-4 mr-1" />
            <span>Login</span>
          </TabsTrigger>
          <TabsTrigger value="qrcode" className="flex items-center gap-1">
            <QrCode className="h-4 w-4 mr-1" />
            <span>QR Code</span>
          </TabsTrigger>
          <TabsTrigger value="biometric" className="flex items-center gap-1">
            <Scan className="h-4 w-4 mr-1" />
            <span>Biometria</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credentials">
          <form onSubmit={handleCredentialsLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu.email@empresa.com.br" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-xs text-brand-blue hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Sua senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">Lembrar de mim</Label>
            </div>

            <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="qrcode">
          {scanActive ? (
            <QRScanner
              title="Escaneie o QR Code do seu crachá"
              description="Posicione o QR Code do seu crachá na área de escaneamento"
              onScan={handleQRScan}
              onCancel={() => setScanActive(false)}
            />
          ) : (
            <div className="flex flex-col items-center py-8">
              <QrCode className="h-16 w-16 text-brand-blue mb-4" />
              <h3 className="text-lg font-medium mb-1">Login com Crachá</h3>
              <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                Escaneie o QR Code do seu crachá para acesso rápido ao sistema.
              </p>
              <Button onClick={() => setScanActive(true)} className="bg-brand-blue hover:bg-brand-blue/90">
                <QrCode className="mr-2 h-4 w-4" />
                Escanear QR do Crachá
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="biometric">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-6 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => handleBiometricLogin('facial')}>
              <User className="h-12 w-12 text-brand-green mb-3" />
              <h3 className="text-base font-medium">Facial</h3>
              <p className="text-xs text-gray-500 text-center mt-1">
                Reconhecimento facial
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => handleBiometricLogin('digital')}>
              <Scan className="h-12 w-12 text-brand-purple mb-3" />
              <h3 className="text-base font-medium">Digital</h3>
              <p className="text-xs text-gray-500 text-center mt-1">
                Impressão digital
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Escolha um método biométrico para login</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Para suporte, entre em contato com o administrador do sistema</p>
      </div>
    </div>
  );
};

export default LoginForm;
