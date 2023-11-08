import { Schema, model } from "mongoose"

const personalTrainingSchema = new Schema(
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

const personalTrainings = model('PersonalTrainings', personalTrainingSchema)

export default personalTrainings