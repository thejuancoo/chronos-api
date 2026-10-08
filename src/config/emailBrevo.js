import { BrevoClient } from "@getbrevo/brevo"
import dotenv from "dotenv"
dotenv.config({ path: '.env' })

const brevoInstance = new BrevoClient({
    apiKey: process.env.BREVO_APIKEY,
    timeoutInSeconds: 30,
    maxRetries: 3,
})

export const sendEmailConfirmation = async ({ to, token }) => {
    const { email, name } = to;
    const confirmationUrl = `${process.env.BACKEND_URL}/v1/auth/confirm-email?token=${token}`;

    try {
        await brevoInstance.transactionalEmails.sendTransacEmail({
            subject: "Confirma tu cuenta - Chronos",
            sender: { name: "Team Chronos", email: "210373@utxicotepec.edu.mx" },
            to: [{ email, name }],
            htmlContent: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirma tu cuenta</title>
                </head>
                <body style="
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f5;
                    font-family: Arial, Helvetica, sans-serif;
                ">
                    <div style="
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    ">
                        <!-- Header -->
                        <div style="
                            background-color: #18181b;
                            padding: 30px;
                            text-align: center;
                        ">
                            <h1 style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 28px;
                            ">
                                Chronos
                            </h1>
                        </div>

                        <!-- Content -->
                        <div style="
                            padding: 40px 35px;
                            color: #27272a;
                        ">
                            <h2 style="
                                margin-top: 0;
                                font-size: 24px;
                            ">
                                ¡Bienvenido, ${name}! 👋
                            </h2>

                            <p style="
                                font-size: 16px;
                                line-height: 1.6;
                                color: #52525b;
                            ">
                                Gracias por registrarte en <strong>Chronos</strong>.
                            </p>

                            <p style="
                                font-size: 16px;
                                line-height: 1.6;
                                color: #52525b;
                            ">
                                Para comenzar a utilizar tu cuenta necesitamos
                                confirmar tu dirección de correo electrónico.
                            </p>

                            <!-- Button -->
                            <div style="
                                text-align: center;
                                margin: 35px 0;
                            ">
                                <a href="${confirmationUrl}"
                                   style="
                                    display: inline-block;
                                    padding: 14px 28px;
                                    background-color: #18181b;
                                    color: #ffffff;
                                    text-decoration: none;
                                    font-size: 16px;
                                    font-weight: bold;
                                    border-radius: 12px;
                                ">
                                    Confirmar mi cuenta
                                </a>
                            </div>

                            <p style="
                                font-size: 14px;
                                line-height: 1.6;
                                color: #71717a;
                            ">
                                Si el botón no funciona, puedes copiar y pegar
                                el siguiente enlace en tu navegador:
                            </p>

                            <p style="
                                font-size: 13px;
                                word-break: break-all;
                                color: #52525b;
                            ">
                                ${confirmationUrl}
                            </p>

                            <p style="
                                margin-top: 30px;
                                font-size: 14px;
                                color: #71717a;
                            ">
                                Si tú no realizaste este registro, puedes ignorar
                                este correo.
                            </p>

                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 20px;
                            background-color: #fafafa;
                            text-align: center;
                            border-top: 1px solid #e4e4e7;
                        ">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                color: #a1a1aa;
                            ">
                                © ${new Date().getFullYear()} Chronos.
                                Todos los derechos reservados.
                            </p>
                        </div>

                    </div>

                </body>
                </html>
            `,
            textContent: `
                Hola ${name},
                Gracias por registrarte en Chronos.
                Confirma tu cuenta utilizando el siguiente enlace:
                ${confirmationUrl}
                Si tú no realizaste este registro, puedes ignorar este correo.
                © ${new Date().getFullYear()} Chronos.
            `
        });

    } catch (error) {
        console.error("Error enviando correo de confirmación:", error);
    }
};