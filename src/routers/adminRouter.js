import express from "express";
import { getAdJoin, postAdJoin, } from "../controllers/adminController";
import { protectorMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/")
.all(protectorMiddleware)
.get(getAdJoin)
.post(postAdJoin);

export default adminRouter;