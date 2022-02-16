import type { EntityState, PayloadAction } from "@reduxjs/toolkit";
import type { CountryWithAchievements } from "types/Countries";
import type { WritableDraft } from "immer/dist/internal";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "app/store";

import {
  addCountryAchievement,
  deleteCountryAchievement,
  fetchCountries,
} from "./async";

const addAchievementToState = (
  state: WritableDraft<EntityState<CountryWithAchievements>>,
  ids: { countryId: string; achievementId: string }
) => {
  const { countryId, achievementId } = ids;
  const country = state.entities[countryId];

  country!.achievements.push(achievementId);
};
const deleteAchievementFromState = (
  state: WritableDraft<EntityState<CountryWithAchievements>>,
  ids: { countryId: string; achievementId: string }
) => {
  const { countryId, achievementId } = ids;
  const countryAchievements = state.entities[countryId]!.achievements;
  const achievementIndex = countryAchievements.indexOf(achievementId);

  countryAchievements.splice(achievementIndex!, 1);
};

const countriesAdapter = createEntityAdapter<CountryWithAchievements>({
  selectId: (country) => country.ISO_A3,
  sortComparer: (a, b) => (a.NAME < b.NAME ? -1 : 1),
});

export const countriesSlice = createSlice({
  name: "countries",
  initialState: countriesAdapter.getInitialState({
    error: "",
    isCountryListOpen: false,
    isLoading: false,
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
    // Fetch countries
    builder.addCase(fetchCountries.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.isLoading = false;

      countriesAdapter.setAll(state, action);
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.isLoading = false;
      state.error = "There was an error fetching your country data.";
    });

    // Add country achievement
    builder.addCase(addCountryAchievement.pending, (state, { meta }) => {
      addAchievementToState(state, meta.arg);
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(addCountryAchievement.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCountryAchievement.rejected, (state, { meta }) => {
      deleteAchievementFromState(state, meta.arg);
      state.isLoading = false;
      state.error = "There was an error adding this achievement.";
    });

    // Delete country achievement
    builder.addCase(deleteCountryAchievement.pending, (state, { meta }) => {
      deleteAchievementFromState(state, meta.arg);
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(deleteCountryAchievement.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCountryAchievement.rejected, (state, { meta }) => {
      addAchievementToState(state, meta.arg);
      state.isLoading = false;
      state.error = "There was an error deletiong this achievement.";
    });
  },
});

export const { setIsCountryListOpen, setSelectedCountryId } =
  countriesSlice.actions;

export const countriesSelectors = countriesAdapter.getSelectors<RootState>(
  (state) => state.countries
);

export const errorSelector = (state: RootState) => state.countries.error;

export const isLoadingSelector = (state: RootState) =>
  state.countries.isLoading;

export const isCountryListOpenSelector = (state: RootState) =>
  state.countries.isCountryListOpen;

export const selectedCountryIdSelector = (state: RootState) =>
  state.countries.selectedCountryId;

export const selectedCountrySelector = (state: RootState) => {
  const selectedCountryId = selectedCountryIdSelector(state);
  return countriesSelectors.selectById(state, selectedCountryId);
};

export default countriesSlice.reducer;
