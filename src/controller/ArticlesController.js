const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class ArticlesController{
    async create(request, response){
        const { title, subtitle, text, id: user_id } = request.body
        let { tags_name, author } = request.body
        let tagsArray = tags_name.split(" ")
        const tagsData = await knex('tags').whereIn('text', tagsArray)
        if(!author){
            author = await (await knex('users').where({id: user_id}).first()).name
        }
        if(!tagsData[0]){
            const newTags = tagsArray.map(item => {
                return {'text': item}
            });
            await knex('tags').insert(newTags)
            let article_id = await knex('articles').insert({
                title, subtitle, text, user_id, tags_name, author
            })
            article_id = article_id.reduce(id => id)
            const article = await knex('articles').where({id: article_id}).first()
            response.json({message: 'OK', article})
        } else if (tagsArray.length !== tagsData.length){
            let tagsAux = tagsData.map(item => item.text)
            let tagsNotInclude = []
            tagsArray.forEach((tag)=>{
                if(!tagsAux.includes(tag)){
                    tagsNotInclude.push({text: tag})
                }
            })
            await knex('tags').insert(tagsNotInclude) 
            let article_id = await knex('articles').insert({
                title, subtitle, text, user_id, tags_name, author
            })
            article_id = article_id.reduce(id => id)
            const article = await knex('articles').where({id: article_id}).first()
            response.json({message: 'OK', article})
        } else if (tagsArray.length === tagsData.length){
            console.log('tem todas as tags');
            let article_id = await knex('articles').insert({
                title, subtitle, text, user_id, tags_name, author
            })
            article_id = article_id.reduce(id => id)
            const article = await knex('articles').where({id: article_id}).first()
            response.json({message: 'OK', article})
        } else{
            throw new AppError('error', 'internal-error', 500)
        }
    }
    async update(request, response){
        const { title, subtitle, text, tags_name, id: user_id, article_id: id} = request.body
        try{
            if (title) await knex('articles').where({id, user_id}).update({title})
            if (subtitle) await knex('articles').where({id, user_id}).update({subtitle})
            if (text) await knex('articles').where({id, user_id}).update({text})
            if (tags_name) await knex('articles').where({id, user_id}).update({tags_name})
            response.json({message: 'OK'})
        } catch(error){
            throw new AppError(error)
        }
    }
    async delete(request, response){
        const { id, article_id } = request.body
        if(article_id){
            await knex('article').where({id: article_id}).delete()
            response.json({message: 'OK'})
        } else {
            const { title, tags_name } = request.body
            await knex('articles').where({user_id: id}).where({title, tags_name}).delete()
            response.json({message: 'OK'})
        }
    }
    async index(request, response){
        const articles = await knex('articles')
        const tags = await knex('tags')
        response.json({articles, tags})       
    }
    async show(request, response){
        const { id } = request.query
        console.log(id);
        const article = await knex('articles').where({id}).first()
        if(!article) return new AppError('Esse Artigo não existe ou foi excluido', 'not_found', 404)
        return response.json(article)
    }

}

module.exports = ArticlesController