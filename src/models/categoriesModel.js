import { Schema, model } from "mongoose"

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        product: {
            type: [Schema.Types.ObjectId],
            ref: 'Products'
        },
        regimePlane: {
            type: [Schema.Types.ObjectId],
            ref: 'RegimePlans'
        }
    }
)

const categories = model('Categories', categorySchema)

export default categories