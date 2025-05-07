import * as db from "../services/db";
import { Request, Response } from "express";

export async function getRates(req: Request, res: Response): Promise<void> {
    try {
        const fromQuery = req.query.from as string | undefined;
        const from = fromQuery ? new Date(fromQuery) : null;

        if (from && isNaN(from.getTime())) {
            res.status(400).json({ error: "Invalid 'from' timestamp format" });
            return;
        }

        const rates = await db.getRatesFrom(from);
        res.json(rates);
    } catch (error) {
        console.error("Error fetching rates:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getLatestRate(_req: Request, res: Response): Promise<void> {
    try {
        const rate = await db.getLatestRate();
        if (!rate) {
            res.status(404).json({ error: "No rate data available" });
            return;
        }
        res.json(rate);
    } catch (error) {
        console.error("Error fetching latest rate:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

