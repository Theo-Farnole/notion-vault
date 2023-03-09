import axios, { AxiosRequestConfig } from "axios";
import { BackupMetadata, BackupType } from "../src/types/BackupMetadata";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { schedule } from "node-cron";
import { Settings } from "./settings";

export class BackupService {
    constructor(
        private readonly settings: Settings
    ) { }


    async startAutomaticBackups() {

        const middayCron = "0 12 * * *"; // each midday

        schedule(middayCron, async () => {

            console.log("Starting automatic backups.");

            await this.backupAlls()

            console.log("Automatic backups successfully executed.");

        });
    }

    async backupAlls() {
        const backups = this.settings.getBackups();

        // we make backup one by one to avoid 429 error from the notion API
        for (const backup of backups) {
            await this.makeBackup(backup, "automatic");
        }
    }

    async makeBackup(backup: BackupMetadata, type: BackupType) {

        const startTimestamp = Date.now();
        const folder = join(backup.savePath, startTimestamp.toString());

        await writeBackup();

        const endTimestamp = Date.now();

        const newBackup = backup;
        newBackup.backupsLogs.push({
            startTimestamp,
            endTimestamp,
            type
        })

        this.settings.replaceBackup(backup, newBackup);

        console.log(`Backup ${startTimestamp} is finished`);

        async function writeBackup() {
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

        }
    }
}