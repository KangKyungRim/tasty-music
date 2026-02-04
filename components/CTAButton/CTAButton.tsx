import styles from "./CTAButton.module.scss";
import clsx from "clsx";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function CTAButton({
  text,
  onClick,
  disabled = false,
  className
}: CTAButtonProps) {
  return (
    <button
      className={clsx(styles.cta, className)}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <p>{text}</p>
    </button>
  );
}