import User from "../models/Admin";
import Locker from "../models/Locker";
import bcrypt from "bcrypt";

export const getAdJoin = (req, res) => res.render("admin/adJoin", {pageTitle : "| Join Admin |"});

export const postAdJoin = async (req, res) => {
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "| Join Admin |";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("admin/adJoin", {
          pageTitle,
          errorMessage: "재확인 비밀번호가 일치하지 않습니다.",
        });
    }

    // 유저 데이터 생성, 위 소스코드에서 잡지못한 에러 확인
    try { 
        await User.create({
            userName,
            studentID,
            password,
            phoneNumber,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("admin/adJoin", {
            pageTitle: "| Join Admin |", 
            errorMessage: error._message 
        });
    }
};