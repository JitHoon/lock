import User from "../models/User";

export const home = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("questions");

    return res.render("home", {pageTitle : "Home"}, user,);
};

export const postReturn = (req, res) => {
    return res.render("home", {pageTitle : "사물함 반납하기 버튼"});
};