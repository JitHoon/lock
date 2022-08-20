import express from "express";
import { home, qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);

export default globalRouter;