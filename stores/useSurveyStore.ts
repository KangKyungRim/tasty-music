import { create } from "zustand";

export interface SurveyResult {
  moods: string | null;
  activities: string | null;
  styles: string | null;
}

interface SurveyState {
  result: SurveyResult;
  toggleOption: (
    key: keyof SurveyResult,
    value: string
  ) => void;
  reset: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  result: {
    moods: "",
    activities: "",
    styles: "",
  },

  toggleOption: (key, value) =>
    set((state) => ({
      result: {
        ...state.result,
        [key]: state.result[key] === value ? null : value,
      },
    })),

  reset: () =>
    set({
      result: {
        moods: "",
        activities: "",
        styles: "",
      },
    }),
}));