import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'Token no valido'})
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findByPk(decoded.id, {
            attributes: {
                exclude: ['password_user']
            }
        })

        if(!user){
            return res.status(401).json({message: 'Usuario no encontrado'})
        }

        req.user = user

        next()
       
    } catch (error) {
        //console.log(error)
        return 
    }
}

export default checkAuth