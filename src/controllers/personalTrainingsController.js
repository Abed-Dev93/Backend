import PersonalTraining from '../models/PersonalTrainingsModel.js'

export const createPersonalTraining = async (req, res) => {
    const { title, description } = req.body
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    try {
        const newPersonalTraining = await PersonalTraining.create({
            title,
            description,
            image
        })
        res.status(200).send('New Personal Training has been created!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readPersonalTrainings = async (req, res) => {
    try {
        const personalTrainings = await PersonalTraining.find()
        res.status(200).json({ PersonalTrainings: personalTrainings })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updatePersonalTraining = async (req, res) => {
    const {  title, description} = req.body
    const id = req.body.id
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    try {
        const editPersonalTraining = await PersonalTraining.findByIdAndUpdate({ _id: id }, { title, description, image })
        if (editPersonalTraining)
            res.status(200).send(`Personal Training ${id} has been updated successfully!`)
        else
            res.status(404).send(`Personal Training ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deletePersonalTraining = async (req, res) => {
    const id = req.body.id
    try {
        const removePersonalTraining = await PersonalTraining.findByIdAndDelete(id)
        if (removePersonalTraining)
            res.status(200).send(`Personal Training ${id} has been deleted successfully!`)
        else
            res.status(404).send(`Personal Training ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}