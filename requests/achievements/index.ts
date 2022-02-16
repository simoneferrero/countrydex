import axios from "axios";

export const postUserCountryAchievement = async (
  userId: string,
  countryId: string,
  achievementId: string
): Promise<boolean> => {
  const response = await axios.post(
    `/api/users/${userId}/countries/${countryId}/achievements/${achievementId}`
  );

  if (response.status !== 201) {
    throw new Error("Unable to add achievement");
  }

  return response.data.success;
};

export const deleteUserCountryAchievement = async (
  userId: string,
  countryId: string,
  achievementId: string
): Promise<boolean> => {
  const response = await axios.delete(
    `/api/users/${userId}/countries/${countryId}/achievements/${achievementId}`
  );

  if (response.status !== 200) {
    throw new Error("Unable to delete achievement");
  }

  return response.data.success;
};
