import Question from "../models/Question";
import User from "../models/User";
import Comment from "../models/Comment";

export const mainQ = async (req, res) => {
    const questions = await Question.find({}).sort({ createdAt: "desc" });
    return res.render("qna/mainQ", { pageTitle: "Q&A", questions });
};

export const searchQ = async (req, res) => {
    const { keyword } = req.query;

    let questions = [];
    if (keyword) {
        questions = await Question.find({
            content: {
              $regex: new RegExp(keyword, "ig"),
            },
        }).populate("owner");
    }

    return res.render("qna/searchQ", { pageTitle: "Q&A", questions});
};

export const seeQ = async (req, res) => {
    const { id } = req.params;
    const question = await (await Question.findById(id).populate("owner")).populate("comments");

    if (!question) {
        return res.status(404).render("404", { pageTitle: "질문을 찾을 수 없습니다." });
    }

    return res.render("qna/seeQ", {pageTitle : "Q&A 자세히보기", question });

};

export const getUploadQ = (req, res) => {
    return res.render("qna/uploadQ", { pageTitle: "질문 업로드" });
}; 

export const postUploadQ = async (req, res) => {
    // user id를 question db에 추가
    const {
        user: { _id },
      } = req.session;

    const { content } = req.body;

    try { 
        const newQuestion = await Question.create({
            content,
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
                pageTitle: "질문 업로드", 
                errorMessage: error._message 
            });
        }
};

export const getEditQ = async (req, res) => {
    const { id } = req.params;
    
    const question = await Question.findById(id); // 질문 데이터 object를 찾아 가져오는 model
    if (!question) {
        return res.status(404).render("404", { pageTitle: "질문을 찾을 수 없습니다." });
    }

    // 프론트에서는 링크를 숨겼지만 백엔드에서 추가로 보호해줘야함
    const {
        user: { _id },
      } = req.session;

    if (String(question.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    
    return res.render("qna/editQ", {pageTitle : "질문 수정", question});
};

export const postEditQ = async (req, res) => {
    // Question : 우리가 만든 질문 model
    // question : 데이터베이스에서 검색한 질문 object
    const { id } = req.params;
    const { content } = req.body;
    await Question.findByIdAndUpdate(id, {
        content,
    });

    // 질문 데이터 존재 여부만 판단하는 model
    const question = await Question.findById(id);
    if (!question) {
        return res.status(404).render("404", { pageTitle: "질문을 찾을 수 없습니다." });
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
    console.log(question);
    // console.log(question.owner);

    if (!question) {
        return res.status(404).render("404", { pageTitle: "질문을 찾을 수 없습니다." });
    }
    
    // 프론트에서는 링크를 숨겼지만 백엔드에서 추가로 보호해줘야함
    const {
        user: { _id },
    } = req.session;

    if (String(question.owner) !== String(_id)) {
     return res.status(403).redirect("/");
    }

    await Question.findByIdAndRemove(id);
    //console.log(question);
    
    return res.redirect("/qna");
  };

  export const createComment = async (req, res) => {
    // console.log(req.params); //질문의 id
    // console.log(req.body); //사용자의 댓글 내용
    // console.log(req.body.text);
    // console.log(req.session.user); //사용자의 정보
    const {
        session:{user},
        body:{text},
        params: {id},
    } = req;
    const question = await Question.findById(id);
    if(!question){
        return res.sendStatus(404);
    }
    const commentUser = await User.findById(user._id);
    const comment = await Comment.create({
        text,
        owner: user._id,
        questions: id,
    });

    question.comments.push(comment._id);
    commentUser.comments.push(comment._id);
    commentUser.save();
    question.save();
    req.session.user = commentUser;

    console.log(user, text, id);
    res.status(201).json({
        newCommentId: comment._id,
    });
  }

  export const deleteComment = async(req,res) => {
    const { params: { id },
    body: { questionId },
    session:{ user }
    } = req;
    const question = await Question.findById(questionId);
    const commentUser = await User.findById(user._id);
    if(user.comments.indexOf(id) < 0) {
        req.flash("info", "Not authorized");
        return res.sendStatus(403);
    }
    commentUser.comments.splice(commentUser.comments.indexOf(id), 1);
    question.comments.splice(question.comments.indexOf(id), 1);

    await question.save();
    await commentUser.save();   
    await Comment.findByIdAndDelete(id);

    return res.sendStatus(201);
  }