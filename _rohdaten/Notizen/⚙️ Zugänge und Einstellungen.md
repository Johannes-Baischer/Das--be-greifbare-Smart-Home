# 🧭 Lehrer:innen-Modul (Modul 1) & Infrastruktur-Spickzettel

Dieses Cheatsheet dient als zentrale Übersicht für das Hauptmodul (Modul 1) sowie für die gesamte Netzwerk- und Serverkonfiguration der Smart-Home-Lernumgebung.

---

# 🔌 Verbindung & Programmierung (ESP32)

1. Öffne die Programmier-Website: **[www.espide.eu/esp_ide_v2/](https://www.espide.eu/esp_ide_v2/)**
2. Schalte **Bluetooth** an deinem Computer/Tablet ein.
3. Klicke auf das Bluetooth-Symbol und suche nach **`esp-01`** *(bzw. die aufgedruckte Nummer des Lehrer-Moduls)*.
4. Wechsle ggf. den Modus von **Bloky** auf **Python**.
5. Ziehe die Blöcke zusammen und flashe das Modul mit dem **grünen Play-Button (▶️)**.

---

# 📋 Pin-Mapping Modul 1: Licht, Sound & Taster

Verwende diese GPIO-Nummern, um die direkt an Modul 1 angeschlossenen Komponenten im Blockly-Code anzusteuern:

| Bauteil / Funktion             | GPIO / Pin | Was macht es? (Kurzerklärung)                  |   Art   | Wert / Verhalten                                                   |
| :----------------------------- | :--------: | :--------------------------------------------- | :-----: | :----------------------------------------------------------------- |
| **☀️ Helligkeitssensor (LDR)** |  `GPIO 0`  | Misst das Licht der Umgebung.                  | Eingang | Je heller, desto kleiner der Wert (von 0 bis 4096)                 |
| **🔵 Programmier-Taster 1**    | `GPIO 21`  | Frei programmierbarer Knopf 1.                 | Eingang | Gedrückt = logisch `1`<br>Nicht gedrückt = `pull-down` einstellen. |
| **🟢 Programmier-Taster 2**    | `GPIO 22`  | Frei programmierbarer Knopf 2.                 | Eingang | Gedrückt = logisch `1`<br>Nicht gedrückt = `pull-down` einstellen. |
| **💡 Licht Raum**              | `GPIO 10`  | Schaltet das Hauptlicht im Modell-Raum.        | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |
| **💡 Licht Elektronik**        |  `GPIO 2`  | Schaltet die Elektronik-Beleuchtung.           | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |
| **📢 Lautsprecher (Sound)**    | `GPIO 11`  | Gibt Töne/Signale über den I2S-Verstärker aus. | Ausgang | Nutzt im Hintergrund `GPIO 1` (LCR), `6` (BCLK) und `7` (DIN).     |

---

<br>
# 🌐 Lokales Netzwerk & IP-Adressen (Wichtig!)

> [!IMPORTANT]
> **Einstieg ins lokale Netzwerk**
> Um auf die Weboberflächen der Module (Shelly, WLED, Home Assistant) zugreifen zu können, **musst** du mit deinem Endgerät im schulinternen Smart-Home-WLAN angemeldet sein. Ohne diese Verbindung sind die unten stehenden IP-Adressen nicht erreichbar!

### 📶 WLAN-Zugangsdaten
* **SSID (Name):** `MMSE-Smart-Home-Wifi`
* **Passwort:** `***`

### 🗺️ IP-Adressen-Verteilung im Netz
Die Steuerung der Aktoren in den Schüler-Modulen erfolgt im Netzwerk über feste IP-Adressen. Das **`X`** in der IP-Adresse steht dabei immer für die jeweilige **Modul-Nummer (2–5)**:

| Gerät / Oberfläche | IP-Adresse | Beschreibung / Funktion |
| :--- | :--- | :--- |
| **🎛️ Home Assistant** | `10.0.0.1:8123` | Zentrale Dashboard-Oberfläche zur Steuerung und Überwachung. |
| **🌐 Router (TP-Link Config)** | `10.0.0.138` | Router-Konfigurationsoberfläche zur Netzwerkverwaltung. |
| **💡 Zentraler Shelly LED-Strip** | `10.0.0.10` | **Hauptschalter:** Hiermit können alle Module gleichzeitig ein- oder ausgeschaltet werden. |
| **🔼 Shelly Relais: Rauf** | `10.0.0.X1` | Steuert den Rollladenantrieb (Aufwärtsbewegung) von Modul `X`. |
| **🔽 Shelly Relais: Runter** | `10.0.0.X2` | Steuert den Rollladenantrieb (Abwärtsbewegung) von Modul `X`. |
| **🌪️ Shelly Relais: Lüftung** | `10.0.0.X3` | Schaltet die Lüftung/den Ventilator von Modul `X` via Netzwerk. |
| **💡 Shelly Relais: Licht** | `10.0.0.X4` | Schaltet die Beleuchtung von Modul `X` via Netzwerk. |
| **🎨 WLED Oberfläche** | `10.0.0.X5` | Weboberfläche zur Konfiguration der adressierbaren LED-Effekte von Modul `X`. |

---

<br>
<br>
<br>
<br>
<br>
<br>
<br>

# 🔐 Zentrale Zugangsdaten & Logins

Hier sind alle administrativen Zugänge für die Server- und Netzwerk-Infrastruktur hinterlegt.

| System / Dienst | Benutzername | Passwort |
| :--- | :--- | :--- |
| **📶 Router (WIFI-Config)** | `admin` | `***` |
| **🌐 TP-Link Account** | `Johannes.Baischer@nmmse.at` | `***` |
| **📷 Kamerakonto** | `mmse` | `***` |
| **🐧 Ubuntu Server** | `mmse` | `***` |
| **🏡 Home Assistant** | `mmse` | `***` |

---

🧠 **Geheimtipps für Lehrkräfte:**
* Wenn alle Stricke reißen, kann über die IP `10.0.0.10` die Stromzufuhr der Peripherie hart zurückgesetzt werden.