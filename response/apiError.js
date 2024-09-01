class ApiError extends Error {
    constructor(statusCode,
        message = "SomeThing Went Wrong!",
        errors = [],
        stack = "",) {

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




class TokenExpirationException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, statusCode, statusCode = 401, errors);
    }
}
class UnauthorizationException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, statusCode, statusCode = 403, errors);
    }
}
class NotFoundException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, statusCode, statusCode = 404, errors);
    }
}

class LimitExceededException extends ApiError {
    constructor(message, stack, errors) {
        super(message, stack, statusCode, statusCode = 408, errors);
    }
}

