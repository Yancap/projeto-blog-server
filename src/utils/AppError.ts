export default class AppError{
    message: any;
    status: number;
    typeError?: string;
    code?;
    constructor(message: any, typeError?: string, status = 400, code?: string){
        this.message = message
        this.typeError = typeError
        this.status = status
        this.code = code
    }
}
