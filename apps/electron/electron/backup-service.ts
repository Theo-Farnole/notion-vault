import axios, { AxiosRequestConfig } from "axios";
import { BackupMetadata } from "../src/types/BackupMetadata";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { schedule } from "node-cron";
import { Settings } from "./settings";

export async function startAutomaticBackups(settings: Settings) {

    const middayCron = "0 12 * * *"; // each midday

    schedule(middayCron, async () => {

        console.log("Starting automatic backups.");

        await backupAlls(settings)

        console.log("Automatic backups successfully executed.");

    });
}

export async function backupAlls(settings: Settings) {
    const backups = settings.getBackups();

    // we make backup one by one to avoid 429 error from the notion API
    for (const backup of backups) {
        await makeBackup(backup);
    }
}

export async function makeBackup(backup: BackupMetadata) {
    const backupTimestamp = Date.now().toString();
    const folder = join(backup.savePath, backupTimestamp);

    const config: AxiosRequestConfig = {
        baseURL: "https://api.notion.com/v1/",
        headers: {
            'Authorization': `Bearer ${backup.workspace.accessToken}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        }
    };
    const client = axios.create(config)


    const response = await client.post('search', {}, config);

    for (const block of response.data.results) {

        if (!existsSync(folder)) {
            mkdirSync(folder);
        }

        writeFileSync(`${folder}/${block.id}.json`, JSON.stringify(block));

        const { data: { ressults: childBlocks } } = await client.get(`blocks/${block.id}/children`);

        if (childBlocks) {
            const childFolder = join(folder, block.id);
            mkdirSync(childFolder);

            for (const child of childBlocks) {
                const childFile = join(childFolder, child.id + ".json");
                writeFileSync(childFile, child.id);
            }
        }
    }

    console.log(`Backup ${backupTimestamp} is over`);
}