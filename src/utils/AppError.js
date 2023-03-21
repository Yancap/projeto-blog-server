class AppError{
    message;
    status;
    typeError;
    constructor(message, typeError, status = 400){
        this.message = message
        this.typeError = typeError
        this.status = status
    }
}

module.exports = AppError