import express from 'express'
import { createPersonalTraining, readPersonalTrainings, updatePersonalTraining, deletePersonalTraining, deleteAllPersonalTrainings } from '../controllers/personalTrainingsController.js'
import upload from '../middlewares/upload.js'

const personalTrainingRouter = express.Router()

personalTrainingRouter.post('/create', upload.single('image'), createPersonalTraining)
personalTrainingRouter.get('/read', readPersonalTrainings)
personalTrainingRouter.patch('/update', upload.single('image'), updatePersonalTraining)
personalTrainingRouter.delete('/delete', deletePersonalTraining)
personalTrainingRouter.delete('/deleteAll', deleteAllPersonalTrainings)

export default personalTrainingRouter