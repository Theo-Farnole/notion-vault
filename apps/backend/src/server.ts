import express from "express";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 5001;

export function startServer(id: number) {
    const app = express();

    // 30 requests per minutes
    const limiter = rateLimit({
        windowMs: 60000,
        max: 30,
        standardHeaders: true,
        legacyHeaders: false,
    })

    app.use(limiter);

    app.get('/login/:code', () => {
        throw new Error("Not implemented yet");
    });

    app.listen(port, () => {
        console.log(`Cluster #${id} listening on port ${port}.`);
    });
}