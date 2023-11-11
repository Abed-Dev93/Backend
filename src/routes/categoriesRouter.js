import express from 'express'
import { createCategory, readCategories, readOneCategory, updateCategory, deleteCategory, deleteAllCategories } from '../controllers/categoriesController.js'

const categoriesRouter = express.Router()

categoriesRouter.post('/create', createCategory)
categoriesRouter.get('/read', readCategories)
categoriesRouter.get('/readOne', readOneCategory)
categoriesRouter.patch('/update', updateCategory)
categoriesRouter.delete('/delete', deleteCategory)
categoriesRouter.delete('/deleteAll', deleteAllCategories)

export default categoriesRouter