"use client";

import styles from "./BottomPlayer.module.scss";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import HeartIcon from "../icons/HeartIcon";
import PauseIcon from "../icons/PauseIcon";
import PlayBackIcon from "../icons/PlayBackIcon";

export default function BottomPlayer() {
  const track = usePlayerStore((s) => s.currentTrack);
  const clearTrack = usePlayerStore((s) => s.clearTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const progress = usePlayerStore((s) => s.progress);
  const setProgress = usePlayerStore((s) => s.setProgress);

  const titleRef = useRef<HTMLParagraphElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);

  const [titleOverflow, setTitleOverflow] = useState(false);
  const [artistOverflow, setArtistOverflow] = useState(false);

  useEffect(() => {
    clearTrack();
  }, [clearTrack]);

  useEffect(() => {
    if (!track) return;

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
  }, [track]);

  useEffect(() => {
    if (!track || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [track, isPlaying, setProgress]);

  if (!track) return null;

  const duration = track.durationMs ?? 180000;
  const percent = (progress / duration) * 100;

  return (
    <div className={styles.playerBox}>
      <div className={styles.progress}>
        <div
          className={styles.bar}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className={styles.player}>
        <div className={styles.left}>
          <div className={styles.cover}>
            {track.cover && <img src={track.cover} alt={track.title} />}
          </div>

          <div className={styles.text}>
            <p
              ref={titleRef}
              className={`${styles.title} ${
                isPlaying && titleOverflow ? styles.marquee : ""
              }`}
            >
              <span>{track.title}</span>
              {isPlaying && titleOverflow && <span>{track.title}</span>}
            </p>

            <p
              ref={artistRef}
              className={`${styles.artist} ${
                isPlaying && artistOverflow ? styles.marquee : ""
              }`}
            >
              <span>{track.artist}</span>
              {isPlaying && artistOverflow && <span>{track.artist}</span>}
            </p>
          </div>
        </div>

        <div className={styles.controls}>
          <HeartIcon size={20} color="#A8A3F7" />

          <button onClick={togglePlay}>
            {isPlaying ? <PauseIcon size={20} /> : <PlayBackIcon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}