import Locker from "../models/Locker";
import User from "../models/User";
import Admin from "../models/Admin";
import Record from "../models/Record";

export const mainLocker = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

    return res.render("locker/mainLocker", {pageTitle : "사물함 배치도 및 신청", lockers, _id});
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
    const pageTitle = locker.lockerNum + " 사물함 신청"

    if(req.session.user.availableLocker){
        return res.render("locker/signUpLocker", {pageTitle, locker, lockers});
    }else{
        return res.render("locker/youHaveLocker", {pageTitle, locker, lockers, user});
    }
};

// 사물함 신청 함수명 : postSignup
export const postSignup = async (req, res) => {
    const {
        user: { _id },  // user: { _id } : 사용자의 고유 식별자 _id를 가져옴
      } = req.session;  // session : 서버에 저장되어 있는 사용자, 사물함 등의 데이터
                        // req.session : 서버에 있는 데이터를 가져옴

    const { id } = req.params; // req.params : url에 있는 데이터를 가져옴 (사물함 고유 식별자 id)

    const locker = await Locker.findById(id); // findById(id) : url에서 가져온 id로 사물함 db 검색

    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    const { lockerNum } = req.body;
    const pageTitle = locker.lockerNum + " 사물함 신청";

    const now = new Date();
    const kr = new Date(now.setHours(now.getHours() + 9));
    const end = new Date(kr.setMonth(kr.getMonth() + 3)).toISOString();

    if (locker.lockerNum !== lockerNum) {
        return res.status(400).render("locker/signUpLocker", {
        pageTitle, locker, lockers,
        errorMessage: "사물함 번호가 일치하지 않습니다.",
        });
    }

    try {
            // 변수 이름 : signUpLocker
            // await : 데이터를 불러올 때까지 기다림
            // 사물함 데이터 베이스 이름.finfByIdAndUpdate(검색 id, db 변경 사항)
            // url에서 가져온 id로 사물함 db를 검색, owner = 유저 _id, 사용 = 불가능, 신청 날짜 = 현재날짜로 업데이트
            const signUpLocker = await Locker.findByIdAndUpdate(id,
                {   
                    owner: _id,
                    available: false,
                    signupAt: kr
                },
                { new: true }
            );
            
            // 서버에 사물함 데이터를 signUpLocker 동작을 저장
            req.session.locker = signUpLocker;

            const signUpUser = await User.findByIdAndUpdate(_id,
                {   
                    lockers: id,
                    availableLocker: false,
                    signupLockerAt: kr,
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
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    const pageTitle = user.userName + "님의 " + locker.lockerNum + " 사물함 반납";

    return res.render("locker/returnLocker", {pageTitle, locker, lockers, user});
};

export const postReturn = async (req, res) => {
    const {
        user: { _id },
      } = req.session;
    const { id } = req.params;
    const user = await User.findById(_id).populate("lockers");
    const locker = await Locker.findById(id);
    const lockers = await Locker.find({}).sort({ lockerNum: "asc" });
    const { lockerNum } = req.body;
    const pageTitle = user.userName + "님의 " + locker.lockerNum + " 사물함 반납";

    const now = new Date();
    const kr = new Date(now.setHours(now.getHours() + 9));

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
                returnAt: kr
            },
            { new: true }
        );
        
        req.session.locker = returnLocker;
        
        const filter = { locker_id: id };
        await Record.findOneAndRemove(filter);

        const newRec = await Record.create({
            lockerNum: lockerNum,
            locker_id: id,
            lockerPW: locker.lockerPW,
            returnAt: kr,
            owner: _id,
        });
        
        const returnUser = await User.findByIdAndUpdate(_id,
            {   
                lockers: null,
                availableLocker: true,
                returnDate: 0,
                records: newRec._id
            },
            { new: true }
        );

        req.session.user = returnUser;

        return res.redirect(`/users/${req.session.user._id}`);
    } catch (error) {
        console.log(error);
        return res.status(400).render("locker/returnLocker", { 
            pageTitle, locker, lockers, user,
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
    const kr = new Date(now.setHours(now.getHours() + 9));
    const end = new Date(kr.setMonth(kr.getMonth() + 3)).toISOString();

    return res.render("locker/successLocker", {pageTitle : "사물함 신청 완료", locker, user, end});
};