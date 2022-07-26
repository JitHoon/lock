import express from "express";
import { locker, seeLocker, seePassword } from "../controllers/lockerController";

const lockerRouter = express.Router();

lockerRouter.get("/", locker);
lockerRouter.get("/:id(\\d+)", seeLocker);
lockerRouter.get("/:id(\\d+)/password", seePassword);

export default lockerRouter;