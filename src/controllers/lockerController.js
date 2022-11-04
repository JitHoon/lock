import req from "express/lib/request";
import res from "express/lib/response";
import Locker from "../models/Locker";
import User from "../models/User";

export const mainLocker = async (req, res) => {
    return res.render("locker/mainLocker", {pageTitle : "전체 사물함"});
};

export const getUploadLocker = (req, res) => {
    return res.render("locker/uploadLocker", { pageTitle: "| Upload Locker |" });
}; 

export const postUploadLocker = async (req, res) => {
    const {
        user: { _id },
      } = req.session;

    const { lockerNum, lockerPW } = req.body;

    try { 
        const newLocker = await Locker.create({
            lockerNum, 
            lockerPW,
            owner: _id,
        });

        return res.redirect("/locker");

        } catch (error) {
            return res.status(400).render("locker/uploadLocker", { 
                pageTitle: "| Upload Locker |", 
                errorMessage: error._message 
            });
        }
};

export const alphabetLocker = (req, res) => {
    const { id } = req.params;

    return res.render("home", {pageTitle : "3*3 숫자 사물함"});
};

export const getAplly = async (req, res) => {return res.render("home", {pageTitle : "숫자 사물함 클릭 후"});};

export const postAplly = async (req, res) => {return res.render("home", {pageTitle : "사물함 신청 버튼"});};
