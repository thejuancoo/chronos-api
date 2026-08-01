import { User } from "../models/index.js"

export const createUser = async (req, res) => {
    try {
        const { password_user, email_user } = req.body

        const emailExists = await User.findOne({where: {email_user}})
        if(emailExists){
            const error = new Error('El usuario ya existe')
            return res.status(409).json({error: error.message})
        }

        const user = new User(req.body)
        await user.save()

        res.json('Usuario creado correctamente')

    } catch (error) {
        //return res.status(500).json({error: "Ocurrio un error"})
        console.log(error)
    }
}