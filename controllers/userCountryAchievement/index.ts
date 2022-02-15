import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

import UserCountryAchievement from "models/UserCountryAchievement";

export const addUserCountryAchievement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = getSession(req, res);

    if (!session || session.user.sub !== req.query.userId)
      throw new Error("Unauthenticated user");

    const userCountryAchievement = {
      userId: session.user.sub,
      countryId: req.query.countryId,
      achievementId: req.query.achievementId,
    };

    const document = await UserCountryAchievement.findOneAndUpdate(
      userCountryAchievement,
      userCountryAchievement,
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export const deleteUserCountryAchievement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = getSession(req, res);

    if (!session || session.user.sub !== req.query.userId)
      throw new Error("Unauthenticated user");

    const userCountryAchievement = {
      userId: session.user.sub,
      countryId: req.query.countryId,
      achievementId: req.query.achievementId,
    };

    await UserCountryAchievement.findOneAndDelete(
      userCountryAchievement,
      userCountryAchievement
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
