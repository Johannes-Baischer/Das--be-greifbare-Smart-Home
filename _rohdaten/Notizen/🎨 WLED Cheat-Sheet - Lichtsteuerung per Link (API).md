Mit der **WLED-API** kannst du deine LED-Streifen ganz einfach steuern, indem du eine bestimmte Webadresse (URL) in den Browser eingibst. Das ist wie Geheimbefehle an das Haus schicken!

---

# 🌐 Das Setup

1. **Verbinde dein Programm mit dem Smart-Home-Wifi:**  
	 - **"Comms"** -> "connect to Wifi"
	 - *network name:* `MMSE-Smart-Home-Wifi`
	 - *password:* `***`

# 🧭 Das Grundprinzip (Wie sieht der Befehl aus?)

Jeder Befehl beginnt mit der **IP-Adresse** des Servers (`10.0.0.1`), gefolgt von der IP des WLED Controllers deines Moduls, gefolgt von `/win&`. Dahinter hängst du deine Wünsche an.

* **Die Basis-Adresse für Modul X:** `10.0.0.1:3000/10.0.0.X5/win&`
* **Beispiel für Modul 2:** Wenn du bei Modul 2 die Helligkeit auf das Maximum stellen willst, tippst du in die Browser-Zeile:
  `10.0.0.1:3000/10.0.0.25/win&A=255`

> [!TIP]
> Du kannst auch **mehrere Befehle verketten**, indem du sie mit einem **`&`** verbindest!
> *Beispiel:* `10.0.0.1/10.0.0.25/win&A=128&FX=0` (Setzt Helligkeit auf die Hälfte UND macht das Licht dauerhaft an).

---

# 📋 Die wichtigsten Befehle (Parameter)

Nutze diese Buchstaben und Nummern hinter dem `win&`, um das Licht zu verändern:

> Für alle Befehle brauchst du den Block: **"data from HTTP server [GET]"**

## 💡 Helligkeit & Strom
| Befehl | Wert-Bereich | Was passiert? |
| :--- | :---: | :--- |
| **`A=`** | `0` bis `255` | **Helligkeit:** `0` ist aus, `255` ist maximale Power. |
| **`T=`** | `0`, `1` oder `2` | **Schalter:** `0` = Aus, `1` = An, `2` = Umschalten (Toggle). |

## 🌈 Farben einstellen
| Befehl | Wert-Bereich | Was passiert? |
| :--- | :---: | :--- |
| **`R=`** | `0` bis `255` | Rot-Anteil der Hauptfarbe |
| **`G=`** | `0` bis `255` | Grün-Anteil der Hauptfarbe |
| **`B=`** | `0` bis `255` | Blau-Anteil der Hauptfarbe |
| **`W=`** | `0` bis `255` | Weiß-Anteil (falls der LED-Streifen extra Weiß hat) |

> [!NOTE]
> **Farbe per Hex-Code (für Profis):**
> Du kannst statt R, G und B auch direkt einen Hex-Code (wie aus Photoshop oder HTML) schicken. Setze ein großes **`H`** davor!
> *Beispiel für reines Grün:* `.../win&CL=H00FF00`

## 🎭 Effekte & Party-Modus
| Befehl | Wert-Bereich | Was passiert? |
| :--- | :---: | :--- |
| **`FX=`** | `0` bis `101` | **Effekt-Nummer:** `0` ist einfarbiges Dauerlicht. Probiere andere Zahlen für Effekte! |
| **`SX=`** | `0` bis `255` | **Geschwindigkeit** des Effekts (`0` = Zeitlupe, `255` = Turbo). |
| **`IX=`** | `0` bis `255` | **Intensität** (wie stark/wild der Effekt funkelt). |
| **`PL=`** | `1` bis `250` | Lädt ein fertig gespeichertes **Preset** (Licht-Szenario). |

---

# 🔄 Der "Zauber-Trick": Werte verändern (`~`)

Wenn du eine Zahl nicht fest einstellen, sondern das Licht z. B. **nur ein bisschen heller** machen willst, nutzt du die Tilde **`~`**.

* **`A=~10`** ➡️ Erhöht die aktuelle Helligkeit um 10 Stufen.
* **`A=~-10`** ➡️ Macht das Licht um 10 Stufen dunkler.
* **`PL=~`** ➡️ Springt automatisch zum **nächsten** gespeicherten Licht-Preset (perfekt für einen Party-Knopf!).

---

# 🛠️ Übungs-Challenges für den Unterricht

1. **Die gemütliche Stube:** Schalte das Licht deines Moduls ein (`T=1`), färbe es tiefblau (`B=255`, die anderen `0`) und regele die Helligkeit auf gemütliche `50`. Wie lautet der Link?
2. **Der Party-Blaster:** Starte den Effekt Nummer 42 (`FX=42`) mit maximaler Geschwindigkeit (`SX=255`).
3. **Der Dimmer-Knopf:** Baue einen Link, den man dreimal hintereinander anklicken kann, um das Licht jedes Mal um 20 Stufen dunkler zu machen.