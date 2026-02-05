import MusicItem from "@/components/MusicItem/MusicItem";
import styles from "./MusicList.module.scss"

interface Song {
  title: string;
  artist: string;
  cover?: string;
}

interface MusicListProps {
  songs: Song[];
}

export default function MusicList({ songs }: MusicListProps) {
  return (
    <div className={styles.playListWrap}>
      {songs.map((song, i) => (
        <MusicItem
          key={i}
          title={song.title}
          artist={song.artist}
          cover={song.cover}
          onPlay={() => console.log(song.title)}
        />
      ))}
    </div>
  );
}