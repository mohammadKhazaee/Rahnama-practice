export class ApplicationError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message?: string) {
        super(403, message || 'Forbidden');
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message?: string) {
        super(404, message || 'Not Found');
    }
}

export class ConflictError extends ApplicationError {
    constructor(message?: string) {
        super(409, message || 'Not Found');
    }
}
