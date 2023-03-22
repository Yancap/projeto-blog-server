class AppError{
    message;
    status;
    typeError;
    code;
    constructor(message, typeError, status = 400, code){
        this.message = message
        this.typeError = typeError
        this.status = status
        this.code = code
    }
}

module.exports = AppError