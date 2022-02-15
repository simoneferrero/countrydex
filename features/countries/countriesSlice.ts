import type { PayloadAction } from "@reduxjs/toolkit";
import type { CountryWithAchievements } from "types/Countries";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "app/store";

import {
  addCountryAchievement,
  deleteCountryAchievement,
  fetchCountries,
} from "./async";

const countriesAdapter = createEntityAdapter<CountryWithAchievements>({
  selectId: (country) => country.ISO_A3,
  sortComparer: (a, b) => (a.NAME < b.NAME ? -1 : 1),
});

export const countriesSlice = createSlice({
  name: "countries",
  initialState: countriesAdapter.getInitialState({
    isCountryListOpen: false,
    selectedCountryId: "",
  }),
  reducers: {
    setIsCountryListOpen: (state, action: PayloadAction<boolean>) => {
      state.isCountryListOpen = action.payload;
    },
    setSelectedCountryId: (state, action: PayloadAction<string>) => {
      state.selectedCountryId =
        state.selectedCountryId === action.payload ? "" : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, countriesAdapter.setAll);

    builder.addCase(addCountryAchievement.pending, (state, { meta }) => {
      const { countryId, achievementId } = meta.arg;
      const country = state.entities[countryId];

      country?.achievements.push(achievementId);
    });

    builder.addCase(deleteCountryAchievement.pending, (state, { meta }) => {
      const { countryId, achievementId } = meta.arg;
      const countryAchievements = state.entities[countryId]?.achievements;
      const achievementIndex = countryAchievements?.indexOf(achievementId);

      countryAchievements?.splice(achievementIndex!, 1);
    });
  },
});

export const { setIsCountryListOpen, setSelectedCountryId } =
  countriesSlice.actions;

export const countriesSelectors = countriesAdapter.getSelectors<RootState>(
  (state) => state.countries
);

export const isCountryListOpenSelector = (state: RootState) =>
  state.countries.isCountryListOpen;

export const selectedCountryIdSelector = (state: RootState) =>
  state.countries.selectedCountryId;

export const selectedCountrySelector = (state: RootState) => {
  const selectedCountryId = selectedCountryIdSelector(state);
  return countriesSelectors.selectById(state, selectedCountryId);
};

export default countriesSlice.reducer;
