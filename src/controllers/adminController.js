import Admin from "../models/Admin";
import User from "../models/User";
import Locker from "../models/Locker";
import Record from "../models/Record";
import bcrypt from "bcrypt";

export const getAdJoin = (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  res.render("admin/adJoin", {pageTitle : "관리자 가입"});
};

export const postAdJoin = async (req, res) => {
    const {
      admin: { _id },
    } = req.session;
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "관리자 가입";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("admin/adJoin", {
          pageTitle,
          errorMessage: "재확인 비밀번호가 일치하지 않습니다."
        });
    }

    // 유저 데이터 생성, 위 소스코드에서 잡지못한 에러 확인
    try { 
        await Admin.create({
            userName,
            studentID,
            password,
            phoneNumber,
        });
        return res.redirect("/admin/adlogin");
    } catch (error) {
        return res.status(400).render("admin/adJoin", {
            pageTitle, 
            errorMessage: error._message
        });
    }
};

export const getAdLogin = (req, res) => {
  res.render("admin/adLogin", {pageTitle: "관리자 로그인"});
};

export const postAdLogin = async (req, res) => {
    const { studentID, password } = req.body;
    const pageTitle = "관리자 로그인";

    // 존재하지 않는 아이디 에러 메시지
    const admin = await Admin.findOne({ studentID });

    if (!admin) {
      return res.status(400).render("admin/adLogin", {
        pageTitle,
        errorMessage: "존재하지 않는 아이디 입니다."
      });
    }
    
    // 비밀번호 불일치 에러 메시지
    const ok = await bcrypt.compare(password, admin.password);

    if (!ok) {
      return res.status(400).render("admin/adLogin", {
        pageTitle,
        errorMessage: "잘못된 비밀번호 입니다."
      });
    }

    req.session.loggedIn = true;
    req.session.admin = admin;
    req.session.save(function(err) {
      if (err) {
        return res.status(500).render("/500", { pageTitle: "500 loginSeverError" });
      } else return res.redirect(`/admin/${req.session.admin._id}`);
    });
};

export const getAdPOSTLocker = (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  res.render("admin/adPOSTLocker", {pageTitle: "사물함 DB 업로드", _id});
};

export const postAdPOSTLocker = async (req, res) => {
    const {
        admin: { _id },
      } = req.session;

    const { lockerNum, lockerPW } = req.body;

    try { 
        const newLocker = await Locker.create({
            lockerNum,
            lockerPW,
            admin: _id,
        });
        const admin = await Admin.findById(_id);
        admin.lockers.push(newLocker._id);
        admin.save(); 

        return res.redirect(`/admin/${_id}/dblocker/`);

        } catch (error) {
            console.log(error)
            return res.status(400).render("admin/adPOSTLocker", { 
                pageTitle: "사물함 DB 업로드", 
                errorMessage: error._message, _id
            });
        }
};

export const getAdHome = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;

  return res.render("admin/adHome", {pageTitle : "CNU 전자공학과 사물함 신청 시스템", _id});
};

export const getDBLockers = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;

  const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

  return res.render("locker/mainLocker", {pageTitle : "사물함 배치도 및 리스트", lockers, _id});
};

export const getDBLocker = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const { id } = req.params;
  const locker = await Locker.findById(id).populate("owner");
  const pageTitle = locker.lockerNum + " 사물함 데이터";

  return res.render("admin/adLocker", {pageTitle, locker, _id});
};

export const getPWLocker = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const { id } = req.params;
  const locker = await Locker.findById(id).populate("owner");
  const pageTitle = locker.lockerNum + " 사물함 비밀번호 변경";

  return res.render("admin/adPWLocker", {pageTitle, locker, _id});
};

