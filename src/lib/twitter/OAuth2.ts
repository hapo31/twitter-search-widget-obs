import fetch from "isomorphic-fetch";
import { OAuth2ResultResponse, Response } from "../../../@types/twitter";
import { TwitterDomain } from "./api";
import encode64 from "./Base64";
export async function OAuth2(consumerKey: string, consumerSecret: string): Promise<Response<OAuth2ResultResponse>> {
  const body = "grant_type=client_credentials";
  const bearerToken = encode64(`${consumerKey}:${consumerSecret}`);

  const headers = {
    Authorization: `Basic ${bearerToken}`,
    "Conent-Length": `${body.length}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };

  const response = await fetch(`${TwitterDomain}/oauth2/token`, {
    method: "POST",
    headers,
    body,
  });

  const json: Response<OAuth2ResultResponse> = await response.json();

  if ("errors" in json) {
    return { ...json, statusCode: response.status };
  } else {
    return json;
  }
}
