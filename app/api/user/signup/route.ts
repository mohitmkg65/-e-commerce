import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import serverCatchError from "@/lib/server-catch-error";
import { NextRequest, NextResponse as response } from "next/server";
import UserModel from "@/models/user.model";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        await UserModel.create(body)
        return response.json({message: "Signup success"})
    } catch (error) {
        return serverCatchError(error)
    }
}