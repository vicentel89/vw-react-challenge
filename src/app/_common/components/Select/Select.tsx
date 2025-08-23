import clsx from "clsx";
import { SelectHTMLAttributes, useId } from "react";
import { PiCaretDownBold } from "react-icons/pi";

import styles from "./Select.module.css";

export interface SelectOption<T = unknown> {
  value: T;
  label: string;
}

interface SelectProps<T = unknown>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  options: SelectOption<T>[];
  placeholder?: string;
  value: T | null;
  onChange: (value: T) => void;
  label?: string;
  isLoading?: boolean;
}

export default function Select<T = unknown>({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  label,
  className,
  id,
  isLoading = false,
  ...rest
}: SelectProps<T>) {
  const generatedId = useId();
  const selectId = id || generatedId;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(event.target.value);
    if (selectedIndex >= 0 && selectedIndex < options.length) {
      onChange(options[selectedIndex].value);
    }
  };

  const selectedIndex =
    value !== null ? options.findIndex((option) => option.value === value) : -1;

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
          value={selectedIndex >= 0 ? selectedIndex.toString() : ""}
          onChange={handleChange}
          className={styles.select}
          disabled={isLoading}
          {...rest}
        >
          {isLoading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : (
            <>
              {placeholder && (
                <option value="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option, index) => (
                <option
                  key={createUniqueKey<T>(option.value)}
                  value={index.toString()}
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
        <PiCaretDownBold className={styles.icon} aria-hidden="true" />
      </div>
    </div>
  );
}

function createUniqueKey<T>(value: T): string {
  if (value === null || value === undefined) {
    return "null";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
