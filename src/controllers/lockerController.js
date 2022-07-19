let lockers = [
    {number : 12, available : Y, id : 1},
    {number : 30, available : N, id : 2},
    {number : 41, available : Y, id : 3}
]

export const locker = (req, res) => {
    return res.render("locker", {pageTitle : "Lockers"});
}

export const see = (req, res) => res.send("See");