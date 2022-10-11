import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {type:String, required:true},
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    questions: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Question" },
    createdAt: { type: Date, required: true, default: Date.now },
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;