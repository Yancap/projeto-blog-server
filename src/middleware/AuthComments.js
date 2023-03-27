const AppError = require("../utils/AppError")

class AuthComments{
    verify(request, response, next){
        const { user_id, article_id } = request.body
        if(!user_id) throw new AppError('Usuário não logado', 'not_login', 401)
        if(!article_id) throw new AppError('Artigo Inexistente ou Excluído', 'not_found', 404)
        next()
    }
}


module.exports = AuthComments