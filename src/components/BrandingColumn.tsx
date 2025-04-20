
import React from 'react';
import { Shield, Check } from 'lucide-react';

const BrandingColumn = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full w-full bg-gradient-to-br from-brand-blue to-brand-purple/90 text-white p-12">
      <div>
        <div className="flex items-center gap-2 mb-12">
          <Shield className="h-10 w-10" />
          <h1 className="text-3xl font-bold">RAENG OneHub</h1>
        </div>
        <h2 className="text-4xl font-bold mb-6">Gestão integrada com segurança de dados para sua empresa</h2>
        <p className="text-xl opacity-90 mb-12">Monitore contratos, colaboradores, equipamentos e insumos em um único lugar.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-white/20 p-1 rounded-full">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Segurança em primeiro lugar</h3>
            <p className="opacity-80">Gestão completa de EPIs, ferramentas e treinamentos</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-white/20 p-1 rounded-full">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Eficiência operacional</h3>
            <p className="opacity-80">Rastreabilidade completa com tecnologia QR Code</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-white/20 p-1 rounded-full">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Relatórios detalhados</h3>
            <p className="opacity-80">Indicadores e insights para tomada de decisão</p>
          </div>
        </div>
      </div>

      
      <div className="text-sm opacity-70">
        © 2025 OneHUB. Todos os direitos reservados. Hugo Serra | Dev.Hub
      </div>
    </div>
  );
};

export default BrandingColumn;
