import dbConnection from "../database/knex";
import { CreateComments, DeleteComments } from "./interfaces/ICommentsServices";

export default class CommentsService{
    async createComment({user_id, article_id, title, text, name}: CreateComments){
        try{
            if(!name){
                name = await (await dbConnection('users').where({id: user_id}).first()).name
            }
            await dbConnection('comments').insert({user_id, article_id, title, text, name})
        } catch(error){
            return {error}
        }
        return {message: 'Comentário criado'}
    }
    async deleteComment({comments_id, article_id, user_id}: DeleteComments){
        try{
            await dbConnection('comments').where({id: comments_id})
            .andWhere({article_id: article_id}).andWhere({user_id: user_id}).delete();
            return {message: 'Comentário deletado'}
        } catch(error){
            return {error, message: 'Error Interno'}
        }
    }
    async getAllComments(article_id: string){
        try {
            const comments = await dbConnection('comments').where({article_id})
            return comments 
        } catch (error) {
            return error
        }
        
    }
    async getCommentById(comments_id: string){
        try {
            const comments = await dbConnection('comments').where({id: comments_id}).first()
            return comments
        } catch (error) {
            return error
        }
    }
    async getCommentByUserId(comments_id: string){
        try {
            const comments = await dbConnection('comments').where({user_id: comments_id})
            return comments
        } catch (error) {
            return error
        }
    }
}