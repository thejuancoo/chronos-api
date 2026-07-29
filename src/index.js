import express from "express"
import { db } from "./config/db.js"
import "./models/index.js"

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

try {
    await db.authenticate()
    db.sync()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.log(error)
}

app.listen(PORT, () => {
    console.log('Puerto corriendo en el puerto:', PORT)
})