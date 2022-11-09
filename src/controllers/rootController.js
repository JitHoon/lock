import User from "../models/User";

export const home = async(req, res) => {
    return res.render("home", {pageTitle : "| HOME |"});
};

export const postReturn = (req, res) => {
    return res.render("home", {pageTitle : "사물함 반납하기 버튼"});
};