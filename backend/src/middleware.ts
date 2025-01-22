import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./config";

export function auth(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"]
    const decodedData = jwt.verify(token as string,jwt_secret) as {userId : string}
    if(decodedData){
        req.userId = decodedData.userId;
        next();
    }
    res.json({"Message":"Please sign in"})

}