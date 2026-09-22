---
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/ESP32 Spickzettel - Modul-Programmierung+Lueftung-und-Licht.png
thumbnail: thumbnails/resized/85b0b7f1c111bc0dba9b2aa4a0cfdad4_b89e22fb.jpg
---
Dieses Cheatsheet hilft dir dabei, deine Smart-Home-Module mit der Block-Programmierung auf [espide.eu](https://www.espide.eu/esp_ide_v2/index.html?lang=en) richtig anzusteuern!

<br>
# 🔌 Verbindung herstellen (So startest du)

1. Öffne die Programmier-Website: **[www.espide.eu/esp_ide_v2/](https://www.espide.eu/esp_ide_v2/index.html?lang=en)**
2. Schalte **Bluetooth** an deinem Computer/Tablet ein.
3. Klicke auf **das Bluetooth Symbol** und suche nach dem Namen **`esp-0X`** _(Das **X** steht für die Nummer, die direkt auf deinem ESP32-Chip klebt!)_.
4. Falls nicht schon ausgewählt, wähle den Programmiermodus **Bloky** oben aus.
5. Ziehe deine Blöcke zusammen und klicke auf den **grünen Play-Button (▶️)**, um das Programm auf das Modul zu laden.

<br>
# 🪟 Module 2-5: Rollläden, Lüftung & Licht

Verwende diese **GPIO-Nummern**, wenn du an den Modulen 2, 3, 4 oder 5 arbeitest:

| Bauteil / Funktion             | GPIO / Pin | Was macht es? (Kurzerklärung)              | Art     | Wert                                                               |
| ------------------------------ | ---------- | ------------------------------------------ | ------- | ------------------------------------------------------------------ |
| **☀️ Helligkeitssensor (LDR)** | `GPIO 0`   | Misst das Licht der Umgebung               | Eingang | Je heller, desto kleiner der Wert (von 0 bis 4096)                 |
| **🔵 Programmier-Taster 1**    | `GPIO 21`  | Frei programmierbarer Knopf 1.             | Eingang | Gedrückt = logisch `1`<br>Nicht gedrückt = `pull-down` einstellen. |
| **🟢 Programmier-Taster 2**    | `GPIO 22`  | Frei programmierbarer Knopf 2.             | Eingang | Gedrückt = logisch `1`<br>Nicht gedrückt = `pull-down` einstellen. |
| **🔼 Rollladen RAUF**          | `GPIO 11`  | Fährt das Rollo nach oben.                 | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |
| **🔽 Rollladen RUNTER**        | `GPIO 10`  | Fährt das Rollo nach unten.                | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |
| **🌪️ Lüftung**                | `GPIO 3`   | Schaltet den Ventilator / die Lüftung ein. | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |
| **💡 Licht**                   | `GPIO 2`   | Schaltet das Licht in diesem Modul an/aus. | Ausgang | Logisch `0` ➡️ **AN**<br>Logisch `1` ➡️ **AUS**                    |

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# 🧠 Geheimtipps (Hintergrund-Wissen)

Falls mal etwas nicht funktioniert oder du tiefer in die Elektronik schaust:
- Alle Eingange brauchen auch im nicht benutzen Zustand einen eindeutigen Wert
	- **pull-down** einstellen = nicht gedrückt bedeutet "0"
	- **pull-up** einstellen = nicht gedrückt bedeutet "1"

<br>
<br>
# 🤖 Beispielprogramm

**Lüftung und Licht gleichzeitig schalten:**
![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/ESP32 Spickzettel - Modul-Programmierung+Lueftung-und-Licht.png]]