export const home = (req, res) => {
    return res.render("home", {pageTitle : "Home"});
};

export const postReturn = (req, res) => {
    return res.render("home", {pageTitle : "사물함 반납하기 버튼"});
};