export class ApiError extends Error {
    constructor(
        message = "SomeThing Went Wrong!",
        stack = "",
        statusCode,
        errors = [],

    ) {

        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

    }
}


export class BadRequestException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, 400, errors)
    }
}

export class TokenExpirationException extends ApiError {
    constructor(stack, errors) {
        super("JWT Token Expired!", stack, 401, errors);
    }
}
export class UnauthorizationException extends ApiError {
    constructor(stack, errors, { message }) {
        super(message || "User is unauthorized!", stack, 403, errors);
    }
}
export class NotFoundException extends ApiError {
    constructor(stack, errors) {
        super("Not found...", stack, 404, errors);
    }
}

export class LimitExceededException extends ApiError {
    constructor(stack, errors) {
        super("Limit exceeded!", stack, 408, errors);
    }
}

export class ConflictException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, 409, errors);
    }
}
export class UniversalApiError extends ApiError {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}





