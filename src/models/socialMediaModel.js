import { Schema, model } from "mongoose"

const socialMediaSchema = new Schema(
    {
        facebook: String,
        instagram: String,
        whatsapp: String,
        youtube: String
    }
)

const socialMedia = model('SocialMedia', socialMediaSchema)

export default socialMedia