import express, { urlencoded } from 'express'
import dbConnect from './src/configuration/dbConnection.js'
import 'dotenv/config'
import cors from 'cors'
import categoriesRouter from './src/routes/categoriesRouter.js'
import gymPlansRouter from './src/routes/gymPlansRouter.js'
import personalTrainingsRouter from './src/routes/personalTrainingsRouter.js'
import productsRouter from './src/routes/productsRouter.js'
import regimePlansRouter from './src/routes/regimePlansRouter.js'
import socialMediaRouter from './src/routes/socialMediaRouter.js'

const app = express()
const port = process.env.PORT

dbConnect()

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))
app.use(urlencoded({ extended: true }))
app.use('/category', categoriesRouter)
app.use('/gymPlan', gymPlansRouter)
app.use('/personalTraining', personalTrainingsRouter)
app.use('/product', productsRouter)
app.use('/regimePlan', regimePlansRouter)
app.use('/socialMedia', socialMediaRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
