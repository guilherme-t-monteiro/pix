import { Router } from "express";
import { UserController } from "../controllers/userController";

let router: Router = Router();

let userController: UserController = new UserController();

router.get('/users', userController.list);

export default router;