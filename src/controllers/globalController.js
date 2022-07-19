let students = [
    {number : 12, available : Y, id : 1},
    {number : 30, available : N, id : 2},
    {number : 41, available : Y, id : 3}
]

export const home = (req, res) => {
    return res.render("home", {pageTitle : "Home"});
}

export const join = (req, res) => res.send("Join");
export const login = (req, res) => res.send("Log in");
export const findpw = (req, res) => res.send("Find Password");