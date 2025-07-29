import { Schema, model, models } from "mongoose";

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    slug: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

productSchema.pre('save', function(next){
    this.slug = this.title.toLocaleLowerCase().split(" ").join("-")
    next()
})

const ProductModel = models.Product || model("Product", productSchema)
export default ProductModel 