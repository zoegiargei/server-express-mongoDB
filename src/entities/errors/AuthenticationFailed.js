export class AuthentiationFailed extends Error {
    constructor(message = 'Authentication Error'){
        super(message)
        this.type = 'AUTH_FAILED'
    }
};