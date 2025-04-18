
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { QrCode, Search, User, FileText, RefreshCcw, Download } from "lucide-react";

export default function QRReader() {
  const [selectedFlow, setSelectedFlow] = useState("entrega");
  const [enableDigitalForm, setEnableDigitalForm] = useState(false);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leitor QR</h1>
      
      <Tabs defaultValue="entrega" className="w-full" onValueChange={setSelectedFlow}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="entrega">Entrega</TabsTrigger>
          <TabsTrigger value="devolucao">Devolução</TabsTrigger>
          <TabsTrigger value="troca">Troca</TabsTrigger>
          <TabsTrigger value="aplicacao">Aplicação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entrega" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Entrega</CardTitle>
              <CardDescription>Registre a entrega de itens para colaboradores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. Autenticação do Colaborador</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">do crachá</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/matrícula</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <User className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Biometria</div>
                      <div className="text-xs text-muted-foreground">facial/digital</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">2. Seleção de Itens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">dos itens</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/código</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="digital-term" checked={enableDigitalForm} onCheckedChange={setEnableDigitalForm} />
                <Label htmlFor="digital-term">Habilitar geração de termo digital com assinatura eletrônica</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-brand-green">Finalizar Entrega</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devolucao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Devolução</CardTitle>
              <CardDescription>Registre a devolução de itens pelos colaboradores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. Autenticação do Colaborador</h3>
                {/* Similar authentication options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">do crachá</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/matrícula</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <User className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Biometria</div>
                      <div className="text-xs text-muted-foreground">facial/digital</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">2. Seleção de Itens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">dos itens</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/código</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">3. Estado do Item</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado do item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perfeito">Devolução em perfeito estado</SelectItem>
                    <SelectItem value="desgaste">Desgaste normal pelo uso</SelectItem>
                    <SelectItem value="danificado">Danificado durante operação</SelectItem>
                    <SelectItem value="perdido">Perdido em campo</SelectItem>
                    <SelectItem value="defeito">Defeito de fabricação identificado</SelectItem>
                    <SelectItem value="vencido">EPI com CA vencido</SelectItem>
                    <SelectItem value="incompleto">Kit incompleto na devolução</SelectItem>
                    <SelectItem value="contaminado">Item contaminado (químico/biológico)</SelectItem>
                    <SelectItem value="superior">Substituição por modelo superior</SelectItem>
                    <SelectItem value="contrato">Devolução por término de contrato</SelectItem>
                    <SelectItem value="naoUsado">Item não utilizado (devolução integral)</SelectItem>
                    <SelectItem value="transporte">Danificado no transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-brand-orange">Registrar Devolução</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="troca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Troca</CardTitle>
              <CardDescription>Registre a troca de itens para colaboradores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Similar structure to devolução with additional fields for new items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Autenticação do Colaborador</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                      <QrCode className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Ler QR Code</div>
                        <div className="text-xs text-muted-foreground">do crachá</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                      <Search className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Buscar</div>
                        <div className="text-xs text-muted-foreground">por nome/matrícula</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                      <User className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Biometria</div>
                        <div className="text-xs text-muted-foreground">facial/digital</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2. Item a ser devolvido</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                        <QrCode className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-semibold">Ler QR Code</div>
                          <div className="text-xs text-muted-foreground">do item a devolver</div>
                        </div>
                      </Button>
                      <div className="space-y-2">
                        <Label>Estado do item</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado do item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desgaste">Desgaste normal pelo uso</SelectItem>
                            <SelectItem value="danificado">Danificado durante operação</SelectItem>
                            <SelectItem value="defeito">Defeito de fabricação identificado</SelectItem>
                            <SelectItem value="vencido">EPI com CA vencido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">3. Novo item</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                        <QrCode className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-semibold">Ler QR Code</div>
                          <div className="text-xs text-muted-foreground">do novo item</div>
                        </div>
                      </Button>
                      <div className="space-y-2">
                        <Label>Motivo da troca</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o motivo da troca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desgaste">Desgaste por uso</SelectItem>
                            <SelectItem value="danificado">Dano durante operação</SelectItem>
                            <SelectItem value="tamanho">Tamanho inadequado</SelectItem>
                            <SelectItem value="vencimento">CA vencido</SelectItem>
                            <SelectItem value="modelo">Substituição por modelo superior</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-brand-purple">Registrar Troca</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="aplicacao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Aplicação</CardTitle>
              <CardDescription>Registre a aplicação de itens em um local específico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. Autenticação do Colaborador</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">do crachá</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/matrícula</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <User className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Biometria</div>
                      <div className="text-xs text-muted-foreground">facial/digital</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">2. Seleção de Itens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <QrCode className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Ler QR Code</div>
                      <div className="text-xs text-muted-foreground">dos itens</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2 h-32">
                    <Search className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Buscar</div>
                      <div className="text-xs text-muted-foreground">por nome/código</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Motivo da aplicação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manutencao">Manutenção preventiva</SelectItem>
                      <SelectItem value="substituicao">Substituição programada</SelectItem>
                      <SelectItem value="instalacao">Nova instalação</SelectItem>
                      <SelectItem value="reparo">Reparo emergencial</SelectItem>
                      <SelectItem value="melhoria">Melhoria de sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Local de aplicação</Label>
                  <Input placeholder="Digite ou escaneie o local" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-brand-blue">Registrar Aplicação</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
