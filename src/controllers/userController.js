import User from "../models/User";
import bcrypt from "bcrypt";
// import fetch from "node-fetch";

// [rootRouter]
export const getJoin = (req, res) => res.render("users/join", { pageTitle: "회원가입" });

export const postJoin = async (req, res) => {
    const { userName, studentID, password, password2, phoneNumber } = req.body;
    const pageTitle = "회원가입";

    // 비밀번호 재확인 오류 메시지 
    if (password !== password2) {
        return res.status(400).render("users/join", {
          pageTitle,
          errorMessage: "재확인 비밀번호가 일치하지 않습니다.",
        });
    }
    
    // 중복 아이디 에러 메시지
    const exists = await User.exists({ $or: [{ studentID }, { phoneNumber }] });
    if (exists) {
    return res.status(400).render("users/join", {
        pageTitle,
        errorMessage: "이미 회원가입된 학번 혹은 전화번호 입니다.",
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

        return res.render("users/join", {
          pageTitle, 
          errorMessage: "회원 가입이 완료되었습니다."
      });
    } catch (error) {
        return res.status(400).render("users/join", {
            pageTitle, 
            errorMessage: error._message 
        });
    }
};

export const getLogin = (req, res) => {
    res.render("users/login", {pageTitle: "로그인"});
};

export const postLogin = async (req, res) => {
    const { studentID, password } = req.body;
    const pageTitle = "로그인";

    // 존재하지 않는 아이디 에러 메시지
    const user = await User.findOne({ studentID });

    if (!user) {
      return res.status(400).render("users/login", {
        pageTitle,
        errorMessage: "존재하지 않는 학번입니다.",
      });
    }
    
    // 비밀번호 불일치 에러 메시지
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(400).render("users/login", {
        pageTitle,
        errorMessage: "잘못된 비밀번호 입니다.",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;
    req.session.save(function(err) {
      if (err) {
        return res.status(500).render("/500", { pageTitle: "500 로그인 서버 에러" });
      } else return res.redirect("/");
    });
};

export const logout = async (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).render("/500", { pageTitle: "500 로그인 서버 에러" });
    } else return res.redirect("/");
  })
};

export const myProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("lockers");

  return res.render("users/myProfile", { pageTitle: user.userName + "님의 프로필", user, });
};

// edit-profile 
export const getEdit = (req, res) => {
  return res.render("users/editProfile", { pageTitle: "전화번호 변경" });
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
  return res.redirect(`/users/${req.session.user._id}`);
};

// change password
export const getChangePassword = (req, res) => {
  return res.render("users/changePassword", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
  // session과 body에서 user id와 사용자가 입력한 form 정보 불러오기
  const {
    session: {
      user: { _id },
    },
    body: { oldPW, newPW1, newPW2 },
  } = req;
  const pageTitle = "비밀번호 변경";

  // db에서 user id 찾아오기 
  const user = await User.findById(_id);

  // form에서 받은 기존 비번과 db에서 불러온 user 기존 비번 비교하기
  // 아래에서 user.save()만 해주기 때문에 db가 먼저 변경되므로 
  // 처음부터 session에있는 비번이 아닌 db에 있는 비번과 비교해준다.
  // 처음부터 session에 있는 비번과 비교했다면 
  // db는 물론 session 데이터도 함께 업데이트해야하는 번거로운 과정을 거쳐야한다.
  // session 비교를 하지 않는 이유는 session에 업데이트된 값을 사용자에게 바로 보여줄 필요가 없는 상황이기 때문이다.
  const ok = await bcrypt.compare(oldPW, user.password);

  // 기존 비번이 일치하지 않을 때 에러문
  if (!ok) {
    return res.status(400).render("users/changePassword", {
      pageTitle,
      errorMessage: "현재 비밀번호와 일치하지 않습니다.",
    });
  }

  // 새비밀번호 확인이 일치하지 않을 때 에러문
  if (newPW1 != newPW2) {
    return res.status(400).render("users/changePassword", {
      pageTitle,
      errorMessage: "재확인 비밀번호가 일치하지 않습니다.",
    });
  }

  if ((oldPW == newPW1) && (newPW1 == newPW2)) {
    return res.status(400).render("users/changePassword", {
      pageTitle,
      errorMessage: "Nothing change",
    });
  }

  // db에서 불러온 user 비밀번호를 새비밀번호로 업데이트
  user.password = newPW1;

  // save()는 비동기식 함수이므로 새로운 데이터가 서버에 저장될 때까지 동기식 처리
  await user.save();

  // 재 로그인 유도를 위한 로그아웃
  return res.redirect("/users/logout");
};