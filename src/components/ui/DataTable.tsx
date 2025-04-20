
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';

interface Column {
  header: string;
  accessorKey: string;
  cell?: (value: any, row?: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  itemsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  title, 
  itemsPerPage = 10 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  // Filtrar dados baseados na pesquisa
  const filteredData = data.filter(item => {
    // Filtro de busca geral
    const matchesSearch = search === '' || 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(search.toLowerCase())
      );

    // Filtros por coluna
    const matchesColumnFilters = Object.entries(columnFilters).every(([key, value]) => {
      return value === '' || 
        String(item[key]).toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesColumnFilters;
  });

  // Paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-4">
            <div className="space-y-4">
              {columns.map(column => (
                <div key={column.accessorKey} className="space-y-2">
                  <label htmlFor={column.accessorKey} className="text-sm font-medium">
                    {column.header}
                  </label>
                  <Input
                    id={column.accessorKey}
                    placeholder={`Filtrar por ${column.header.toLowerCase()}`}
                    value={columnFilters[column.accessorKey] || ''}
                    onChange={(e) => {
                      setColumnFilters({
                        ...columnFilters,
                        [column.accessorKey]: e.target.value
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {column.cell 
                        ? column.cell(row[column.accessorKey], { original: row }) 
                        : row[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} registros
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-sm">
              Página {currentPage} de {totalPages}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
