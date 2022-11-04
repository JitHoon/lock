import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim:true},
    studentID: {type: Number, required: true, trim:true, unique : true},
    password: {type: String, required: true, trim:true },
    phoneNumber: {type: Number, required: true, trim:true, unique : true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    locker: { type: mongoose.Schema.Types.ObjectId, ref: "Locker" }, 
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

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;