import { Router } from "express";

import userRoutes from "./app/controllers/userController";

const routes = [userRoutes];

const router = new Router();

routes.map(r => router.use("/api", r));

export default router;