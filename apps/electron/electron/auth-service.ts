import { BrowserWindow, shell } from "electron";
import axios, { AxiosError } from "axios";
import { API_CLIENT_ID, API_CLIENT_SECRET } from "./env";
import { Workspace } from "../src/types/Workspace";
const express = require("express");

export function enableExternalOpening(mainWindow: BrowserWindow) {
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

export function getAuthorizationUrl() {
    return "https://api.notion.com/v1/oauth/authorize?client_id=9a827aed-58cc-46e1-b80a-5f99bd5bbbd3&response_type=code&owner=user";
}

export function startOAuthListener(mainWindow: BrowserWindow) {
    const app = express();
    const port = 8000;

    app.get("/ping", async (req: any, res: any) => {
        res.send("pong");
    })

    app.get("/authorization/successful", async (req: any, res: any) => {


        // TODO: render a nice page "authorization successful, you can close it or something like that"
        res.send("");

        const oauthCode = req.query.code;

        console.log("Received OAuth code", oauthCode);

        const accessToken = await getAccessToken(oauthCode);
        const workspace: Workspace = {
            accessToken: accessToken.access_token,
            avatarUrl: accessToken.workspace_icon,
            id: accessToken.workspace_id,
            name: accessToken.workspace_name
        };

        console.log("Connected to workspace", workspace);

        mainWindow.webContents.send("api:authorizeWorkspace", workspace);
    });

    app.listen(port, () => {
        console.log(`Listening OAuth code on port ${port}`);
    });
}

interface AuthTokenResponse {
    access_token: string;
    bot_id: string;
    duplicated_template_id: string;
    owner: any;
    workspace_icon: string;
    workspace_id: string;
    workspace_name: string;
}

async function getAccessToken(code: string): Promise<AuthTokenResponse> {

    code = code.trim();

    try {

        const res = await axios({
            method: "POST",
            url: "https://api.notion.com/v1/oauth/token",
            auth: { username: API_CLIENT_ID, password: API_CLIENT_SECRET },
            headers: { "Content-Type": "application/json" },
            data: { code, grant_type: "authorization_code" },
        })

        return res.data;
    }
    catch (err: any) {

        if (axios.isAxiosError(err)) {
            const axiosError: AxiosError = err;
            console.log(axiosError.response?.data);
        }
        else {
            throw err;
        }
    }

    throw new Error("stop here");
}