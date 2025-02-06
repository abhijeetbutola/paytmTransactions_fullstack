import mongoose from "mongoose";

main.catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGO_URI/"paytm_8.2")
}

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
})

export const User = mongoose.Model('User', userSchema)