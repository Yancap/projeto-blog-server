import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";


export default async function authToken(request: Request, response: Response, next: NextFunction){
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
