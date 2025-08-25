"use client";

import { ChangeEvent, useState } from "react";

import Button from "@/app/_common/components/Button/Button";
import Table, { TableColumn } from "@/app/_common/components/Table/Table";
import TextInput from "@/app/_common/components/TextInput/TextInput";
import { useToggle } from "@/app/_common/hooks/useToggle";

import useCars from "../_api/useCars";
import { formatCarsData } from "../_utils/formatCarsData";
import { Car } from "../types";
import styles from "./CarTable.module.css";
import CreateCarModal from "./CreateCarModal";

interface CarColumn extends TableColumn {
  key: keyof Omit<Car, "id">;
}

const columns: CarColumn[] = [
  { key: "brand", headerText: "Brand", width: "20%", sortable: true },
  { key: "model", headerText: "Model", width: "20%", sortable: true },
  { key: "year", headerText: "Year", sortable: true },
  { key: "mileage", headerText: "Mileage", sortable: true },
  { key: "color", headerText: "Color", sortable: true },
];

export default function CarTable() {
  const { isOpen: isCreateModelOpen, toggle: toggleCreateModel } = useToggle();
  const [searchTerm, setSearchTerm] = useState("");
  const { cars, isLoading, isError } = useCars({ search: searchTerm });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Table
        columns={columns}
        data={formatCarsData(cars || [])}
        caption="Cars"
        actions={
          <div className={styles.actions}>
            <TextInput
              size="sm"
              placeholder="Search..."
              aria-label="Search cars"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button size="md" onClick={toggleCreateModel}>
              Add Car
            </Button>
          </div>
        }
        emptyFallback="No cars available"
        errorFallback="Error loading cars. Please try again."
        isLoading={isLoading}
        isError={isError}
        isSortable
      />

      <CreateCarModal isOpen={isCreateModelOpen} onClose={toggleCreateModel} />
    </>
  );
}
