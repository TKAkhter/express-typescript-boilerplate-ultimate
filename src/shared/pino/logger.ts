import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';


let logger: ReturnType<typeof createLogger>;


export function initLogger() {
    logger = createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: format.combine(
            format.timestamp(),
            format.printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`)
        ),
        transports: [
            new transports.Console(),
            new DailyRotateFile({ filename: 'logs/%DATE%.log', datePattern: 'YYYY-MM-DD' })
        ],
    });
}


export function requestIdMiddleware(req: any, res: any, next: any) {
    req.headers['x-request-id'] = req.headers['x-request-id'] || `rid-${Date.now()}`;
    next();
}


export function getLogger() {
    if (!logger) initLogger();
    return logger;
}