import clsx from "clsx";
import { OptionHTMLAttributes, SelectHTMLAttributes, useId } from "react";
import { PiCaretDownBold } from "react-icons/pi";

import styles from "./Select.module.css";
import Loader from "../Loader/Loader";

export interface SelectOption {
  value: SelectValue;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  value?: SelectValue;
  onChange?: (value: SelectValue) => void;
}

type SelectValue = string | number | null;

export default function Select({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  label,
  className,
  id,
  isLoading = false,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as unknown as SelectValue);
  };

  return (
    <div className={clsx(styles.selectWrapper, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectContainer}>
        <select
          id={selectId}
          value={value ?? ""}
          onChange={handleChange}
          className={styles.select}
          disabled={isLoading}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={
                option.value as OptionHTMLAttributes<HTMLOptionElement>["value"]
              }
            >
              {option.label}
            </option>
          ))}
        </select>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader size="sm" />
          </div>
        ) : (
          <PiCaretDownBold className={styles.icon} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
