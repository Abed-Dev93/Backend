import { Schema, model } from "mongoose"

const regimePlanSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            data: Buffer,
            type: String
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Categories'
        }
    }
)

const regimePlans = model('RegimePlans', regimePlanSchema)

export default regimePlans