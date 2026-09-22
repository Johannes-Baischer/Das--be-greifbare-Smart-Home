---
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Firmware1.png
thumbnail: thumbnails/resized/959aa3d022c614b4601e9765e25e04e2_b89e22fb.jpg
---

> [!example]- Mockup
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Konzept/Schaltplan - Smart Home.excalidraw.svg]]

> [!danger]- Learnings
> - zuerst angedachtes PictoBlox unterstützt ESP32-C6 (wegen RISC-V Architektur) nicht /zu neu/ schade, weil Oberfläche mehr der Standard Scratch Oberfläche entspricht
> - ESPIDE braucht Micropython Firmware, da die Blöcke in der Oberfläche auf Python basieren / übersetzt werden
> - Auch WLED nicht direkt mit ESP32-C6 kompatibel, da es noch nicht offiziell unterstützt wird
> - **Strapping Pins** sind beim ESP32-C6-DevKitC-1 GPIO 8 und GPIO 9, sollen also im besten Fall nicht verwendet werden (GPIO 9 muss zum Start auf HIGH liegen, was intern geregelt wird, solange nichts anderes angeschlossen ist)
> - **WLED Datenleitung / ESP32 durchbrennen:** 
> 	- Das parallele Aufsplitten einer Datenleitung (Y-Topologie) ohne Dämpfungswiderstand führt bei hochfrequenten Signalen zu massiven Signalreflektionen und Spannungsspitzen. Diese Spitzen fließen über die Schutzdioden des Mikrocontrollers zurück in die Stromschiene und zerstören den internen Spannungsregler (LDO) durch Überlastung.
> 	 - Geteilte Stromkreise mit der selben Datenleitung können bei unvorhergesehenen Grounding-Problemen ebenfalls zu Schäden führen, da die Stromschiene nicht mehr stabil ist. (Ground-Float, Ground-Loop, etc.)
> 	 - BI (Backup Data) Leitung wird für stabile Leitung am Anfang mit GND verbunden. Ist die echte GND Verbindung aber wegen z.B. kalten Lötstellen oder losem Kontakt nicht stabil, kann es zu Spannungsspitzen, die über die BI Leitung zurückgeleitet werden und den LDO zerstören.
> - **Motorschrauben nur Handfest anziehen:** Die Vermutung ist, dass beim ersten Motor durch das anziehen mit dem Akkuschrauber die Gewinde ausgerissen sind, welche direkt in das innere Getriebe durchgefallen sind. Dort blockieren sie die sehr eng und hoch übersetzten Zahnräder. Der Motor hat sie dadurch immer nur minimal nach links/und rechts gedreht (weil dann der Spahn blockiert hat). Dadurch habe ich aber das Innere der Motoren jetzt einmal selbst zerlegt und wieder zusammengebaut.

# Setup

## ESP32-C6-DevKitC-1-N4

- ESP32-C6 mit USB-C Anschluss Verbinden
- in ESP IDE USB COM Port auswählen (Display+USB-Kabel Symbol)
	- Falls hier der COM Port nicht direkt vorgeschlagen wird Troubleshooting über Geräte-Manager etc. betreiben
- [ESP IDE](https://www.espide.eu/esp_ide_v2/index.html?lang=en) / Micropython Firmware
	- `ESP32_GENERIC_C6-20260222-v1.27.1.bin - offset: 0x0`
	- Select ESP32-C6 (Mini Board, Firmware ist aber für alle ESP32-C6 Boards gleich)
	- Firmware flashen (evtl. in BOOT Modus gehen)
		- BOOT Modus: Boot Taste gedrückt halten und dann Reset Taste tippen
- Bluetooth einrichten
	- Device -> Bluetooth Settings -> Name eingeben

> [!example]- Bilder 
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Firmware1.png]]
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Firmware2.png]]
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Bluetooth Setup.png]]
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Test Programm.png]]
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/IMG_20260428_162206.jpg]]
> - ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/IMG_20260428_162145.jpg]]

