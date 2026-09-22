---
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/Pasted image 20260427162038.png
thumbnail: thumbnails/resized/53ee91986390ea485093431834c30e8a_b89e22fb.jpg
---

> [!danger]- Learnings
> - **Firmware Flashen:** Beim Flashen der Firmware auf die ESP32-C6 Module ist es wichtig, den Boot-Modus zu aktivieren
> - **Aircookie V5-C6 Branch:** 
> 	- Dieser Branch ermöglicht uns zwar WLED auf dem ESP32-C6 zu installieren, allerdings ist die Software noch nicht vollständig ausgereift (erstmalig config speichern geht, überschreiben jedoch nicht -> Abhilfe über wled-15.local/edit Weboberfläche, um config direkt zu bearbeiten)
> 	- Auch scheint in der aktuellsten Version ein Bug zu existieren, mit dem das zuweisen von 2 RMT Pins nicht möglich ist, was die Steuerung von 2 LED Stripes über einen ESP32-C6 unmöglich macht (nur 1 Stripe funktioniert, der zweite bleibt dunkel) (*Anmerkung:* Der ESP32-C6 besitzt im Vergleich zu älteren ESP32 Controllern auch nur genau 2 RMT Kanäle)
> 	- Workaround bis zu einer gefixten Version: Die Datenleitung splitten und zu beiden Stripes führen (Y-Topologie)

# Shelly Einrichtung
[Shelly 1 Gen 4 - Shelly Forum](https://shelly-forum.com/article/184-shelly-1-gen-4/)
> [!info]- Einfacher Taster
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/Pasted image 20260427162038.png]]

> [!info]- Reset Shelly Relais
> Wenn das Shelly an deine normalen Lichtschalter oder Taster (am SW-Eingang) angeschlossen ist, kannst du den Reset rein über den Schalter auslösen. Das ist perfekt für deine Lernumgebung, da du kein Gehäuse öffnen musst.
>1. Schalte die Sicherung bzw. die **Stromversorgung des Shellys komplett aus**.
>2. Warte ca. 5 Sekunden und schalte den **Strom wieder ein**.
>3. Du hast jetzt **exakt 1 Minute Zeit**: Betätige den angeschlossenen Schalter oder Taster **5-mal hintereinander** (An/Aus bzw. Drücken/Loslassen).
>4. **Das Ergebnis:** Du hörst nach ein paar Sekunden ein deutliches **Klackern des internen Relais** (meistens schaltet es 5-mal schnell hintereinander). Das ist das Zeichen, dass der Reset erfolgreich war.
## Shelly IDs

