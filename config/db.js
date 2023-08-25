import mongoose from "mongoose";

export const userData=async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("Join to the databse");
}
