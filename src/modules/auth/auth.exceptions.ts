export class UserNotFoundException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "UserNotFoundException";
    }
}

export class InvalidCredentialsException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "InvalidCredentialsException";
    }
}

export class EmailAlreadyInUseException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "EmailAlreadyInUseException";
    }
}

export class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "UnauthorizedException";
    }
}

export class TokenExpiredException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "TokenExpiredException";
    }
}

export class TokenInvalidException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "TokenInvalid";
    }
}

export class ForbiddenException extends Error {
    constructor(message: string) {
        super(message); 
        this.name = "ForbiddenException";
    }
}