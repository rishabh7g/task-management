export class NotFoundError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}

export class NotAuthError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}
