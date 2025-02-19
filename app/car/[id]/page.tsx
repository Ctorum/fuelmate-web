"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface Car {
  id: number;
  name: string;
  fuelBalance: number;
  maxFuel: number;
  age: number;
  kilometersUsed: number;
  initialKilometerCapacity: number;
}

interface Travel {
  id: number;
  date: string;
  distance: number;
  driver: string;
}

interface Collaborator {
  id: number;
  name: string;
  email: string;
}

interface FuelLog {
  id: number;
  date: string;
  type: "usage" | "fillup";
  amount: number;
  kilometersAdded?: number;
}

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [logType, setLogType] = useState<"usage" | "fillup">("usage");
  const [amount, setAmount] = useState("");
  const [fuelType, setFuelType] = useState("ethanol");
  const [gasStation, setGasStation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setCar({
      id: Number(params.id),
      name: "Toyota Corolla",
      fuelBalance: 40,
      maxFuel: 50,
      age: 3,
      kilometersUsed: 50000,
      initialKilometerCapacity: 500,
    });
    setTravels([
      { id: 1, date: "2023-05-15", distance: 100, driver: "João Silva" },
      { id: 2, date: "2023-05-14", distance: 75, driver: "Maria Santos" },
    ]);
    setCollaborators([
      { id: 1, name: "Maria Santos", email: "maria@exemplo.com" },
      { id: 2, name: "Carlos Oliveira", email: "carlos@exemplo.com" },
    ]);
    setFuelLogs([
      { id: 1, date: "2023-05-13", type: "usage", amount: 100 },
      {
        id: 2,
        date: "2023-05-12",
        type: "fillup",
        amount: 40,
        kilometersAdded: 400,
      },
    ]);
  }, [params.id]);

  const handleFuelLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: FuelLog = {
      id: fuelLogs.length + 1,
      date: new Date().toISOString().split("T")[0],
      type: logType,
      amount: Number(amount),
      ...(logType === "fillup" && {
        kilometersAdded: car!.initialKilometerCapacity,
      }),
    };
    setFuelLogs([newLog, ...fuelLogs]);
    toast({
      title: "Sucesso",
      description: `${
        logType === "usage" ? "Uso" : "Abastecimento"
      } de combustível registrado com sucesso`,
    });
    setAmount("");
    router.refresh();
  };

  if (!car) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{car.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Carro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Saldo de Combustível: {car.fuelBalance}/{car.maxFuel} L
            </p>
            <p>Idade: {car.age} anos</p>
            <p>Distância Total: {car.kilometersUsed} km</p>
            <p>
              Capacidade Inicial de Quilômetros: {car.initialKilometerCapacity}{" "}
              km
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registrar Uso/Abastecimento de Combustível</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFuelLog} className="space-y-4">
              <RadioGroup
                defaultValue="usage"
                onValueChange={(value) =>
                  setLogType(value as "usage" | "fillup")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usage" id="usage" />
                  <Label htmlFor="usage">Uso de Combustível</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fillup" id="fillup" />
                  <Label htmlFor="fillup">Abastecimento</Label>
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor="amount">
                  {logType === "usage"
                    ? "Quilômetros Percorridos"
                    : "Litros Abastecidos"}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={
                    logType === "usage"
                      ? "Digite os quilômetros percorridos"
                      : "Digite os litros abastecidos"
                  }
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              {logType === "fillup" && (
                <>
                  <div>
                    <Label htmlFor="fuelType">Tipo de Combustível</Label>
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de combustível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethanol">Etanol</SelectItem>
                        <SelectItem value="gasoline">Gasolina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gasStation">
                      Posto de Combustível (opcional)
                    </Label>
                    <Input
                      id="gasStation"
                      placeholder="Digite o nome do posto de combustível"
                      value={gasStation}
                      onChange={(e) => setGasStation(e.target.value)}
                    />
                  </div>
                </>
              )}
              <Button type="submit">
                Registrar {logType === "usage" ? "Uso" : "Abastecimento"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fuelLogs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fuelLogs">Registros de Combustível</TabsTrigger>
          <TabsTrigger value="travels">Viagens</TabsTrigger>
          <TabsTrigger value="collaborators">Colaboradores</TabsTrigger>
        </TabsList>
        <TabsContent value="fuelLogs">
          <Card>
            <CardHeader>
              <CardTitle>Registros de Combustível</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Quilômetros Adicionados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          {log.type === "usage" ? "Uso" : "Abastecimento"}
                        </TableCell>
                        <TableCell>
                          {log.amount} {log.type === "usage" ? "km" : "L"}
                        </TableCell>
                        <TableCell>{log.kilometersAdded || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="travels">
          <Card>
            <CardHeader>
              <CardTitle>Viagens Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Distância (km)</TableHead>
                      <TableHead>Motorista</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {travels.map((travel) => (
                      <TableRow key={travel.id}>
                        <TableCell>{travel.date}</TableCell>
                        <TableCell>{travel.distance}</TableCell>
                        <TableCell>{travel.driver}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="collaborators">
          <Card>
            <CardHeader>
              <CardTitle>Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collaborators.map((collaborator) => (
                      <TableRow key={collaborator.id}>
                        <TableCell>{collaborator.name}</TableCell>
                        <TableCell>{collaborator.email}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              <div className="mt-4">
                <form className="flex space-x-2">
                  <Input placeholder="Digite o email para convidar" />
                  <Button type="submit">Convidar</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
