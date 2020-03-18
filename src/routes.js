import { Router } from "express";

import userRoutes from "./app/controllers/userController";
import sessionRoutes from "./app/controllers/sessionController";

const routes = [userRoutes, sessionRoutes];

const router = new Router();

routes.map(r => router.use("/api", r));

export default router;