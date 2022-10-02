import req from "express/lib/request";
import res from "express/lib/response";
import Locker from "../models/Locker";
import User from "../models/User";

export const mainLocker = async (req, res) => {return res.render("home", {pageTitle : "Home"});};

export const alphabetLocker = (req, res) => {
    const { id } = req.params;

    return res.render("home", {pageTitle : "알파벳 사물함"});
};

export const numberLocker = async (req, res) => {return res.render("home", {pageTitle : "숫자 사물함"});};
export const getAplly = async (req, res) => {return res.render("home", {pageTitle : "사물함 신청"});};
export const postAplly = async (req, res) => {return res.render("home", {pageTitle : "사물함 신청"});};
