import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    const status = err.status || 500;

    logger.error(
        {
            error: err.message,
            stack: err.stack,
            path: req.path,
            requestId: req.headers["x-request-id"],
        },
        "Unhandled error"
    );

    res.status(status).json({
        type: "about:blank",
        title: err.title || "Internal Server Error",
        status,
        detail: err.message,
        instance: req.path,
    });
}
