import { configureStore } from "@reduxjs/toolkit";

import achievementSummaryReducer from "features/achievementSummary/achievementSummarySlice";
import themeReducer from "features/theme/themeSlice";
import countriesReducer from "features/countries/countriesSlice";

export const store = configureStore({
  reducer: {
    achievementSummary: achievementSummaryReducer,
    countries: countriesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
