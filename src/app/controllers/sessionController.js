import jwt from "jsonwebtoken";
import {Router} from "express";
import User from '../models/user';
import authConfig from '../../config/auth';

class SessionController {

    async login(req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user)
            return res.status(401).json({ error: "User not found" });

        if (!(await user.checkPassword(password)))
            return res.status(401).json({ error: "Invalid password" });

        const { id, name } = user;

        const token = jwt.sign({
            id
        },
        authConfig.secret,
        {
            expiresIn: authConfig.expireIn
        });

        return res.status(201).json({
            user: {
                id,
                name,
                email,
            },
            token
        });
    }
}

const routes = new Router();

const controller = new SessionController();

routes.post("/login", controller.login);

export default routes;