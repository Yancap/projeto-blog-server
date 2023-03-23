const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class ArticlesController{
    async create(request, response){
        const { title, subtitle, text, id: user_id } = request.body
        let { tags } = request.body
        const tagsData = await knex('tags').whereIn('text', tags)
        if(!tagsData[0]){
            const newTags = tags.map(item => {
                return {'text': item}
            });
            await knex('tags').insert(newTags)
            let tag_id = await (await knex('tags').whereIn('text', tags)).map(data => data.id)
            console.log(tag_id);
            await knex('articles').insert({
                title, subtitle, text, user_id, tag_id
            })
            response.json({message: 'OK'})
        } else if (tags.length !== tagsData.length){
            let tagsArray = tagsData.map(item => item.text)
            let tagsNotInclude = []
            tags.forEach((tag)=>{
                if(!tagsArray.include(tag)){
                    tagsNotInclude.push({text: tag})
                }
            })
            const tagsId = await knex('tags').insert(tagsNotInclude) 
            let tag_id = tagsId.map((item)=> item)
            tag_id = [
                ...tag_id,
                tagsData.map(item => item.id)
            ]
        }
    }
    async update(request, response){
                
    }
    async delete(request, response){
                
    }
    async index(request, response){
                
    }
    async show(request, response){
                
    }

}

module.exports = ArticlesController