import mongoose from "mongoose";

const lockerSchema = new mongoose.Schema({
  lockerNum: String, // A2
  lockerPW: Number, // 1234
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // alphabet: String, // 새로 추가했으므로 db 등록시 주의하기
  // number: Number,
  // appPW: {type: Number, required: true, trim:true, unique : true },
  
  // const locker = await Locker.findById(id).populate("owner");
  // if(locker) 사물함 신청 버튼 숨기기 (사물함 버튼 색깔 변화)
});

// <1>
// admin id만 보이는 사물함 db 등록 버튼을 하나 파서 사물함들을 db에 등록하고
// 이를통해 사물함 영어, 사물함 숫자, 사뭄함 비밀번호를 db에 등록한다.

// 결과
// - lockerNum
// - lockerPW
// 위 두 가지 데이터를 미리 입력 받고
// 비밀번호 변경 가능 기능까지 추가하기

/* <1> locker controller
export const postAdmin = async (req, res) => {}
*/

// <2>
// 0. 한 사용자가 사물함 신청을 누르면
// 2. 사용자 db (locker)와 사물함 db (owner)을 서로 _id로 연결한다. 

// 결과
// - 사용자 db (locker)와 사물함 db (owner)을 서로 _id로 연결

/* <2> locker controller
export const postAplly = async (req, res) => {
  // user의 고유 _id를 불러옴
  const {
      user: { _id },
    } = req.session;

  // lockerApp.pug 에서 POST 요청하는 데이터들을 불러옴
  const { appPW } = req.body;

  // 1. 
  const ok = await bcrypt.compare(appPW, user.password);

  if (!ok) {
    return res.status(400).render("locker/locker_id/", {
      pageTitle,
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }

  try { 
    // 3. 
    // POST 요청이 되면 Locker db에 새롭게 appPW와 POST를 요청한 유저의 _id가 추가됨!!
      const newLocker = await Locker.create({
          owner: _id,
      });

      // user _id를 불러와서
      const user = await User.findById(_id);

      // 3. 
      // User _id에 해당하는 locker list에 POST를 요청한 유저의 new _id를 추가
      user.locker.push(newLocker._id);

      // 데이터 저장
      user.save(); 

      return res.redirect("/locker");

      } catch (error) {

         return res.status(400).redirect("/");
      }
};
*/

// <3>
// 사용해지 controller
// db에 등록한다.

// qnaController, deleteQ 참고


const Locker = mongoose.model("Locker", lockerSchema);
export default Locker;