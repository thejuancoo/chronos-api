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
        res.json(events)
    } catch (error) {
        console.log(error)
    }
}