const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const CREDENTIALS_PATH = './asesorias-459817-2402dbbdf074.json';

function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    return new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        [
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/gmail.send'
        ]
    );
}

app.post('/send-email', async (req, res) => {
    try {
        const auth = authorize();
        const gmail = google.gmail({ version: 'v1', auth });

        const emailBase64 = Buffer.from(
            `From: tuemail@gmail.com\nTo: ${req.body.destino}\nSubject: ${req.body.asunto}\n\n${req.body.mensaje}`
        ).toString('base64');

        await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw: emailBase64 },
        });

        res.json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
