import Locker from "../models/Locker";
import User from "../models/User";
import Admin from "../models/Admin";

export const mainLocker = async (req, res) => {
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    console.log(lockers[0]._id);
    console.log(Object.values(lockers[0].lockerNum));

    return res.render("locker/mainLocker", {pageTitle : "| 사물함 신청 |", lockers,});
};
/* 사물함 db 불러오는 방법 참고

export const getMyQ = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("questions");
  
    return res.render("users/myQuestion", { pageTitle: "My Questions", user, });
  };

*/

export const getSignup = async (req, res) => {
    const { id } = req.params;
    
    const locker = await Locker.findById(id); // 질문 데이터 object를 찾아 가져오는 model

    return res.render("locker/signUpLocker", {pageTitle : "| 사물함 신청 페이지 |", locker});
};

export const postSignup = async (req, res) => {
    return res.render("home", {pageTitle : "| 사물함 신청 페이지 |"});
};
