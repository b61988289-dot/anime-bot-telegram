import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { startBot } from "../bot/bot.js";

const router: IRouter = Router();

router.use(healthRouter);

// Start Telegram bot (runs in background via polling)
startBot();

export default router;
