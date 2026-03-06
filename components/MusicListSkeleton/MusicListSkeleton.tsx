"use client";

import styles from "./MusicListSkeleton.module.scss";

export default function MusicListSkeleton() {
  return (
    <div className={styles.playListWrap}>
      {[...Array(10)].map((_, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.cover}></div>

          <div className={styles.text}>
            <div className={styles.title}></div>
            <div className={styles.artist}></div>
          </div>
        </div>
      ))}
    </div>
  );
}