| Modul | Nummer | Name           | IP                            | ID           |
| ----- | ------ | -------------- | ----------------------------- | ------------ |
| 1     | 0      | Power Strip 10 | [10.0.0.10](http://10.0.0.10) | E8F60A644F98 |
| 1     | 1      | Switch 11      | [10.0.0.11](http://10.0.0.11) | 7C2C6766DA74 |
| 1     | 2      | Switch 12      | [10.0.0.12](http://10.0.0.12) | A085E3C494A4 |
| 1     | 3      | Switch 13      | [10.0.0.13](http://10.0.0.13) | A085E3C0FA28 |
| 1     | 4      | Switch 14      | [10.0.0.14](http://10.0.0.14) | 7C2C6766DD74 |
| 2     | 1      | Switch 21      | [10.0.0.21](http://10.0.0.21) | 7C2C677DB808 |
| 2     | 2      | Switch 22      | [10.0.0.22](http://10.0.0.22) | A085E3C47068 |
| 2     | 3      | Switch 23      | [10.0.0.23](http://10.0.0.23) | A085E3C47C38 |
| 2     | 4      | Switch 24      | [10.0.0.24](http://10.0.0.24) | A085E3C0C4CC |
| 3     | 1      | Switch 31      | [10.0.0.31](http://10.0.0.31) | 7C2C676E7874 |
| 3     | 2      | Switch 32      | [10.0.0.32](http://10.0.0.32) | 7C2C676E64E8 |
| 3     | 3      | Switch 33      | [10.0.0.33](http://10.0.0.33) | 7C2C677DE5BC |
| 3     | 4      | Switch 34      | [10.0.0.34](http://10.0.0.34) | 7C2C6766E190 |
| 4     | 1      | Switch 41      | [10.0.0.41](http://10.0.0.41) | 7C2C676690CC |
| 4     | 2      | Switch 42      | [10.0.0.42](http://10.0.0.42) | A085E3C48DEC |
| 4     | 3      | Switch 43      | [10.0.0.43](http://10.0.0.43) | A085E3C11238 |
| 4     | 4      | Switch 44      | [10.0.0.44](http://10.0.0.44) | A085E3C4A200 |
| 5     | 1      | Switch 51      | [10.0.0.51](http://10.0.0.51) | A085E3C0FA04 |
| 5     | 2      | Switch 52      | [10.0.0.52](http://10.0.0.52) | A085E3C12C50 |
| 5     | 3      | Switch 53      | [10.0.0.53](http://10.0.0.53) | 7C2C676812C4 |
| 5     | 4      | Switch 54      | [10.0.0.54](http://10.0.0.54) | A085E3C0E09C |


## Config Page

> [!example]- Config Page 1
> Overview im AP Modus, Adresse 192.168.33.1
> Im Menüpunkt "Matter" kann man in der Oberfläche die Matter ID mit der auf den Shelly aufgedruckten abgleichen, um zu wissen, mit welchem Gerät man verbunden ist
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config Page 1.png]]

> [!example]- Config Page 2
> Bluetooth Symbol -> Enable weghaken
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config Page 2.png]]

> [!example]- Config Page 3
> Wifi Setup
> **Static IP:**
> - 10.0.0.x   (x = 11 für 1. Shelly im Modul 1, 12 = 2. Shelly im Modul 1, ..., 54 = 4. Shelly im Modul 5)
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config 3.png]]

> [!example]- Config Page 4
> Change Name, Location and Time
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config 4.png]]

> [!example]- Config Page 5
> Nachdem das Einrichten im Wifi erfolgreich war, und der Shelly über die Statische IP erreichbar ist, kann der Access Point ausgeschalten werden, um nicht für jedes Modul offene APs sichtbar zu lassen
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config 5.png]]

## Rollläden Config

> [!example]- Rollläden Config
> Die Rollläden sollen bei Tasterdruck vollständig hochfahren, und bei erneutem Druck vollständig herunterfahren. Die einfachste Möglichkeit besteht hier darin, eine Zeitschaltung zu verwenden, um weitere Sensoren zu vermeiden. Die Rollläden können dank ihrer Bauart auch überschlagen, sollte ein Schüler oder eine Schüler:in die Steuerung falsch programmieren.
> 
> **Input/Output Settings:** Button (Momentary)
> **Automation -> Timers:** Auto OFF 22sec
> 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Rollläden Config 1.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Rollläden Config 2.png]]

___

# WLED Einrichtung

> [!info]- WLED Project
> [Welcome to WLED - WLED Project | https://kno.wled.ge/](https://kno.wled.ge/)
> - **Install Page:** [Install WLED | https://install.wled.me/](https://install.wled.me/) 

## ESP32 WLED IPs

| Modul | Nummer | Name    | IP                            |
| ----- | ------ | ------- | ----------------------------- |
| 1     | 5      | WLED 15 | [10.0.0.15](http://10.0.0.15) |
| 2     | 5      | WLED 25 | [10.0.0.25](http://10.0.0.25) |
| 3     | 5      | WLED 35 | [10.0.0.35](http://10.0.0.35) |
| 4     | 5      | WLED 45 | [10.0.0.45](http://10.0.0.45) |
| 5     | 5      | WLED 55 | [10.0.0.55](http://10.0.0.55) |


## Config Page

> [!example]- Offizielle WLED Installationsanleitung
> Mit USB (Com Port) an Computer anschließen, und nach "installieren" Knopf auswählen
> > ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Installer 1.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Installer 2.png]]

> [!danger]- Inoffizielle WLED Software (für ESP32-C6)
> - Selbst aktuelle Firmware kompilieren auf [WLED Online compiler](https://wled-compile.github.io/)
> - **Anmerkung zu "Stuck on Preparation":** [WLED won't install - stuck on "Preparing Installation" : r/WLED](https://www.reddit.com/r/WLED/comments/whb0i3/wled_wont_install_stuck_on_preparing_installation/)
> 	- Boot Button während des Ansteckens und Preparation gedrückt halten, bis Installation startet
> - Schritte 1a bis 4 können für unsere Zwecke übersprungen werden (zusätzliche Optionen und Fixes)
>
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +WLED Kompilieren.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +WLED Firmware 2.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +WLED Firmware 3.png]]

> [!example]- Config 1
> Nach erfolgreichem Flashen ist die WLED Firmware über den Access Point erreichbar
> **Password:** wled1234
> **Config-IP:** 4.3.2.1 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +AP Auswählen.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config Startup Page.png]]

> [!example]- Config 2
> Wifi / Network Settings
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config Wifi Network.png]]

> [!example]- Config 3
> Verschiedenste Einstellungen können nun in der Oberfläche unter der gesetzten IP getätigt werden
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config User Interface.png]]
>
> **Led Setup**
> - Maximum Output Current
> - LED Type
> - Stipe Length
> - Data GPIO
>
> In unserem Fall:
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/02 Modulverkabelung +Config LED Setup.png]]

> [!example]- WLED UI
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +WLED UI.png]]


## WLED API Proxy

### WLED Proxy Server – Dokumentation

#### Ziel des Projekts

Im Unterricht sollen mehrere ESP32-Stationen WLED-Controller ansteuern können, ohne direkt mit den WLED-Geräten kommunizieren zu müssen.

Dazu wird ein zentraler Proxy-Server eingesetzt, der:

- HTTP-Anfragen der ESP32 entgegennimmt
    
- die Ziel-IP-Adresse aus der URL ausliest
    
- den eigentlichen WLED-Befehl an den entsprechenden Controller weiterleitet
    
- den ESP32 sofort eine Antwort liefert, damit deren Netzwerk-Sockets nicht blockieren
    

---

### Architektur

```text
ESP32
  │
  │ HTTP Request
  ▼
WLED Proxy Server
(Node.js + Express)
  │
  │ Weiterleitung
  ▼
WLED Controller
```

Beispiel:

```text
ESP32
  │
  └──► http://10.0.0.1:3000/10.0.0.15/win&T=2
                     │
                     ▼
             Proxy extrahiert:
             IP = 10.0.0.15
             Befehl = win&T=2
                     │
                     ▼
             http://10.0.0.15/win&T=2
```

---

### Verzeichnisstruktur

```text
/var/www/wled-proxy/
│
├── server.js
├── package.json
└── node_modules/
```

---

### Installation

#### Projekt anlegen

```bash
mkdir -p /var/www/wled-proxy
cd /var/www/wled-proxy
```

#### Node.js prüfen

```bash
node -v
npm -v
```

#### Paket initialisieren

```bash
npm init -y
```

#### Express installieren

```bash
npm install express
```

---

### Der Proxy-Server

Datei:

```text
/var/www/wled-proxy/server.js
```

Der Server lauscht dauerhaft auf Port:

```text
3000
```

---

### Routing-Konzept

Die Route wird über einen regulären Ausdruck definiert:

```javascript
app.all(/^\/(\d{1,3}(?:\.\d{1,3}){3})\/(.+)$/, (req, res) => {
```

---

### Erklärung der RegEx

```regex
^\/(\d{1,3}(?:\.\d{1,3}){3})\/(.+)$
```

#### Bestandteile

##### Start der URL

```regex
^
```

Beginn des Pfades.

---

##### Erster Slash

```regex
\/
```

Trennt den Start der URL von der IP-Adresse.

---

##### IPv4-Adresse

```regex
(\d{1,3}(?:\.\d{1,3}){3})
```

Erfasst:

```text
10.0.0.15
192.168.1.10
172.16.1.200
```

Wird in:

```javascript
req.params[0]
```

gespeichert.

---

##### Zweiter Slash

```regex
\/
```

Trennt die IP-Adresse vom WLED-Befehl.

---

##### WLED-Befehl

```regex
(.+)
```

Erfasst alles hinter der IP-Adresse.

Beispiele:

```text
win&T=2
json/state
json/state/on
```

Wird in:

```javascript
req.params[1]
```

gespeichert.

---

##### Ende der URL

```regex
$
```

Ende des Pfades.

---

### Beispiele

#### Beispiel 1

Request:

```text
http://10.0.0.1:3000/10.0.0.15/win&T=2
```

Extraktion:

```text
IP-Adresse: 10.0.0.15
Befehl: win&T=2
```

Weiterleitung:

```text
http://10.0.0.15/win&T=2
```

---

#### Beispiel 2

Request:

```text
http://10.0.0.1:3000/10.0.0.15/json/state
```

Extraktion:

```text
IP-Adresse: 10.0.0.15
Befehl: json/state
```

Weiterleitung:

```text
http://10.0.0.15/json/state
```

---

### Sofortige Antwort an den ESP32

Der kritischste Teil:

```javascript
res.set('Connection', 'close');
res.status(200).send('OK');
```

---

#### Warum?

ESP32-Geräte besitzen nur begrenzte Netzwerkressourcen.

Würde der Proxy auf die Antwort des WLED-Controllers warten, könnte:

- der Socket blockieren
    
- der ESP32 in ein Timeout laufen
    
- die Anwendung instabil werden
    

Deshalb erhält der ESP32 unmittelbar:

```http
HTTP/1.1 200 OK
Connection: close
```

Der Socket wird sofort freigegeben.

---

### Asynchrone Weiterleitung

Nach der Antwort arbeitet der Proxy weiter:

```javascript
setImmediate(async () => {
    ...
});
```

Dadurch:

1. Antwort an ESP32
    
2. Socket schließen
    
3. Erst danach Kommunikation mit WLED
    

---

### Fehlerbehandlung

Jeder WLED-Aufruf wird geschützt:

```javascript
try {
   ...
}
catch(error) {
   ...
}
```

Beispiele:

- WLED ausgeschaltet
    
- Netzwerkfehler
    
- Timeout
    
- Falsche IP-Adresse
    

Der Proxy läuft trotzdem weiter.

---

### Logging

Für die Unterrichtsdiagnose werden alle Aktionen protokolliert.

Beispiel:

```text
[2026-06-18T12:15:23.000Z]
Request von 10.0.0.50
→ WLED 10.0.0.15
Befehl: win&T=2
```

Erfolgreiche Weiterleitung:

```text
WLED 10.0.0.15 antwortete mit Status 200
```

Fehler:

```text
Fehler bei WLED 10.0.0.15:
fetch failed
```

---

### systemd-Dienst

Datei:

```text
/etc/systemd/system/wled-proxy.service
```

Aufgaben:

- automatischer Start beim Booten
    
- automatischer Neustart nach Fehlern
    
- Integration in journalctl
    

---

### Dienst aktivieren

```bash
sudo systemctl daemon-reload
sudo systemctl enable wled-proxy
sudo systemctl start wled-proxy
```

---

### Dienststatus prüfen

```bash
systemctl status wled-proxy
```

---

### Logs anzeigen

Live-Monitoring:

```bash
journalctl -u wled-proxy -f
```

Historische Logs:

```bash
journalctl -u wled-proxy
```

### Port in Firewall freigeben

```bash
sudo ufw allow 3000
```

---

### Vorteile des Setups

#### Für den Unterricht

- nur ein zentraler Endpunkt
    
- einfache Fehlersuche
    
- zentrale Protokollierung
    
- keine direkte WLED-Kommunikation vom ESP32
    

#### Für die ESP32

- schnelle Antwortzeiten
    
- keine blockierten Sockets
    
- geringere Speicherbelastung
    
- höhere Stabilität
    

#### Für den Server

- automatische Wiederherstellung nach Fehlern
    
- zentrale Verwaltung über systemd
    
- wartungsfreundlich
    
- skalierbar auf weitere Stationen
    

---

### Zusammenfassung

Der WLED-Proxy dient als Vermittler zwischen ESP32-Stationen und mehreren WLED-Controllern.

Die Kernidee lautet:

1. Request vom ESP32 empfangen.
    
2. Sofort `200 OK` zurückgeben.
    
3. Socket schließen.
    
4. Ziel-IP und Befehl aus der URL extrahieren.
    
5. Befehl asynchron an den WLED-Controller senden.
    
6. Alle Aktionen protokollieren.
    

Dadurch entsteht ein robuster und unterrichtstauglicher Aufbau mit zentralem Monitoring und hoher Stabilität auch bei mehreren gleichzeitig arbeitenden Stationen.


```js
// /var/www/wled-proxy/server.js

  

const express = require('express');

  

const app = express();

const PORT = 3000;

  

// Optional: JSON-Body-Unterstützung

app.use(express.json());

  

// Beispielaufruf:

// http://10.0.0.1:3000/10.0.0.15/win&T=2

// http://10.0.0.1:3000/10.0.0.15/json/state

// http://10.0.0.1:3000/10.0.0.15/json/state/on

  

// Regex Erklärung:

// ^\/(\d{1,3}(?:\.\d{1,3}){3})\/(.+)$

// ^ - Start der URL

// \/ - Ein Slash

// (\d{1,3}(?:\.\d{1,3}){3}) - Eine IP-Adresse (z.B. 192.168.1.1)

// \/ - Ein weiterer Slash

// (.+) - Der Rest der URL (z.B. win&T=2 oder json/state)

// $ - Ende der URL

  

app.all(/^\/(\d{1,3}(?:\.\d{1,3}){3})\/(.+)$/, (req, res) => {

    const targetIp = req.params[0];

    const wledCommand = req.params[1];

  

    const timestamp = new Date().toISOString();

  

    console.log(

        `[${timestamp}] Request von ${req.ip} -> WLED ${targetIp} | Befehl: ${wledCommand}`

    );

  

    // Sofortige Antwort an den ESP32

    res.set('Connection', 'close');

    res.status(200).send('OK');

  

    // Danach asynchron weiterarbeiten

    setImmediate(async () => {

        try {

            const targetUrl = `http://${targetIp}/${wledCommand}`;

  

            console.log(

                `[${timestamp}] Weiterleitung an WLED: ${targetUrl}`

            );

  

            const controller = new AbortController();

            const timeout = setTimeout(() => {

                controller.abort();

            }, 5000);

  

            const response = await fetch(targetUrl, {

                method: 'GET',

                signal: controller.signal

            });

  

            clearTimeout(timeout);

  

            console.log(

                `[${timestamp}] WLED ${targetIp} antwortete mit Status ${response.status}`

            );

        } catch (error) {

            console.error(

                `[${timestamp}] Fehler bei WLED ${targetIp}:`,

                error.message

            );

        }

    });

});

  

