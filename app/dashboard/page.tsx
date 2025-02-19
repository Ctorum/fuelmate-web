"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Car, Fuel, Users } from "lucide-react";
import { CarList } from "@/components/CarList";
import { TravelList } from "@/components/TravelList";
import { FuelStats } from "@/components/FuelStats";

interface User {
  name: string;
  totalBalance: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser({ name: "João Silva", totalBalance: 150 });
  }, []);

  if (!user) return <div className="text-foreground">Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Bem-vindo ao FuelMate, {user.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Saldo Total de Combustível"
          value={`${user.totalBalance} km`}
          icon={<Fuel className="h-8 w-8" />}
          description="Eficiência atual de combustível em todos os veículos"
        />
        <StatCard
          title="Total de Veículos"
          value="5"
          icon={<Car className="h-8 w-8" />}
          description="Número de veículos que você está gerenciando"
        />
        <StatCard
          title="Colaboradores"
          value="3"
          icon={<Users className="h-8 w-8" />}
          description="Pessoas com quem você está compartilhando veículos"
        />
      </div>

      <Tabs defaultValue="cars" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cars">Seus Carros</TabsTrigger>
          <TabsTrigger value="travels">Viagens Recentes</TabsTrigger>
          <TabsTrigger value="fuel">Estatísticas de Combustível</TabsTrigger>
        </TabsList>
        <TabsContent value="cars" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Seus Carros</h2>
            <Link href="/add-car">
              <Button>Adicionar Novo Carro</Button>
            </Link>
          </div>
          <CarList />
        </TabsContent>
        <TabsContent value="travels" className="space-y-4">
          <h2 className="text-2xl font-semibold">Viagens Recentes</h2>
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <TravelList />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="fuel" className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Estatísticas de Combustível
          </h2>
          <FuelStats />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
