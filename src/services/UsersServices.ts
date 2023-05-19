import { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest,  DefaultResponse, ChangeAvatar } from "./IUsersServices"
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppError from "../utils/AppError"
import config from "../config"

const knex = require("../database/knex")


export class UsersServices {
    constructor(){}
    async login(request: LoginRequest): Promise<LoginResponse | number>{
        const { user_id, token, email, password } = request
        if (user_id && token) {
            const user = await knex("users").where({id: user_id}).first()
            return {
                token: token,
                user_id: user.user_id,
                name: user.name,
                avatar: user.avatar,
                hierarchy: user.hierarchy
            }
        }
        if(!email && !password) throw new AppError('Sem Dados', 'redirect', 401, '/login')
        const user = await knex("users").where({email: email}).first()
        if(!user) throw new AppError('Dados Incorretos', 'login')
        const check =  compare(password as string, user.password)
        if(!check)  throw new AppError('Dados Incorretos', 'login')

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
    async register(request: RegisterRequest): Promise< DefaultResponse>{
        const { name, email, password } = request
        
        const emailExist = await knex("users").where({email: email}).first()
        if(emailExist) throw new AppError('Email Existente', 'email')
        
        try{
            const newUser = {
                name, email, avatar: null,
                password, hierarchy: 'reader'
            }
            await knex('users').insert(newUser)
            return {message: 'OK'}
        } catch (error){
            throw new AppError(error , 'CRUD')
        }
    }
    async changePassword(request: ChangePasswordRequest): Promise<DefaultResponse>{
        const { user_id, oldPassword, newPassword } = request
        const userPassword = await knex('users').where({id: user_id}).first().password
        const checkPassword = await compare(oldPassword, userPassword)
        if (checkPassword) throw new AppError('Senha incorreta', 'update-password')
        const hashPassword = await hash(newPassword, 8)
        try {
            await knex('users').where({id: user_id}).update({password: hashPassword})  
        } catch (error) {
            throw new AppError(error, 'update-password')
        }
        return {
            message: 'Senha alterada com sucesso'
        }
    }
    async changeAvatar(request: ChangeAvatar): Promise<DefaultResponse>{
        const { user_id, avatar } = request
        try {
            await knex('users').where({id: user_id}).update({avatar})
        } catch (error) {
            throw new AppError(error, 'change-avatar')
        }
        return {message: 'OK'}
    }
    async getAuthor(id: string){

        try {
            const author = await knex('users').where({id}).first()
            if(author){
                return {
                    id: author.id,
                    name: author.name,
                    avatar: author.avatar,
                }
            } else{
                throw new AppError('Usuário não encontrado', 'not_found')
            }  
        } catch (error) {
            throw new AppError(error, 'not_found')
        }
        
    }
}