// Fallback für ungültige URLs

app.use((req, res) => {

    console.log(

        `[${new Date().toISOString()}] Ungültiger Request: ${req.originalUrl}`

    );

  

    res.set('Connection', 'close');

    res.status(200).send('OK');

});

  

app.listen(PORT, '0.0.0.0', () => {

    console.log('======================================');

    console.log(`WLED Proxy gestartet`);

    console.log(`Port: ${PORT}`);

    console.log(`Zeit: ${new Date().toISOString()}`);

    console.log('======================================');

});

  

// Zusätzliche Sicherheit gegen Abstürze

process.on('unhandledRejection', (reason) => {

    console.error('Unhandled Rejection:', reason);

});

  

process.on('uncaughtException', (error) => {

    console.error('Uncaught Exception:', error);

});
```

# TP-Link Tapo C200

1. Android App zur Ersteinrichtung installieren
2. Schritten in der App folgen (Konto anlegen und aktivieren, Kamera Accesspoint auswählen, WIFI Setup, Kamera benennen)

**Schritte für HA Kompatibilität:**
3. Einstellungen -> Dienste von Drittanbietern -> Kompatibilität mit Drittanbietern einschalten
4. Kamera Konto einrichten: Einstellungen der Kamera öffnen -> Erweiterte Einstellungen -> Kamera Konto -> Benutzername und Passwort für die Kamera anlegen (z. B. `mmse` / `mmseshha1`)
5. Statische IP-Adresse: Einstellungen der Kamera öffnen -> Erweiterte Einstellungen -> Netzwerk-Einstellungen -> Statische IP-Adresse auswählen und einrichten

> [!info]- Screenshots
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Tapo Setup 1.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Tapo Setup 2.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Tapo Setup 3.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Tapo Setup 4.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Tapo Geräteinformationen.png]]

## Kamera IPs

| Modul | Nummer | Name   | IP                            |
| ----- | ------ | ------ | ----------------------------- |
| 1     | 6      | GLaDOS | [10.0.0.16](http://10.0.0.16) |

___
# Home Assistant Installation

Es wird die Installation mittels **Docker Compose** empfohlen, da diese Methode übersichtlicher ist und den automatischen Neustart nach Ausfällen und System-Reboots vereinfacht.

> [!info] Info zu Home Assistant Container
> Diese Installationsart ("Container") hat keinen Zugriff auf Add-ons (Apps). Wenn Add-ons benötigt werden, muss Home Assistant OS genutzt werden. Add-ons können als eigenständige Container installiert werden.
> 
> Die Entscheidung zur Docker Installation anstatt HAOS ermöglicht uns aber neben HomeAssistant auch andere Dienste und Container zu betreiben, die wir für dieses Projekt verwenden könnten.

### 1. Verzeichnis und Compose-Datei anlegen
Erstelle ein Verzeichnis für deine Konfiguration und wechsle dorthin:
```bash
mkdir -p ~/homeassistant/config
cd ~/homeassistant
```

Erstelle die Datei `compose.yaml` (z. B. mit dem Editor nano: `nano compose.yaml`) und füge folgenden Inhalt ein:
*Anmerkung:* Die Zeile `entrypoint` ist ein wichtiger Trick, um sicherzustellen, dass der Home Assistant Container erst dann vollständig startet, wenn das Netzwerk bereit ist. In diesem Fall warten wir auf die Erreichbarkeit der IP-Adresse

```shell
nano compose.yaml
```

```yaml
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:2026.4.2"
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
    environment:
      TZ: Europe/Vienna
    # WICHTIG: Hier erzwingen wir, dass der Container erst mit dem Starten von HA beginnt,
    # wenn unser Ping-Check erfolgreich war. Er läuft solange in einer Schleife, bis er bereit ist.
    entrypoint: >
      sh -c "
      echo 'Warte auf Netzwerk-Stack (10.0.0.1)...';
      until ping -c 1 -W 1 10.0.0.1 >/dev/null 2>&1; do sleep 2; done;
      echo 'Netzwerk bereit, starte Home Assistant...';
      /init
      "
