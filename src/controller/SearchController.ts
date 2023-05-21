import { Request, Response } from "express"
import SearchServices from "../services/SearchServices";

const knex = require("../database/knex")
const AppError = require("../utils/AppError")


const searchServices = new SearchServices

export default class SearchController{
    async index(request: Request, response: Response){
        const { content, author } = request.query;
        const articles = await searchServices.searchArticleService(content as string)
        response.json(articles)
    }
}
