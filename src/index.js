import express from "express"
import { db } from "./config/db.js"
import "./models/index.js"
import authRouter from './router/authRoutes.js'
import eventRouter from './router/eventRoutes.js'
import cors from "cors"

const app = express()

const PORT = 3000

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use("/v1/auth", authRouter)
app.use("/v1/events", eventRouter)

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