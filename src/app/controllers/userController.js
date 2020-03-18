import { Router } from "express";
import User from '../models/user';
import AuthMiddleware from '../middlewares/AuthMiddleware';

class UserController {

    async getAll(req, res) {

        const users = await User.findAll({
            attributes: ["id", "name", "email", "provider", "updated_at", "created_at"]
        });

        return res.json(users);
    }

    async getById(req, res) {

        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            attributes: ["id", "name", "email", "provider", "updated_at", "created_at"]
        });

        return res.json(user);
    }

    async save(req, res) {

        const countUsers = await User.count({
            where: { email: req.body.email }
        });

        if (countUsers)
            return res.status(400).json({ error: "Email already exists" });

        const { id, name, email, provider, password_hash } = await User.create(req.body);

        return res.status(201).json({ id, name, email, provider });

    }

    async update(req, res) {

        const { userId: id } = req;
        const { email, name, password, provider } = req.body;

        const user = await User.findOne({ where: { id } });

        const { updatedAt, createdAt } = await user.update({ email, name, password, provider });

        return res.status(200).json({ id, email, name, provider, updatedAt, createdAt });
    }

    async delete(req, res) {

    }
};

const controller = new UserController();
const routes = new Router();

routes.get("/user", controller.getAll);
routes.get("/user/:id", controller.getById);
routes.post("/user", controller.save);

routes.put("/user", AuthMiddleware, controller.update);
routes.delete("/user/:id", controller.delete);

export default routes;