```

> [!info] Erläuterung der Konfigurationsparameter
> - **`container_name`**: Definiert den Namen des Containers (`homeassistant`), was die spätere Verwaltung und Erkennung erleichtert.
> - **`image`**: Lädt das offizielle Docker-Image von Home Assistant. **Empfehlung:** Verwende eine feste Versionsnummer (z. B. `2026.4.2` oder die aktuellste Version) anstelle von `stable`. Dies (auch "Pinning" genannt) verhindert, dass bei einem versehentlichen Pull oder Neuaufbau unbemerkt Breaking Changes eingespielt werden. Updates machst du so bewusst und kontrolliert, indem du die Nummer hier änderst.
> - **`volumes`**: Verknüpft lokale Dateien/Verzeichnisse des Laptops mit den Verzeichnissen im Container.
>   - `./config:/config`: Speichert die komplette Konfiguration (Dashboards, Integrationen, Datenbank) dauerhaft lokal im Unterordner `config`. **Ohne diesen Eintrag wären alle Einstellungen nach jedem Container-Update unwiderruflich weg!**
>   - `/etc/localtime:/etc/localtime:ro`: Überträgt die Uhrzeit des Laptops direkt in den Container (`ro` = Read-Only, schreibgeschützt).
>   - `/run/dbus:/run/dbus:ro`: Reicht den System-Nachrichtenbus vom Laptop durch. Dies wird zwingend für die Kommunikation mit bestimmter Hardware, wie zum Beispiel für **Bluetooth-Integrationen**, benötigt.
> - **`restart: unless-stopped`**: Startet den Container vollautomatisch (z.B. nach einem Server-Neustart oder Absturz), sofern ihn der Benutzer vorher nicht ausdrücklich und absichtlich gestoppt hat.
> - **`privileged: true`**: Gibt dem Container erweiterte System- und Hardware-Rechte auf dem Server-Host, um problemlosen Zugriff auf verbundene Geräte (z.B. USB-Geräte) zu erhalten.
> - **`network_mode: host`**: Hebt die reguläre Netzwerk-Isolierung von Docker auf, sodass der Container direkt dasselbe Netzwerk wie der Laptop verwendet. Das ist **absolut notwendig**, damit Funktionen wie die automatische Erkennung lokaler Smart-Home-Geräte (z.B. per mDNS/Zeroconf, HomeKit) ordnungsgemäß funktionieren.
> - **`environment -> TZ`**: Legt die Zeitzone fest, damit Logs und Automatisierungen mit der richtigen Uhrzeit (`Europe/Vienna`) laufen.

### 2. Firewall Port freigeben (optional)
Falls die integrierte Firewall (`ufw`) aktiv ist, muss der Standard-Port für Home Assistant (`8123`) freigegeben werden, damit die Weboberfläche von anderen Geräten im Netzwerk erreichbar ist:

```bash
sudo ufw allow 8123/tcp
```

### 3. Container starten mit Docker Compose


**Was ist Docker Compose?**
Docker Compose ist ein offizielles Plugin für Docker, mit dem sich Container-Anwendungen (wie Home Assistant, oft auch im Zusammenspiel mit anderen Diensten) einfach über eine zentrale Konfigurationsdatei (`compose.yaml`) definieren, verwalten und ausführen lassen. Es erspart das Tippen extrem langer Kommandozeilenbefehle und dokumentiert gleichzeitig das Setup ("Infrastructure as Code").


Starte den Container im Hintergrund (Detached-Modus):
```bash
cd ~/homeassistant
docker compose up -d
```

Sobald der Home Assistant Container läuft, ist er über den Browser erreichbar (solange man im selben Netzwerk ist) unter:
`http://<IP_DEINES_LAPTOPS>:8123`
Dort kannst du dann mit dem "Onboarding" (der Ersteinrichtung) fortfahren.

