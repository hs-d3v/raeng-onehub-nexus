
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake authentication for demo
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left column - Branding */}
      <div className="w-full md:w-1/2 bg-brand-blue flex items-center justify-center p-10">
        <div className="max-w-lg text-white text-center md:text-left">
          <Logo className="mx-auto md:mx-0 mb-6" size="lg" />
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Bem-vindo ao RAENG OneHub
          </h1>
          
          <p className="text-xl mb-6">
            Sistema integrado de gestão para segurança, equipamentos, contratos e recursos humanos.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold">Gestão Integrada</h3>
              <p className="text-sm">Unifique informações e processos em um só lugar</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold">Controle Total</h3>
              <p className="text-sm">Monitore e otimize recursos em tempo real</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold">Análise Avançada</h3>
              <p className="text-sm">Relatórios e insights para decisões estratégicas</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold">Segurança</h3>
              <p className="text-sm">Proteja seus dados com autenticação segura</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-brand-blue">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ou continue com
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">Microsoft</Button>
              <Button variant="outline" className="w-full">Google</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
