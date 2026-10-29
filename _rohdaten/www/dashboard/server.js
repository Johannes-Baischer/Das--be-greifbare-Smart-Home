const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = 80;
const PUBLIC_DIR = '/var/www/dashboard';

const server = http.createServer((req, res) => {
    let filePath = '';

    // Routing definieren
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } else if (req.url === '/sensor-simulation') {
        filePath = path.join(PUBLIC_DIR, 'sensor-simulator.html');
    } else {
        // Optional: Versuche, andere Dateien (wie CSS/Bilder) direkt zu laden
        filePath = path.join(PUBLIC_DIR, req.url);
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Seite nicht gefunden');
        } else {
            // Einfache Content-Type Erkennung
            let ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'application/javascript';

            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Dashboard Server läuft auf Port ${PORT}`);
});
