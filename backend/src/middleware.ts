import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./config";

export function auth(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        res.status(401).json({message:"Authorization Header is required. please Sign-in!"})
        return;
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({message:"Invalid authorization format.Please provide valid token"});
        return;
    }
    try {
        const decodedData = jwt.verify(token,jwt_secret) as {userId : string}

        req.userId = decodedData.userId;

        next();

    } catch (error) {
        console.log("JWT verification failed:",error);
        res.status(401).json({ message: "Invalid or expired token. Please sign in again." });
    }
}