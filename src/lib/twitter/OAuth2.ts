import fetch from "isomorphic-fetch";
import { TwitterDomain } from "./api";
import encode64 from "./Base64";
export async function OAuth2(consumerKey: string, consumerSecret: string) {
  const body = "grant_type=client_credentials";
  const bearerToken = encode64(`${consumerKey}:${consumerSecret}`);

  const headers = {
    Authorization: `Basic ${bearerToken}`,
    "Conent-Length": `${body.length}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };

  const res = await fetch(`${TwitterDomain}/oauth2/token`, {
    method: "POST",
    headers,
    body,
  });

  return await res.json();
}
