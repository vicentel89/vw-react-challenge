"use client";

import useCars from "./_api/useCars";
import styles from "./page.module.css";
import { Car } from "./types";
import Container from "../_common/components/Container/Container";
import Table, { TableColumn } from "../_common/components/Table/Table";

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

export default function CarsPage() {
  const { cars } = useCars();

  return (
    <Container className={styles.container}>
      <Table
        columns={columns}
        data={formatCarsData(cars || [])}
        caption="Cars"
      />
    </Container>
  );
}

function formatCarsData(
  cars: Array<Car>
): Array<Record<string, string | number>> {
  if (!cars) return [];

  const formattedCars = cars.map(({ id: _id, mileage, ...car }) => ({
    ...car,
    mileage: formatMileage(mileage),
  }));

  return formattedCars;
}

function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString("de-DE")} km`;
}
