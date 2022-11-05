import express from "express";
import { getAdJoin, postAdJoin,
    getAdLogin, postAdLogin,
    getAdLocker, postAdLocker } from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/adjoin")
.all(publicOnlyMiddleware)
.get(getAdJoin)
.post(postAdJoin);

adminRouter.route("/adlogin")
.all(publicOnlyMiddleware)
.get(getAdLogin)
.post(postAdLogin);

adminRouter.route("/adlocker")
.all(protectorMiddleware)
.get(getAdLocker)
.post(postAdLocker);

export default adminRouter;