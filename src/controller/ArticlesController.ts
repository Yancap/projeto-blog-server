import { Request, Response } from "express"
import ArticlesServices from "../services/ArticlesServices"
import AppError from "../utils/AppError"



const articlesServices = new ArticlesServices

class ArticlesController{
    async create(request: Request, response: Response){
        const { title, subtitle, text, user_id, image, author} = request.body
        const check = await articlesServices.checkUsersPermissionsForCreate(user_id)
        if (!check) return response.json({message:'Sem Permissão', error:'forbidden'})
        const message = await articlesServices.createArticle({title, subtitle, text, user_id, image, author})
        return response.json(message)
    }
    async update(request: Request, response: Response){
        const { title, subtitle, text, tags_name, article_id: id, image} = request.body
        // try{
        //     if (title) await knex('articles').where({id}).update({title})
        //     if (subtitle) await knex('articles').where({id}).update({subtitle})
        //     if (text) await knex('articles').where({id}).update({text})
        //     if (image) await knex('articles').where({id}).update({image})
        //     if (tags_name) await knex('articles').where({id}).update({tags_name})
        //     response.json({message: 'OK'})
        // } catch(error){
        //     console.log(error);
        //     throw new AppError(error)
        // }
    }
    async delete(request: Request, response: Response){
        const { id, article_id } = request.body
        // if(article_id){
        //     await knex('article').where({id: article_id}).delete()
        //     response.json({message: 'OK'})
        // } else {
        //     const { title, tags_name } = request.body
        //     await knex('articles').where({user_id: id}).where({title, tags_name}).delete()
        //     response.json({message: 'OK'})
        // }
    }
    async index(request: Request, response: Response){
        // const articles = await knex('articles')
        // const tags = await knex('tags')
        // response.json({articles, tags})       
    }
    async show(request: Request, response: Response){
        // const { id, user_id } = request.query
        // if (id) {
        //     const article = await knex('articles').where({id}).first()
        //     if(!article) return new AppError('Esse Artigo não existe ou foi excluido', 'not_found', 404)
        //     return response.json(article) 
        // } else if (user_id) {
            
        //     const article = await knex('articles').where({user_id: user_id})
            
        //     if(!article) return new AppError('Esse Artigo não existe ou foi excluido', 'not_found', 404)
        //     return response.json(article) 
        // } else{
        //     throw new AppError('Sem Parâmetros', 'not_found', 404)
        // }
        
    }

}

module.exports = ArticlesController