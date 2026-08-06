import { User } from "../models/index.js"
import { checkPassword, hashPassword } from "../utils/auth.js"
import { generateTokenJWT } from "../utils/jwt.js"
import { generateToken } from "../utils/token.js"

export const createUser = async (req, res) => {
    try {
        const { password_user, email_user } = req.body

        const emailExists = await User.findOne({where: {email_user}})
        if(emailExists){
            const error = new Error('El usuario ya existe')
            return res.status(409).json({error: error.message})
        }

        const user = new User(req.body)
        user.password_user = await hashPassword(password_user)
        user.token_user = generateToken()
        await user.save()

        //TODO: Enviar el correo de confirmacion

        res.json('Usuario creado correctamente')

    } catch (error) {
        //return res.status(500).json({error: "Ocurrio un error"})
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { password_user, email_user } = req.body
        
        const user = await User.findOne({where: {email_user}})
        if(!user){
            const error = new Error('El usuario no existe')
            return res.status(404).json({error: error.message})
        }

        //TODO: Validar confirmacion de usuario
        const isPasswordCorrect = await checkPassword(password_user, user.password_user)
        if(!isPasswordCorrect){
            const error = new Error('La contraseña no es correcta')
            return res.status(403).json({error: error.message})
        }

        const token = generateTokenJWT(user.id_user)
        res.json(token)

    } catch (error) {
        console.log(error)
    }
}

export const profile = (req, res) => {
    const { user } = req
    res.json(user)
}