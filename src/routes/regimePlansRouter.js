import express from 'express'
import { createRegimePlan, readRegimePlans, readOneRegimePlan, readRegimePlansByCategory, updateRegimePlan, deleteRegimePLan, deleteAllRegimePlans } from '../controllers/regimePlansController.js'
import upload from '../middlewares/upload.js'

const regimePlansRouter = express.Router()

regimePlansRouter.post('/create', upload.single('image'), createRegimePlan)
regimePlansRouter.get('/read', readRegimePlans)
regimePlansRouter.get('/readOne', readOneRegimePlan)
regimePlansRouter.get('/readCategory', readRegimePlansByCategory)
regimePlansRouter.patch('/update', upload.single('image'), updateRegimePlan)
regimePlansRouter.delete('/delete', deleteRegimePLan)
regimePlansRouter.delete('/deleteAll', deleteAllRegimePlans)

export default regimePlansRouter