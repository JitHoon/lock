import express from "express";
import { handleLayout, handleApplication, handlePassword } from "../controllers/lockController";

const lockRouter = express.Router();

lockRouter.get("/layout", handleLayout);
lockRouter.get("/application", handleApplication);
lockRouter.get("/password", handlePassword);

export default lockRouter;