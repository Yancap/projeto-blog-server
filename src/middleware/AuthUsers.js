const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { compare } = require('bcryptjs')

class AuthUsers{
    async authUpdate(request, response, next){
        const { oldPassword, newPassword, id } = request.body
        if (!id) {
            throw new AppError('', '')
        }
        if ((oldPassword && !newPassword) || (!oldPassword && newPassword) ) {
            throw new AppError('', '')
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
        const { email } = request.body
        const data = await knex("users").where({email}).first()
        if(data){
            throw new AppError('Email Existente', 'email')
        } 
        next()
    }
    async authLogin(request, response, next){
        //Validar Email e Senha
        const {email, password} = request.body
        if(!email){
            //Digite Email
            throw AppError('', '')
        }
        if(!password){
            //Digite Senha
            throw AppError('', '')
        }
        //Gerar token e recuperar o id

        request.body = {
            token, id
        }

        next()
    }
}

module.exports = AuthUsers