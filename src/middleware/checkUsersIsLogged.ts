import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";


export default function checkUsersIsLogged(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request.body;
    if (!user_id) {
        throw new AppError({
            redirect: true,
            error: 'User not logged in'
        }, "not logged in")
    }
    next();
}