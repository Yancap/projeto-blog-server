const AppError = require("../util/AppError")

class UsersController{
    show(request, response){
        const { token, id } = request.body
        //Mostrar o Nome do Usuario e o Avatar e Retornar o token para armazenamento
        //no LocalStorage
    }
    create(){
        //register
    }
    update(request, response){
        const { id, avatar, newPassword } = request.body
        if(avatar){
            //Adicionar ou Atualizar o Avatar
        } else if (newPassword){
            //Trocar e Atualizar a Senha
        } else{
            throw new AppError
        }
    }
}

module.exports = UsersController