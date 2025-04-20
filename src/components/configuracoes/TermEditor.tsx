
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { FileText, Check, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const mockDefaultTerm = `Eu, {NOME_COLABORADOR}, portador do crachá {NUMERO_CRACHA}, declaro ter recebido os itens abaixo relacionados em perfeitas condições de uso:

{LISTA_ITEMS}

Comprometo-me a zelar pela conservação do(s) item(ns), utilizando-o(s) exclusivamente para fins profissionais e a devolvê-lo(s) quando solicitado ou ao término do contrato de trabalho.

{DATA}

{ASSINATURA_DIGITAL}`;

const TermEditor = () => {
  const { toast } = useToast();
  const [termContent, setTermContent] = useState(mockDefaultTerm);
  const [termTitle, setTermTitle] = useState('TERMO DE ENTREGA DE EQUIPAMENTOS');
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleSaveTerm = () => {
    toast({
      title: "Termo salvo com sucesso",
      description: "O modelo de termo digital foi atualizado"
    });
  };
  
  const handleResetTerm = () => {
    setTermContent(mockDefaultTerm);
    setTermTitle('TERMO DE ENTREGA DE EQUIPAMENTOS');
    toast({
      title: "Termo restaurado",
      description: "O termo foi restaurado para o modelo padrão"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-blue" />
          Editor de Termo Digital
        </CardTitle>
        <CardDescription>
          Personalize o termo digital utilizado nos fluxos de entrega com assinatura eletrônica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={previewMode ? "preview" : "edit"} onValueChange={(value) => setPreviewMode(value === "preview")}>
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="term-title">Título do Termo</Label>
              <Input 
                id="term-title"
                value={termTitle}
                onChange={(e) => setTermTitle(e.target.value)}
                placeholder="Título do termo digital"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="term-content">Conteúdo do Termo</Label>
                <span className="text-xs text-gray-500">
                  Use {'{NOME_COLABORADOR}'}, {'{NUMERO_CRACHA}'}, {'{LISTA_ITEMS}'}, {'{DATA}'}, {'{ASSINATURA_DIGITAL}'} como variáveis
                </span>
              </div>
              <Textarea 
                id="term-content"
                value={termContent}
                onChange={(e) => setTermContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Conteúdo do termo digital"
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleResetTerm}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Restaurar Padrão
              </Button>
              <Button onClick={handleSaveTerm}>
                <Check className="h-4 w-4 mr-2" />
                Salvar Termo
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-lg font-bold text-center mb-6">{termTitle}</h2>
                  
                  <div className="whitespace-pre-line">
                    {termContent
                      .replace('{NOME_COLABORADOR}', '<strong>João Silva</strong>')
                      .replace('{NUMERO_CRACHA}', '<strong>COLAB-001</strong>')
                      .replace('{LISTA_ITEMS}', '<ul class="list-disc list-inside my-2"><li>Capacete de Segurança - EPI-001 (Qtd: 1)</li><li>Luva de Proteção - EPI-002 (Qtd: 2)</li></ul>')
                      .replace('{DATA}', 'Data: 19/04/2025')
                      .replace('{ASSINATURA_DIGITAL}', '<div class="mt-8 text-center"><div class="border-b border-gray-300 w-48 mx-auto mb-2"></div><p>João Silva</p><p class="text-xs text-gray-500">Assinatura Digital</p></div>')
                    }
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Exemplo PDF
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TermEditor;
