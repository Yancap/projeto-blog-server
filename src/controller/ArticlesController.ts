import { Request, Response } from "express"
import ArticlesServices from "../services/ArticlesServices"
import AppError from "../utils/AppError"



const articlesServices = new ArticlesServices

export default class ArticlesController{
    async create(request: Request, response: Response){
        const { title, subtitle, text, user_id, image, author} = request.body
        const check = await articlesServices.checkUsersPermissionsForCreate(user_id)
        if (!check) return response.json({message:'Sem Permissão', error:'forbidden'})
        const message = await articlesServices.createArticle({title, subtitle, text, user_id, image, author})
        return response.json(message)
    }
    async update(request: Request, response: Response){
        const { title, subtitle, text, article_id, user_id, image} = request.body
        const message = await articlesServices.updateArticle({title, subtitle, text, article_id, image, user_id})
        return response.json(message)
    }
    async delete(request: Request, response: Response){
        const { user_id, article_id } = request.body
        const message = await articlesServices.deleteArticle({article_id, user_id})
        return response.json(message)
    }
    async index(request: Request, response: Response){
        const article = await articlesServices.getAllArticles()  
        response.json(article) 
    }
    async show(request: Request, response: Response){
        const { id } = request.query
        const { user_id } = request.body

        if (id) {
            const article = await articlesServices.getArticleById(id as string)
            if(!article) return new AppError('Esse Artigo não existe ou foi excluido', 'not_found', 404)
            return response.json(article) 
        } else if (user_id) {
            const article = await articlesServices.getArticlesByUserId(user_id as string)
            if(!article) return new AppError('Esse Artigo não existe ou foi excluido', 'not_found', 404)
            return response.json(article) 
        } else{
            throw new AppError('Sem Parâmetros', 'not_found', 404)
        }
        
    }

}

