import req from "express/lib/request";
import res from "express/lib/response";
import Locker from "../models/Locker";

export const getAdmin = async (req, res) => {return res.render("home", {pageTitle : "사물함 데이터 관리"});};
export const postAdmin = async (req, res) => {return res.render("home", {pageTitle : "사물함 데이터 관리"});};