import { Schema, model } from "mongoose"

const gymPlanSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        features: {
            type: [String],
            required: true
        }
    }
)

const gymPlans = model('GymPlans', gymPlanSchema)

export default gymPlans