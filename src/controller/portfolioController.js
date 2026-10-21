import { Portfolios } from "../models/index.js";

export const createPortfolio = async (req, res) => {
    try {
        const { title_portfolio, description_portfolio } = req.body
        const id_user = req.user.id_user

        if(title_portfolio === "")
            return res.status().json({message: "El titulo es obligatorio"})

        const newPortfolio = await Portfolios.create({
            id_user,
            title_portfolio,
            description_portfolio
        })
        await newPortfolio.save()

        res.status(201).json(newPortfolio)
    } catch (error) {
        return res.status(400).json({message: "Hubo un error al crear la portafolio"})
    }
}

export const getAllPortfolios = async (req, res) => {
    try {
        const getPortfolios = await Portfolios.findAll({
            where: {
                id_user: req.user.id_user
            },
            raw: true
        })

        res.json(getPortfolios)
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostrar las notas"})
    }
}

export const getPortfoliosWithNotes = async (req, res) => {
    try {
        const { id_portfolio } = req.params

        const getPortfoliosAndNotes = await Portfolios.findAll({
            attributes: [
                "id_portfolio",
                "title_portfolio",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                    association: "notes",
                    attributes: [
                        "notes_id",
                        "title_note",
                        "content_note"
                    ],
                    required: false
                }
            ],
            where: {
                id_user: req.user.id_user,
                ...(id_portfolio && { id_portfolio })
            }
        })

        res.json(getPortfoliosAndNotes)
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostra las notas"})
    }
}

export const getPortfolioById = async (req, res) => {
    try {
        const { Portfolios_id } = req.params
        const getNote = await Portfolios.findOne({where: {Portfolios_id}})
        res.json(getNote ?? {})
    } catch (error) {
        return res.status(500).json({message: "Hubo un error al mostra la notas"})
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        const { Portfolios_id } = req.params
        const id_user = req.user.id_user

        const { title_portfolio, description_portfolio } = req.body
        const [updateRows] = await Portfolios.update(
            {
                title_portfolio,
                description_portfolio
            }, 
            {
                where: {
                    Portfolios_id,
                    id_user
                }
            }
        )

        if(updateRows === 0) {
            return res.status(404).json({
                message: 'Ocurrio un error al actualizar'
            })
        }

        const updatedNote = await Portfolios.findOne({
            where: {
                Portfolios_id,
                id_user
            }
        });

        return res.status(200).json({
            message: 'Nota actualizado correctamente',
            event: updatedNote
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Hubo un error al actualizar la nota"})
    }
}

export const deletePortfolio = async (req, res) => {
    try {
        const { portfolios_id } = req.params
        const id_user = req.user.id_user

        const deleteRow = await Portfolios.destroy({where: {portfolios_id, id_user}})

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