import axios, { AxiosRequestConfig } from "axios";
import { BackupMetadata, BackupType } from "../src/types/BackupMetadata";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { schedule } from "node-cron";
import { Settings } from "./settings";
import { parseExpression } from "cron-parser";

export class BackupService {
    constructor(
        private readonly settings: Settings
    ) { }

    // TODO: find a better name
    startBackupIfAppWasClosed() {
        const backups = this.settings.getBackups();

        for (const backup of backups) {

            if (this.isPreviousBackupWasMade(backup) === false) {

                console.log("Starting missing automatic backup. Reason: the app was closed when the lastest cron job was running.")

                this.makeBackup(backup, "automatic");

                console.log("Succesful automatic backup (reason: backup was missing).")
            }
        }
    }

    async startAutomaticBackups() {

        const backups = this.settings.getBackups();

        for (const backup of backups) {

            schedule(backup.cron, async () => {

                console.log("Starting automatic backup of", backup);

                await this.makeBackup(backup, "automatic");

                console.log("Succesful automatic backup of", backup)


            });
        }
    }

    isPreviousBackupWasMade(backup: BackupMetadata): boolean {

        if (backup.backupsLogs.length === 0) return false;

        const interval = parseExpression(backup.cron);
        const prevTimestamp = interval.prev().getTime();

        const latestBackup = backup.backupsLogs.sort((a, b) => b.startTimestamp - a.startTimestamp)[0];

        if (!latestBackup) return false;

        console.log("\n", backup.workspace.name);

        console.log("prevTimestamp", prevTimestamp);
        console.log("latestBackup", latestBackup.startTimestamp);

        return latestBackup.startTimestamp >= prevTimestamp;
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