import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function requestId(req: Request, res: Response, next: NextFunction) {
    const id = uuid();
    req.headers["x-request-id"] = id;
    res.setHeader("x-request-id", id);
    next();
}
