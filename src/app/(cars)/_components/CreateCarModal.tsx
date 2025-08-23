import { useController, UseControllerProps, useForm } from "react-hook-form";

import Button from "@/app/_common/components/Button/Button";
import { Modal, ModalProps } from "@/app/_common/components/Modal/Modal";
import Select from "@/app/_common/components/Select/Select";

import styles from "./CreateCarModal.module.css";
import useBrands from "../_api/useBrands";

interface FormValues {
  brand: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;
  color: string | null;
}

type CreateCarModalProps = Pick<ModalProps, "isOpen" | "onClose">;

export default function CreateCarModal({
  isOpen,
  onClose,
}: CreateCarModalProps) {
  const { control } = useForm<FormValues>({
    defaultValues: {
      brand: null,
      model: null,
      year: null,
      mileage: null,
      color: null,
    },
    mode: "onChange",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.form}>
        <BrandSelect name="brand" control={control} />
        <ModelSelect name="model" control={control} />
        <YearSelect name="year" control={control} />
        <MileageSelect name="mileage" control={control} />
        <ColorSelect name="color" control={control} />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Car</Button>
        </div>
      </form>
    </Modal>
  );
}

function BrandSelect(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);
  const { brands, isLoading } = useBrands();

  const brandOptions =
    brands?.map((brand) => ({
      value: brand.name,
      label: brand.name,
    })) || [];

  return (
    <Select
      {...field}
      label="Brand"
      options={brandOptions}
      isLoading={isLoading}
    />
  );
}

function ModelSelect(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);

  const options = [
    {
      value: "A3",
      label: "A3",
    },
  ];

  return <Select {...field} label="Model" options={options} />;
}

function YearSelect(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);

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

  return <Select {...field} label="Year" options={options} />;
}

function MileageSelect(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);

  const options = [
    { value: 5000, label: "5.000 km" },
    { value: 10000, label: "10.000 km" },
    { value: 15000, label: "15.000 km" },
    { value: 20000, label: "20.000 km" },
    { value: 25000, label: "25.000 km" },
    { value: 30000, label: "30.000 km" },
  ];

  return <Select {...field} label="Mileage" options={options} />;
}

function ColorSelect(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);

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

  return <Select {...field} label="Color" options={options} />;
}
