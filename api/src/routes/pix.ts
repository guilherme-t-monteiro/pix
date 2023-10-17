import { Router } from "express";
import { PixController } from "../controllers/pixController";

let router: Router = Router();

let pixController: PixController = new PixController();

router.get('/pix', pixController.list);

router.get('/pix/:userId/:type', pixController.find);

router.post('/pix', pixController.create);

export default router;