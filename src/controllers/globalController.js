import req from "express/lib/request";
import res from "express/lib/response";

let questions = [
    {
        number : 1,
        title : "사물함 비밀번호를 바꿔도 되나요?",
        content : "사물함 비밀번호를 원하는 번호로 바꿔도 되나요?",
        id: 1,
    },
    {
        number : 2,
        title : "사물함 무기한 연장 신청 가능한가요?",
        content : "가능?",
        id: 2,
    }
];

export const home = (req, res) => {
    return res.render("home", {pageTitle : "Home"});
}

export const qna = (req, res) => {
    return res.render("qna", {pageTitle : "Q & A", questions});
};

export const seeQ = (req, res) => {
    const { id } = req.params;
    const question = questions[id-1];

    return res.render("seeQ", {pageTitle : `Question No. ${question.number}`, question});
}

export const getUploadQ = (req, res) => {
    return res.render("uploadQ", { pageTitle: "Upload Video" });
  };
  
  export const postUploadQ = (req, res) => {
    // here we will add a video to the videos array.
    return res.redirect("/qna");
  };

export const getEditQ = (req, res) => {
    const { id } = req.params;
    const question = questions[id-1];

    return res.render("editQ", {pageTitle : "Question", question});
};

export const postEditQ = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    questions[id - 1].title = title;
    return res.redirect("/qna");
};