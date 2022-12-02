import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim:true},
    studentID: {type: Number, required: true, trim:true, unique : true},
    password: {type: String, required: true, trim:true },
    phoneNumber: {type: Number, required: true, trim:true, unique : true },
    lockers: { type: mongoose.Schema.Types.ObjectId, ref: "Locker" }, 
    availableLocker: { type: Boolean, default: true},
    signupLockerAt: { type: Date, default: 0},
    returnDate: { type: Date, default: 0},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    records: { type: mongoose.Schema.Types.ObjectId, ref: "Record" },
    comments: [{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}], 

  /*
  export const myProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("questions");
  // const user = await User.findById(id).populate("locker");

  // if(user) {} 사물함 신청 버튼 숨기기 (모든 사물함 버튼 비활성화 및 해지 요청 알림 버튼)

  return res.render("", { pageTitle: });
};
*/
});

// .pre() : 데이터가 저장("save")되기 전 동작하는 함수
// async : function() {} 동작이 완료되기까지 기다림
// this : 데이터 모델 = 사용자
// .isModified : user 생성 시 true 반환 후 {}안 알고리즘 동작, 변동 없을 시 false 반환
// 아이디 생서 시 입력 받은 passward를  bcrypt.hash() 함수로 2의 5승 만큼 해싱
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;