import mongoose from "mongoose";

// 질문 데이터 : 번호, 제목, 작성자, 내용, 등록일, meta : 조회수 // hashtags 고민
const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now  },
  admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin" }, 
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, 
  comments: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Comment"}],
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