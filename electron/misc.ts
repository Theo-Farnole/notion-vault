import { BrowserWindow, dialog } from "electron"

export async function openFolder(win: BrowserWindow) {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
        properties: ["openDirectory"]
    })
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}