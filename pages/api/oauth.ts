import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { OAuth2 } from "../../src/lib/twitter/OAuth2";

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const consumerKey = process.env["COMSUMER_KEY"] ?? "";
  const consumerSecret = process.env["CONSUMER_SECRET"] ?? "";

  const response = await OAuth2(consumerKey, consumerSecret);
  if ("errors" in response) {
    res.status(response.statusCode).json(response);
  } else {
    const { access_token } = response;
    res.status(200).json({ token: access_token });
  }
};
