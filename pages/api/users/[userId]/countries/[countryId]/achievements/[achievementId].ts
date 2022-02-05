import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

import dbConnect from "lib/dbConnect";
import {
  addUserCountryAchievement,
  deleteUserCountryAchievement,
} from "controllers/userCountryAchievement";

const userCountryAchievementsRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      addUserCountryAchievement(req, res);

      break;

    case "DELETE": {
      deleteUserCountryAchievement(req, res);

      break;
    }

    default: {
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withApiAuthRequired(userCountryAchievementsRoute);
