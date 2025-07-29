import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import serverCatchError from "@/lib/server-catch-error";
import { NextRequest, NextResponse as response } from "next/server";
import UserModel from "@/models/user.model";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
    try {
        const {email, password} = await request.json()
        const user = await UserModel.findOne({email})

        if(!user)
            return response.json({message: "User not found"}, {status: 404})

        const isLogin = await bcrypt.compare(password, user.password)

        if(!isLogin)
            return response.json({message: "Incorrect password"}, {status: 401})

        return response.json({message: "Login success"})
    } catch (error) {
        return serverCatchError(error)
    }
}