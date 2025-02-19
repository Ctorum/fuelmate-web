"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AddCarPage() {
  const [carName, setCarName] = useState("");
  const [maxFuel, setMaxFuel] = useState("");
  const [age, setAge] = useState("");
  const [kilometersUsed, setKilometersUsed] = useState("");
  const [initialKilometerCapacity, setInitialKilometerCapacity] = useState("");
  const [fuelType, setFuelType] = useState("ethanol");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sucesso",
      description: "Carro adicionado com sucesso",
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Adicionar Novo Carro</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="carName">Nome do Carro</Label>
              <Input
                id="carName"
                placeholder="Digite o nome do carro"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFuel">
                Capacidade Máxima de Combustível (L)
              </Label>
              <Input
                id="maxFuel"
                type="number"
                placeholder="Digite a capacidade máxima de combustível"
                value={maxFuel}
                onChange={(e) => setMaxFuel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initialKilometerCapacity">
                Capacidade Inicial de Quilômetros
              </Label>
              <Input
                id="initialKilometerCapacity"
                type="number"
                placeholder="Digite a capacidade inicial de quilômetros"
                value={initialKilometerCapacity}
                onChange={(e) => setInitialKilometerCapacity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Idade (anos)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Digite a idade do carro"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kilometersUsed">
                Total de Quilômetros Rodados
              </Label>
              <Input
                id="kilometersUsed"
                type="number"
                placeholder="Digite o total de quilômetros rodados"
                value={kilometersUsed}
                onChange={(e) => setKilometersUsed(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuelType">Tipo de Combustível Preferido</Label>
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Adicionar Carro
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
