import mongoose from "mongoose";

const lockerSchema = new mongoose.Schema({
  number: Number,
  available: Number,
  password: Number,
});

const Locker = mongoose.model("Locker", lockerSchema);
export default Locker;