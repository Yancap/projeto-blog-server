const { verify } = require('jsonwebtoken');
const config = require("../config")

async function authToken(request, response, next){
    const head  = request.headers.authorization
    if ( head ) {
        const [, token ] = head.split(" ")

        if (!token) return next()
        
        try {
            const {sub: id} = verify(token, config.jwt.secret)
            request.body = {
                ...request.body,
                token,
                user_id: Number(id)
            }
            return next()
        } catch (error) {
            return response.json({
                redirect: true,
                message: 'Token expired or invalid'
            })
        }
    }
    return next()
}

module.exports = authToken