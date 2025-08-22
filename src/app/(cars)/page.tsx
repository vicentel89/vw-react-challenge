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
  return (
    <Container className={styles.container}>
      <Table columns={columns} data={[]} caption="Cars" />
    </Container>
  );
}
