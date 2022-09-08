import express from "express";
import { locker, seeLocker, seePassword } from "../controllers/lockerController";
import { protectorMiddleware } from "../middlewares"

const lockerRouter = express.Router();

lockerRouter.route("/").get(locker);
lockerRouter.route("/:id(\\d+)").all(protectorMiddleware).get(seeLocker);
lockerRouter.route("/:id(\\d+)/password").all(protectorMiddleware).get(seePassword);

export default lockerRouter;