import "dotenv/config";

export const API_CLIENT_ID: string = getOrCrash("API_CLIENT_ID");
export const API_CLIENT_SECRET: string = getOrCrash("API_CLIENT_SECRET");

function getOrCrash(key: string): string {
    const value = process.env[key];

    if (!value) throw new Error(`Please add ${key} in your .env file`);

    return value;
}