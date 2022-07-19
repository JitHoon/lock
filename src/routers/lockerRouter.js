import express from "express";
import { locker, seeLocker } from "../controllers/lockerController";

const lockerRouter = express.Router();

lockerRouter.get("/", locker);
lockerRouter.get("/:id(\\d+)", seeLocker);

export default lockerRouter;