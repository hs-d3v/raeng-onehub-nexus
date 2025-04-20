
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { QrCode, Search, Check, ArrowRight, Trash, Plus } from 'lucide-react';
import QRScanner from './QRScanner';

interface Employee {
  id: string;
  name: string;
  badge: string;
  department: string;
  position: string;
  photo?: string;
}

interface FlowItem {
  id: string;
  name: string;
  code: string;
  type: string;
  quantity: number;
}

interface ItemScannerProps {
  employee: Employee;
  items: FlowItem[];
  onAddItem: (item: FlowItem) => void;
  onContinue: () => void;
}

const ItemScanner: React.FC<ItemScannerProps> = ({ 
  employee, 
  items,
  onAddItem,
  onContinue
}) => {
  const { toast } = useToast();
  const [scanActive, setScanActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FlowItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  // Dados simulados de itens
  const mockItems: FlowItem[] = [
    {
      id: '1',
      name: 'Capacete de Segurança',
      code: 'EPI-001',
      type: 'EPI',
      quantity: 1
    },
    {
      id: '2',
      name: 'Luva de Proteção',
      code: 'EPI-002',
      type: 'EPI',
      quantity: 1
    },
    {
      id: '3',
      name: 'Óculos de Segurança',
      code: 'EPI-003',
      type: 'EPI',
      quantity: 1
    },
    {
      id: '4',
      name: 'Furadeira Industrial',
      code: 'FERR-001',
      type: 'Ferramenta',
      quantity: 1
    },
    {
      id: '5',
      name: 'Chave de Fenda',
      code: 'FERR-002',
      type: 'Ferramenta',
      quantity: 1
    }
  ];

  // Lidar com escaneamento de QR do item
  const handleQRScan = (data: string) => {
    setScanActive(false);
    
    toast({
      title: "QR Code detectado",
      description: `Código: ${data}`,
    });
    
    // Simulando encontrar o item pelo QR
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockItems.length);
      const foundItem = {
        ...mockItems[randomIndex],
        quantity: itemQuantity
      };
      
      onAddItem(foundItem);
      setItemQuantity(1);
    }, 500);
  };

  // Simulação de pesquisa de itens
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulação de delay de API
    setTimeout(() => {
      const results = mockItems.filter(
        item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               item.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "Nenhum item encontrado",
          description: "Tente outro termo de busca",
        });
      }
    }, 500);
  };

  // Adicionar item da busca ao fluxo
  const addItemFromSearch = (item: FlowItem) => {
    onAddItem({
      ...item,
      quantity: itemQuantity
    });
    setSearchResults([]);
    setSearchQuery('');
    setItemQuantity(1);
  };

  // Remover item
  const handleRemoveItem = (id: string) => {
    // Aqui a lógica seria remover o item da lista
    // No entanto, como estamos apenas simulando, não temos uma função de remoção real
    toast({
      title: "Item removido",
      description: "O item foi removido da lista",
    });
  };

  return (
    <div className="space-y-6">
      {/* Informação do colaborador */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Colaborador</h3>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            {employee.photo ? (
              <img src={employee.photo} alt={employee.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-sm font-medium text-brand-blue">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium">{employee.name}</p>
            <p className="text-xs text-gray-500">{employee.position} - {employee.department}</p>
          </div>
        </div>
      </div>

      {/* Escaneamento de itens */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Itens ({items.length})</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">Qtd:</span>
              <Input 
                type="number" 
                min="1"
                value={itemQuantity} 
                onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center" 
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => setScanActive(true)}
            className="h-auto py-3"
          >
            <QrCode className="h-5 w-5 mr-2" />
            <div className="text-left">
              <p>Escanear QR Code</p>
              <p className="text-xs text-gray-500">Use a câmera para escanear</p>
            </div>
          </Button>
          
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={handleSearch}
              className="w-full h-auto py-3"
            >
              <Search className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p>Buscar Item</p>
                <p className="text-xs text-gray-500">Busque por nome ou código</p>
              </div>
            </Button>
            
            {/* Dropdown de resultados */}
            {searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10 max-h-60 overflow-auto"
              >
                {searchResults.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b last:border-0"
                    onClick={() => addItemFromSearch(item)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Código: {item.code}</p>
                      </div>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        
        {scanActive && (
          <div className="mt-4">
            <QRScanner
              title="Escaneie o item"
              description="Posicione o QR Code do item na área de escaneamento"
              onScan={handleQRScan}
              onCancel={() => setScanActive(false)}
            />
          </div>
        )}
      </div>
      
      {/* Lista de itens adicionados */}
      <div>
        <h3 className="font-medium mb-2">Itens adicionados</h3>
        
        <div className="space-y-2 max-h-60 overflow-y-auto border-t border-b py-2">
          <AnimatePresence>
            {items.length > 0 ? (
              items.map((item) => (
                <motion.div
                  key={`${item.id}-${Date.now()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Código: {item.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{item.quantity}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <Search className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-gray-500">Nenhum item adicionado</p>
                <p className="text-xs text-gray-400">Escaneie ou busque itens para adicionar</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-between pt-2">
        <Button 
          variant="ghost" 
          onClick={() => {
            // Adicionar item manual para simulação
            onAddItem({
              id: `manual-${Date.now()}`,
              name: 'Item Adicionado Manualmente',
              code: `MANUAL-${Math.floor(Math.random() * 1000)}`,
              type: 'Manual',
              quantity: itemQuantity
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Manualmente
        </Button>
        
        <Button 
          onClick={onContinue}
          disabled={items.length === 0}
        >
          Continuar
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ItemScanner;
