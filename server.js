const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, images, CSS) from current directory
app.use(express.static(__dirname));

// Configure the database through environment variables; never commit credentials.
const hasDatabaseConfig = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
    .every(key => process.env[key]);
const db = hasDatabaseConfig ? mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
}) : null;

// GET Endpoint: Fetch all Wi-Fi hotspots
app.get('/api/hotspots', async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Database is not configured' });

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

    if (!db) return res.status(503).json({ error: 'Database is not configured' });

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

// Fallback Route: Serve index.html for any other GET requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
