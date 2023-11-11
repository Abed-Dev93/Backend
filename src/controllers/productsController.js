import Product from '../models/productsModel.js'
import Category from '../models/categoriesModel.js'
import fs from 'fs/promises'

export const createProduct = async (req, res) => {
    const { title, description, price, prodCategory } = req.body
    const files = req.files
    const image = files.map(item => item.path)
    if (!title || !description || !price || !image)
        return res.status(400).send('All fields are required!')
    const category = await Category.findOne({ title: prodCategory })
    if (!category)
        return res.status(400).send(`Category ${prodCategory} is empty or not found!`)
    try {
        const newProduct = await Product.create({
            title: title,
            description: description,
            price: price,
            image: image,
            category: category._id
        })
        await newProduct.save()
        category.product.push(newProduct._id)
        await category.save()
        res.status(200).send(`Product ${newProduct._id} has been created and added to category ${prodCategory}`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ Products: products })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readOneProduct = async (req, res) => {
    const id = req.body.id
    try {
        const product = await Product.findById(id)
        if (product)
            res.status(200).json({ Product: product })
        else
            res.status(404).send(`Product ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readProductsByCategory = async (req, res) => {
    const id = req.body.id
    try {
        const category = await Category.findById(id)
        const productCategory = await Product.find({ _id: { $in: category.product } })
        if (productCategory)
            res.status(200).json({ Products: productCategory })
        else
            res.status(404).send(`Products with Category ${id} have not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateProduct = async (req, res) => {
    const { title, description, price, prodCategory } = req.body
    const id = req.body.id
    const files = req.files
    const image = files.map(item => item.path)
    if (!title || !description || !price || !image)
        return res.status(400).send('All fields are required!')
    const category = await Category.findOne({ title: prodCategory })
    const prevProduct = await Product.findById(id)
    const existingCategory = await Category.findOne({ _id: prevProduct.category })
    if (!prodCategory)
        return res.status(400).send(`Category ${prodCategory} is empty or not found!`)
    try {
        const editProduct = await Product.findByIdAndUpdate({ _id: id }, { title, description, price, image, category: category._id })
        await editProduct.save()
        if (category._id.toString() === prevProduct.category.toString())
            res.status(400).send(`Category ${prodCategory} is already existed!`)
        else {
            existingCategory.product = existingCategory.product.filter(item => item.toString() !== prevProduct._id.toString())
            await existingCategory.save()
        }
        if (!category.product.includes(id))
            category.product.push(id)
        await category.save()
        for (const oldImagesPath of prevProduct.image)
            await fs.unlink(oldImagesPath)
        if (editProduct)
            res.status(200).send(`Product ${id} has been updated successfully!`)
        else
            res.status(404).send(`Product ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.body.id
    try {
        const removeProduct = await Product.findByIdAndDelete(id)
        const oldImage = removeProduct.image
        const category = await Category.findOne({ product: { $in: id } })
        for (const oldImagesPath of oldImage)
            await fs.unlink(oldImagesPath)
        if (category) {
            category.product = category.product.filter(item => item.toString() !== id)
            await category.save()
        }
        if (removeProduct)
            res.status(200).send(`Product ${id} has been deleted!`)
        else
            res.status(400).send(`Product ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteAllProducts = async (req, res) => {
    try {
        const removeProducts = await Product.deleteMany({})
        const category = await Category.find()
        const products = await Product.find()
        if (removeProducts.deletedCount > 0) {
            for (const prod in products)
                category.product = category.product.filter(item => item.toString() !== prod._id.toString())
            res.status(200).send('All products have been deleted!')
        }
        else
            res.status(400).send('Error occured!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}