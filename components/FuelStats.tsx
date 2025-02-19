"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FuelData {
  car: string;
  ethanol: number;
  gasoline: number;
}

export function FuelStats() {
  const [fuelData, setFuelData] = useState<FuelData[]>([]);

  useEffect(() => {
    setFuelData([
      { car: "Toyota Corolla", ethanol: 40, gasoline: 20 },
      { car: "Honda Civic", ethanol: 30, gasoline: 30 },
      { car: "Ford Focus", ethanol: 50, gasoline: 10 },
    ]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Consumption by Car</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fuelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="car" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ethanol" fill="#8884d8" name="Ethanol" />
            <Bar dataKey="gasoline" fill="#82ca9d" name="Gasoline" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
