import type React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BarChart3, Car, Fuel } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2 text-primary">
            FuelMate
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Acompanhe e gerencie o consumo de combustível do seu veículo de
            forma eficiente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Car className="h-8 w-8 text-primary" />}
              title="Múltiplos Veículos"
              description="Gerencie o uso de combustível de todos os seus veículos em um só lugar"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Análises Detalhadas"
              description="Obtenha insights sobre seus padrões de consumo de combustível"
            />
            <FeatureCard
              icon={<Fuel className="h-8 w-8 text-primary" />}
              title="Eficiência de Combustível"
              description="Acompanhe e melhore a eficiência de combustível do seu veículo"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/login">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                Entrar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
              >
                Registrar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon}
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
