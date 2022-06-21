import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;

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

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🫡`);
app.listen(PORT, handleListening);