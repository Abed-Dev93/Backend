import { Schema, model } from "mongoose"

const personnalTrainingSchema = new Schema(
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
        }
    }
)

const personnalTrainings = model('PersonnalTrainings', personnalTrainingSchema)

export default personnalTrainings