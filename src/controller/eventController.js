import { Events } from "../models/index.js";
import { User } from "../models/index.js"

export const getAllEvents = async (req, res) => {
    try {
        const events = await Events.findAll({
            where: {
                id_user: req.user.id_user
            },
            raw: true
        })

        const calendar = events.reduce((acc, event) => {
            const date = event.date_event

            if(!acc[date]){
                acc[date] = []
            }

            acc[date].push({
                id: event.id_event,
                title: event.title_event,
                description: event.description_event,
                time: event.time_event
            })

            return acc
        }, {})

        res.json(calendar)
    } catch (error) {
        console.log(error)
    }
}

export const createEvent = async (req, res) => {
    try {
        const { title_event, description_event, date_event, time_event } = req.body

        const id_user = req.user.id_user

        const newEvent = await Events.create({
            id_user,
            title_event,
            description_event,
            date_event,
            time_event
        })

        res.status(201).json(newEvent)
    } catch (error) {
        console.log(error)
    }
}

export const getEventById = async (req, res) => {
    try {
        const {id_event} = req.params
        const event = await Events.findOne({where: {id_event}})
        res.json(event ?? {})
    } catch (error) {
        console.log(error)
    }
}