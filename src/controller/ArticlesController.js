const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class ArticlesController{
    async create(request, response){
        const { action } = request.body
        if(action.create === 'reject') throw new AppError('Sem Autorização', 'forbidden', 403)
        const { title, subtitle, text, id: user_id, tags } = request.body
        const tagsData = await knex('tags').whereIn('text', tags)
        console.log(tagsData);
        return 0
        if(!tagsData){
            tags = tags.forEach(item => {
                return {text: item}
            });
            const tagsId = await knex('tags').insert(tags)
            const tag_id = tagsId.map((item)=> item)
            await knex('articles').insert({
                title, subtitle, text, user_id, tag_id
            })
        } else if (tags.length !== tagsData.length){
            let tagsArray = tagsData.forEach(item => item.text)
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
                tagsData.forEach(item => item.id)
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