import mongoose from "mongoose";

const lockerSchema = new mongoose.Schema({
  Alphabet: String, // 새로 추가했으므로 db 등록시 주의하기
  number: Number,
  password: Number,
  available: Boolean,
});

// admin id만 보이는 페이지를 하나 파서 사물함들을 db에 등록하고
// 사물함 번호, 비밀번호를 db에 등록한다.

// 한 사용자가 사물함 신청을 누르면
// 0. available = true 라면 
// 1. available = false로 바꾸고
// 2. 사용자 db와 사물함 db를 연결한다. (질문 기능 참고)
// 3. 사용자에게 비밀번호와 사용기한을 띄워준다.

// 0. available = false 인 사물함은 모든 사람들이 클릭할 수 없도록 만든다.
// 1. 신청을 한 사용자(사물함 db와 연결되어있다는 걸 판단하고)는 사물함 버튼을 클릭할 수 없도록 만든다.

// 0. 반납 버튼을 누른다면 로그아웃 방법처럼 혹인 질문 삭제 방법처럼 db연동을 없애고
// 1. available = true로 변경해준다.


const Locker = mongoose.model("Locker", lockerSchema);
export default Locker;