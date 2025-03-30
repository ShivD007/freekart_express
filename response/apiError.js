import { AppStrings } from "../constants/app.strings.js";

export class ApiError extends Error {
    constructor(
        message = "SomeThing Went Wrong!",
        statusCode,
        data,
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.success = false;
    }
}


export class BadRequestException extends ApiError {
    constructor(message,) {
        super(message, 400)
    }
}

export class TokenExpirationException extends ApiError {
    constructor() {
        super("JWT Token Expired!", 401);
    }
}
export class UnauthorizationException extends ApiError {
    constructor({ message }) {
        super(message || "User is unauthorized!", 403);
    }
}
export class NotFoundException extends ApiError {
    constructor(data) {
        super("Not found...", 404, data);
    }
}

export class LimitExceededException extends ApiError {
    constructor() {
        super("Limit exceeded!", 408);
    }
}

export class ConflictException extends ApiError {
    constructor(message,) {
        super(message, 409);
    }
}
export class UniversalApiError extends ApiError {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}

export class ServerApiError extends ApiError {
    constructor(message,) {
        super(message || AppStrings.serverError, 500);
    }
}





