import axios from "axios";

export const postUserCountryAchievement = async (
  userId: string,
  countryId: string,
  achievementId: string
): Promise<boolean> => {
  const response = await axios.post(
    `/api/users/${userId}/countries/${countryId}/achievements/${achievementId}`
  );

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

  return response.data.success;
};
