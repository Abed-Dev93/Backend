import { Schema, model } from "mongoose"

const productSchema = new Schema(
    {
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
        image: {
            data: Buffer,
            type: [String]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Categories'
        }
    }
)

const products = model('Products', productSchema)

export default products