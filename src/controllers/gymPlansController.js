import GymPlan from '../models/gymPlansModel.js'

export const createGymPlan = async (req, res) => {
    const { title, price, features } = req.body
    if (!title || !price || !features)
        return res.status(400).send('All fields are required!')
    try {
        const newGymPlan = await GymPlan.create({
            title,
            price,
            features
        })
        res.status(200).send('New Gym Plan has been created!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readGymPlans = async (req, res) => {
    try {
        const gymPlans = await GymPlan.find()
        res.status(200).json({ GymPlans: gymPlans })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateGymPlan = async (req, res) => {
    const { title, price, features } = req.body
    const id = req.body.id
    if (!title || !price || !features)
        return res.status(400).send('All fields are required!')
    try {
        const editGymPlan = await GymPlan.findByIdAndUpdate({ _id: id }, { title, price, features })
        if (editGymPlan)
            res.status(200).send(`Gym Plan ${id} has been updated successfully!`)
        else
            res.status(404).send(`Gym Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).sed(error)
    }
}

export const deleteGymPlan = async (req, res) => {
    const id = req.body.id
    try {
        const removeGymPlan = await GymPlan.findByIdAndDelete(id)
        if (removeGymPlan)
            res.status(200).send(`Gym Plan ${id} has been deleted successfully!`)
        else
            res.status(404).send(`Gym Plan ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteAllGymPlans = async (req, res) => {
    try {
        const removeGymPlans = await GymPlan.deleteMany({})
        if (removeGymPlans.deletedCount > 0)
            res.status(200).send('All Gym plans have been deleted!')
        else
            res.status(400).send('Error occured!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}