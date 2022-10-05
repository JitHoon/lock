import req from "express/lib/request";
import res from "express/lib/response";
import Question from "../models/Question";
import User from "../models/User";

export const mainQ = async (req, res) => {
    const { keyword } = req.query;
    
    let questions = [];
    if (keyword) {
        questions = await Question.find({
            title: {
              $regex: new RegExp(keyword, "ig"),
            },
        }).populate("owner");
    }

    return res.render("qna/mainQ", { pageTitle: "Search", questions});
  };

export const seeQ = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id).populate("owner");

    if (!question) {
        return res.status(404).render("404", { pageTitle: "Question not found." });
    }

    console.log(question);

    return res.render("qna/seeQ", {pageTitle : `Question : ${question.title}`, question });

};

export const getUploadQ = (req, res) => {
    return res.render("qna/uploadQ", { pageTitle: "Upload Video" });
}; 

export const postUploadQ = async (req, res) => {
    // user id를 question db에 추가
    const {
        user: { _id },
      } = req.session;

    const { title, content, hashtags } = req.body;

    try { 
        const newQuestion = await Question.create({
            title,
            content,
            hashtags: Question.formatHashtags(hashtags),
            owner: _id,
        });

        // user 불러와서 User에 추가한 questions의 list에 해당 유저가 업로드한 비디오 정보 추가 
        const user = await User.findById(_id);
        user.questions.push(newQuestion._id);
        // save 함수가 불러오면서 비밀번호가 또 해싱되는 문제 발생
        user.save(); 

        return res.redirect("/qna");

        } catch (error) {
            return res.status(400).render("qna/uploadQ", { 
                pageTitle: "Upload Question", 
                errorMessage: error._message 
            });
        }
};

export const getEditQ = async (req, res) => {
    const { id } = req.params;
    
    const question = await Question.findById(id); // 질문 데이터 object를 찾아 가져오는 model
    if (!question) {
        return res.status(404).render("404", { pageTitle: "Question not found." });
    }

    // 프론트에서는 링크를 숨겼지만 백엔드에서 추가로 보호해줘야함
    const {
        user: { _id },
      } = req.session;

    if (String(question.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    
    return res.render("qna/editQ", {pageTitle : "Edit Question", question});
};

export const postEditQ = async (req, res) => {
    // Question : 우리가 만든 질문 model
    // question : 데이터베이스에서 검색한 질문 object
    const { id } = req.params;
    const { title, content, hashtags } = req.body;
    await Question.findByIdAndUpdate(id, {
        title,
        content,
        hashtags: Question.formatHashtags(hashtags),
    });

    // 질문 데이터 존재 여부만 판단하는 model
    const question = await Question.exists({ _id: id });
    if (!question) {
        return res.status(404).render("404", { pageTitle: "Question not found." });
    }
    
    // 프론트에서는 링크를 숨겼지만 백엔드에서 추가로 보호해줘야함
    const {
        user: { _id },
    } = req.session;

    if (String(question.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }

    return res.redirect("/qna");
};

export const deleteQ = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    const question = await Question.findById(id);
    // console.log(question);
    // console.log(question.owner);

    if (!question) {
        return res.status(404).render("404", { pageTitle: "Question not found." });
    }
    
    // 프론트에서는 링크를 숨겼지만 백엔드에서 추가로 보호해줘야함
    const {
        user: { _id },
    } = req.session;

    if (String(question.owner) !== String(_id)) {
     return res.status(403).redirect("/");
    }

    await Question.findOneAndDelete(question.owner); // 그냥 pop() 사용해도 되는지 확인하기
    // 그냥 pop() 사용해도 되는지 확인하기

    //console.log(question);
    
    return res.redirect("/qna");
  };