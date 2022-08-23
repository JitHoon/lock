import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    const { userName, schoolID, password, password2, phoneNumber } = req.body;
    const pageTitle = "Join";

    if (password !== password2) {
        return res.status(400).render("join", {
          pageTitle,
          errorMessage: "Password confirmation does not match.",
        });
      }
    
    const exists = await User.exists({ $or: [{ schoolID }, { phoneNumber }] });
    if (exists) {
    return res.status(400).render("join", {
        pageTitle,
        errorMessage: "This schoolID/phoneNumber is already taken.",
        });
    }

    await User.create({
        userName,
        schoolID,
        password,
        password2,
        phoneNumber,
    });
    return res.redirect("/login");
  };

export const login = (req, res) => res.send("Login");

/*
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
*/