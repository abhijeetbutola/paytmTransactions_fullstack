import express from "express";
import { z } from "zod";
import { User, Account } from "../config/db.js";
import { JWT_SECRET } from "../../config.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/index.js";

export const userRouter = express.Router();

const signupSchema = z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    password: z.string().min(5).trim(),
    username: z.string().email().trim(),

})

userRouter.post("/signup", async (req, res) => {
    const body = req.body
    
    const result = signupSchema.safeParse(body);
    if(!result.success) {
        console.error("Validation failed. Error: ", result.error);   
        return res.status(411).json({ message: "Email already taken or Incorrect inputs" })
    }
    
    const existingUser = await User.findOne({
        username: body.username
    })   
    
    if(existingUser !== null) {
        return res.status(411).json({ message: "Email already taken or incorrect inputs" })
    }

    // since user does not exist. create one.
    const user = await User.create({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })

    const userId = user._id

    await Account.create({
        userId: userId,
        balance: (1 + Math.random() * 1000).toFixed(2)
    })

    const token = jwt.sign({
        userId,
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })

})

userRouter.post("/signin", async (req, res) => {
    const body = req.body;

    const user = await User.findOne({
        username: body.username
    })

    if(!user) {
        res.status(411).json({ message: "Invalid username"})
    }

    const userId = user._id

    if(user.password === body.password) {
        const token = jwt.sign({
            userId
        }, JWT_SECRET)
        res.json({
            message: "Sign-in successful!",
            token: token
        })
    }
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const body = req.body
    const result = updateBody.safeParse(body)

    if(!result.success) {
        return res.status(411).json({ message: "Error while parsing information" })
    }

    await User.updateOne(body, {
        id: req.userId
    })

    res.json({
        message: "Update successfully!"
    })
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        },
        {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }
    ]
    })
    

    res.json({
        user: users
        .filter((user) => {
            return user._id.toString() !== req.userId
        })
        .map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})