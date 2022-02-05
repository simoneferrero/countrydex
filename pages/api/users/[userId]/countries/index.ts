import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

import dbConnect from "lib/dbConnect";

import { getUserCountries } from "controllers/userCountries";

const userCountriesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      getUserCountries(req, res);

      break;

    default: {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withApiAuthRequired(userCountriesRoute);