> [!info]- Pinout
> Unbedenklich und völlig frei:
> - GPIO 0
> - GPIO 1
> - GPIO 2
> - GPIO 3
> - GPIO 6
> - GPIO 7
> - GPIO 10
> - GPIO 11
> - GPIO 14
> - GPIO 21
> - GPIO 22
> - GPIO 23
>
> Zum Vergleich – Warum die anderen Pins ausscheiden:
> GPIO 4 & 5: Sind Strapping-Pins (MTMS/MTDI) – steuern das Boot-Verhalten.
> GPIO 8 & 9: Sind kritische Strapping-Pins – erzwingen bei falschem Pegel beim Starten den Flash-Modus.
> GPIO 12 & 13: Blockiert durch die interne USB-JTAG-Schnittstelle.
> GPIO 15: Ein weiterer Strapping-Pin.
> GPIO 16 & 17: Fest vergeben für die serielle Schnittstelle zum PC (UART0 TX/RX).
> GPIO 18 & 19: Blockiert durch die USB-Datenleitungen (USB D-/D+).
> GPIO 20: Fest vergeben als Log-Eingang (UART0 RXD).
> GPIO 24 bis 30: Intern fest mit dem SPI-Flash-Speicher des Chips verdrahtet (Zerstörungsgefahr des Programms, wenn extern beschaltet).
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Pinout ESP32-C6.png]]

## Pin-Mapping
> Vom jeweils programmierbaren ESP32

**Modul 1:**
- LDR-Signal: GPIO 0
- Optokoppler-In1-4: GPIO 2, 3, ~~16 (TX), 17 (RX)~~ , GPIO 10, GPIO 11
- Buttons: GPIO 21, 22
- MAX98357A I2S Amp: GPIO 1 (LCR), GPIO 6 (BCLK), GPIO 7 (DIN)

Taster:

| 1                          | 2                          | 3                        | 4                      | 5           | 6                           |
| -------------------------- | -------------------------- | ------------------------ | ---------------------- | ----------- | --------------------------- |
| Prog. Taster 1<br>(Pin 21) | Prog. Taster 2<br>(Pin 22) | Lautsprecher<br>(Pin 11) | Licht Raum<br>(Pin 10) | <br>(Pin 3) | Licht Elektronik<br>(Pin 2) |



**Module 2-5**
- LDR-Signal: GPIO 0
- Optokoppler-In1-4: GPIO 2, 3, ~~16 (TX), 17 (RX)~~, GPIO 10, GPIO 11
- Buttons: GPIO 21, 22

Taster:

| 1                          | 2                          | 3                          | 4                            | 5                  | 6                |
| -------------------------- | -------------------------- | -------------------------- | ---------------------------- | ------------------ | ---------------- |
| Prog. Taster 1<br>(Pin 21) | Prog. Taster 2<br>(Pin 22) | Rollläden Rauf<br>(Pin 11) | Rollläden Runter<br>(Pin 10) | Lüftung<br>(Pin 3) | Licht<br>(Pin 2) |


# Versorgung, Relais und Controller

## Stromversorgung 

- 12V vom Netzteil über Wago Klemmen verteilt an die Bauteile
	1. Shelly Relais Versorgung (und Schalten, falls 12V Gerät gesteuert wird)
	2. ESP32 Versorgung (über Step-Down Converter auf 5V)
	3. H-Brücken Versorgung (über Step-Down Converter auf 5V)
- 5V Versorgung wird ab Step-Down Converter verteilt auf die ESP32, H-Brücken, LDRs, etc.
- 3V3 Versorgung wird von den ESP32 bereitgestellt und für Taster verwendet, die der ESP32 dann wieder ausließt

## Relais

- Shelly 1 Gen4 Relais für die Steuerung der Stromversorgung der Geräte (z.B. Rolläden, Lüfter, etc.)
	- Versorgung mit stabilen 12V
	- Schalten von entweder 12V Leitung oder 5V Leitung
	- Switch Eingang wird durch physische Taster oder durch die ESP32 Module gegen GND gezogen
- Optokoppler
	- Optokoppler In1-4 werden durch die ESP32 Module gegen GND gezogen
		- Normally Open (NO) Kontakt, liegt auf GND, die Switch Leitung wird beim Schalten des Optokopplers gegen GND gezogen (SW = Common)

## Controller

- Versorgung über Buck-Converter (12V -> 5V)
- Physische Inputs durch 3V3 Taster Signale
- Restliche GPIOs für Optokoppler, LDR, I2S Amp, etc.



# Lichtwiderstand und Audio-Amps

## Lichtwiderstand
> KY-018 Foto LDR Widerstand Diode Photo Resistor Sensor

