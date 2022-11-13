import User from "../models/User";

export const home = async(req, res) => {
    return res.render("home", { pageTitle: "CNU 전자공학과 사물함 신청 시스템"});
};