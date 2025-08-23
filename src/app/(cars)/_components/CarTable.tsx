"use client";

import Button from "@/app/_common/components/Button/Button";
import { Modal } from "@/app/_common/components/Modal/Modal";
import Select from "@/app/_common/components/Select/Select";
import Table, { TableColumn } from "@/app/_common/components/Table/Table";
import { useToggle } from "@/app/_common/hooks/useToggle";

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
  const { cars, isLoading, isError } = useCars();
  const { isOpen: isCreateModelOpen, toggle: toggleCreateModel } = useToggle();

  return (
    <>
      <Table
        columns={columns}
        data={formatCarsData(cars || [])}
        caption="Cars"
        actions={
          <Button size="md" onClick={toggleCreateModel}>
            Add Car
          </Button>
        }
        emptyFallback="No cars available"
        errorFallback="Error loading cars. Please try again."
        isLoading={isLoading}
        isError={isError}
      />

      <Modal isOpen={isCreateModelOpen} onClose={toggleCreateModel}>
        <Select
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value=""
          onChange={(value) => console.log(value)}
        />
      </Modal>
    </>
  );
}
