---
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/04 ESP32 Programme +ESPIDE als PWA Installieren.png
thumbnail: thumbnails/resized/b4e925bdb4a6630a85cb6d056e0720ab_b89e22fb.jpg
---
> In diesem Teil geht es um das Programmieren der Sekundärsteuerung durch die ESP32

![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/04 ESP32 Programme +ESPIDE als PWA Installieren.png]]
# Modul 1
> Servermodul

## Aufgaben
- Radio über SPI Schnittstelle auf Lautsprecher spielen
- Standardsteuerung der Shelly Relais
- Custom Steuerung über die zwei Knöpfe
## Programm

> [!example]- Radio Stream über lokalen Proxy (WAV/PCM)
```python
import network
import utime
from machine import I2S, Pin
import urequests

# --- 1. WLAN VERBINDUNG (Optimiert & Stabilisiert) ---
wlan = network.WLAN(network.STA_IF)

# WLAN-Modul kurz resetten, um "Internal State Errors" zu verhindern
wlan.active(False)
utime.sleep_ms(200)
wlan.active(True)
utime.sleep_ms(200)

if not wlan.isconnected():
    print('Verbinde mit WLAN (MMSE-Smart-Home-Wifi)...')
    wlan.connect('MMSE-Smart-Home-Wifi', 'mmseshw1')
    
    # Maximal 20 Sekunden (40 * 500ms) auf Verbindung warten
    zaehler = 0
    while not wlan.isconnected() and zaehler < 40:
        utime.sleep_ms(500)
        zaehler = zaehler + 1

if wlan.isconnected():
    print('WLAN erfolgreich verbunden!')
    print('IP-Adresse:', wlan.ifconfig()[0])
else:
    print('WLAN Verbindung fehlgeschlagen (Timeout).')

# --- 2. I2S VERSTÄRKER KONFIGURATION (Deine Belegung) ---
# sck = BCLK (GPIO 6) | ws = LRC (GPIO 1) | sd = DIN (GPIO 7)
audio_out = I2S(0, 
                sck=Pin(6),   
                ws=Pin(1),    
                sd=Pin(7),    
                mode=I2S.TX,  
                bits=16, 
                format=I2S.STEREO,
                rate=44100,   
                ibuf=32768)        # Maximaler Puffer für Stabilität

print('I2S Hardware-Schnittstelle bereit.')
print('Starte Radio-Stream über lokalen Proxy...')

import usocket as socket

# --- 3. LIVE-STREAM: LOKALER UBUNTU PROXY (WAV/PCM) ---
host = "10.0.0.1"  # IP Laptop!
path = "/oe3.wav"  # Der Pfad, den der FFmpeg-Proxy bereitstellt
port = 8080        # Der im Proxy definierte Port

while True:
    try:
        print("Verbinde mit Proxy...")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        addr = socket.getaddrinfo(host, port)[0][-1]
        s.connect(addr)
        print("Verbunden! Stream startet...")
        
        http_request = "GET " + path + " HTTP/1.0\r\nHost: " + host + "\r\n\r\n"
        s.send(bytes(http_request, 'utf8'))
        
        # Header überspringen
        while True:
            if s.readline() == b'\r\n': break

        # Streaming-Schleife
        buffer = bytearray(32768)
        while True:
            # Hier versuchen wir zu lesen
            bytes_read = s.readinto(buffer)
            if bytes_read > 0:
                audio_out.write(buffer[:bytes_read])
            else:
                # Verbindung vom Server geschlossen
                raise Exception("Server hat Stream beendet")
            utime.sleep_ms(1)

    except Exception as e:
        print("Verbindungsfehler:", e)
        print("Versuche in 3 Sekunden erneut zu verbinden...")
        if 's' in locals(): s.close()
        utime.sleep(3) # Kurze Pause vor dem Reconnect
```


![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/04 ESP32 Programme +Simpler Doppelschalter.png]]
```python
import utime
from machine import Pin

Pin21=Pin(21, Pin.IN, Pin.PULL_DOWN)

def gpio_set(pin,value):
  if value >= 1:
    Pin(pin, Pin.OUT).on()
  else:
    Pin(pin, Pin.OUT).off()


while True:
  utime.sleep_ms(0)
  if Pin21.value():
    gpio_set((17), 0)
    gpio_set((3), 0)
    utime.sleep_ms(100)
    gpio_set((17), 1)
    gpio_set((3), 1)
  else:
    gpio_set((17), 1)
    gpio_set((3), 1)
    utime.sleep_ms(100)

```

# Module 2-5
> Schüler:innen Modul

## Aufgaben
- Standardsteuerung der Shelly Relais
- Custom Steuerung über die zwei Knöpfe

## Programm

![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/04 ESP32 Programme +Raum Licht an, Rollläden Runter.png]]
```python
import utime
from machine import Pin

Pin21=Pin(21, Pin.IN)

def gpio_set(pin,value):
  if value >= 1:
    Pin(pin, Pin.OUT).on()
  else:
    Pin(pin, Pin.OUT).off()


while True:
  utime.sleep_ms(0)
  if Pin21.value():
    gpio_set((17), 0)
    utime.sleep(100)
    gpio_set((17), 1)
    utime.sleep(1)
    gpio_set((2), 0)
    utime.sleep(100)
    gpio_set((2), 1)
  else:
    gpio_set((17), 1)
    gpio_set((2), 1)
    utime.sleep(100)
```

