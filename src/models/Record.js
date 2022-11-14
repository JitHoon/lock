import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
	lockerNum: {type: String, required: true, trim:true, unique : true},
	locker_id: {type: String, required: true, trim:true, unique : true},
	returnAt: { type: Date, default: 0},change: { type: Boolean, default: false}, // 비밀번호 수정 했을 때 POST (true) -> redirect 사물함 비밀번호 변경 페이지
  	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 이름, 학번, 번호
});

const Record = mongoose.model("Record", recordSchema);
export default Record;