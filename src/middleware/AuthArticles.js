const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class AuthArticles{
    async verifyUsers(request, response, next){
        const { user_id: id, hierarchy } = request.body
        if (!id) throw new AppError('Sem Dados', 'redirect', 401, '/login')
        if (!hierarchy) throw new AppError('Sem a Hierarquia', 'no-hierarchy', 401)
        if (hierarchy === 'reader') {
            request.body = {
                ...request.body,
                action: {
                    read: 'ok',
                    create: 'reject',
                    delete: 'reject'
                }
            }
        } else if (hierarchy === 'publisher'){
            request.body = {
                ...request.body,
                action:{
                    read: 'ok',
                    create: 'ok',
                    delete: 'ok',
                    deleteOthers: 'reject'
                }
            }
        } else if (hierarchy === 'admin'){
            request.body = {
                ...request.body,
                action:{
                    read: 'ok',
                    create: 'ok',
                    delete: 'ok',
                    deleteOthers: 'ok'
                }
            }
        } else{
            new AppError('Hierarquia não encontrada', 'no-hierarchy', 500)
        }
        next()
    }
    async authCreate(request, response, next){
        const { action } = request.body
        if(action.create === 'reject') throw new AppError('Sem Autorização', 'forbidden', 403)
        next()
    }
    async authDelete(request, response, next){
        const { action } = request.body
        if(action.delete === 'reject') throw new AppError('Sem Autorização', 'forbidden', 403)
        next()
    }
    async countAccess(request, response, next){
        const { id, access } = request.query
        if(access) await knex('articles').where({id}).update({access: access + 1})
        next()
        //O access deve ser passado quando alguem clicar para ler e não quando clicar para editar
    }
}

module.exports = AuthArticles