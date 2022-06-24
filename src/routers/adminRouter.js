import express from "express";
import { userData, qna, changePw  } from "../controllers/adminController";


const adminRouter = express.Router();

adminRouter.get("/userData", userData);
adminRouter.get("/:id(\\d+)/qna", qna);
adminRouter.get("/:id(\\d+)/changePw", changePw);

export default adminRouter;