import Locker from "../models/Locker";
import User from "../models/User";
import Admin from "../models/Admin";

export const mainLocker = async (req, res) => {
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    return res.render("locker/mainLocker", {pageTitle : "| 사물함 배치도 및 신청 |", lockers,});
};
/* 사물함 db 불러오는 방법 참고

export const getMyQ = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("questions");
  
    return res.render("users/myQuestion", { pageTitle: "My Questions", user, });
  };

*/

export const getSignup = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const user = await User.findById(_id);
    const locker = await Locker.findById(id);
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    console.log(user);

    if(req.session.user.availableLocker){
        return res.render("locker/signUpLocker", {pageTitle : "| " +locker.lockerNum + " 사물함 신청 |", locker, lockers});
    }else{
        return res.render("locker/youHaveLocker", {pageTitle : "사물함 신청 완료 안내문", locker, lockers, user});
    }
};

export const postSignup = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const locker = await Locker.findById(id);
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    const { lockerNum } = req.body;

    const now = new Date();
    const end = new Date(now.setMonth(now.getMonth() + 3)).toISOString();

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
                    signupLockerAt: Date.now(),
                    returnDate: end
                },
                { new: true }
            );

            req.session.user = signUpUser;

            return res.redirect("/locker/alert");
        } catch (error) {
            console.log(error);
            return res.status(400).render("locker/signUpLocker", { 
                pageTitle, locker, lockers,
                errorMessage: "사물함 신청 실패, 010-4671-0338 로 문의 주세요."
            });
        }
};

export const getReturn = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const user = await User.findById(_id).populate("lockers");
    const locker = await Locker.findById(id);
    const pageTitle = "| " + user.userName + "님의 " + locker.lockerNum + " 사물함 반납 |";

    return res.render("locker/returnLocker", {pageTitle, locker, user});
};

export const postReturn = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const user = await User.findById(_id).populate("lockers");
    const locker = await Locker.findById(id);
    const { lockerNum } = req.body;

    const pageTitle = "| " + user.userName + "님의 " + locker.lockerNum + " 사물함 반납 |";

    if (locker.lockerNum !== lockerNum) {
        return res.status(400).render("locker/returnLocker", {
        pageTitle, locker, user,
        errorMessage: "사물함 번호가 일치하지 않습니다.",
        });
    }

    try {
        const returnLocker = await Locker.findByIdAndUpdate(id,
            {   
                owner: null,
                available: true,
                returnAt: Date.now()
            },
            { new: true }
        );
        
        req.session.locker = returnLocker;

        const returnUser = await User.findByIdAndUpdate(_id,
            {   
                lockers: null,
                availableLocker: true,
                returnDate: 0
            },
            { new: true }
        );

        req.session.user = returnUser;

        return res.redirect(`/users/${req.session.user._id}`);
    } catch (error) {
        console.log(error);
        return res.status(400).render("locker/returnLocker", { 
            pageTitle, locker, user,
            errorMessage: "사물함 반납 실패, 010-4671-0338 로 문의 주세요."
        });
    }
};


export const getSuccess = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const user = await User.findById(_id);

    const locker = req.session.locker;
    const now = new Date();
    const end = new Date(now.setMonth(now.getMonth() + 3)).toISOString();

    return res.render("locker/successLocker", {pageTitle : "| 사물함 신청 완료 |", locker, user, end});
};