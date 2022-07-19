let lockers = [
    {number : 1, available : "Y", id : 1},
    {number : 2, available : "N", id : 2},
    {number : 3, available : "Y", id : 3}
];

export const locker = (req, res) => {
    return res.render("locker", {pageTitle : "Lockers", lockers});
}

export const seeLocker = (req, res) => {
    const { id } = req.params;
    const locker = lockers[id-1];

    return res.render("seeLocker", {pageTitle : `No. ${locker.number} Lockers`});
}