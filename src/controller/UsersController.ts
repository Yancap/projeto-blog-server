import { hash } from "bcryptjs"
import { Request, Response } from "express"
import { UsersServices } from "../services/UsersServices"
import AppError from "../utils/AppError"


const usersServices = new UsersServices()

export default class UsersController{
    async login(request: Request, response: Response){
        const { token, user_id, email, password } = request.body
        const user = await usersServices.login({token, user_id, email, password})
        return response.json(user)
    }
    async create(request: Request, response: Response){
        const { name, email, password } = request.body
        const hashPassword = await hash(password, 8)
        const message = await usersServices.register({name, email, password: hashPassword})
        return response.json(message)
    }
    async update(request: Request, response: Response){
        const { user_id, avatar, newPassword, oldPassword } = request.body
        if (!user_id) return response.json(new AppError('Sem Dados', 'redirect', 401, '/login')) 
        
        if(avatar){
            const message = await usersServices.changeAvatar({user_id, avatar})
            return response.json({message})
        } else if (newPassword){
            const message = await usersServices.changePassword({user_id, newPassword, oldPassword})
            return response.json({message})
        } else{
            return response.json( new AppError('Sem Dados', 'redirect', 401, '/login'))
        }
    }
    async getAuthor(request: Request, response: Response){
        const { id } = request.query
        if (!id) return response.json(new AppError('Sem Dados')) 
        const resp = await usersServices.getAuthor(id as string)
        return response.json(resp)
    }
}
