import pino from "pino";
import pinoHttp from "pino-http";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
    transport: isDev ? { target: "pino-pretty" } : undefined,
    level: process.env.LOG_LEVEL || "info",
});

export const httpLogger = pinoHttp({ logger });
