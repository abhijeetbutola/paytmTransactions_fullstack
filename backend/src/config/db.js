import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URI + "/paytm_transactions");
}

main().catch(err => console.log(err));

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
});

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

export const User = mongoose.model('User', userSchema);
export const Account = mongoose.model('Account', accountSchema)
