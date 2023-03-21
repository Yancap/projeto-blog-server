const AppError = require("../util/AppError")

class AuthUsers{
    async authUpdate(request, response, next){
        const { oldPassword, newPassword, id } = request.body
        if (!id) {
            throw new AppError
        }
        if ((oldPassword && !newPassword) || (!oldPassword && newPassword) ) {
            throw new AppError
        }
        next()
    }
    async authToken(request, response, next){
        const { token } = request.body
        if ( token ) {
            //Validar o Token e recuperar o id
            request.body.id = id
            next()
        } else {
            this.authLogin(request, response, next)
        }
        next()
    }
    async authRegister(request, response, next){

        next()
    }
    async authLogin(request, response, next){
        //Validar Email e Senha
        const {email, password} = request.body
        if(!email){
            //Digite Email
            throw AppError
        }
        if(!password){
            //Digite Senha
            throw AppError
        }
        //Gerar token e recuperar o id

        request.body = {
            token, id
        }

        next()
    }
}

module.exports = AuthUsers