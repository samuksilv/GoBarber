import { Router } from "express";
import User from '../models/user';

const routes = new Router();

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

    }

    delete(req, res) {

    }
};

export const controller = new UserController();

routes.get("/user", controller.getAll);
routes.get("/user/:id", controller.getById);
routes.post("/user", controller.save);
routes.put("/user/:id", controller.update);
routes.delete("/user/:id", controller.delete);

export default routes;