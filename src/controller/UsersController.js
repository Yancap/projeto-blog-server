const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")
const knex = require("../database/knex")
const authConfig = require("../config/auth")
const { sign, verify } = require('jsonwebtoken')

class UsersController{
    async show(request, response){
        const { token, id, name, avatar, hierarchy } = request.body
        if (!token) {
            const { secret, expiresIn } = authConfig.jwt
            const token = sign({}, secret, {
                subject: String(id),
                expiresIn
            })
            return response.json({token, name, avatar, hierarchy, id})
        } else {
            return response.json({token, name, avatar, hierarchy, id})
        }
    }
    async create(request, response){
        const { name, email, password } = request.body
        const hashPassword = await hash(password, 8)
        try{
            const data = {
                name, email, avatar: null,
                password: hashPassword, hierarchy: 'reader'
            }
            await knex('users').insert(data)
            return response.json({message: 'OK'})
        } catch (error){
            throw new AppError(error, 'CRUD')
        }
        
    }
    async update(request, response){
        const { id, avatar, newPassword } = request.body
        if(avatar){
            await knex('users').where({id}).update({avatar})
            return response.json({message: 'OK'})
        } else if (newPassword){
            const hashPassword = await hash(newPassword, 8)
            await knex('users').where({id}).update({password: hashPassword})
            return response.json({message: 'OK'})
        } else{
            throw new AppError('Sem Dados', 'redirect', 401, '/login')
        }
    }
    async index(request, response){
        const { id } = request.query
        const author = await knex('users').where({id}).first()
        if(author){
            return response.json({
                id: author.id,
                name: author.name,
                avatar: author.avatar,
            })
        } else{
            throw new AppError('Usuário não encontrado', 'not_found')
        }
    }
}

module.exports = UsersController