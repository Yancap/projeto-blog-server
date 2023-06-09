import dbConnection from "../database/knex"
import { CreateArticle, DeleteArticle, UpdateArticle } from "./interfaces/IArticlesServices";

export default class ArticlesServices{
    async checkUsersPermissionsForCreate(user_id: string): Promise<boolean>{
        const user = await dbConnection('users').where({id: user_id}).first()
        if(user.hierarchy && user.hierarchy !== 'reader'){
            return true
        }
        return false
    }
    async checkUsersPermissionForEdit(user_id: string, article_id: string){
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
            return {message: 'Artigo criado com sucesso!'}
        } catch(error){
            return {error, message: 'Error na criação'}
        }
    }
    async updateArticle(article: UpdateArticle){
        const check = this.checkUsersPermissionForEdit(article.user_id, article.id)
        if (!check) return {message: 'forbidden'}

        try {
           await dbConnection('articles').where({id: article.id}).update(article) 
        } catch (error) {
            return {error}
        }
        return {message: 'Artigo atualizado com sucesso'}
    }
    async deleteArticle({user_id, article_id}: DeleteArticle){
        const check = await this.checkUsersPermissionForEdit(user_id, article_id)
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