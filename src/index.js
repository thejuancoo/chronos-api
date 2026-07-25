import express from "express"

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(PORT, () => {
    console.log('Puerto corriendo en el puerto:', PORT)
})