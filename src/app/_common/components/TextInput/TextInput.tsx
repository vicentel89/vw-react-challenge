import clsx from "clsx";
import { InputHTMLAttributes, useId } from "react";

import styles from "./TextInput.module.css";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function TextInput({
  label,
  size = "md",
  className,
  id,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={clsx(styles.textInputWrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        className={clsx(styles.textInput, styles[size])}
        {...props}
      />
    </div>
  );
}
