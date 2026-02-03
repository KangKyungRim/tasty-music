import styles from "./CTAButton.module.scss";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

export default function CTAButton({ text, onClick }: CTAButtonProps) {
  return (
    <button className={styles.cta} onClick={onClick}>
      <p>{text}</p>
    </button>
  );
}