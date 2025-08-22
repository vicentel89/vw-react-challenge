import CarTable from "./_components/CarTable";
import styles from "./page.module.css";
import Container from "../_common/components/Container/Container";

export default function CarsPage() {
  return (
    <Container className={styles.container}>
      <CarTable />
    </Container>
  );
}
