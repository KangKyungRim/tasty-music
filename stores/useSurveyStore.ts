import { create } from "zustand";

export interface SurveyResult {
  moods: string | null;
  activities: string | null;
  styles: string | null;
}

interface SurveyState {
  result: SurveyResult;
  shouldResetOnLeave?: boolean;
  toggleOption: (
    key: keyof SurveyResult,
    value: string
  ) => void;
  reset: () => void;
  disableResetOnce: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  // 선택 옵션 저장
  result: {
    moods: "",
    activities: "",
    styles: "",
  },

  // 선택 토글 상태
  toggleOption: (key, value) =>
    set((state) => ({
      result: {
        ...state.result,
        [key]: state.result[key] === value ? null : value,
      },
    })),

  // 옵션 선택 초기화
  reset: () =>
    set({
      result: {
        moods: "",
        activities: "",
        styles: "",
      },
    }),

    disableResetOnce: () =>
      set((state) => ({
        result: {
          ...state.result
      },
      shouldResetOnLeave: false
    }))
}))