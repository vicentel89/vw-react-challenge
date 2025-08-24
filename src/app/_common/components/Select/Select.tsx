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
  error?: string;
  required?: boolean;
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
  error,
  required = false,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "") {
      onChange?.(null as SelectValue);
      return;
    }

    const option = options.find(
      (currentOption) => String(currentOption.value) === selectedValue
    );
    const convertedValue = option ? option.value : selectedValue;
    onChange?.(convertedValue as SelectValue);
  };

  return (
    <div className={clsx(styles.selectWrapper, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div className={styles.selectContainer}>
        <select
          id={selectId}
          value={value ?? ""}
          onChange={handleChange}
          className={clsx(styles.select, error && styles.selectError)}
          disabled={isLoading}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
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
      {error && (
        <div
          id={errorId}
          className={styles.error}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
}
