import mongoose from "mongoose";

// 질문 데이터 : 번호, 제목, 작성자, 내용, 등록일, meta : 조회수 // hashtags 고민
const questionSchema = new mongoose.Schema({
  number: Number,
  title: String,
  writer: String,
  content: String,
  createdAt: Date,
  meta: {
    views: Number,
  },
  hashtags: [{ type: String }],
});
// 우리가 제공해주는 데이터 : number, createdAt, views
// 사용자가 제공하는 데이터 : title, writer, content

const Question = mongoose.model("Question", questionSchema);
export default Question;