export const postPWLocker = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const { id } = req.params;
  const locker = await Locker.findById(id).populate("owner");
  const { newPW1, newPW2 } = req.body;
  const pageTitle = locker.lockerNum + " 사물함 비밀번호 변경";

  if (newPW1 !== newPW2) {
    return res.status(400).render("admin/adPWLocker", {
      pageTitle, locker, _id,
      errorMessage: "재확인 비밀번호가 일치하지 않습니다.",
    });
  }

  const arr = newPW1.split('');
  const set = new Set(arr);
  
  if(arr.includes('0')) {
    return res.status(400).render("admin/adPWLocker", {
      pageTitle, locker, _id,
      errorMessage: "0을 포함할 수 없습니다.",
    });
  }

  if(arr.length !== set.size) {
    return res.status(400).render("admin/adPWLocker", {
      pageTitle, locker, _id,
      errorMessage: "중복된 숫자가 포함되어 있습니다.",
    });
  }

  try {
      const changePWLocker = await Locker.findByIdAndUpdate(id,
          { lockerPW: newPW1 },
          { new: true }
      );
    
      req.session.locker = changePWLocker;

      return res.redirect(`/admin/${_id}/dblocker/${locker._id}`);
    } catch (error) {
      console.log(error);
      return res.status(400).render("admin/adPWLocker", { 
          pageTitle, locker, _id,
          errorMessage: "사물함 비밀번호 변경 실패, 010-4671-0338 로 문의 주세요."
      });
    }
};

export const getRec = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const records = await Record.find({}).populate("owner").sort({ returnAt: "asc" });

  return res.render("admin/adRec", {pageTitle : "사물함 반납 기록 및 비번 변경", records, _id});
};

export const postRec = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const records = await Record.find({}).populate("owner").sort({ returnAt: "asc" });
  const { newPW, lockerNum } = req.body;
  const pageTitle = "사물함 반납 기록 및 비번 변경";

  const arr = newPW.split('');
  const set = new Set(arr);
  
  if(arr.includes('0')) {
    return res.status(400).render("admin/adRec", {
      pageTitle, records, _id,
      errorMessage: "0을 포함할 수 없습니다.",
    });
  }

  if(arr.length !== set.size) {
    return res.status(400).render("admin/adRec", {
      pageTitle, records, _id,
      errorMessage: "중복된 숫자가 포함되어 있습니다.",
    });
  }

  const locker = await Locker.findOne({lockerNum});

  if(locker === null) {
    return res.status(400).render("admin/adRec", {
      pageTitle, records, _id,
      errorMessage: "사물함 번호가 일치하지 않습니다.",
    });
  }

  if(lockerNum === locker.lockerNum) {
    return res.status(400).render("admin/adRec", {
      pageTitle, records, _id,
      errorMessage: "사물함 번호가 일치하지 않습니다.",
    });
  }
  
  try {
    const filter = { lockerNum: lockerNum };

    const changePWLocker = await Locker.findOneAndUpdate(filter,
        { lockerPW: newPW },
        { new: true }
    );
    req.session.locker = changePWLocker;

    const changeRecord = await Record.findOneAndUpdate(filter,
      { change: true, lockerPW: newPW  },
      { new: true }
    );
    req.session.record = changeRecord;

    return res.redirect(`/admin/${_id}/reclocker`);
  } catch (error) {
    console.log(error);
    return res.status(400).render("admin/adRec", { 
        pageTitle, records, _id,
        errorMessage: "사물함 비밀번호 변경 실패, 010-4671-0338 로 문의 주세요."
    });
  }
};

export const getDBUser = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const users = await User.find({}).populate("lockers").sort({ studentID: "asc" });
  
  return res.render("admin/dbUser", {pageTitle : "사용자 데이터", users, _id});
};

export const getDBUserS = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const { keyword } = req.query;

  let users = [];
  if (keyword) {
    users = await User.find({
        userName: {
          $regex: new RegExp(keyword, "ig"),
        },
    }).populate("lockers");
  }
  
  return res.render("admin/dbUser", {pageTitle : "사용자 데이터", users, _id});
};

export const postRePW = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const users = await User.find({}).sort({ lockerNum: "asc" });

  return res.render("admin/dbUser", {pageTitle : "사용자 데이터", users, _id});
};

export const postTerLocker = async (req, res) => {
  const {
    admin: { _id },
  } = req.session;
  const lockers = await Locker.find({}).sort({ lockerNum: "asc" });

  return res.render("admin/adRec", {pageTitle : "사물함 반납 기록", lockers, _id});
};