import express from 'express'
import { createGymPlan, readGymPlans, updateGymPlan, deleteGymPlan, deleteAllGymPlans } from '../controllers/gymPlansController.js'

const gymPlansRouter = express.Router()

gymPlansRouter.post('/create', createGymPlan)
gymPlansRouter.get('/read', readGymPlans)
gymPlansRouter.patch('/update', updateGymPlan)
gymPlansRouter.delete('/delete', deleteGymPlan)
gymPlansRouter.delete('/deleteAll', deleteAllGymPlans)

export default gymPlansRouter