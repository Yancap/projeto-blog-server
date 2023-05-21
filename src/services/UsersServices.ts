import { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest,  DefaultResponse, ChangeAvatar } from "./interfaces/IUsersServices"
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppError from "../utils/AppError"
import config from "../config"

const knex = require("../database/knex")
import dbConnection from "../database/knex"

export class UsersServices {
    constructor(){}
    async login(request: LoginRequest){
        const { user_id, token, email, password } = request
        if (user_id && token) {
            const user = await dbConnection("users").where({id: user_id}).first()
            return {
                token: token,
                user_id: user.user_id,
                name: user.name,
                avatar: user.avatar,
                hierarchy: user.hierarchy
            }
        }
        if(!email && !password) return {error:'login failed', message:'Sem dados', redirect: true}
        const user = await dbConnection("users").where({email: email}).first()
        if(!user) return {error:'login failed', message:'Dados incorretos'}
        const check =  compare(password as string, user.password)
        if(!check) return {error:'login failed', message:'Dados incorretos'}

        const { secret, expiresIn } = config.jwt
        const newToken = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return {
            token: newToken,
            user_id: user.id,
            name: user.name,
            avatar: user.avatar,
            hierarchy: user.hierarchy
        }
    }
    async register(request: RegisterRequest){
        const { name, email, password } = request
        
        const emailExist = await dbConnection("users").where({email: email}).first()
        if(emailExist) return {error:'register failed', message:'Email Existente'}
        
        try{
            const newUser = {
                name, email, avatar: null,
                password, hierarchy: 'reader'
            }
            await dbConnection('users').insert(newUser)
            return {message: 'OK'}
        } catch (error){
             return {error: error, message:'CRUD'}
        }
    }
    async changePassword(request: ChangePasswordRequest){
        const { user_id, oldPassword, newPassword } = request
        const userPassword = await (await dbConnection('users').where({id: user_id}).first()).password
        const checkPassword = await compare(oldPassword, userPassword)

        if (checkPassword) return {error:'update-password failed', message:'Senha Incorreta'}

        const hashPassword = await hash(newPassword, 8)
        try {
            await dbConnection('users').where({id: user_id}).update({password: hashPassword})  
        } catch (error) {
            return {error: error, message:'CRUD'}
        }
        return {
            message: 'Senha alterada com sucesso'
        }
    }
    async changeAvatar(request: ChangeAvatar){
        const { user_id, avatar } = request
        try {
            await dbConnection('users').where({id: user_id}).update({avatar})
        } catch (error) {
            return {error: error, message:'CRUD'}
        }
        return {message: 'OK'}
    }
    async getAuthor(id: string){

        try {
            const author = await dbConnection('users').where({id}).first()
            if(author){
                return {
                    id: author.id,
                    name: author.name,
                    avatar: author.avatar,
                }
            } else{
                return {error: 'user not_found', message:'Usuário não encontrado'}
            }  
        } catch (error) {
            return {error: error, message:'Server Error'}
        }
        
    }
}
