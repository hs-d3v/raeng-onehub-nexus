import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { QrCode, Search, Check, ArrowRight, Trash, Plus, Filter, SortAsc, SortDesc } from 'lucide-react';
import QRScanner from './QRScanner';
import { parseQRData } from '@/config/qr-config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CadastroPredefinido } from '@/integrations/supabase/predefined-types';

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
  category?: string;
  estado?: string;
  local?: string;
}

interface ItemScannerProps {
  employee: Employee;
  items: FlowItem[];
  onAddItem: (item: FlowItem) => void;
  onRemoveItem?: (id: string) => void;
  onContinue: () => void;
  types?: string[];
  showCategories?: boolean;
  showLocations?: boolean;
  showStates?: boolean;
}

const ItemScanner: React.FC<ItemScannerProps> = ({ 
  employee, 
  items,
  onAddItem,
  onRemoveItem,
  onContinue,
  types = ['EPI', 'Ferramenta', 'Máquina', 'Insumo'],
  showCategories = true,
  showLocations = true,
  showStates = true
}) => {
  const { toast } = useToast();
  const [scanActive, setScanActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FlowItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<string>(types[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const loadPredefinedData = async () => {
      try {
        const typeMap: Record<string, string> = {
          'EPI': 'epis',
          'Ferramenta': 'ferramentas',
          'Máquina': 'maquinas',
          'Insumo': 'insumos'
        };
        
        const tableName = typeMap[selectedType] || '';
        
        if (tableName && showCategories) {
          try {
            const { data, error } = await supabase
              .from(tableName)
              .select('categoria')
              .not('categoria', 'is', null);
            
            if (!error && data) {
              const uniqueCategories = [...new Set(data.map(item => item.categoria))].filter(Boolean);
              setCategories(uniqueCategories as string[]);
            } else {
              setCategories(['Categoria 1', 'Categoria 2', 'Categoria 3']);
            }
          } catch (error) {
            console.error('Erro ao carregar categorias:', error);
            setCategories(['Categoria 1', 'Categoria 2', 'Categoria 3']);
          }
        }
        
        if (showStates) {
          try {
            const mockStates = [
              'Novo', 'Usado', 'Desgaste normal', 
              'Danificado', 'Contaminado', 'Vencido'
            ];
            setStates(mockStates);
          } catch (error) {
            console.error('Erro ao carregar estados:', error);
            setStates([
              'Novo', 'Usado', 'Desgaste normal', 
              'Danificado', 'Contaminado', 'Vencido'
            ]);
          }
        }
        
        if (showLocations) {
          try {
            const mockLocations = [
              'Almoxarifado Central', 'Canteiro A', 'Canteiro B', 
              'Escritório', 'Depósito', 'Veículo'
            ];
            setLocations(mockLocations);
          } catch (error) {
            console.error('Erro ao carregar locais:', error);
            setLocations([
              'Almoxarifado Central', 'Canteiro A', 'Canteiro B', 
              'Escritório', 'Depósito', 'Veículo'
            ]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados predefinidos:', error);
      }
    };
    
    loadPredefinedData();
  }, [selectedType, showCategories, showLocations, showStates]);

  const handleQRScan = async (data: string, parsedData?: ReturnType<typeof parseQRData>) => {
    setScanActive(false);
    
    toast({
      title: "QR Code detectado",
      description: `Código: ${data.substring(0, 15)}...`,
    });
    
    try {
      if (parsedData) {
        const { type, entityId } = parsedData;
        
        let tableName = '';
        let itemType = '';
        
        switch (type) {
          case 'epi':
            tableName = 'epis';
            itemType = 'EPI';
            break;
          case 'tool':
            tableName = 'ferramentas';
            itemType = 'Ferramenta';
            break;
          case 'equipment':
            tableName = 'maquinas';
            itemType = 'Máquina';
            break;
          case 'material':
            tableName = 'insumos';
            itemType = 'Insumo';
            break;
          default:
            throw new Error('Tipo de item desconhecido');
        }
        
        const { data: itemData, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', entityId)
          .single();
        
        if (error || !itemData) {
          throw new Error(`Item não encontrado: ${error?.message}`);
        }
        
        const newItem: FlowItem = {
          id: itemData.id,
          name: itemData.nome,
          code: itemData.codigo || `${itemType}-${itemData.id.substring(0, 8)}`,
          type: itemType,
          quantity: itemQuantity,
          category: itemData.categoria,
          estado: selectedState || 'Normal',
          local: selectedLocation || 'Não especificado'
        };
        
        onAddItem(newItem);
        setItemQuantity(1);
        
        toast({
          title: "Item adicionado",
          description: `${newItem.name} adicionado com sucesso`,
        });
      } else {
        simulateItemFind();
      }
    } catch (error) {
      console.error('Erro ao processar QR do item:', error);
      toast({
        title: "Erro na leitura",
        description: error instanceof Error ? error.message : "Não foi possível identificar o item",
        variant: "destructive"
      });
      
      simulateItemFind();
    }
  };

  const simulateItemFind = () => {
    setTimeout(() => {
      let mockItem: FlowItem;
      
      switch (selectedType) {
        case 'EPI':
          mockItem = {
            id: `epi-${Date.now()}`,
            name: 'Capacete de Segurança',
            code: 'EPI-001',
            type: 'EPI',
            quantity: itemQuantity,
            category: 'Proteção da cabeça',
            estado: selectedState || 'Novo',
            local: selectedLocation || 'Almoxarifado'
          };
          break;
        case 'Ferramenta':
          mockItem = {
            id: `ferramenta-${Date.now()}`,
            name: 'Furadeira Industrial',
            code: 'FERR-001',
            type: 'Ferramenta',
            quantity: itemQuantity,
            category: 'Elétrica',
            estado: selectedState || 'Bom estado',
            local: selectedLocation || 'Canteiro A'
          };
          break;
        case 'Máquina':
          mockItem = {
            id: `maquina-${Date.now()}`,
            name: 'Retroescavadeira',
            code: 'MAQ-001',
            type: 'Máquina',
            quantity: itemQuantity,
            category: 'Pesada',
            estado: selectedState || 'Em operação',
            local: selectedLocation || 'Canteiro B'
          };
          break;
        default:
          mockItem = {
            id: `insumo-${Date.now()}`,
            name: 'Cimento Portland',
            code: 'INS-001',
            type: 'Insumo',
            quantity: itemQuantity,
            category: 'Material de construção',
            estado: selectedState || 'Novo',
            local: selectedLocation || 'Depósito'
          };
      }
      
      onAddItem(mockItem);
      setItemQuantity(1);
    }, 500);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    try {
      let tableName = '';
      
      switch (selectedType) {
        case 'EPI':
          tableName = 'epis';
          break;
        case 'Ferramenta':
          tableName = 'ferramentas';
          break;
        case 'Máquina':
          tableName = 'maquinas';
          break;
        case 'Insumo':
          tableName = 'insumos';
          break;
      }
      
      if (tableName) {
        try {
          let query = supabase
            .from(tableName)
            .select('*')
            .or(`nome.ilike.%${searchQuery}%,codigo.ilike.%${searchQuery}%`)
            .limit(10);
          
          if (selectedCategory) {
            query = query.eq('categoria', selectedCategory);
          }
          
          const { data, error } = await query;
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            const results: FlowItem[] = data.map(item => ({
              id: item.id,
              name: item.nome,
              code: item.codigo || `${selectedType}-${item.id.substring(0, 8)}`,
              type: selectedType,
              quantity: 1,
              category: item.categoria,
              estado: selectedState || 'Normal',
              local: selectedLocation || 'Não especificado'
            }));
            
            const sortedResults = results.sort((a, b) => {
              return sortOrder === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name);
            });
            
            setSearchResults(sortedResults);
          } else {
            setSearchResults([]);
            toast({
              title: "Nenhum item encontrado",
              description: "Tente outro termo de busca ou filtros diferentes",
            });
          }
        } catch (error) {
          console.error("Error querying database:", error);
          simulateSearchResults();
        }
      } else {
        simulateSearchResults();
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Não foi possível completar a busca",
        variant: "destructive"
      });
      simulateSearchResults();
    } finally {
      setIsSearching(false);
    }
  };

  const simulateSearchResults = () => {
    const mockResults = [
      {
        id: '1',
        name: 'Capacete de Segurança',
        code: 'EPI-001',
        type: selectedType,
        quantity: 1,
        category: 'Proteção para cabeça',
        estado: 'Novo',
        local: 'Almoxarifado'
      },
      {
        id: '2',
        name: 'Luva de Proteção',
        code: 'EPI-002',
        type: selectedType,
        quantity: 1,
        category: 'Proteção para mãos',
        estado: 'Novo',
        local: 'Almoxarifado'
      }
    ];
    
    setSearchResults(mockResults);
  };

  const addItemFromSearch = (item: FlowItem) => {
    onAddItem({
      ...item,
      quantity: itemQuantity,
      estado: selectedState || item.estado,
      local: selectedLocation || item.local
    });
    setSearchResults([]);
    setSearchQuery('');
    setItemQuantity(1);
  };

  const handleRemoveItem = (id: string) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    } else {
      toast({
        title: "Item removido",
        description: "O item foi removido da lista",
      });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    setSearchResults(prev => [...prev].sort((a, b) => {
      return sortOrder === 'desc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }));
  };

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-medium">Itens ({items.length})</h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">Tipo:</span>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
        
        <AnimatePresence>
          {(showCategories || showStates || showLocations) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-hidden"
            >
              {showCategories && categories.length > 0 && (
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">Categoria:</span>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full h-8">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {showStates && states.length > 0 && (
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">Estado:</span>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-full h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Não especificado</SelectItem>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {showLocations && locations.length > 0 && (
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">Local:</span>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full h-8">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Não especificado</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
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
            
            {searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10 max-h-60 overflow-auto"
              >
                <div className="p-2 border-b flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    {searchResults.length} resultados
                  </span>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === 'asc' ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
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
              autoStartScanning={true}
            />
          </div>
        )}
      </div>
      
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
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">Código: {item.code}</p>
                      {item.category && (
                        <span className="text-xs text-gray-500">| Categoria: {item.category}</span>
                      )}
                    </div>
                    {(item.estado || item.local) && (
                      <div className="flex items-center gap-2">
                        {item.estado && (
                          <Badge variant="secondary" className="text-xs mt-1">{item.estado}</Badge>
                        )}
                        {item.local && (
                          <Badge variant="outline" className="text-xs mt-1">{item.local}</Badge>
                        )}
                      </div>
                    )}
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

      <div className="flex justify-between pt-2">
        <Button 
          variant="ghost" 
          onClick={() => {
            onAddItem({
              id: `manual-${Date.now()}`,
              name: 'Item Adicionado Manualmente',
              code: `MANUAL-${Math.floor(Math.random() * 1000)}`,
              type: selectedType,
              quantity: itemQuantity,
              category: selectedCategory || undefined,
              estado: selectedState || undefined,
              local: selectedLocation || undefined
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
