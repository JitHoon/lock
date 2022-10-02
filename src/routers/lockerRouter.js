import express from "express";
import { mainLocker, alphabetLocker, numberLocker,
    getAplly, postAplly } from "../controllers/lockerController";
import { protectorMiddleware } from "../middlewares";

const lockerRouter = express.Router();

lockerRouter.route("/").get(mainLocker);
lockerRouter.route("/alphabet")
.all(protectorMiddleware)
.get(alphabetLocker);
lockerRouter.route("/alphabet/:id([0-9a-f]{24})")
.all(protectorMiddleware)
.get(numberLocker);
lockerRouter.route("/alphabet/:id([0-9a-f]{24})/apply")
.all(protectorMiddleware)
.get(getAplly)
.post(postAplly);

export default lockerRouter;