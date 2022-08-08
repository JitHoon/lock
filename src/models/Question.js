import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;