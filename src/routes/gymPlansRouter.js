import express from 'express'
import { createGymPlan, readGymPlans, updateGymPlan, deleteGymPlan } from '../controllers/gymPlansController.js'

const gymPlansRouter = express.Router()

gymPlansRouter.post('/create', createGymPlan)
gymPlansRouter.get('/read', readGymPlans)
gymPlansRouter.patch('/update', updateGymPlan)
gymPlansRouter.delete('/delete', deleteGymPlan)

export default gymPlansRouter