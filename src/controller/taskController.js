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

export const getAllTasks = async (req, res) => {
    try {
        const getTasks = await Tasks.findAll({
            where: {
                id_user: req.user.id_user
            },
            raw: true
        })

        res.json(getTasks)
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostrar las tareas"})
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { tasks_id } = req.params
        const getTask = await Tasks.findOne({where: {tasks_id}})
        res.json(getTask ?? {})
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostra la tarea"})
    }
}

export const updateTask = async (req, res) => {
    try {
        const { tasks_id } = req.params
        const id_user = req.user.id_user

        const { title_task, content_task, date_task } = req.body
        const [updateRows] = await Tasks.update(
            {
                title_task,
                content_task,
                date_task
            }, 
            {
                where: {
                    tasks_id,
                    id_user
                }
            }
        )

        if(updateRows === 0) {
            return res.status(404).json({
                message: 'Ocurrio un error al actualizar'
            })
        }

        const updatedTask = await Tasks.findOne({
            where: {
                tasks_id,
                id_user
            }
        });

        return res.status(200).json({
            message: 'Tarea actualizado correctamente',
            event: updatedTask
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Hubo un error al actualizar la tarea"})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { tasks_id } = req.params
        const id_user = req.user.id_user

        const deleteRow = await Tasks.destroy({where: {tasks_id, id_user}})

        if(deleteRow === 0) {
            return res.status(404).json({
                message: 'No existe el registro a eliminar'
            })
        }

        return res.status(200).json({message: "Tarea eliminada correctamente"})
    } catch (error) {
        console.log(error)
    }
}