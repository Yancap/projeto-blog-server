const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")
const knex = require("../database/knex")

class UsersController{
    async show(request, response){
        const { token, id } = request.body
        //Mostrar o Nome do Usuario e o Avatar e Retornar o token para armazenamento
        //no LocalStorage
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
            response.json({message: 'OK'})
        } catch (error){
            throw new AppError(error, 'CRUD')
        }
        
    }
    async update(request, response){
        const { id, avatar, newPassword } = request.body
        if(avatar){
            //Adicionar ou Atualizar o Avatar
        } else if (newPassword){
            //Trocar e Atualizar a Senha
        } else{
            throw new AppError('', '')
        }
    }
}

module.exports = UsersController