const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class CommentsController{
    async create(request, response){
        const { user_id, article_id, title, text, name } = request.body
        if(!name){
            const userName = await (await knex('users').where({id: user_id}).first()).name
        }
        try{
            await knex('comments').insert({user_id, article_id, title, text, name})
        } catch(error){
            throw new AppError(error, "SQL", 500)
        }
        return response.json({message: 'OK'})
    }
    async index(request, response){
        const comments = await knex("comments")
        return response.json({comments})
    }
    async delete(request, response){
        const {comments_id, article_id, user_id} = request.body
        if(!comments_id) throw new AppError('Comentário Inexistente ou Excluído', 'not_found', 404)
        const comments = await knex("comments").where({id: comments_id, user_id, article_id}).delete()
        if(comments === 0) throw new AppError('Comentário Inexistente ou não autorizado', 'forbidden', 403)
        return response.json({message:"OK"})
    }
    async show(request, response){
        const {id} = request.query
        const comments = await knex("comments").where({article_id: id})
        return response.json({comments})
    }
}

module.exports = CommentsController