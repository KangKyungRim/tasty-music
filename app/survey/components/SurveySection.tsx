import styles from "../page.module.scss";
import OptionChip from "./OptionChip";

interface Option {
  value: string; 
  label: string; 
}

interface SurveySectionProps {
  title: string;
  description?: string;
  options: Option[];
  selected?: string | null;
  onSelect?: (value: string) => void;
}

export default function SurveySection({
  title,
  description,
  options,
  selected,
  onSelect,
}: SurveySectionProps) {
  return (
    <section className={styles.surveySection}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      <div className={styles.options}>
        {options.map((option) => (
          <OptionChip
            key={option.value}
            value={option.value}
            label={option.label}
            selected={selected === option.value}
            onClick={() => onSelect?.(option.value)}
          />
        ))}
      </div>
    </section>
  );
}