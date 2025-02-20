import { JWT_SECRET } from "../../config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({message: "Invalid token"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        if(decoded.userId) {
            req.userId = decoded.userId
            next()
        } else {
            return res.status(403).json({})
        }
    } catch (error) {
        return res.status(403).json({message: error})
    }
}