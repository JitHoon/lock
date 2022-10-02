import express from "express";
import { getAdmin, postAdmin, } from "../controllers/adminController";
import { protectorMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/")
.all(protectorMiddleware)
.get(getAdmin)
.post(postAdmin);

export default adminRouter;