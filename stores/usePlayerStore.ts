import { create } from "zustand";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  durationMs?: number;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;

  setTrack: (track: Track) => void;
  clearTrack: () => void;
  togglePlay: () => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,

  setTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
    }),

  clearTrack: () =>
    set({
      currentTrack: null,
      isPlaying: false,
      progress: 0,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  setProgress: (progress) =>
    set((state) => ({
      progress:
        typeof progress === "function"
          ? progress(state.progress)
          : progress,
    })),
}));