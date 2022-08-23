import mongoose from "mongoose";
 
// 질문 데이터 : 번호, 제목, 작성자, 내용, 등록일, meta : 조회수 // hashtags 고민
const questionSchema = new mongoose.Schema({
  number: Number, // 비디오 숫자 어떻게 넘버링하는지 확인하기 (수정 1)
  title: { type: String, required: true },
  writer: String, // 사용자 이름 어떻게 가져오는지 확인하기 (수정 2)
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  hashtags: [{ type: String }],
});
// 우리가 제공해주는 데이터 : number, createdAt, views
// 사용자가 제공하는 데이터 : title, writer, content, hashtags : array 형태


questionSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});


const Question = mongoose.model("Question", questionSchema);

export default Question;