import RegimePlan from '../models/regimePlansModel.js'
import Category from '../models/categoriesModel.js'
import fs from 'fs/promises'

export const createRegimePlan = async (req, res) => {
    const { title, description, regimeCategory } = req.body
    const image = req.file?.path
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
        await newRegimePlan.save()
        category.regimePlan.push(newRegimePlan._id)
        await category.save()
        res.status(200).send(`Regime plan ${newRegimePlan._id} has been created and added to category ${regimeCategory}`)
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
        const category = await Category.findById(id)
        const regimePlanCategory = await RegimePlan.find({ _id: { $in: category.regimePlan } })
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
    const prevRegimePlan = await RegimePlan.findById(id)
    const oldImage = prevRegimePlan.image
    const existingCategory = await Category.findOne({ _id: prevRegimePlan.category })
    try {
        const editRegimePlan = await RegimePlan.findByIdAndUpdate({ _id: id }, { title, description, image, category: category._id })
        await editRegimePlan.save()
        if (category._id.toString() === prevRegimePlan.category.toString())
            return res.status(400).send(`Category ${regimePlanCategory} is already existed!`)
        else {
            existingCategory.regimePlan = existingCategory.regimePlan.filter(item => item.toString() !== prevRegimePlan._id.toString())
            await existingCategory.save()
        }
        await fs.unlink(oldImage)
        if (!category.regimePlan.includes(id))
            category.regimePlan.push(id)
        await category.save()
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
        const oldImage = removeRegimePlan.image
        const category = await Category.findOne({ regimePlan: { $in: [id] } })
        await fs.unlink(oldImage)
        if (category) {
            category.regimePlan = category.regimePlan.filter(item => item.toString() !== id)
            await category.save()
        }
        if (removeRegimePlan)
            res.status(200).send(`Regime Plan ${id} has been deleted!`)
        else
            res.status(404).send(`Regime Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteAllRegimePlans = async (req, res) => {
    try {
        const removeAllRegimePlans = await RegimePlan.deleteMany({})
        const category = await Category.find()
        const regimePlans = await RegimePlan.find()
        if (removeAllRegimePlans.deletedCount > 0) {
            for (const plan in regimePlans)
                category.regimePlan = category.regimePlan.filter(item => item.toString() !== plan._id.toString())
            res.status(200).send('All Regime plans have been deleted!')
        }
        else
            res.status(400).send('Error occured!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}