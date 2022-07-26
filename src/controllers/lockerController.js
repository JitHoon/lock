// array DB
let lockers = [
    {number : 1, available : true, id : 1},
    {number : 2, available : false, id : 2},
    {number : 3, available : true, id : 3}
];

export const locker = (req, res) => {
    return res.render("locker", {pageTitle : "Lockers", lockers});
}

export const seeLocker = (req, res) => {
    const { id } = req.params;
    const locker = lockers[id-1];

    return res.render("seeLocker", {pageTitle : `No. ${locker.number} Lockers`, locker});
}
