import dbConnection from "../database/knex"
import AppError from "../utils/AppError";
import { CreateArticle, DeleteArticle, UpdateArticle } from "./IArticlesServices";

export default class ArticlesServices{
    async checkUsersPermissionsForCreate(user_id: string): Promise<boolean>{
        const user = await dbConnection('users').where({id: user_id}).first()
        if(user.hierarchy && user.hierarchy !== 'reader'){
            console.log('verdadeiro');
            return true
        }
        console.log('falso');
        return false
    }
    async checkUsersPermissionForEdit(user_id:string, article_id: string){
        const check = await dbConnection('articles').where({id: article_id}).andWhere({user_id}).first()
        if (check) {
            return true
        }
        return false
    }
    async createArticle({title, subtitle, text, user_id, image, author}: CreateArticle){
        try{
            await dbConnection('articles').insert({
                title, subtitle, text, user_id, image, author
            }) 
            return {message: 'Success'}
        } catch(error){
            return error
        }
    }
    async updateArticle({title, subtitle, text, article_id, user_id, image}: UpdateArticle){
        const check = this.checkUsersPermissionForEdit(user_id, article_id)
        if (!check) return {message: 'forbidden'}

        let update = {}
        if(title) update = {...update, title}
        if (subtitle) update = {...update, subtitle}
        if (text) update = {...update, text}
        if (image) update = {...update, image}
        try {
           await dbConnection('articles').where({id: article_id}).update(update) 
        } catch (error) {
            return {error}
        }
        return {message: 'Success'}
    }
    async deleteArticle({user_id, article_id}: DeleteArticle){
        const check = this.checkUsersPermissionForEdit(user_id, article_id)
        if (!check) return {message: 'forbidden'}
        try {
            await dbConnection('articles').where({id: article_id}).delete()
            return {message: 'OK'}
        } catch (error) {
            return {error}
        }
    }
    async getAllArticles(){
        const articles = await dbConnection('articles')
        return articles
    }
    async getArticleById(article_id: string){
        const article = await dbConnection('articles').where({id: article_id}).first()
        return article
    }
    async getArticlesByUserId(user_id: string){
        const article = await dbConnection('articles').where({user_id})
        return article
    }
}