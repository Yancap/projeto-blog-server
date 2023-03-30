const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class SearchController{
    async index(request, response){
        const { title, author, hashtag } = request.query
        
        if(title){
            let i = 0
            let array = []
            for (let data of title.split(' ')) {
                array.push(await knex('articles').whereLike('title', `%${data}%`))
                array.push(await knex('articles').whereLike('subtitle', `%${data}%`))
                array.push(await knex('articles').whereLike('text', `%${data}%`))
            }

            let aux = []
            array.forEach(datas =>{
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
        } else if (hashtag){
            const articles = await knex('articles').whereLike('tags_name', `%${hashtag}%`)
            response.json(articles)
        } else{
            throw new AppError('Sem Dados', 'not_data')
        }
    }
}

module.exports = SearchController