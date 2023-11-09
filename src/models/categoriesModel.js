import { Schema, model } from "mongoose"

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        product: {
            type: [Schema.Types.ObjectId],
            ref: 'Products'
        },
        regimePlan: {
            type: [Schema.Types.ObjectId],
            ref: 'RegimePlans'
        }
    }
)

const categories = model('Categories', categorySchema)

export default categories