### 4. Home Assistant Autostart bei Systemstart sicherstellen

Grundsätzlich ist hierfür **kein weiterer Schritt notwendig**. 

Durch zwei Konfigurationen, die wir bereits vorgenommen haben, startet Home Assistant vollautomatisch, sobald der Laptop/Server eingeschaltet wird:
1. **Docker Autostart:** Bei der Docker-Installation haben wir den Systemdienst mit `sudo systemctl enable --now docker` so konfiguriert, dass Docker beim Systemstart mit hochfährt.
2. **Container Restart Policy:** In unserer `compose.yaml` haben wir den Parameter `restart: unless-stopped` gesetzt. Das teilt Docker mit, dass dieser spezielle Container nach jedem Server-Neustart automatisch wieder gestartet werden soll – es sei denn, du beendest ihn vorher ausdrücklich per Befehl (`docker compose stop`).

### 5. Home Assistant Neu starten
Nach Konfigurationsänderungen muss Home Assistant neu gestartet werden. Das geht auf drei Arten:
1. In der Home Assistant Oberfläche: **Einstellungen** > **System** > Oben rechts auf das Drei-Punkte-Menü klicken und **Home Assistant neu starten** wählen.
2. Über **Einstellungen** > **Entwicklerwerkzeuge** > **Aktionen**: nach der Aktion `homeassistant.restart` suchen und ausführen.
3. Direkt über das Terminal auf dem Xubuntu-Rechner:
   ```bash
   docker restart homeassistant
   ```

___
# Home Assistant Ersteinrichtung

Bevor die Ersteinrichtung von Home Assistant in der Weboberfläche starten kann, müssen alle grundlegenden Vorbereitungen auf dem Server getroffen und abgeschlossen sein.

> [!check]- Voraussetzungen (aus 01 Server Setup)
> Folgende Schritte aus der vorherigen Anleitung müssen erfolgreich durchgeführt worden sein:
> - [x] **Betriebssystem-Installation:** Xubuntu 24.04 ist inklusive Netzwerk-Treibern installiert.
> - [x] **Energie-Optionen:** Laptop-Standby (z. B. beim Zuklappen) ist deaktiviert.
> - [x] **Fernzugriff:** SSH (und optional Remote Desktop/xrdp) sind eingerichtet.
> - [x] **Docker:** Docker Engine & Docker Compose sind installiert.
> - [x] **Home Assistant Container:** Der Container wurde mittels `compose.yaml` erfolgreich gestartet und die etwaige Firewall (`ufw`) blockiert den Port `8123` nicht.

## Das Onboarding (Die Ersteinrichtung)

> [!info]- Zugriff auf das Webinterface
> Sobald der Docker-Container zum ersten Mal hochgefahren ist, dauert es oft einige Sekunden, bis das System vollständig initialisiert ist. Anschließend kannst du von einem anderen Rechner im selben Netzwerk über den Webbrowser auf Home Assistant zugreifen:
> **`http://<IP_DEINES_SERVER_LAPTOPS>:8123`**
> 
> *(Hinweis: Ersetze `<IP_DEINES_SERVER_LAPTOPS>` durch die per `hostname -I` im vorherigen Schritt ermittelte IP-Adresse, herauszufinden wieder am Server mit `ip a`, oder über die TailScale Page, falls TailScale eingerichtet wurde)*
> 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Onboarding Page.png]]

Folgende Schritte müssen im Einrichtungsassistenten durchlaufen werden:

