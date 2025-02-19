"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface Car {
  id: number;
  name: string;
  fuelBalance: number;
  maxFuel: number;
  age: number;
  kilometersUsed: number;
}

export function CarList() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars([
      {
        id: 1,
        name: "Toyota Corolla",
        fuelBalance: 40,
        maxFuel: 50,
        age: 3,
        kilometersUsed: 50000,
      },
      {
        id: 2,
        name: "Honda Civic",
        fuelBalance: 30,
        maxFuel: 45,
        age: 5,
        kilometersUsed: 75000,
      },
      {
        id: 3,
        name: "Ford Focus",
        fuelBalance: 35,
        maxFuel: 52,
        age: 2,
        kilometersUsed: 30000,
      },
    ]);
  }, []);

  return (
    <div className="space-y-4 py-4">
      {cars.map((car) => (
        <Card key={car.id}>
          <CardHeader>
            <CardTitle>{car.name}</CardTitle>
            <CardDescription>
              Age: {car.age} years | Total: {car.kilometersUsed} km
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fuel Level</span>
                <span>
                  {car.fuelBalance}/{car.maxFuel} L
                </span>
              </div>
              <Progress value={(car.fuelBalance / car.maxFuel) * 100} />
            </div>
            <div className="mt-4 flex justify-between">
              <Link href={`/car/${car.id}`}>
                <Button variant="outline">Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
