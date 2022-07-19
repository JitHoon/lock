import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import lockerRouter from "./routers/lockerRouter";

const app = express();
const PORT = 4000;

/*
console.log(process.cwd());
*/

/*
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    // 어떤 method가 어느 url로 향하는지 알 수 있음
    // req.method = Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
    next();
};
const privativeMiddleware = (req, res, next) => {
    const url =req.url;

    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }

    console.log("Allowed");

    next();
};
const handleHome = (req, res) => {
    return res.end();
};
const handleProtected = (req, res) => {
    return res.send("<h1>Welcome to private lounge.<h1>");
};
app.use(morgan("dev"));
app.use(privativeMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
*/

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/locker", lockerRouter);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🫡`);
app.listen(PORT, handleListening);