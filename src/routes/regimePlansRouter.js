import express from 'express'
import { createRegimePlan, readRegimePlans, readOneRegimePlan, readRegimePlansByCategory, updateRegimePlan, deleteRegimePLan } from '../controllers/regimePlansController.js'
import upload from '../middlewares/upload.js'

const regimePlansRouter = express.Router()

regimePlansRouter.post('/create', upload.single('image'), createRegimePlan)
regimePlansRouter.get('/read', readRegimePlans)
regimePlansRouter.get('/read/:id', readOneRegimePlan)
regimePlansRouter.get('/read/category/:id', readRegimePlansByCategory)
regimePlansRouter.patch('/update', upload.single('image'), updateRegimePlan)
regimePlansRouter.delete('/delete', deleteRegimePLan)

export default regimePlansRouter