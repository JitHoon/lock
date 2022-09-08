import express from "express";
import { home } from "../controllers/rootController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { search } from "../controllers/qnaController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/search").get(search);

export default rootRouter; 