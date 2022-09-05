import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "Join";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("join", {
          pageTitle,
          errorMessage: "Password confirmation does not match.",
        });
    }
    
    // 중복 아이디 에러 메시지
    const exists = await User.exists({ $or: [{ studentID }, { phoneNumber }] });
    if (exists) {
    return res.status(400).render("join", {
        pageTitle,
        errorMessage: "This studentID/phoneNumber is already taken.",
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
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: error._message 
        });
    }
};

export const getLogin = (req, res) => {
    res.render("Login", {pageTitle: "Login"});
};

export const postLogin = async (req, res) => {
    const { studentID, password } = req.body;
    const pageTitle = "Login";

    // 존재하지 않는 아이디 에러 메시지
    const user = await User.findOne({ studentID });
    if (!user) {
      return res.status(400).render("login", {
        pageTitle,
        errorMessage: "An account with this username does not exists.",
      });
    }
    
    // 비밀번호 불일치 에러 메시지
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).render("login", {
        pageTitle,
        errorMessage: "Wrong password",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

/*
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
*/