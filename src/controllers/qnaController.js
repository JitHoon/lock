import req from "express/lib/request";
import res from "express/lib/response";
import Question from "../models/Question";

export const qna = async (req, res) => {
    const questions = await Question.find({});
    return res.render("qna", {pageTitle : "Q & A", questions });
};

export const seeQ = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
        return res.render("404", { pageTitle: "Question not found." });
    }
    return res.render("seeQ", {pageTitle : `Question : ${question.title}`, question});

};

export const getUploadQ = (req, res) => {
    return res.render("uploadQ", { pageTitle: "Upload Video" });
}; 

export const postUploadQ = async (req, res) => {
    const { title, content, hashtags} = req.body;

    try { await Question.create({
        number: 0, // (수정 1)
        title,
        writer : "사람", // (수정 2)
        content,
        hashtags: Question.formatHashtags(hashtags),
    });

    return res.redirect("/qna");
    } catch (error) {
        return res.render("uploadQ", { pageTitle: "Upload Video", errorMessage: error._message });
  }
};

export const getEditQ = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id); // 질문 데이터 object를 찾아 가져오는 model

    if (!question) {
        return res.render("404", { pageTitle: "Question not found." });
    }
    return res.render("editQ", {pageTitle : "Edit Question", question});
};

export const postEditQ = async (req, res) => {
    // Question : 우리가 만든 질문 model
    // question : 데이터베이스에서 검색한 질문 object
    const { id } = req.params;
    const { title, content, hashtags} = req.body;
    const question = await Question.exists({ _id: id }); // 질문 데이터 존재 여부만 판단하는 model

    if (!question) {
        return res.render("404", { pageTitle: "Question not found." });
    }
    await Question.findByIdAndUpdate(id, {
        title,
        content,
        hashtags: Question.formatHashtags(hashtags),
      });
    return res.redirect("/qna");
};