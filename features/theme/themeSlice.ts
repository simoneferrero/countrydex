import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

interface ThemeState {
  current: string;
}

const initialState: ThemeState = {
  current: "sfw",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const isBootyModeSelector = (state: RootState) =>
  state.theme.current === "booty";

export default themeSlice.reducer;
