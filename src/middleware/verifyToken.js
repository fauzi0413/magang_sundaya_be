require('dotenv').config();
import { jwt } from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.status(401)
    }
    jwt.verify(token, prosess.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error){
            return res.status(403)
            req.username = decoded.username
            next()
        }
    })
}