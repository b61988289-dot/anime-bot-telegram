import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import { startBot } from "../bot/bot.js";

const router: IRouter = Router();

router.use(healthRouter);

startBot();

export default router;
