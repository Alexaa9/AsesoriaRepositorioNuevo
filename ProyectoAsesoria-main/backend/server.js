const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');

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
        ['https://www.googleapis.com/auth/calendar.events']
    );
}

app.get('/events', async (req, res) => {
    try {
        const auth = authorize();
        const calendar = google.calendar({ version: 'v3', auth });

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        res.json(response.data.items);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
