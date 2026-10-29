const { spawn } = require('child_process');
const http = require('http');

const PORT = process.env.PORT || 8080;
const STREAM_URL = 'http://orf-live.ors-shoutcast.at/oe3-q2a';

// 32 KB Puffer (~185ms Audio bei 44.1kHz 16-Bit Stereo)
const BUFFER_SIZE = 32768; 

let clients = new Set();
let ffmpegProcess = null;
let audioRingBuffer = Buffer.alloc(0);
let carryover = Buffer.alloc(0);

function startFFmpeg() {
    if (ffmpegProcess) return;

    console.log('[FFmpeg] Starte Stream (pcm_s16le)...');
    
    // ESP32 I2S benötigt NATIV pcm_s16le (Little Endian)!
    ffmpegProcess = spawn('/usr/bin/ffmpeg', [
        '-i', STREAM_URL,
        '-vn',
        '-acodec', 'pcm_s16le',
        '-ar', '44100',
        '-ac', '2',
        '-f', 's16le',
        '-fflags', 'nobuffer',
        '-flags', 'low_delay',
        'pipe:1'
    ], { stdio: ['ignore', 'pipe', 'ignore'] });

    carryover = Buffer.alloc(0);

    ffmpegProcess.stdout.on('data', (rawChunk) => {
        let chunk = carryover.length > 0 
            ? Buffer.concat([carryover, rawChunk]) 
            : rawChunk;

        // Sicherstellen, dass nur ganze 4-Byte-Frames verarbeitet werden
        const remainder = chunk.length % 4;
        if (remainder !== 0) {
            carryover = chunk.slice(chunk.length - remainder);
            chunk = chunk.slice(0, chunk.length - remainder);
        } else {
            carryover = Buffer.alloc(0);
        }

        if (chunk.length === 0) return;

        audioRingBuffer = Buffer.concat([audioRingBuffer, chunk]);
        if (audioRingBuffer.length > BUFFER_SIZE) {
            audioRingBuffer = audioRingBuffer.slice(audioRingBuffer.length - BUFFER_SIZE);
        }

        for (const client of clients) {
            client.write(chunk);
        }
    });

    ffmpegProcess.on('close', (code) => {
        console.log(`[FFmpeg] Beendet (Code ${code}). Reconnect in 3 Sekunden...`);
        ffmpegProcess = null;
        carryover = Buffer.alloc(0);
        setTimeout(startFFmpeg, 3000);
    });

    ffmpegProcess.on('error', (err) => {
        console.error('[FFmpeg] Fehler:', err.message);
    });
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'audio/l16;rate=44100;channels=2',
        'Cache-Control': 'no-cache, no-store',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache'
    });

    if (audioRingBuffer.length > 0) {
        res.write(audioRingBuffer);
    }

    clients.add(res);
    console.log(`[HTTP] Client verbunden. Aktive Clients: ${clients.size}`);

    if (!ffmpegProcess) {
        startFFmpeg();
    }

    req.on('close', () => {
        clients.delete(res);
        console.log(`[HTTP] Client getrennt. Aktive Clients: ${clients.size}`);
        
        if (clients.size === 0 && ffmpegProcess) {
            console.log('[HTTP] Keine aktiven Clients mehr. Beende FFmpeg...');
            ffmpegProcess.kill('SIGTERM');
            ffmpegProcess = null;
            audioRingBuffer = Buffer.alloc(0);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`PCM Audio-Proxy läuft auf Port ${PORT}`);
});