import clsx from "clsx";
import { SelectHTMLAttributes, useId } from "react";
import { PiCaretDownBold } from "react-icons/pi";

import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  options: SelectOption[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function Select({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  label,
  className,
  id,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
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
          value={value}
          onChange={handleChange}
          className={styles.select}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <PiCaretDownBold className={styles.icon} aria-hidden="true" />
      </div>
    </div>
  );
}
