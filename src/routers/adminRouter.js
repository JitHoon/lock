import express from "express";
import { handleUserData, handleChangePw, handleQna  } from "../controllers/adminController";


const adminRouter = express.Router();

adminRouter.get("/userData", handleUserData);
adminRouter.get("/changePw", handleChangePw);
adminRouter.get("/qna", handleQna);

export default lockRouter;