> [!example]- 1. Benutzerkonto erstellen
> Als Erstes wirst du aufgefordert, einen lokalen Administratoren-Benutzer anzulegen.
> - **Name:** Dein vollständiger Anzeigename.
> - **Benutzername:** Ein Login-Name (kann derselbe wie auf dem Linux-System sein, z. B. `mmse`).
> - **Passwort:** Wähle ein starkes Passwort, insbesondere wenn du später einen Zugriff von außen übers Internet planst.
> 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Benutzer anlegen.png]]

> [!example]- 2. Standort und Metriken
> Im nächsten Schritt geht es um deinen physischen Standort. 
> - **Zuhause deklarieren:** Dies ist essenziell für die Berechnung von Sonnenauf- und -untergangszeiten, lokalen Wetterdaten sowie ortsbasierten Automatisierungen (z. B. "Wenn ich mein Zuhause verlasse, schalte die Lichter aus"). 
> - **Zeitzone & Einheiten:** Home Assistant erkennt meist anhand deines Browsers automatisch das metrische System und die korrekte Zeitzone (`Europe/Vienna`).
> - **Höhe:** Auch die Höhe deines Standorts sollte automatisch basierend auf der Karte ermittelt werden.

> [!example]- 3. Datenschutz & Telemetrie
> Du kannst entscheiden, ob du anonymisierte Nutzungsdaten, Statistiken oder Fehlerberichte an das Open-Source-Entwicklerteam von Home Assistant (Nabu Casa) senden möchtest. Alle Haken können hier bedenkenlos weggelassen werden, wenn du auf maximale Privatsphäre Wert legst.

> [!example]- 4. Erste Geräte entdecken (Integrationen)
> Durch die Server-Einstellung `network_mode: host` ist Home Assistant nun auf einer Ebene mit deinem restlichen Heimnetzwerk und kann unkompliziert smarte Geräte finden (mDNS / UPnP).
> - Du wirst sehen, dass oft bereits Streaming-Sticks (Chromecast), Fernseher, Sonos-Lautsprecher, smarte Steckdosen oder Router (z. B. Fritz!Box) aufgeführt werden.
> - Du kannst diese mit einem Klick auf "Einrichten" auch jetzt schon hinzufügen. Alternativ reicht auch ein Klick auf **Fertigstellen**, um sie später einzeln manuell einzurichten.

> [!example]- Willkommen im Dashboard
> Nach dem Assistenten landest du in deiner neuen, leeren Benutzeroberfläche – dem sogenannten **Lovelace-Dashboard** (in Home Assistant nur "Übersicht" genannt). Damit bist du startklar, dein eigenes Smart Home aufzubauen!
> 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Willkommen Dashboard.png]]

> [!example]- Netzwerk überprüfen
> Da wir ein lokales Netzwerk für unsere Geräte aufgebaut haben, dass der Server mit DHCP verwaltet, müssen wir darauf achten dass auch der HA-Docker-Container in diesem lokalem Netzwerk läuft, und nicht fälschlicherweise versucht, das öffentliche Netzwerk des Servers mitzuverwenden.
> 
> 1. Sicherstellen dass die Schnittstelle stabil signalisiert wird `sudo nmcli connection up 'Wired connection 1'
> 2. HA Docker neu starten `docker compose down && docker compose up -d`
> 3. In HA Dashboard checken, welches Netzwerk erkannt wird (Einstellungen -> System -> Netzwerk)
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Netzwerkadapter ändern.png]]

## HACS - Home Assistant Community Store

> [!info]- Was ist HACS?
> HACS ist eine inoffizielle, aber sehr beliebte Erweiterung für Home Assistant, die den Zugriff auf tausende von benutzerdefinierten Integrationen, Plugins und Themes ermöglicht. Es ist ein Community-getriebenes Projekt, das es dir erlaubt, zusätzliche Funktionen zu installieren, die nicht im offiziellen Home Assistant Core enthalten sind.

> [!example]- HACS installieren
> [User documentation - HACS](https://www.hacs.xyz/docs/use/)
> 
> **Für Docker Variante:**
> - To set up HACS, you can use the [HACS download script](https://github.com/hacs/get).
>
>1. Open a terminal.
>2. Find the name of the container running Home Assistant with `docker ps` (e.g. `homeassistant`).
>3. Go inside the container with `docker exec -it <name of the container running homeassistant> bash`.
>4. Run the HACS download script.
>    `wget -O - https://get.hacs.xyz | bash -`
>5. Restart Home Assistant.
>6. Follow the steps on [setting up the HACS integration](https://www.hacs.xyz/docs/use/configuration/basic/).
>
> *Anmerkung:* Wie haben HACS nur installiert, um die Möglichkeit zu haben, benutzerdefinierte Themes zu installieren. Für die tatsächliche Verwendung ist die Geräteauthentifizierung über Github notwendig, wofür man für so ein Projekt natürlich nicht den privaten Github-Account verwenden möchte. Zu gegebener Zeit könnte man hier einen eigenen Github-Account anlegen.
>
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +docker ps.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA HACS Install.png]]

## Geräte und Integrationen hinzufügen

>[!info]- Shelly Integration hinzufügen
> Sobald die Shelly-Relais im Netzwerk erreichbar sind, werden diese von Home Assistant meist automatisch über mDNS (ZeroConf) erkannt. 
> 1. Gehe in der Seitenleiste auf **Einstellungen** -> **Geräte & Dienste**.
> 2. Im Reiter **Integrationen** sollten entdeckte Shellys bereits als Kacheln mit dem Hinweis "Entdeckt" auftauchen.
> 3. Klicke bei einem Gerät auf **Konfigurieren** und bestätige das Hinzufügen.
> 4. *(Optional)* Weise das Gerät direkt einem Raum zu (z. B. "Modul 1").
> 
> *Tipp: Falls ein Shelly nicht automatisch auftaucht, klicke unten rechts auf **Integration hinzufügen**, suche nach "Shelly" und gib die zuvor vergebene statische IP-Adresse (z. B. `10.0.0.11`) manuell ein.*

