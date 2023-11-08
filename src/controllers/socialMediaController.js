import SocialMedia from '../models/socialMediaModel.js'

export const createSocialMedia = async (req, res) => {
    const { facebook, instagram, whatsapp, youtube } = req.body
    if (!facebook || !instagram || !whatsapp || !youtube)
        return res.status(400).send('All fields are required!')
    try {
        const newSocialMedia = await SocialMedia.create({
            facebook,
            instagram,
            whatsapp,
            youtube
        })
        res.status(200).send('New Social Media has been created!')
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const readSocialMedia = async (req, res) => {
    try {
        const socialMedias = await SocialMedia.find()
        res.status(200).json({ SocialMedias: socialMedias })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateSocialMedia = async (req, res) => {
    const { facebook, instagram, whatsapp, youtube } = req.body
    const id = req.body.id
    if (!facebook || !instagram || !whatsapp || !youtube)
        return res.status(404).send('All fields are required!')
    try {
        const editSocialMedia = await SocialMedia.findByIdAndUpdate({ _id: id }, { facebook, instagram, whatsapp, youtube })
        if (editSocialMedia)
            res.status(200).send(`Social Media ${id} has been updated successfully!`)
        else
            res.status(400).send(`Socia Media ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteSocialMedia = async (req, res) => {
    const id = req.body.id
    try {
        const removeSocialMedia = await SocialMedia.findByIdAndDelete(id)
        if (removeSocialMedia)
            res.status(200).send(`Social Media ${id} has been deleted successfully!`)
        else
            res.status(400).send(`Social Media ${id} has not been found!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}