export class AppError extends Error {
    public status: number;
    public code: string;
    public details?: any;


    constructor(status: number, code: string, message: string, details?: any) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}