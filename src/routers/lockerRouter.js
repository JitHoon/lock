import express from "express";
import { locker } from "../controllers/lockerController";

const lockerRouter = express.Router();

lockerRouter.get("/locker", locker);

export default lockerRouter;