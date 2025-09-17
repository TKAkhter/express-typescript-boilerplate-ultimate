import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // map to RFC7807 Problem+JSON
    const traceId = req.headers['x-request-id'] || '';
    if (err instanceof AppError) {
        return res.status(err.status).json({
            type: 'https://example.com/probs/' + err.code,
            title: err.message,
            status: err.status,
            detail: err.details,
            instance: req.originalUrl,
            traceId,
        });
    }
    console.error(err);
    return res.status(500).json({
        type: 'https://example.com/probs/internal',
        title: 'Internal Server Error',
        status: 500,
        detail: process.env.NODE_ENV === 'production' ? undefined : err.message,
        instance: req.originalUrl,
        traceId,
    });
}