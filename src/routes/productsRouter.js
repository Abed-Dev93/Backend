import express from 'express'
import { createProduct, readProducts, readOneProduct, readProductsByCategory, updateProduct, deleteProduct, deleteAllProducts } from '../controllers/productsController.js'
import upload from '../middlewares/upload.js'

const productsRouter = express.Router()

productsRouter.post('/create', upload.array('image'), createProduct)
productsRouter.get('/read', readProducts)
productsRouter.get('/readOne', readOneProduct)
productsRouter.get('/readCategory', readProductsByCategory)
productsRouter.patch('/update', upload.array('image'), updateProduct)
productsRouter.delete('/delete', deleteProduct)
productsRouter.delete('/deleteAll', deleteAllProducts)

export default productsRouter