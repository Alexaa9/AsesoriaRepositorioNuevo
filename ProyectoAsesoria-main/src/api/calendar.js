import { google } from 'googleapis';
import authorize from './authorize';

async function getCalendarEvents() {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return res.data.items || [];
}

export default getCalendarEvents;
