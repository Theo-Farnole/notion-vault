import axios from "axios";
import "dotenv/config";
import { API_CLIENT_ID, API_CLIENT_SECRET } from "./env";
import { AuthTokenResponse } from "../../../packages/common/src/AuthTokenResponse"

export async function getAccessToken(code: string): Promise<AuthTokenResponse> {

    code = code.trim();

    const res = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/oauth/token",
        auth: { username: API_CLIENT_ID, password: API_CLIENT_SECRET },
        headers: { "Content-Type": "application/json" },
        data: { code, grant_type: "authorization_code" },
    })

    return res.data;
}