- [KY-018 Foto LDR Widerstand Diode Photo Resistor Sensor](https://www.az-delivery.de/products/ky-018-licht-sensor-kostenfreies-e-book)
- [AZ144_B3-13_DE_B089QHTP4D.pdf](https://cdn.shopify.com/s/files/1/1509/1638/files/AZ144_B3-13_DE_B089QHTP4D.pdf?v=1721115918)


## Audio-Amps
> I2S 3W Klasse D Amplifier Breakout Modul - MAX98357A

- [adafruit-max98357-i2s-class-d-mono-amp.pdf](https://cdn-learn.adafruit.com/downloads/pdf/adafruit-max98357-i2s-class-d-mono-amp.pdf)

# Wohnraumgeräte

## LED Strip

- Diffuser zuschneiden und anbringen (lange Seite, kurze Seite)
- LED Strips zuschneiden und Kabel anlöten
- Troubleshooting und WLED Einrichtung

## Rollladenmotor

- Halterungen waren bei er Lieferung nicht vorhanden, deswegen bei Schneeberger "bestellt"
- Halterungen als erstes anbringen, da Motoren sonst im Weg sind (kurze Holzschrauben)
- Motoren mit den Halterungen verschrauben (Gewindeschrauben), nur handfest ziehen, da sonst die Gewinde ausreißen können (Siehe Learnings Spähne im Motorgetriebe)
- Verkabelung mit H-Brückenausgang

## Lüftung
- 5V und GND passend verkabeln

## Lautsprecher
- Lautsprecheramp intern verkalben (mit ESP32 und Stromversorgung verbinden)
- Amp Versorgung wird durch Shelly Relais gegeben oder nicht gegeben zum ein und ausschalten
- Lautsprecherkabel werden durch Kabelkanäle geführt, und mit Lautsprecher verbunden

**Server Ö3 Stream mp3 decoder:**

```bash
sudo ufw allow 8080/tcp
```

```bash
sudo apt-get update && sudo apt-get install -y ffmpeg && sudo ufw allow from 10.0.0.0/24 to any port 8080 proto tcp && sudo bash -c 'cat <<EOF > /etc/systemd/system/oe3proxy.service
[Unit]
Description=Oe3 WAV Proxy für ESP32
After=network-online.target network.target

[Service]
ExecStart=/usr/bin/ffmpeg -nostdin -i http://orf-live.ors-shoutcast.at/oe3-q2a -f wav -acodec pcm_s16le -ar 44100 -ac 2 -listen 1 http://10.0.0.1:8080/oe3.wav
Restart=always
RestartSec=1

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload && systemctl enable --now oe3proxy.service'
```

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
        buffer = bytearray(4096)
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


# Sensorboard

Um alle Modulräume auf zentrale, gemeinsame Sensoren reagieren lassen zu können, entwickle ich ein Sensorboard, welches die Signale verschiedener Sensoren ausließt und an den zentralen Server sendet, von welchem die Werte per API abgefragt werden können.

> [!info] Abbildungsbeschreibung: Modularer Prototyp des IoT-Sensorboards
> 
> Hier wird der physische Voraufbau (Breadboard-Layout) des sensorgestützten IoT-Knotens für die Lernumgebung dargestellt. Die Komponenten sind zu diesem Zeitpunkt mechanisch platziert; die logische Signalverdrahtung über Jumper-Kabel sowie die Pegelanpassung für die Sensorik erfolgen im nächsten Schritt.
> 
> ### 🛠️ Systemkomponenten und Platzierung
> 
> - **Zentrale Steuereinheit (Mikrocontroller):**
>     
>     - **ESP32-C6 Dev Board:** Mittig über dem isolierenden Trennsteg des Breadboards platziert (Reihen 20–38). Das Board fungiert als dedizierter Logik-Controller, der die Sensordaten verarbeitet und über das integrierte Funkmodul (Wi-Fi 6 / Zigbee) an den zentralen Smart-Home-Server übermittelt.
>         
> - **Spannungsversorgung (Top-Level):**
>     
>     - **Breadboard Power Supply Module:** Am oberen Kopfende aufgesteckt. Es dient im Laboraufbau zur Bereitstellung und Trennung der benötigten Spannungsschienen für den Mikrocontroller und die Peripherie.
>         
> - **Sensorik zur Umwelterfassung (Linke Breadboard-Hälfte):**
>     
>     - **Fotowiderstand (LDR):** Positioniert auf Reihe 45 zur analogen Erfassung der Umgebungshelligkeit.
>         
>     - **DHT11-Modul:** Platziert auf den Reihen 52–55 zur digitalen Erfassung von Raumtemperatur und relativer Luftfeuchtigkeit.
>         
>     - **Infrarot (IR)-Empfängermodul:** Positioniert auf Reihe 60 zur Erfassung optischer Steuersignale im Nahbereich.
>         
> - **Sensorik zur Präsenzerfassung (Rechte Breadboard-Hälfte):**
>     
>     - **HC-SR04 Ultraschallsensor:** Vertikal gesteckt in den Reihen 48–58 zur berührungslosen Distanz- und Anwesenheitsmessung innerhalb des Raummodells.
>         
> - **Externe Peripherie:**
>     
>     - **Infrarot-Fernbedienung:** Liegt als Interaktionsmedium für den IR-Empfänger bereit, um herstellerunabhängige Steuerbefehle oder manuelle Overrides im System zu simulieren.


> [!info] Verdrahtungs- und Pinbelegungsplan des Sensorboards
> Für die funktionale Implementierung des Prototyps wird eine strikte Trennung zwischen der 5V-Peripherieversorgung (Primärspannung für den Ultraschallsensor) und der internen 3,3V-Logikspannung des ESP32-C6 vorgenommen. Die folgende Tabelle dokumentiert die vollständige physische Signal- und Stromlaufbahn inklusive der erforderlichen Schutzbeschaltungen.
> 
> | Komponente | Sensor-Pin | Ziel (ESP32-C6 / Bus-Schiene) | Spezifische Beschaltung / Hardware-Hinweis |
> | :--- | :--- | :--- | :--- |
> | **Spannungsquelle** | VCC (Output) | Breadboard 5V-Schiene (+ Red) | Bereitgestellt durch das obere Power-Supply-Modul |
> | | GND (Output) | Breadboard GND-Schiene (- Blue) | Gemeinsames Bezugspotenzial für das gesamte System |
> | **ESP32-C6** | 5V / VIN | Breadboard 5V-Schiene (+ Red) | Speist den internen Spannungsregler des Mikrocontrollers |
> | | GND | Breadboard GND-Schiene (- Blue) | Schließt den Primärstromkreis |
> | **HC-SR04** | VCC | Breadboard 5V-Schiene (+ Red) | Erfordert zwingend 5V für die akustischen Transducer |
> | *(Ultraschall)* | GND | Breadboard GND-Schiene (- Blue) | |
> | | TRIG | **GPIO 4** | Direkte Verbindung; der 3,3V-Triggerimpuls des ESP32 reicht aus |
> | | ECHO | **GPIO 5** | **Über Spannungsteiler:** $10\,\text{k}\Omega$ in Reihe zum Pin, dahinter $20\,\text{k}\Omega$ gegen GND geschaltet |
> | **DHT11** | VCC / + | ESP32 Pin `3V3` | Betrieb mit 3,3V sorgt für nativ kompatible Logikpegel am Datenpin |
> | *(Klima)* | GND / - | Breadboard GND-Schiene (- Blue) | |
> | | DATA / OUT | **GPIO 6** | Digitaler Dateneingang (nutzt internen oder Modul-Pull-Up) |
> | **LDR** | Pin 1 | ESP32 Pin `3V3` | Speisung über die stabilisierte Referenzspannung des Controllers |
> | *(Helligkeit)* | Pin 2 | **GPIO 1 (ADC1_CH1)** | **Als Spannungsteiler:** Pin 2 geht an GPIO 1 *und* parallel über $10\,\text{k}\Omega$ gegen GND |
> | **IR-Empfänger** | VCC | ESP32 Pin `3V3` | Spannungsversorgung für die interne Demodulator-Logik |
> | *(Infrarot)* | GND | Breadboard GND-Schiene (- Blue) | |
> | | OUT / DATA | **GPIO 2** | Digitaler Eingang zur Erfassung demodulierter IR-Pulsfolgen |
> 
> ---
> ### 💡 Schaltungstechnische Kernaspekte für das Hardware-Kapitel
> * **Signalintegrität am ADC:** Die Speisung des Fotowiderstands (LDR) erfolgt bewusst über den `3V3`-Pin des ESP32-C6 statt über die unregulierte 5V-Schiene. Dies verhindert, dass Schwankungen der primären Stromversorgung das analoge Messergebnis (Spannungswert am Analog-Digital-Wandler) verfälschen.
> * **Schutz der 3,3V-Domäne:** Der Spannungsteiler am `ECHO`-Pin des Ultraschallsensors ist kritisch. Da der HC-SR04 das Signal mit vollem 5V-Pegel ausgibt, dämpft die gewählte Widerstandskombination ($10\,\text{k}\Omega$ zu $20\,\text{k}\Omega$) die Spannung auf mikrokontrollertolerante $\approx 3,33\,\text{V}$ ab.
> * **GND-Fläche (Common Ground):** Um vagabundierende Ströme und Signalrauschen zu minimieren, sind sämtliche Massepunkte der Sensoren, des Mikrocontrollers sowie des Power-Moduls auf derselben physikalischen Breadboard-Schiene zusammengeführt.