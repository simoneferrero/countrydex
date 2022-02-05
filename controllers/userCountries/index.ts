import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

import UserCountryAchievement from "models/UserCountryAchievement";

export const getUserCountries = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = getSession(req, res);

    if (!session || session.user.sub !== req.query.userId)
      throw new Error("Unauthenticated user");

    const documents = await UserCountryAchievement.find({
      userId: session.user.sub,
    });
    const userCountries = documents.reduce(
      (countries, { countryId, achievementId }) => ({
        ...countries,
        [countryId]: {
          ...countries[countryId],
          [achievementId]: true,
        },
      }),
      {}
    );
    res.status(201).json({ success: true, data: userCountries });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
