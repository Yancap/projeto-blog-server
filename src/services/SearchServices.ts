import dbConnection from "../database/knex";
import { ArticlesFromDatabase } from "./interfaces/ISearchServices";


export default class SearchServices{
    async getArticlesByTitle(title: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${title}%`)
        return articles
    }
    async getArticlesBySubtitle(subtitle: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${subtitle}%`)
        return articles
    }
    async getArticlesByText(text: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${text}%`)
        return articles
    }
    async cleanSearch(text: string): Promise<any>{

    }
    async searchArticleService(content: string): Promise<any>{
        const articles = await dbConnection<ArticlesFromDatabase[]>('articles')
        articles.forEach(article => {

        })
        /*
            Vou criar um mecanismo de busca onde irei limpar as buscas, usando uma função que retirar as 
            palavras inuteis, logo em seguida irei percorrer o array onde contem todos os artigos do site e
            usando as colunas 'title', 'subtitle' e 'text', irei verificar quais artigos correspondem a pesquisa

        */
        return articles
    }
}