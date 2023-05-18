const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const authConfig = require("../config")
const { verify } = require('jsonwebtoken')
const { compare } = require('bcryptjs')

class AuthUsers{
    async authUpdate(request, response, next){
        const { oldPassword, newPassword, id } = request.body
        if (!id) {
            throw new AppError('Sem Dados', 'redirect', 401, '/login')
        }
        if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
            throw new AppError('Digite as Duas Senhas', 'update-password')
        }
        next()
    }
    async authToken(request, response, next){
        const head  = request.headers.authorization
        if ( head ) {
            const [, token ] = head.split(" ")

            try {
                const {sub: id} = verify(token, authConfig.jwt.secret)
                request.body = {
                    ...request.body,
                    token,
                    id: Number(id)
                }
                return next()
            } catch (error) {
                console.error("Incorrect Token")
                return next()
            }
        } else {
            return next()
        }
        
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
        const {email, password, token, id} = request.body
        if(id) {
            const data = await knex("users").where({id}).first()
            request.body = {
                token,
                id,
                name: data.name,
                avatar: data.avatar,
                hierarchy: data.hierarchy
            }
            return next()
        }
        //Caso não exista token, email ou senha recebidos, enviar um redirecionamento
        //para o usuario fazer o login
        if(!email && !password) throw new AppError('Sem Dados', 'redirect', 401, '/login')
        const data = await knex("users").where({email}).first()
        if(!data) throw new AppError('Dados Incorretos', 'login')
        const check = await compare(password, data.password)
        if(!check) throw new AppError('Dados Incorretos', 'login')
        request.body = {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            hierarchy: data.hierarchy
        }
        next()
    }
}

module.exports = AuthUsers