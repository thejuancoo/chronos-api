import { Tasks } from "../models/index.js"

export const createTask = async (req, res) => {
    try {
        const { title_task, content_task, date_task } = req.body
        const id_user = req.user.id_user

        if(title_task === "")
            return res.status().json({message: "El titulo es obligatorio"})

        const newTask = await Tasks.create({
            id_user,
            title_task,
            content_task,
            date_task
        })
        await newTask.save()

        res.status(201).json(newTask)
    } catch (error) {
        console.log(error)
    }
}