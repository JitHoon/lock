export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);  //session에 있는 loggedIn를 불러와서 locals에 추가하고 pug 전역 변수로 사용
    res.locals.siteName = "CNU 전자공학과 사물함";
    res.locals.loggedInUser = req.session.user || {}; // 로그인 전 undefined, 로그인 후 유저 정보 불러와짐
    console.log(req.session.user);
    next();
  };

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next(); // 유저가 사용을 계속 유지
  } else {
    return res.redirect("/login");
  }
};
  
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next(); // 유저가 사용을 계속 유지
  } else {
    return res.redirect("/");
  }
};