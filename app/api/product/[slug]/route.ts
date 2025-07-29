import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import serverCatchError from "@/lib/server-catch-error";
import { NextRequest, NextResponse as response } from "next/server";
import ProductModel from "@/models/product.model";
import SlugInterface from "@/interface/Slug.interface";

export const GET = async (request: NextRequest, context: SlugInterface) => {
    try {
        const {slug} = context.params
        const product = await ProductModel.findOne({slug})

        if(!product)
            return response.json({message: "Product not found with slug"}, {status: 404})

        return response.json({product})
    } catch (error) {
        return serverCatchError(error)
    }
}

export const PUT = async (request: NextRequest, context: SlugInterface) => {
    try {
        const {slug: id} = context.params
        const body = await request.json()
        const product = await ProductModel.findByIdAndUpdate(id, body, {new: true})

        if(!product)
            return response.json({message: "Product not found with id"}, {status: 404})

        return response.json({product})
    } catch (error) {
        return serverCatchError(error)
    }
}

export const DELETE = async (request: NextRequest, context: SlugInterface) => {
    try {
        const {slug: id} = context.params
        const product = await ProductModel.findByIdAndDelete(id)

        if(!product)
            return response.json({message: "Product not found with id"}, {status: 404})

        return response.json({product})
    } catch (error) {
        return serverCatchError(error)
    }
}