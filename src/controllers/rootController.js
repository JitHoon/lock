import User from "../models/User";

export const home = async(req, res) => {
    return res.render("home");
};