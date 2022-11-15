import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
	lockerNum: {type: String, required: true, trim:true},
	locker_id: {type: String, required: true, trim:true},
	lockerPW: {type: String, required: true, trim:true},
	returnAt: { type: Date, default: 0},
	change: { type: Boolean, default: false}, // 비밀번호 수정 완료 버튼으 따로 만들어야 id 가져오기 쉬움
  	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 이름, 학번, 번호
});

const Record = mongoose.model("Record", recordSchema);
export default Record;