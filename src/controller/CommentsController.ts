import { Request, Response } from "express"
import CommentsService from "../services/CommentsServices"
import AppError from "../utils/AppError"


const commentsService = new CommentsService
export default class CommentsController{
    async create(request: Request, response: Response){
        const { user_id, article_id, title, text, name } = request.body
        
        const message = await commentsService.createComment({user_id, article_id, title, text, name})
        return response.json(message)
    }
    async index(request: Request, response: Response){
        const { article_id } = request.query
        const comments = await commentsService.getAllComments(article_id as string)
        console.log(comments);
        
        return response.json(comments)
    }
    async delete(request: Request, response: Response){
        const {comments_id, article_id, user_id} = request.body
        if(!comments_id) throw new AppError('Comentário Inexistente ou Excluído', 'not_found', 404)
        const message = await commentsService.deleteComment({comments_id, article_id, user_id})
        return response.json(message)
    }
    async show(request: Request, response: Response){
        const {id} = request.query
        const comments = await commentsService.getCommentById(id as string)
        return response.json(comments)
    }
}
