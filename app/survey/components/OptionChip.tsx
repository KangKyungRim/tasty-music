"use client";

import styles from "../page.module.scss";
import clsx from "clsx";

interface OptionChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  value?: string;
}

export default function OptionChip({
  label,
  selected = false,
  onClick,
}: OptionChipProps) {
  return (
    <button
      type="button"
      className={clsx(styles.chip, selected && styles.selected)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}