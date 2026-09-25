import { Resend } from "resend"
import { confirmationEmail } from "../helpers/email.js"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendConfirmationEmail = async ({email, name, confirmationToken}) => {
    try {
        const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${confirmationToken}`
        const html = confirmationEmail({
            name,
            confirmationUrl
        })

        const data = await resend.emails.send({
            from: "Mi App <onboarding@resend.dev>",
            to: email,
            subject: "Confirma tu correo electrónico",
            html
        })
        console.log(data)
    } catch (error) {
        console.error("Error enviando correo:", error)
        throw error
    }
}