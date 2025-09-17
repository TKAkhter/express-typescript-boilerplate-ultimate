import { Router } from "express";

export const routes = Router();

routes.get("/", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

routes.get("/ready", (_req, res) => {
    res.json({ status: "ready" });
});
