import clsx from "clsx";
import { ReactElement, ButtonHTMLAttributes, forwardRef } from "react";

import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, className, "aria-label": ariaLabel, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={clsx(styles.iconButton, className)}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
