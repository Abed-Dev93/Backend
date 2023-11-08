import express from 'express'
import { createProduct, readProducts, readOneProduct, readProductsByCategory, updateProduct, deleteProduct } from '../controllers/productsController.js'
import upload from '../middlewares/upload.js'

const productsRouter = express.Router()

productsRouter.post('/create', upload.array('image'), createProduct)
productsRouter.get('/read', readProducts)
productsRouter.get('/read/:id', readOneProduct)
productsRouter.get('/read/category/:id', readProductsByCategory)
productsRouter.patch('/update', upload.array('image'), updateProduct)
productsRouter.delete('/delete', deleteProduct)

export default productsRouter