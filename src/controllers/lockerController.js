import Locker from "../models/Locker";
import User from "../models/User";
import Admin from "../models/Admin";

export const mainLocker = async (req, res) => {
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    console.log(lockers[0]._id);
    console.log(Object.values(lockers[0].lockerNum));

    return res.render("locker/mainLocker", {pageTitle : "| 사물함 위치 및 신청 |", lockers,});
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
    const locker = await Locker.findById(id);
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    console.log(locker.lockerNum.substr(0, 1));

    return res.render("locker/signUpLocker", {pageTitle : "| " +locker.lockerNum + " 사물함 신청 |", locker, lockers});
};

export const postSignup = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const locker = await Locker.findById(id);
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    const { lockerNum } = req.body;
    const pageTitle = "| " +locker.lockerNum + " 사물함 신청 |";

    if (locker.lockerNum !== lockerNum) {
        return res.status(400).render("locker/signUpLocker", {
          pageTitle, locker, lockers,
          errorMessage: "사물함 번호가 일치하지 않습니다.",
        });
    }

    try {
            const signUpLocker = await Locker.findByIdAndUpdate(id,
                {   
                    owner: _id,
                    available: false,
                    signupAt: Date.now()
                },
                { new: true }
            );
            
            req.session.locker = signUpLocker;

            const signUpUser = await User.findByIdAndUpdate(_id,
                {   
                    lockers: id,
                    availableLocker: false,
                    signupLockerAt: Date.now()
                },
                { new: true }
            );

            req.session.user = signUpUser;

            return res.redirect(`/users/${req.session.user._id}`);
        } catch (error) {
            console.log(error);
            return res.status(400).render("locker/signUpLocker", { 
                pageTitle, locker, lockers,
                errorMessage: "사물함 신청 실패, 010-4671-0338 로 문의 주세요."
            });
        }
};
