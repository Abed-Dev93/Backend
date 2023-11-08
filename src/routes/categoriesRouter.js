import express from 'express'
import { createCategory, readCategories, readOneCategory, updateCategory, deleteCategory } from '../controllers/categoriesController.js'

const categoriesRouter = express.Router()

categoriesRouter.post('/create', createCategory)
categoriesRouter.get('/read', readCategories)
categoriesRouter.get('/read/:id', readOneCategory)
categoriesRouter.patch('/update', updateCategory)
categoriesRouter.delete('/delete', deleteCategory)

export default categoriesRouter