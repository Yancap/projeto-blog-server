const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const config = require("../config")
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const { use } = require("../routes/users.routes")

class LoginServices {
    async login(data){
        if (data.user_id && data.token) {
            const user = await knex("users").where({id: data.user_id}).first()
            return {
                token: data.token,
                user_id: user.user_id,
                name: user.name,
                avatar: user.avatar,
                hierarchy: user.hierarchy
            }
        }
        if(!data.email && !data.password) console.log('error 1')//throw new AppError('Sem Dados', 'redirect', 401, '/login')
        const user = await knex("users").where({email: data.email}).first()
        if(!user) console.log('error 2')//throw new AppError('Dados Incorretos', 'login')
        const check = await compare(data.password, user.password)
        if(!check) console.log('error 32') //throw new AppError('Dados Incorretos', 'login')

        const { secret, expiresIn } = config.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return {
            token: token,
            user_id: user.id,
            name: user.name,
            avatar: user.avatar,
            hierarchy: user.hierarchy
        }
    }
}

module.exports = LoginServices;