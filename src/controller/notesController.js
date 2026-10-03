import { Notes } from "../models/index.js";

export const createNote = async (req, res) => {
    try {
        const { title_note, content_note } = req.body
        const id_user = req.user.id_user

        if(title_note === "")
            return res.status().json({message: "El titulo es obligatorio"})

        const newNote = await Notes.create({
            id_user,
            title_note,
            content_note
        })
        await newNote.save()

        res.status(201).json(newNote)
    } catch (error) {
        return res.status(400).json({message: "Hubo un error al crear la nota"})
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const getNotes = await Notes.findAll({
            where: {
                id_user: req.user.id_user
            },
            raw: true
        })

        res.json(getNotes)
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostrar las notas"})
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { notes_id } = req.params
        const getNote = await Notes.findOne({where: {notes_id}})
        res.json(getNote ?? {})
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostra la notas"})
    }
}

export const updateNote = async (req, res) => {
    try {
        const { notes_id } = req.params
        const id_user = req.user.id_user

        const { title_note, content_note } = req.body
        const [updateRows] = await Notes.update(
            {
                title_note,
                content_note
            }, 
            {
                where: {
                    notes_id,
                    id_user
                }
            }
        )

        if(updateRows === 0) {
            return res.status(404).json({
                message: 'Ocurrio un error al actualizar'
            })
        }

        const updatedNote = await Notes.findOne({
            where: {
                notes_id,
                id_user
            }
        });

        return res.status(200).json({
            message: 'Evento actualizado correctamente',
            event: updatedNote
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Hubo un error al actualizar la nota"})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { notes_id } = req.params
        const id_user = req.user.id_user

        const deleteRow = await Notes.destroy({where: {notes_id, id_user}})

        if(deleteRow === 0) {
            return res.status(404).json({
                message: 'No existe el registro a eliminar'
            })
        }

        return res.status(200).json({message: "Nota eliminada correctamente"})
    } catch (error) {
        console.log(error)
    }
}