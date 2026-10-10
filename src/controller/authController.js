import { User } from "../models/index.js"
import { checkPassword, hashPassword } from "../utils/auth.js"
import { generateTokenJWT } from "../utils/jwt.js"
import { generateToken } from "../utils/token.js"
import { sendEmailConfirmation, sendEmailPasswordReset } from "../config/emailBrevo.js"

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

        sendEmailConfirmation({
            token: user.token_user,
            to: {
                email: user.email_user,
                name: user.name_user,
            }
        })

        res.json('Usuario creado correctamente')
    } catch (error) {
        return res.status(500).json({error: "Ocurrio un error al crear al usuario"})
    }
}

export const confirmAccount = async (req, res) => {
    try {
        const { token } = req.body

        const user = await User.findOne({where: { token }})
        if(!user){
            const error = new Error('Token no válido')
            return res.status(401).json({error: error.message})
        } 

        user.confirmed = true
        user.token = null
        await user.save()

        res.json("Cuenta confirmada correctamente")
    } catch (error) {
        return res.status(500).json({error: "Ocurrio un error al confirmar la cuenta"})
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
        res.status(500).json({error: "Ocurrio un error al ingresar"})
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email_user } = req.body

        const user = await User.findOne({where: { email_user }})
        if(!user){
            const error = new Error("El usuario no existe")
            return res.status(409).json({error: error.message})
        }

        user.token = generateToken()
        await user.save()

        sendEmailPasswordReset({
            token: user.token_user,
            to: {
                email: user.email_user,
                name: user.name_user,
            }
        })

        res.json("Revisa tu correo para instrucciones")
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Ocurrio un error"})
    }
}

export const validateToken = async (req, res) => {
    try {
        const { email_user } = req.body

        const user = await User.findOne({where: { email_user }})
        if(!user){
            const error = new Error('El usuario no existe')
            return res.status(409).json({error: error.message})
        }

        user.token = generateToken()
        await user.save()

        //TODO:Enviar el correo para reestablecer el password
        res.json("Revisa tu correo para instrucciones")
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Ocurrio un error"})
    }
}

export const profile = (req, res) => {
    const { user } = req
    res.json(user)
}

export const updateProfile = async (req, res) => {
    try {
        const { id_user, name_user, lastname_user, email_user } = req.user
        const { name_user: name, lastname_user: lastname, email_user: email } = req.body

        const [updateRows] = await User.update(
            {
                name_user: name,
                lastname_user: lastname,
                email_user: email
            },
            {
                where: {
                    id_user,
                    email_user
                }
            }
        )

        if(updateRows === 0) {
            return res.status(404).json({
                message: 'Ocurrio un error al actualizar'
            })
        }

        await User.findOne({
            where: {
                id_user
            }
        });

        //TODO: Enviar el correo para confirmar el correo de nuevo (solo si se modifico)

        return res.status(200).json({
            message: 'Datos actualizados correctamente'
        });

    } catch (error) {
        res.status(500).json({error: "Ocurrio un error"})
    }
};

export const recoveryPassword = async (req, res) => {
    try {
        const { email_user } = req.body

        const user = await User.findOne({where: { email_user }})
        if(!user){
            const error = new Error('El usuario no existe')
            return res.status(409).json({error: error.message})
        }

        user.token = generateToken()
        await user.save()

        //TODO:Enviar el correo para reestablecer el password
        res.json("Revisa tu correo para instrucciones")
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Ocurrio un error"})
    }
}