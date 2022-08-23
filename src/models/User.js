import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim:true},
    schoolID: {type: Number, required: true, trim:true, unique : true},
    password: {type: String, required: true, trim:true },
    phoneNumber: {type: Number, required: true, trim:true },
    meta: {
        available: {type: Boolean, required:true, unique : true, default: false },
        joinedDate: {type: Date, required: true, default: Date.now},
    }
});

const User = mongoose.model("User", userSchema);

export default User;