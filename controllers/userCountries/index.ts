import type {
  Country,
  CountryWithAchievements,
  Geography,
  UserCountryAchievement,
} from "types/Countries";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

import UserCountryAchievementModel from "models/UserCountryAchievement";

const GEO_URL = process.env.NEXT_PUBLIC_GEO_URL || "";

const formatUserCountries = (
  countries: Geography[],
  achievements: UserCountryAchievement[]
): CountryWithAchievements[] => {
  const userCountries = countries.map((country) => ({
    ...country.properties,
    achievements: achievements.reduce(
      (acc: string[], cur) => [
        ...acc,
        ...(cur.countryId === country.properties.ISO_A3
          ? [cur.achievementId]
          : []),
      ],
      []
    ),
  }));

  return userCountries;
};

const getCountryData = async (): Promise<Geography[]> => {
  const response = await axios(GEO_URL);

  return response.data.objects.ne_110m_admin_0_countries.geometries.filter(
    ({ properties }: { properties: Country }) => properties.ISO_A3 !== "-99"
  );
};

export const getUserCountries = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = getSession(req, res);

    if (!session || session.user.sub !== req.query.userId)
      throw new Error("Unauthenticated user");

    const countries = await getCountryData();
    const documents = await UserCountryAchievementModel.find({
      userId: session.user.sub,
    });
    const userCountries = formatUserCountries(countries, documents);

    res.status(201).json({ success: true, data: userCountries });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
