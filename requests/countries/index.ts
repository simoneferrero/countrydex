import type { CountryWithAchievements } from "types/Countries";

import axios from "axios";

export const getCountryData = async (
  userId: string
): Promise<CountryWithAchievements[]> => {
  const response = await axios(`/api/users/${userId}/countries`);

  if (response.status !== 201) {
    throw new Error("Unable to fetch countries");
  }

  return response.data.data;
};
