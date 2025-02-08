import express from 'express';
import { Account} from '../config/db.js';
import { authMiddleware } from '../middlewares/index.js';
import mongoose from 'mongoose';

export const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async (req, res) => {

    const userDetails = await Account.findOne({
        userId: req.userId
    })

    return res.status(200).json({
        balance: userDetails.balance
    })
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, to } = req.body

    // Fetch the accounts within the transaction
    const senderDetails = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!senderDetails || senderDetails.balance < amount) {
        await session.abortTransaction()

        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const receiverDetails = Account.findOne({
        userId: to
    }).session(session)

    if(!receiverDetails) {
        await session.abortTransaction()

        return res.status(400).json({
            message: "Receiver doesn't exist"
        })
    }

    // Perform the transfer
    await Account.updateOne( { userId: req.userId},
        {
            $inc: {
                balance: -amount
            }
        }
     ).session(session)
     
     await Account.updateOne( { userId: to},
        {
            $inc: {
                balance: amount
            }
        }
     ).session(session)

     // Commit the transaction
     await session.commitTransaction()
     res.json({
        message: "Transaction successful"
     })
})