> [!info]- WLED Integration hinzufügen
> Ähnlich wie bei Shelly funktioniert die Entdeckung von WLED-Controllern in Home Assistant oft automatisch.
> 5. Navigiere zu **Einstellungen** -> **Geräte & Dienste**.
> 6. Klicke auf die entdeckten WLED-Kacheln und wähle **Konfigurieren**.
> 7. Home Assistant verbindet sich sofort und bietet dir die Steuerung der LEDs an.
> 
> *Tipp: Manuelles Hinzufügen funktioniert ebenso über **Integration hinzufügen** -> Suche nach "WLED" -> statische IP eintragen (z. B. `10.0.0.15`).*

> [!example]- Geräte im Dashboard (Lovelace) platzieren
> Sobald die Geräte hinzugefügt wurden, kannst du sie in deinem Dashboard einfach und übersichtlich visualisieren.
> 8. Gehe in der Seitenleiste auf **Übersicht**.
> 9. Klicke oben rechts auf das **Stift-Symbol** (Dashboard bearbeiten).
> 10. Füge passende Entitäten zu Favoriten hinzu

> [!danger]- Custom Dashboard
> HA bietet die Möglichkeit, mehrere Dashboards zu erstellen, um verschiedene Ansichten für verschiedene Zwecke oder Benutzer zu haben.
> Das ist cool, weil das Standard Dashboard keine Kacheln, wie man sie aus Smart Anwendungen kennt bietet, sondern eher eine Listenansicht.
> 
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Dashboard erstellen.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Dashboard erstellen 2.png]]
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Custom Dashboard Wohnzimmer.png]]
> 

