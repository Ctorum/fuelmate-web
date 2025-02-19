"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";

export default function FuelUsagePage({
  params,
}: {
  params: { carId: string };
}) {
  const [initialKm, setInitialKm] = useState("");
  const [finalKm, setFinalKm] = useState("");
  const [carName, setCarName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setCarName(`Car ${params.carId}`);
  }, [params.carId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Fuel usage logged successfully",
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Log Fuel Usage for {carName}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialKm">Initial Kilometers</Label>
              <Input
                id="initialKm"
                type="number"
                placeholder="Enter initial km"
                value={initialKm}
                onChange={(e) => setInitialKm(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalKm">Final Kilometers</Label>
              <Input
                id="finalKm"
                type="number"
                placeholder="Enter final km"
                value={finalKm}
                onChange={(e) => setFinalKm(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Log Fuel Usage
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
