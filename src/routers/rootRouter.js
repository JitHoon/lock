import express from "express";
import { home, 
    postReturn, } from "../controllers/rootController";
import { getJoin, postJoin,
    getLogin, postLogin, } from "../controllers/userController";
import { search } from "../controllers/qnaController";
import { publicOnlyMiddleware } from "../middlewares"

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route("/search").get(search);

rootRouter.route("/return")
.all(publicOnlyMiddleware)
.post(postReturn);

export default rootRouter; 