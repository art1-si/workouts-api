/**
 * Custom exceptions for the auth module.
 * These exceptions are used to handle errors in the auth module.
 * The exceptions extend the Error class and have a custom name property.
 */

/**
 * Exception for when a user is not found.
 * This exception is thrown when a user is not found in the database.
 * The exception extends the Error class and has a custom name property.
 */
export class UserNotFoundException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "UserNotFoundException";
    }
}

/**
 * Exception for when the credentials are invalid.
 * This exception is thrown when the credentials provided are invalid.
 * The exception extends the Error class and has a custom name property.
 */
export class InvalidCredentialsException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "InvalidCredentialsException";
    }
}

/**
 * Exception for when an email is already in use.
 * This exception is thrown when an email is already in use in the database.
 * The exception extends the Error class and has a custom name property.
 */
export class EmailAlreadyInUseException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "EmailAlreadyInUseException";
    }
}
/**
 * Exception for when a token is expired.
 * This exception is thrown when a token is expired.
 * The exception extends the Error class and has a custom name property.
 */
export class TokenExpiredException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "TokenExpiredException";
    }
}

/**
 * Exception for when a token is invalid.
 * This exception is thrown when a token is invalid.
 * The exception extends the Error class and has a custom name property.
 */
export class TokenInvalidException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "TokenInvalid";
    }
}

/**
 * Exception for when a token is missing or client tries to do something that is not authorized.
 * This exception is thrown when a token is missing or client tries to do something that is not authorized.
 * The exception extends the Error class and has a custom name property.
 */
export class ForbiddenException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "ForbiddenException";
    }
}