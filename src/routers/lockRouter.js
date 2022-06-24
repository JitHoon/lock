import express from "express";
import { application } from "../controllers/lockController";

const lockRouter = express.Router();

lockRouter.get("/:id(\\d+)/application", application);

export default lockRouter;