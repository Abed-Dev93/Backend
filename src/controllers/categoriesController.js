import Category from '../models/categoriesModel.js'

export const createCategory = async (req, res) => {
    const title = req.body
    const existingCategory = await Category.findOne({ title: title })
    if (!title)
        return res.status(400).send('This field is required!')
    if (existingCategory)
        return res.status(400).send(`Category ${title} is existed!`)
    try {
        const newCategory = await Category.create({
            title
        })
        res.status(200).send(`New Category ${title} has been created!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ Categories: categories })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readOneCategory = async (req, res) => {
    const id = req.body.id
    try {
        const category = await Category.findById(id)
        if (category)
            res.status(200).json({ Category: category })
        else
            res.status(404).send(`Category ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateCategory = async (req, res) => {
    const title = req.body
    const id = req.body.id
    if (!title)
        return res.status(400).send('This field is required!')
    try {
        const editCategory = await Category.findByIdAndUpdate({ _id: id }, { title, new: true })
        if (editCategory)
            res.status(200).send(`Category ${id} has been updated successfully!`)
        else
            res.status(404).send(`Category ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.body.id
    try {
        const removeCategory = await Category.findByIdAndDelete(id)
        if (removeCategory)
            res.status(200).send(`Category ${id} has been deleted successfully!`)
        else
            res.status(404).send(`Category ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}