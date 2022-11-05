import Locker from "../models/Locker";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";

export const getAdJoin = (req, res) => res.render("admin/adJoin", {pageTitle : "| Admin Join |"});

export const postAdJoin = async (req, res) => {
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "| Admin Join |";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("admin/adJoin", {
          pageTitle,
          errorMessage: "재확인 비밀번호가 일치하지 않습니다.",
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
            pageTitle: "| Admin Join |", 
            errorMessage: error._message 
        });
    }
};

export const getAdLogin = (req, res) => res.render("admin/adLogin", {pageTitle: "| Admin Login |"});

export const postAdLogin = async (req, res) => {
    const { studentID, password } = req.body;
    const pageTitle = "| Admin Login |";

    // 존재하지 않는 아이디 에러 메시지
    const admin = await Admin.findOne({ studentID });

    if (!admin) {
      return res.status(400).render("admin/adLogin", {
        pageTitle,
        errorMessage: "존재하지 않는 아이디 입니다.",
      });
    }
    
    // 비밀번호 불일치 에러 메시지
    const ok = await bcrypt.compare(password, admin.password);

    if (!ok) {
      return res.status(400).render("admin/adLogin", {
        pageTitle,
        errorMessage: "잘못된 비밀번호 입니다.",
      });
    }

    req.session.loggedIn = true;
    req.session.admin = admin;
    req.session.save(function(err) {
      if (err) {
        return res.status(500).render("/500", { pageTitle: "500 loginSeverError" });
      } else return res.redirect("/");
    });
};

export const getAdLocker = (req, res) => {
  res.render("admin/adLocker", {pageTitle: "| POST Locker DB |"});
};

export const postAdLocker = async (req, res) => {
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

        return res.redirect("/locker");

        } catch (error) {
            console.log(error._message)
            return res.status(400).render("admin/adLocker", { 
                pageTitle: "| POST Locker DB |", 
                errorMessage: error._message
            });
        }
};