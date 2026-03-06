import styles from "./MusicItem.module.scss";
import PlayButtonIcon from "../icons/PlayButtonIcon";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useRef, useEffect, useState } from "react";

interface MusicItemProps {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  onPlay?: () => void;
}

export default function MusicItem({
  id,
  title,
  artist,
  cover,
}: MusicItemProps) {
  const setTrack = usePlayerStore((s) => s.setTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  const isCurrent = currentTrack?.id === id;

  const titleRef = useRef<HTMLParagraphElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);

  const [titleOverflow, setTitleOverflow] = useState(false);
  const [artistOverflow, setArtistOverflow] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setTitleOverflow(
        titleRef.current.scrollWidth > titleRef.current.clientWidth
      );
    }

    if (artistRef.current) {
      setArtistOverflow(
        artistRef.current.scrollWidth > artistRef.current.clientWidth
      );
    }
  }, []);

  return (
    <div
      className={styles.item}
      onClick={() =>
        setTrack({
          id,
          title,
          artist,
          cover,
        })
      }
    >
      <div className={styles.left}>
        <div className={styles.cover}>
          {cover && <img src={cover} alt={title} />}
        </div>

        <div className={styles.text}>
          <p
            ref={titleRef}
            className={`${styles.title} ${
              isPlaying && isCurrent && titleOverflow ? styles.marquee : ""
            }`}
          >
            <span>{title}</span>
            {isPlaying && isCurrent && titleOverflow && <span>{title}</span>}
          </p>

          <p
            ref={artistRef}
            className={`${styles.artist} ${
              isPlaying && isCurrent && artistOverflow ? styles.marquee : ""
            }`}
          >
            <span>{artist}</span>
            {isPlaying && isCurrent && artistOverflow && <span>{artist}</span>}
          </p>
        </div>
      </div>

      <button className={styles.play}>
        <PlayButtonIcon size={16} />
      </button>
    </div>
  );
}