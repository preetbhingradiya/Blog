import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    blog:Array
})

export const user=mongoose.model("userBlog",userSchema)