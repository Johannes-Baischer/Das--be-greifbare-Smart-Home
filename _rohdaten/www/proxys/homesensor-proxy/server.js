const http = require('http');

const PORT = 3000;

// 1. Dictionary für WLED Controller (Sprechende Namen -> IP-Adressen)
const wledDevices = {
    "modul1": "10.0.0.15",
    "modul2": "10.0.0.25",
    "modul3": "10.0.0.35",
    "modul4": "10.0.0.45",
    "modul5": "10.0.0.55"
};

// 2. In-Memory Speicher für alle Sensoren
let sensorData = {
    temperatur: "0",
    luftfeuchtigkeit: "0",
    lichtstaerke: "0",
    entfernung: "0",
    ir: "kein_signal"
};

const server = http.createServer(async (req, res) => {
    // URL und Query-Parameter parsen
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.searchParams;
    const timestamp = new Date().toISOString();

    // Standard-Header für alle Antworten (Verbindung sofort schließen)
    res.setHeader('Connection', 'close');

    // --- BEREICH A: Sensor-Werte periodisch aktualisieren ---
    // Aufruf z.B. durch den Sensor-ESP32: /api/sensor/update?temperatur=22.5&luftfeuchtigkeit=45
    if (pathname === '/api/sensor/update') {
        for (const [key, value] of query.entries()) {
            if (sensorData.hasOwnProperty(key)) {
                sensorData[key] = value;
            }
        }
        console.log(`[${timestamp}] Sensor-Werte aktualisiert:`, sensorData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
        return;
    }

    // --- BEREICH B: Einzelnen Sensor-Wert abfragen ---
    // Aufruf durch Schüler: /api/sensor/temperatur
    if (pathname.startsWith('/api/sensor/')) {
        const sensorName = pathname.replace('/api/sensor/', '');
        
        if (sensorData.hasOwnProperty(sensorName)) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(String(sensorData[sensorName])); // Gibt z.B. "22.5" als reinen Text zurück
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Sensor nicht gefunden');
        }
        return;
    }

    // --- BEREICH C: WLED-Befehle mit sprechenden Namen weiterleiten ---
    // Aufruf durch Schüler: http://10.0.0.1:3000/api/wled/modul1/win&A=255  für volle Helligkeit
    const match = pathname.match(/^\/api\/wled\/([^\/]+)\/(.+)$/);
    if (match) {
        const deviceName = match[1];
        const wledCommand = match[2];

        if (!wledDevices[deviceName]) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Unbekanntes WLED-Gerät');
            return;
        }

        const targetIp = wledDevices[deviceName];
        console.log(`[${timestamp}] WLED Request -> ${deviceName} (${targetIp}) | Befehl: ${wledCommand}`);

        // Sofortige Antwort an den Schüler-Microcontroller
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');

        // Weiterleitung an WLED im Hintergrund (asynchron)
        setImmediate(async () => {
            try {
                const targetUrl = `http://${targetIp}/${wledCommand}`;
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(targetUrl, { signal: controller.signal });
                clearTimeout(timeout);

                console.log(`[${timestamp}] WLED ${targetIp} antwortete mit Status ${response.status}`);
            } catch (error) {
                console.error(`[${timestamp}] Fehler bei WLED ${targetIp}:`, error.message);
            }
        });
        return;
    }

    // --- Fallback für ungültige URLs ---
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ungültiger Endpunkt');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('======================================');
    console.log(`Zentraler IoT-Server gestartet (Ohne Express)`);
    console.log(`Port: ${PORT}`);
    console.log(`Zeit: ${new Date().toISOString()}`);
    console.log('======================================');
});

// Prozess-Absicherung gegen Abstürze
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});