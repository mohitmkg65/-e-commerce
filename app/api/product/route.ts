import mongoose from "mongoose";
mongoose.connect(process.env.DB!)

import serverCatchError from "@/lib/server-catch-error";
import { NextRequest, NextResponse as response } from "next/server";
import ProductModel from "@/models/product.model";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";
import { URL } from "url";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.formData()
        const file = body.get('image') as File | null

        if(!file)
            return response.json({message: "Product image not sent"}, {status: 400})

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const root = process.cwd()
        const folderName = path.join(root, 'public', 'products')
        const fileName = `${uuid()}.png`
        const filePath = path.join(folderName, fileName)
        fs.writeFileSync(filePath, buffer)

        const payload = {
            title: body.get('title'),
            description: body.get('description'),
            price: body.get('price'),
            discount: body.get('discount'),
            image: `/products/${fileName}`,
        }
        const product = await ProductModel.create(payload)
        return response.json({product})
    } catch (error) {
        return serverCatchError(error)
    }
}

export const GET = async (request: NextRequest) => {
    try {
        const {searchParams} = new URL(request.url)
        const slug = searchParams.get("slug")
        if(slug){
            const slugs = await ProductModel.distinct('slug')
            return response.json({slugs})
        }
        const products = await ProductModel.find()
        return response.json({products})
    } catch (error) {
        return serverCatchError(error)
    }
}