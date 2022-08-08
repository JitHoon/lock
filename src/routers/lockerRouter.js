import express from "express";
import { locker, seeLocker, seePassword } from "../controllers/lockerController";

const lockerRouter = express.Router();

lockerRouter.route("/").get(locker);
lockerRouter.route("/:id(\\d+)").get(seeLocker);
lockerRouter.route("/:id(\\d+)/password").get(seePassword);

export default lockerRouter;