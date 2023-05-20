import { Request, Response } from "express"
import SearchServices from "../services/SearchServices";

const knex = require("../database/knex")
const AppError = require("../utils/AppError")


const searchServices = new SearchServices

export default class SearchController{
    async index(request: Request, response: Response){
        const { content, author } = request.query;
        
        if(content && typeof content === 'string'){
            // let i = 0
            const resultSearch = []
            for (let data of content.split(' ')) {
                resultSearch.push(await searchServices.getArticlesByTitle(data))
                resultSearch.push(await searchServices.getArticlesBySubtitle(data))
                resultSearch.push(await searchServices.getArticlesByText(data))
            }

            let aux = []
            resultSearch.forEach(datas =>{
                datas.map((data, i) =>{
                    aux.push(data)
                })
                
            })
            const objFilter = {}
            const article = aux.filter((data) =>{
                return objFilter.hasOwnProperty(data.id) ? false : (objFilter[data.id] = true);
            })
            response.json({article})
        } else if (author){
            const articles = await knex('articles').whereLike('author', `%${author}%`)
            response.json(articles)
        }
         else{
            throw new AppError('Sem Dados', 'not_data')
        }
    }
}
