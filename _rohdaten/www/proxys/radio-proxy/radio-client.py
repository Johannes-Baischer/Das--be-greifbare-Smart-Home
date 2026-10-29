# radio-client.py
# Dieses Client Skript wird auf dem ESP32 ausgeführt und verbindet sich mit dem lokalen Proxy, 
# um den Audio-Stream zu empfangen und über I2S an einen Verstärker auszugeben.

import network
import utime
from machine import I2S, Pin
import usocket as socket

# --- KONFIGURATION ---
host = "10.0.0.1"  # IP Laptop
path = "/oe3.wav"
port = 8080

wifi_ssid = "MMSE-Smart-Home-Wifi"
wifi_password = "mmseshw1"

# --- 1. WLAN VERBINDUNG ---
wlan = network.WLAN(network.STA_IF)
wlan.active(False)
utime.sleep_ms(100)
wlan.active(True)
utime.sleep_ms(100)

if not wlan.isconnected():
    print('Verbinde mit WLAN...')
    wlan.connect(wifi_ssid, wifi_password)
    zaehler = 0
    while not wlan.isconnected() and zaehler < 40:
        utime.sleep_ms(500)
        zaehler += 1

if wlan.isconnected():
    print('WLAN verbunden! IP:', wlan.ifconfig()[0])
else:
    raise RuntimeError('WLAN Verbindung fehlgeschlagen.')

# --- 2. I2S VERSTÄRKER KONFIGURATION ---
# sck = BCLK (GPIO 6) | ws = LRC (GPIO 1) | sd = DIN (GPIO 7)
audio_out = I2S(0, 
                sck=Pin(6),   
                ws=Pin(1),    
                sd=Pin(7),    
                mode=I2S.TX,  
                bits=16, 
                format=I2S.STEREO,
                rate=44100,   
                ibuf=16384)   # 16 KB Puffer schont den ESP32-C6 Heap

print('I2S Hardware bereit.')

# --- 3. STREAMING SCHLEIFE ---
# 4 KB Lese-Puffer (+4 Bytes Puffer-Reserve für unvollständige Frames)
BUF_SIZE = 4096
buf = bytearray(BUF_SIZE + 4)

while True:
    s = None
    try:
        print("Verbinde mit Proxy...")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        addr = socket.getaddrinfo(host, port)[0][-1]
        s.connect(addr)
        print("Verbunden! Sende HTTP-Request...")

        http_request = f"GET {path} HTTP/1.0\r\nHost: {host}\r\nConnection: close\r\n\r\n"
        s.send(http_request.encode('utf-8'))

        # HTTP Header Zeile für Zeile überspringen bis zur Leerzeile (\r\n)
        while True:
            line = s.readline()
            if not line or line == b'\r\n' or line == b'\n':
                break

        print("Header übersprungen, Audio startet sauber...")

        carryover_len = 0

        while True:
            # Daten hinter die eventuell noch vorhandenen Rest-Bytes lesen
            view = memoryview(buf)[carryover_len:BUF_SIZE]
            bytes_read = s.readinto(view)

            if bytes_read <= 0:
                raise Exception("Stream vom Server beendet")

            total_bytes = carryover_len + bytes_read

            # Immer strikt auf Vielfaches von 4 Bytes runden!
            remainder = total_bytes % 4
            valid_bytes = total_bytes - remainder

            if valid_bytes > 0:
                audio_out.write(buf[:valid_bytes])

            # Rest-Bytes (1 bis 3 Bytes) für das nächste Paket an den Anfang schieben
            if remainder > 0:
                for i in range(remainder):
                    buf[i] = buf[valid_bytes + i]
                carryover_len = remainder
            else:
                carryover_len = 0

    except Exception as e:
        print("Verbindungsfehler:", e)
        print("Neuer Versuch in 3 Sekunden...")
        if s:
            try:
                s.close()
            except:
                pass
        utime.sleep(3)