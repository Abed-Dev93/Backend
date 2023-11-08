import PersonnalTraining from '../models/PersonnalTrainingsModel.js'

export const createPersonnalTraining = async (req, res) => {
    const { title, description } = req.body
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    try {
        const newPersonnalTraining = PersonnalTraining.create({
            title,
            description,
            image
        })
        res.status(200).semd('New Personnal Training has been created!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readPersonnalTrainings = async (req, res) => {
    try {
        const personnalTrainings = PersonnalTraining.find()
        res.status(200).json({ PersonnalTrainings: personnalTrainings })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updatePersonnalTraining = async (req, res) => {
    const {  title, description} = req.body
    const id = req.body.id
    const image = req.file.path
    if (!title || !description || !image)
        return res.status(400).send('All fields are required!')
    try {
        const editPersonnalTraining = await PersonnalTraining.findByIdAndUpdate({ _id: id }, { title, description, image })
        if (editPersonnalTraining)
            res.status(200).json({ message: `Personnal Training ${id} has been updated successfully!`, PersonnalTraining: editPersonnalTraining })
        else
            res.status(404).send(`Personnal Training ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deletePersonnalTraining = async (req, res) => {
    const id = req.body.id
    try {
        const removePersonnalTraining = await PersonnalTraining.findByIdAndDelete(id)
        if (removePersonnalTraining)
            res.status.send(`Personnal Training ${id} has been deleted successfully!`)
        else
            res.status(404).send(`Personnal Training ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}