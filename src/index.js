import express from "express"
import { db } from "./config/db.js"
import "./models/index.js"
import authRouter from './router/authRoutes.js'
import eventRouter from './router/eventRoutes.js'
import noteRouter from "./router/notesRoutes.js"
import taskRouter from "./router/taskRoutes.js"
import cors from "cors"

const app = express()

const PORT = 3000
const allowedOrigins = [
    'http://localhost:5173', //DEV
    'https://chronos.jmcruzo23z.workers.dev'
]

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())

app.use("/v1/auth", authRouter)
app.use("/v1/events", eventRouter)
app.use("/v1/notes", noteRouter)
app.use("/v1/tasks", taskRouter)

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