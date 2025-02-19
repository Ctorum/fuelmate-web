"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Travel {
  id: number;
  carName: string;
  date: string;
  distance: number;
  driver: string;
}

export function TravelList() {
  const [travels, setTravels] = useState<Travel[]>([]);

  useEffect(() => {
    setTravels([
      {
        id: 1,
        carName: "Toyota Corolla",
        date: "2023-05-15",
        distance: 100,
        driver: "John Doe",
      },
      {
        id: 2,
        carName: "Honda Civic",
        date: "2023-05-14",
        distance: 75,
        driver: "Jane Smith",
      },
      {
        id: 3,
        carName: "Ford Focus",
        date: "2023-05-13",
        distance: 150,
        driver: "Alice Johnson",
      },
    ]);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Distance (km)</TableHead>
          <TableHead>Driver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {travels.map((travel) => (
          <TableRow key={travel.id}>
            <TableCell>{travel.date}</TableCell>
            <TableCell>{travel.carName}</TableCell>
            <TableCell>{travel.distance}</TableCell>
            <TableCell>{travel.driver}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
