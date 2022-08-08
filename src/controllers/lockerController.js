import Locker from "../models/Locker";

/* fake array DB
let lockers = [
    {number : 1, available : true, id : 1, password : 1034},
    {number : 2, available : false, id : 2, password : 1204},
    {number : 3, available : true, id : 3, password : 1230}
];
*/

const handleSearch = (error, lockers) => {
    console.log("errors", error);
    console.log("lockers", lockers);
};

export const locker = (req, res) => {
    Locker.find({}, handleSearch);
    return res.render("locker", {pageTitle : "Lockers", lockers : []});
};

export const seeLocker = (req, res) => {
    const { id } = req.params;
    const locker = lockers[id-1];

    return res.render("seeLocker", {pageTitle : `No. ${locker.number} Locker`, locker});
};

export const seePassword = (req, res) => {
    const { id } = req.params;
    const locker = lockers[id-1];

    return res.render("seePassword", {pageTitle : `No. ${locker.number} Locker's Password`, locker});
};