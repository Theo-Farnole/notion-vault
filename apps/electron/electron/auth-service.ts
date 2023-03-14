import axios from "axios";
import { BrowserWindow, shell } from "electron";
import { Workspace } from "../src/types/Workspace";
import { defaultAuthUrl } from "./const";
import { AuthTokenResponse } from "../../../packages/common/src/AuthTokenResponse"
import * as path from 'path';
const express = require("express");

export function enableExternalOpening(mainWindow: BrowserWindow) {
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

// awake backend server on app startup
export async function awakeOAuthRemoteServer() {

    console.log("Awaking auth server.")

    await axios.get(defaultAuthUrl + "/ping");

    console.log("The auth server is awaked.");
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

        const successfulPage = path.join(__dirname, '../../assets/auth-successful.html');
        res.sendFile(successfulPage);

        const oauthCode = req.query.code as string;

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

async function getAccessToken(code: string): Promise<AuthTokenResponse> {

    return (await axios.get(defaultAuthUrl + "/login/" + code)).data;
}