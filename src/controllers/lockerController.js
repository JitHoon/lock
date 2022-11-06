import Locker from "../models/Locker";
import User from "../models/User";
import Admin from "../models/Admin";

export const mainLocker = async (req, res) => {
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    return res.render("locker/mainLocker", {pageTitle : "| 사물함 신청 |", lockers});
};
/* 사물함 db 불러오는 방법 참고

export const getMyQ = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("questions");
  
    return res.render("users/myQuestion", { pageTitle: "My Questions", user, });
  };

*/

export const alphabetLocker = (req, res) => {
    return res.render("home", {pageTitle : "3*3 숫자 사물함"});
};


export const getAplly = async (req, res) => {return res.render("home", {pageTitle : "숫자 사물함 클릭 후"});};

export const postAplly = async (req, res) => {return res.render("home", {pageTitle : "사물함 신청 버튼"});};
