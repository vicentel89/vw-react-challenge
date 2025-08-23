import { Modal, ModalProps } from "@/app/_common/components/Modal/Modal";
import Select from "@/app/_common/components/Select/Select";

import styles from "./CreateCarModal.module.css";
import useBrands from "../_api/useBrands";

type CreateCarModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export default function CreateCarModal({
  isOpen,
  onClose,
}: CreateCarModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.form}>
        <BrandSelect />
        <ModelSelect />
        <YearSelect />
        <MileageSelect />
        <ColorSelect />
      </form>
    </Modal>
  );
}

function BrandSelect() {
  const { brands, isLoading } = useBrands();

  const brandOptions =
    brands?.map((brand) => ({
      value: { id: brand.id, name: brand.name },
      label: brand.name,
    })) || [];

  return (
    <Select
      label="Brand"
      options={brandOptions}
      value={null}
      onChange={(value) => console.log(value)}
      isLoading={isLoading}
    />
  );
}

function ModelSelect() {
  return (
    <Select
      label="Model"
      options={[
        {
          value: { id: "1", name: "A3", brandId: "1" },
          label: "A3",
        },
      ]}
      value={null}
      onChange={(value) => console.log(value)}
    />
  );
}

function YearSelect() {
  const options = [
    { value: 2015, label: "2015" },
    { value: 2016, label: "2016" },
    { value: 2017, label: "2017" },
    { value: 2018, label: "2018" },
    { value: 2019, label: "2019" },
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];

  return (
    <Select
      label="Year"
      options={options}
      value={null}
      onChange={(value) => console.log(value)}
    />
  );
}

function MileageSelect() {
  const options = [
    { value: 5000, label: "5.000 km" },
    { value: 10000, label: "10.000 km" },
    { value: 15000, label: "15.000 km" },
    { value: 20000, label: "20.000 km" },
    { value: 25000, label: "25.000 km" },
    { value: 30000, label: "30.000 km" },
  ];

  return (
    <Select
      label="Mileage"
      options={options}
      value={null}
      onChange={(value) => console.log(value)}
    />
  );
}

function ColorSelect() {
  const options = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "purple", label: "Purple" },
    { value: "brown", label: "Brown" },
    { value: "gray", label: "Gray" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  return (
    <Select
      label="Color"
      options={options}
      value={null}
      onChange={(value) => console.log(value)}
    />
  );
}
