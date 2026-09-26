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

// MySQL Connection Pool Configuration
const db = mysql.createPool({
    host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
    user: process.env.DB_USER || 'sql12837806',
    password: process.env.DB_PASSWORD || 'GHFN2IH1CW',
    database: process.env.DB_NAME || 'sql12837806',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
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

// PUT Endpoint: Update Wi-Fi details for an existing hotspot
app.put('/api/hotspots/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { ssid, password } = req.body;

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid hotspot ID' });
    }
    if (typeof ssid !== 'string' || !ssid.trim() || ssid.length > 32) {
        return res.status(400).json({ error: 'A valid SSID is required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE wifi_hotspots SET ssid = ?, password = ? WHERE id = ?',
            [ssid, typeof password === 'string' && password ? password : 'None (Open)', id]
        );

        if (result.affectedRows === 0) {
            const [rows] = await db.query('SELECT id FROM wifi_hotspots WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Hotspot not found' });
            }
        }

        res.json({ id, message: 'Hotspot updated successfully' });
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
