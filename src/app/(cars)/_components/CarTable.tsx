"use client";

import Table, { TableColumn } from "@/app/_common/components/Table/Table";

import useCars from "../_api/useCars";
import { formatCarsData } from "../_utils/formatCarsData";
import { Car } from "../types";

interface CarColumn extends TableColumn {
  key: keyof Omit<Car, "id">;
}

const columns: CarColumn[] = [
  { key: "brand", header: "Brand", width: "20%" },
  { key: "model", header: "Model", width: "20%" },
  { key: "year", header: "Year" },
  { key: "mileage", header: "Mileage" },
  { key: "color", header: "Color" },
];

export default function CarTable() {
  const { cars, isLoading } = useCars();
  return (
    <Table
      columns={columns}
      data={formatCarsData(cars || [])}
      caption="Cars"
      emptyStateText="No cars available"
      isLoading={isLoading}
    />
  );
}