```yaml
title: MMSE Ultimate Dashboard
path: mmse-home
icon: mdi:home-assistant
views:
  - title: Home
    path: main
    type: sections
    header:
      card:
        type: markdown
        content: '# Hallo {{ user }} '
        text_only: true
    sections:
      - type: grid
        cards:
          - type: heading
            heading_style: title
            heading: Wettervorhersage
          - type: weather-forecast
            entity: weather.forecast_home
            forecast_type: daily
      - cards:
          - square: false
            type: grid
            columns: 2
            cards:
              - type: tile
                entity: switch.switch_12_serverraum_licht_serverraum
                name: Serverraum
                color: amber
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
              - type: tile
                entity: switch.switch_24_licht_licht
                name: Wohnzimmer
                color: amber
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
              - type: tile
                entity: switch.switch_34_licht_licht
                name: Küche
                color: amber
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
              - type: tile
                entity: switch.switch_44_licht_licht
                name: Schlafzimmer
                color: amber
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
              - type: tile
                entity: switch.switch_54_licht_licht
                name: Badezimmer
                color: amber
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
              - type: tile
                entity: switch.switch_14_elektronik_licht_elektronik_licht
                name: Serverraum-Elektronik
                color: blue
                vertical: true
                tap_action:
                  action: perform-action
                  perform_action: button.press
                  target: {}
                features_position: bottom
            title: Licht
            grid_options:
              rows: auto
      - cards:
          - type: heading
            heading: GLaDOS Security
          - type: picture-entity
            entity: camera.glados_live_ansicht
            camera_view: live
            name: Serverraum Überwachung
          - type: grid
            columns: 4
            cards:
              - type: button
                icon: mdi:arrow-left
                tap_action:
                  action: call-service
                  service: button.press
                  target:
                    entity_id: button.glados_schwenk_nach_rechts
              - type: button
                icon: mdi:arrow-up
                tap_action:
                  action: call-service
                  service: button.press
                  target:
                    entity_id: button.glados_neigung_aufwarts
              - type: button
                icon: mdi:arrow-down
                tap_action:
                  action: call-service
                  service: button.press
                  target:
                    entity_id: button.glados_neigung_abwarts
              - type: button
                icon: mdi:arrow-right
                tap_action:
                  action: call-service
                  service: button.press
                  target:
                    entity_id: button.glados_schwenk_nach_links
      - cards:
          - type: heading
            heading: Bereiche
          - type: grid
            columns: 3
            square: true
            cards:
              - type: button
                name: Serverraum
                icon: mdi:server-network
                tap_action:
                  action: navigate
                  navigation_path: /dashboard-smarthome/serverraum
              - type: button
                name: Wohnzimmer
                icon: mdi:sofa
                tap_action:
                  action: navigate
                  navigation_path: /dashboard-smarthome/wohnzimmer
              - type: button
                name: Küche
                icon: mdi:silverware-fork-knife
                tap_action:
                  action: navigate
                  navigation_path: /dashboard-smarthome/kueche
              - type: button
                name: Schlafzimmer
                icon: mdi:bed
                tap_action:
                  action: navigate
                  navigation_path: /dashboard-smarthome/schlafzimmer
              - type: button
                name: Badezimmer
                icon: mdi:shower
                tap_action:
                  action: navigate
                  navigation_path: /dashboard-smarthome/badezimmer
  - title: Serverraum
    path: serverraum
    icon: mdi:server-network
    type: sections
    header:
      card:
        type: markdown
        text_only: true
        content: '# Serverraum'
    sections:
      - cards:
          - type: heading
            heading_style: title
            heading: Geräte
          - type: tile
            entity: switch.switch_12_serverraum_licht_serverraum
            name: Serverraum Licht
          - type: tile
            entity: switch.switch_14_elektronik_licht_elektronik_licht
            name: Elektronik Licht
          - type: tile
            entity: switch.switch_11_lautsprecher_lautsprecher
            name: Lautsprecher
          - type: entities
            entities:
              - entity: select.wled_15_licht_farbpalette
              - entity: number.wled_15_licht_intensitat
              - entity: select.wled_15_licht_voreinstellung
            title: WLED-15-Licht
            show_header_toggle: false
            state_color: false
      - cards:
          - type: heading
            heading: Powermanagement
            heading_style: title
          - type: entities
            entities:
              - entity: switch.power_strip_10_output_0
              - entity: sensor.power_strip_10_output_0_leistung
              - entity: switch.power_strip_10_output_1
              - entity: sensor.power_strip_10_output_1_leistung
              - entity: switch.power_strip_10_output_2
              - entity: sensor.power_strip_10_output_2_leistung
              - entity: switch.power_strip_10_output_3
              - entity: sensor.power_strip_10_output_3_leistung
            grid_options:
              columns: 12
              rows: auto
  - title: Wohnzimmer
    path: wohnzimmer
    icon: mdi:sofa
    type: sections
    header:
      card:
        type: markdown
        text_only: true
        content: '# Wohnzimmer'
    sections:
      - cards:
          - type: heading
            heading: Beleuchtung
            heading_style: title
          - type: tile
            entity: switch.switch_24_licht_licht
            name: Deckenlicht
          - type: entities
            entities:
              - entity: select.wled_25_licht_farbpalette
              - entity: number.wled_25_licht_intensitat
              - entity: select.wled_25_licht_voreinstellung
            title: WLED-25-Licht
            show_header_toggle: false
            state_color: false
      - cards:
          - type: heading
            heading: Rollläden
            heading_style: title
            icon: mdi:roller-shade
          - square: false
            type: grid
            columns: 2
            cards:
              - type: tile
                entity: switch.switch_21_rollladen_rauf
                name: Rauf
                icon: mdi:arrow-up-box
                color: blue
                vertical: false
                features_position: bottom
              - type: tile
                entity: switch.switch_22_rollladen_runter_rollladen_runter
                name: Runter
                icon: mdi:arrow-down-box
                color: blue
                vertical: false
                features_position: bottom
      - cards:
          - type: heading
            heading: Klima & Lüftung
            heading_style: title
          - type: tile
            entity: switch.switch_23_lufter_luftung
            name: Raumlüftung
            icon: mdi:fan
            color: cyan
            vertical: false
            features_position: bottom
  - title: Küche
    path: kueche
    icon: mdi:silverware-fork-knife
    type: sections
    header:
      card:
        type: markdown
        text_only: true
        content: '# Küche'
    sections:
      - cards:
          - type: heading
            heading: Beleuchtung
            heading_style: title
          - type: tile
            entity: switch.switch_34_licht_licht
            name: Deckenlicht
            vertical: false
            features_position: bottom
          - type: entities
            entities:
              - entity: select.wled_15_licht_farbpalette_2
              - entity: number.wled_15_licht_intensitat_2
              - entity: select.wled_15_licht_voreinstellung_2
            title: WLED-35-Licht
            show_header_toggle: false
            state_color: false
      - cards:
          - type: heading
            heading: Beschattung
            heading_style: title
          - square: false
            type: grid
            columns: 2
            cards:
              - type: tile
                entity: switch.switch_31_rollladen_rauf_rollladen_rauf
                name: Rauf
                icon: mdi:arrow-up-box
                color: blue
                vertical: false
                features_position: bottom
              - type: tile
                entity: switch.switch_32_rollladen_runter_rollladen_runter
                name: Runter
                icon: mdi:arrow-down-box
                color: blue
                vertical: false
                features_position: bottom
      - cards:
          - type: heading
            heading: Klima & Lüftung
            heading_style: title
          - type: tile
            entity: switch.switch_33_lufter_luftung
            name: Lüftung Küche
            icon: mdi:fan
            color: cyan
            vertical: false
            features_position: bottom
  - title: Schlafzimmer
    path: schlafzimmer
    icon: mdi:bed
    type: sections
    header:
      card:
        type: markdown
        text_only: true
        content: '# Schlafzimmer'
    sections:
      - cards:
          - type: heading
            heading: Beleuchtung
            heading_style: title
          - type: tile
            entity: switch.switch_44_licht_licht
            name: Deckenlicht
          - type: entities
            entities:
              - entity: select.wled_farbpalette
              - entity: number.wled_intensitat
              - entity: select.wled_voreinstellung
            title: WLED-45-Licht
            show_header_toggle: false
            state_color: false
      - cards:
          - type: heading
            heading: Beschattung
            heading_style: title
          - square: false
            type: grid
            columns: 2
            cards:
              - type: tile
                entity: switch.switch_41_rollladen_rauf_rollladen_rauf
                name: Rauf
                icon: mdi:arrow-up-box
                color: blue
                vertical: false
                features_position: bottom
              - type: tile
                entity: switch.switch_42_rollladen_runter_rollladen_runter
                name: Runter
                icon: mdi:arrow-down-box
                color: blue
                vertical: false
                features_position: bottom
      - cards:
          - type: heading
            heading: Klima & Lüftung
            heading_style: title
          - type: tile
            entity: switch.switch_43_lufter_luftung
            name: Lüftung Schlafzimmer
            icon: mdi:fan
            color: cyan
            vertical: false
            features_position: bottom
  - title: Badezimmer
    path: badezimmer
    icon: mdi:shower
    type: sections
    header:
      card:
        type: markdown
        text_only: true
        content: '# Badezimmer'
    sections:
      - cards:
          - type: heading
            heading: Beleuchtung
            heading_style: title
          - type: tile
            entity: switch.switch_54_licht_licht
            name: Deckenlicht
            vertical: false
            features_position: bottom
          - type: entities
            entities:
              - entity: select.wled_55_licht_farbpalette
              - entity: number.wled_55_licht_intensitat
              - entity: select.wled_55_licht_voreinstellung
            title: WLED-55-Licht
            show_header_toggle: false
            state_color: false
      - cards:
          - type: heading
            heading: Beschattung
            heading_style: title
          - square: false
            type: grid
            columns: 2
            cards:
              - type: tile
                entity: switch.switch_51_rollladen_rauf_rollladen_rauf
                name: Rauf
                icon: mdi:arrow-up-box
                color: blue
                vertical: false
                features_position: bottom
              - type: tile
                entity: switch.switch_52_rollladen_runter_rollladen_runter
                name: Runter
                icon: mdi:arrow-down-box
                color: blue
                vertical: false
                features_position: bottom
      - cards:
          - type: heading
            heading: Klima & Lüftung
            heading_style: title
          - type: tile
            entity: switch.switch_53_lufter_luftung
            name: Abluft Badezimmer
            icon: mdi:fan
            color: cyan
            vertical: false
            features_position: bottom
```

>[!example]- Screenshots
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Labels erstellen.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Bereiche erstellen.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Integration Base.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Shelly Integration hinzufügen.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Shelly Integration 2.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA WLED Integration.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Dashboard mit Favoriten und Bereichen.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +HA Custom Dashboard.png]]
