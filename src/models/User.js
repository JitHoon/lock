import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim:true},
    studentID: {type: Number, required: true, trim:true, unique : true},
    password: {type: String, required: true, trim:true },
    phoneNumber: {type: Number, required: true, trim:true, unique : true },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
  });

const User = mongoose.model("User", userSchema);

export default User;