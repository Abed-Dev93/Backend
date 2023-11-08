import express from 'express'
import { createSocialMedia, readSocialMedia, updateSocialMedia, deleteSocialMedia } from '../controllers/socialMediaController.js'

const socialMediaRouter = express.Router()

socialMediaRouter.post('/create', createSocialMedia)
socialMediaRouter.get('/read', readSocialMedia)
socialMediaRouter.patch('/update', updateSocialMedia)
socialMediaRouter.delete('/delete', deleteSocialMedia)

export default socialMediaRouter