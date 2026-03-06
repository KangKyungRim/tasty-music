import MusicItem from "@/components/MusicItem/MusicItem";
import styles from "./MusicList.module.scss";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface Artist {
  id: string;
  name: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Album {
  id: string;
  name: string;
  images: Image[];
}

interface Song {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
}

interface MusicListProps {
  songs: Song[];
}

export default function MusicList({ songs }: MusicListProps) {
  const setTrack = usePlayerStore((state) => state.setTrack);

  return (
    <div className={styles.playListWrap}>
      {songs.map((song) => (
        <MusicItem
          key={song.id}
          id={song.id}
          title={song.name}
          artist={song.artists.map((a) => a.name).join(", ")}
          cover={song.album.images?.[0]?.url ?? ""}


          onPlay={() =>
            setTrack({
              id: song.id,
              title: song.name,
              artist: song.artists.map((a) => a.name).join(", "),
              cover: song.album.images?.[0]?.url,
              durationMs: song.duration_ms,
            })
          }
        />
      ))}
    </div>
  );
}