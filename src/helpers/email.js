export function confirmationEmail({ name, confirmationUrl }) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background:#f4f4f5; font-family:Arial,sans-serif;">
        <div style="max-width:600px; margin:40px auto; background:white; padding:40px; border-radius:12px;">
          
          <h1 style="color:#18181b;">
            ¡Hola, ${name}! 👋
          </h1>

          <p style="color:#52525b; font-size:16px; line-height:1.6;">
            Gracias por registrarte. Para completar tu registro,
            confirma tu correo electrónico haciendo clic en el siguiente botón.
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a
              href="${confirmationUrl}"
              style="
                background:#18181b;
                color:white;
                padding:14px 24px;
                text-decoration:none;
                border-radius:8px;
                display:inline-block;
                font-weight:bold;
              "
            >
              Confirmar mi correo
            </a>
          </div>

          <p style="color:#71717a; font-size:14px;">
            Si tú no creaste esta cuenta, puedes ignorar este correo.
          </p>

        </div>
      </body>
    </html>
  `;
}
