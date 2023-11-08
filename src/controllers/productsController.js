import Product from '../models/productsModel.js'
import Category from '../models/categoriesModel.js'

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
        res.status(200).send('New Product has been created!')
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
        const productCategory = await Product.findById({ category: id })
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
    if (!prodCategory)
        return res.status(400).send(`Category ${prodCategory} is empty or not found!`)
    try {
        const editProduct = await Product.findByIdAndUpdate({ _id: id }, { title, description, price, image, prodCategory: category._id })
        if (editProduct)
            res.status(200).json({ message: `Product ${id} has been updated successfully!`, Product: editProduct })
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
        if (removeProduct)
            res.status(200).send(`Product ${id} has been deleted!`)
        else
            res.status(400).send(`Product ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}