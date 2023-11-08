import express from 'express'
import { createPersonnalTraining, readPersonnalTrainings, updatePersonnalTraining, deletePersonnalTraining } from '../controllers/personnalTrainingsController.js'
import upload from '../middlewares/upload.js'

const personnalTrainingRouter = express.Router()

personnalTrainingRouter.post('/create', upload.single('image'), createPersonnalTraining)
personnalTrainingRouter.get('/read', readPersonnalTrainings)
personnalTrainingRouter.patch('/update', upload.single('image'), updatePersonnalTraining)
personnalTrainingRouter.delete('/delete', deletePersonnalTraining)

export default personnalTrainingRouter