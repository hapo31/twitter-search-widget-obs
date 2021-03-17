import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { OAuth2 } from "../../src/lib/twitter/OAuth2";

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const consumerKey = process.env["COMSUMER_KEY"] ?? "";
  const consumerSecret = process.env["CONSUMER_SECRET"] ?? "";

  const { token } = await OAuth2(consumerKey, consumerSecret);

  res.status(200).json({ token });
};
