const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Pool (Uses process.env for security)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
    user: process.env.DB_USER || 'sql12837806',
    password: process.env.DB_PASSWORD || 'GHFN2IH1CW',
    database: process.env.DB_NAME || 'sql12837806',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

// Add this right above your app.get('/api/hotspots') line
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});

// GET Endpoint: Fetch all Wi-Fi hotspots
app.get('/api/hotspots', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM wifi_hotspots ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Endpoint: Save a new Wi-Fi hotspot
app.post('/api/hotspots', async (req, res) => {
    const { venueName, ssid, password, notes, lat, lng } = req.body;

    if (!venueName || !ssid || !lat || !lng) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO wifi_hotspots (venue_name, ssid, password, notes, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [
            venueName, 
            ssid, 
            password || 'None (Open)', 
            notes || '', 
            lat, 
            lng
        ]);

        res.status(201).json({ id: result.insertId, message: 'Hotspot saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
