import express from "express";
import { getAdJoin, postAdJoin,
    getAdLogin, postAdLogin } from "../controllers/adminController";
import { protectorMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/adjoin")
.all(protectorMiddleware)
.get(getAdJoin)
.post(postAdJoin);

adminRouter.route("/adlogin")
.all(protectorMiddleware)
.get(getAdLogin)
.post(postAdLogin);

export default adminRouter;