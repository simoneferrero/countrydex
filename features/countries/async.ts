import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCountryData } from "requests/countries";
import {
  deleteUserCountryAchievement,
  postUserCountryAchievement,
} from "requests/achievements";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async (userId: string) => {
    const response = await getCountryData(userId);

    return response;
  }
);

export const addCountryAchievement = createAsyncThunk(
  "countries/addAchievement",
  async ({
    userId,
    countryId,
    achievementId,
  }: {
    userId: string;
    countryId: string;
    achievementId: string;
  }) => {
    const response = await postUserCountryAchievement(
      userId,
      countryId,
      achievementId
    );

    return response;
  }
);

export const deleteCountryAchievement = createAsyncThunk(
  "countries/deleteAchievement",
  async ({
    userId,
    countryId,
    achievementId,
  }: {
    userId: string;
    countryId: string;
    achievementId: string;
  }) => {
    const response = await deleteUserCountryAchievement(
      userId,
      countryId,
      achievementId
    );

    return response;
  }
);
