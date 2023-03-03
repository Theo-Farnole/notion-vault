import express from "express";
import rateLimit from "express-rate-limit";
import { Request, Response } from 'express';
import { getAccessToken } from "./auth-services";

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

    app.get('/login/:code', async (req: Request, res: Response) => {
        const { code } = req.params;

        const accessToken = await getAccessToken(code);

        res.send(accessToken);
    });

    app.listen(port, () => {
        console.log(`Cluster #${id} listening on port ${port}.`);
    });
}
