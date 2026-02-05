import styles from "./MusicItem.module.scss";
import PlayButtonIcon from "../icons/PlayButtonIcon";

interface MusicItemProps {
  title: string;
  artist: string;
  cover?: string;
  onPlay?: () => void;
}

export default function MusicItem({
  title,
  artist,
  cover,
  onPlay,
}: MusicItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.cover}>
          {cover && <img src={cover} alt={title} />}
        </div>

        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.artist}>{artist}</p>
        </div>
      </div>

      <button className={styles.play} onClick={onPlay}>
        <PlayButtonIcon 
          size={16}
        />
      </button>
    </div>
  );
}