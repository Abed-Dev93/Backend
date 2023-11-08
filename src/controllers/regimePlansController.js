import RegimePlan from '../models/regimePlansModel.js'
import Category from '../models/categoriesModel.js'

export const createRegimePlan = async (req, res) => {
    const { title, description, regimeCategory } = req.body
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    const category = await Category.findOne({ title: regimeCategory })
    if (!category)
        return res.status(400).send(`Category ${regimeCategory} is empty or not found!`)
    try {
        const newRegimePlan = await RegimePlan.create({
            title: title,
            description: description,
            image: image,
            category: category._id
        })
        res.status(200).send('New Regime Plan has been created!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readRegimePlans = async (req, res) => {
    try {
        const regimePlans = await RegimePlan.find()
        res.status(200).json({ RegimePlans: regimePlans })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readOneRegimePlan = async (req, res) => {
    const id = req.body.id
    try {
        const regimePlan = await RegimePlan.findById(id)
        if (regimePlan)
            res.status(200).json({ RegimePlan: regimePlan })
        else
            res.status(400).send(`Regime Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readRegimePlansByCategory = async (req, res) => {
    const id = req.body.id
    try {
        const regimePlanCategory = await RegimePlan.findById({ category: id })
        if (regimePlanCategory)
            res.status(200).json({ RegimePlans: regimePlanCategory })
        else
            res.status(400).send(`Regime Plans with Category ${id} have not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateRegimePlan = async (req, res) => {
    const { title, description, regimePlanCategory } = req.body
    const id = req.body.id
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    const category = await Category.findOne({ title: regimePlanCategory })
    if (!category)
        return res.status(400).send(`Category ${regimePlanCategory} is empty or not found`)
    try {
        const editRegimePlan = await RegimePlan.findByIdAndUpdate({ _id: id }, { title, description, image, category: category._id })
        if (editRegimePlan)
            res.status(200).send(`Regime Plan ${id} has been updated successfully!`)
        else
            res.status(404).send(`Regime Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteRegimePLan = async (req, res) => {
    const id = req.body.id
    try {
        const removeRegimePlan = await RegimePlan.findByIdAndDelete(id)
        if (removeRegimePlan)
            res.status(200).send(`Regime Plan ${id} has been deleted!`)
        else
            res.status(404).send(`Regime Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}