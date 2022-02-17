import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

interface AchievementSummaryState {
  isOpen: boolean;
}

const initialState: AchievementSummaryState = {
  isOpen: false,
};

export const achievementSummarySlice = createSlice({
  name: "achievementSummary",
  initialState,
  reducers: {
    changeAchievementSummaryStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { changeAchievementSummaryStatus } =
  achievementSummarySlice.actions;

export const isAchievementSummaryOpenSelector = (state: RootState) =>
  state.achievementSummary.isOpen;

export default achievementSummarySlice.reducer;
