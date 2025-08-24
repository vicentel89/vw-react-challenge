import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  useController,
  UseControllerProps,
  useForm,
  useWatch,
} from "react-hook-form";
import { z } from "zod";

import Button from "@/app/_common/components/Button/Button";
import { Modal, ModalProps } from "@/app/_common/components/Modal/Modal";
import Select from "@/app/_common/components/Select/Select";

import styles from "./CreateCarModal.module.css";
import useBrands from "../_api/useBrands";
import useCreateCar from "../_api/useCreateCar";
import useModels from "../_api/useModels";

const createCarSchema = z.object({
  brand: z
    .string()
    .nullable()
    .refine((val) => val !== null && val !== "", "Brand is required"),
  model: z
    .string()
    .nullable()
    .refine((val) => val !== null && val !== "", "Model is required"),
  year: z
    .number()
    .nullable()
    .refine((val) => val !== null, "Year is required"),
  mileage: z
    .number()
    .nullable()
    .refine((val) => val !== null, "Mileage is required"),
  color: z
    .string()
    .nullable()
    .refine((val) => val !== null && val !== "", "Color is required"),
});

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
  const {
    control,
    handleSubmit: formSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brand: null,
      model: null,
      year: null,
      mileage: null,
      color: null,
    },
    mode: "onSubmit",
  });

  const createCarMutation = useCreateCar();
  const handleSubmit = formSubmit((data) => {
    const carData = {
      brand: data.brand!,
      model: data.model!,
      year: data.year!,
      mileage: data.mileage!,
      color: data.color!,
    };

    createCarMutation.mutate(carData, {
      onSuccess: () => {
        handleClose();
      },
    });
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <BrandSelect name="brand" control={control} />
        <ModelSelect name="model" control={control} />
        <YearSelect name="year" control={control} />
        <MileageSelect name="mileage" control={control} />
        <ColorSelect name="color" control={control} />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createCarMutation.isPending}>
            Create Car
          </Button>
        </div>
      </form>
    </Modal>
  );
}

type SelectComponentProps = UseControllerProps<FormValues>;

function BrandSelect(props: SelectComponentProps) {
  const { field, fieldState } = useController(props);
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
      required
      error={fieldState.error?.message}
    />
  );
}

function ModelSelect(props: SelectComponentProps) {
  const { field, fieldState } = useController(props);
  const selectedBrandName = useWatch({ control: props.control, name: "brand" });

  const { brands } = useBrands();
  const selectedBrandId = useMemo(() => {
    const selectedBrand = brands?.find(
      (brand) => brand.name === selectedBrandName
    );
    return selectedBrand?.id || "";
  }, [brands, selectedBrandName]);

  const { models, isLoading } = useModels(selectedBrandId);

  const modelOptions =
    models?.map((model) => ({
      value: model.name,
      label: model.name,
    })) || [];

  useEffect(() => {
    if (selectedBrandName) {
      field.onChange(null);
    }
  }, [selectedBrandName]);

  return (
    <Select
      {...field}
      label="Model"
      options={modelOptions}
      isLoading={isLoading}
      disabled={!selectedBrandName}
      required
      error={fieldState.error?.message}
    />
  );
}

function YearSelect(props: SelectComponentProps) {
  const { field, fieldState } = useController(props);

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
      {...field}
      label="Year"
      options={options}
      required
      error={fieldState.error?.message}
    />
  );
}

function MileageSelect(props: SelectComponentProps) {
  const { field, fieldState } = useController(props);

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
      {...field}
      label="Mileage"
      options={options}
      required
      error={fieldState.error?.message}
    />
  );
}

function ColorSelect(props: SelectComponentProps) {
  const { field, fieldState } = useController(props);

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
      {...field}
      label="Color"
      options={options}
      required
      error={fieldState.error?.message}
    />
  );
}
