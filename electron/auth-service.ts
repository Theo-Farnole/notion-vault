import { BrowserWindow, shell } from "electron";
const express = require("express");

export function enableExternalOpening(mainWindow: BrowserWindow) {
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

export function getAuthorizationUrl() {
    return "https://api.notion.com/v1/oauth/authorize?client_id=9a827aed-58cc-46e1-b80a-5f99bd5bbbd3&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauthorization%2Fsuccessful";
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

        // mainWindow.webContents.send("api:authorizeWorkspace", oauthCode);
    });

    app.listen(port, () => {
        console.log(`Listening OAuth code on port ${port}`);
    });
}