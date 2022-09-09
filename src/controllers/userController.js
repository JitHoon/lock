import User from "../models/User";
import bcrypt from "bcrypt";
// import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("users/join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "Join";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("users/join", {
          pageTitle,
          errorMessage: "Password confirmation does not match.",
        });
    }
    
    // 중복 아이디 에러 메시지
    const exists = await User.exists({ $or: [{ studentID }, { phoneNumber }] });
    if (exists) {
    return res.status(400).render("users/join", {
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
        return res.redirect("users/login");
    } catch (error) {
        return res.status(400).render("users/join", {
            pageTitle: "Join", 
            errorMessage: error._message 
        });
    }
};

export const getLogin = (req, res) => {
    res.render("users/Login", {pageTitle: "Login"});
};

export const postLogin = async (req, res) => {
    const { studentID, password } = req.body;
    const pageTitle = "Login";

    // 존재하지 않는 아이디 에러 메시지
    const user = await User.findOne({ studentID });
    if (!user) {
      return res.status(400).render("users/login", {
        pageTitle,
        errorMessage: "An account with this username does not exists.",
      });
    }
    
    // 비밀번호 불일치 에러 메시지
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).render("users/login", {
        pageTitle,
        errorMessage: "Wrong password",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    console.log(user);

    return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

// 깃허브 로그인 요청 페이지
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";

  const config = {
    client_id:  process.env.GH_CLIENT,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString(); // url string 합치기

  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

// 깃허브 로그인 후 페이지
export const finishGithubLogin =  async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token"; // github가 준 url code를 access code로 변환하기위한 url
  
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  }; // access url 변환과 함게 보낼 parameters

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  // github에서 준 json 정보(access_token 포함)를 변수에 저장
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  // 받은 access_token을 사용하여 Github API를 이용해서 user의 정보를 가져옴
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userRequest);
  } else {
    return res.redirect("users/login");
  }

};

// edit-profile 
export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {

  const {
    session: {
      user: { _id },
    },
    body: { phoneNumber }, // edit-profile에 선언된 name에서 불러온 변수들
  } = req;
  // 아래 변수 선언들을 위와같이 ES6로 개선 가능
  // const id = req.session.user.id
  // const  {password, phoneNumber } = req.body;

  

  const updatedUser = await User.findByIdAndUpdate( 
    _id, { phoneNumber }, 
    { new: true } 
    // findByIdAndUpdate의 option으로 mongoose에게 가장 최근에 업데이트된 object를 가져오라는 option
    );

  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

/*
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
*/