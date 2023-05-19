import dbConnection from "../database/knex"
import { CreateArticle } from "./IArticlesServices";

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
            console.log('verdadeiro');
            return true
        }
        console.log('falso');
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
}