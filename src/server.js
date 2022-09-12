import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import lockerRouter from "./routers/lockerRouter";
import qnaRouter from "./routers/qnaRouter";

import { localsMiddleware } from "./middlewares";

const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(localsMiddleware);
app.use("/static", express.static("assets")); // 브라우저를 위한 url
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/locker", lockerRouter);
app.use("/qna", qnaRouter);

export default app;