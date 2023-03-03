import express from "express";
import rateLimit from "express-rate-limit";
import { Request, Response } from 'express';
import { getAccessToken } from "./auth-services";
import axios, { AxiosError } from "axios";

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

        try {

            const accessToken = await getAccessToken(code);

            res.send(accessToken);
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError: AxiosError = err;

                const errorData: any = axiosError.response?.data;

                if (errorData) {
                    res.status(400).json({
                        status: "fail",
                        message: errorData["error_description"]
                    });
                }
                else {
                    res.status(500);
                }
            }
            else {
                res.status(500)
            }
        }
    });

    app.listen(port, () => {
        console.log(`Cluster #${id} listening on port ${port}.`);
    });
}
