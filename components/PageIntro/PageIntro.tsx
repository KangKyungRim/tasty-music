import styles from "./PageIntro.module.scss";

type PageIntroProps = {
  title: string;
};

export default function PageIntro({ title }: PageIntroProps) {
  return (
    <div className={styles.pageIntro}>
      <h2>{title}</h2>
    </div>
  );
}