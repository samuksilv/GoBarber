import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.send(401).json({ error: "token not provided" });

        const [, token] = authHeader.split(" ");
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;
        
        next();
    } catch (error) {
        return res.send(401).json({ error: "token not provided" });
    }
};