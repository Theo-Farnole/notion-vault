import throng from "throng";
import { startServer } from "./server";

const workers = parseInt(process.env.WEB_CONCURRENCY || "1");

throng({
    workers,
    start: startServer
})
