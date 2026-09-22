---
tags:
  - "#Stundenplanung"
Unterrichtsfach: Digitale Grundbildung / Informatik
Schulstufe: 7. oder 8. Schulstufe
Dauer: 2 EH
Priorität: Hoch
Kurzbeschreibung: Einstieg in algorithmisches Denken anhand von realen Smarthome-Automatisierungen (WENN-DANN, Bedingungen, Timer).
---
# Thema der Stunde(n)
>[!info]+ Beschreibung des Themas
> Programmieren besteht hauptsächlich aus Logik: WENN (eine Bedingung erfüllt ist) DANN (führe eine Aktion aus). Anhand alltäglicher Smarthome-Szenarien werden algorithmische Strukturen greifbar gemacht.

# Aufgaben und Ziele
- [ ] Die IF-THEN (WENN-DANN) Logik im echten Leben anwenden können.
- [ ] Komplexe Bedingungen kennenlernen (UND / ODER Verknüpfungen).
- [ ] Erste eigene Automatisierungsregeln konzipieren und (grafisch) programmieren.
- [ ] Verständnis für Hardware-Sicherheit und "Edge-Cases" entwickeln (z. B. invertierte Logik bei Relais, Pull-down-Widerstände).

# Inhalte
___

## ⏱️ Die Logik des Alltags

>[!question] 🎯 Einstieg & Motivation: "Der dumme Roboter"
> **Methode:** Ein Rollenspiel im Klassenzimmer.
> Die Lehrperson agiert als strikter, „dummer Smarthome-Hub“. Die Schüler:innen geben Sprachbefehle (z. B. „Mach das Licht an!“). 
> **Der Haken:** Der Hub fragt: „Welches Licht? Wie hell? Wie lange?“. Das verdeutlicht, dass Computer keine Intuition haben, sondern explizite Logik brauchen.

- 🧠 **Die WENN - DANN Systematik erlernen**
	- **Trigger (Auslöser):** Was muss passieren? (Sensor meldet Bewegung, Taster wird gedrückt)
	- **Condition (Bedingung):** Unter welchen Umständen? (z.B. nur wenn es nach 18 Uhr ist)
	- **Action (Aktion):** Was ist die Folge? (Licht geht auf 50% an)
	- *Beitrag aus dem Smarthome-Projekt:* `WENN SchalterEdge, DANN Relais umschalten.`

>[!example] 🧩 Praxis-Übung: UND / ODER Logik
> Die Schüler:innen formuliern eigene Sätze auf Arbeitsblättern.
> - **UND-Logik:** `WENN [Fenster zu] UND [Heizung an], DANN [Temperatur halten]`
> - **ODER-Logik:** `WENN [Abwesend] ODER [Schlafmodus], DANN [Alle Lichter aus]`

___

## ⏱️ Wir automatisieren unser Modellhaus

>[!tip] 👥 Gruppenarbeit: Automatisierungen entwerfen (Papier/Whiteboard)
> Kleingruppen (3-4 SuS) bekommen fiktive "Räume" aus dem Modulhaus (Schlafzimmer, Küche).
> **Auftrag:** Designt sinnvolle und kreative Abläufe für euren Raum in einem Dokument.
> *Beispiel Küche:* `WENN Kaffeemaschine an, DANN Radio auf Ö3.`

___

## 🚀Vom lokalen Skript zur Netzwerk-Steuerung

**Fokus:** Festigung der lokalen Steuerung (Sensoren & Relais) und anschließender Wechsel zur drahtlosen Kommunikation über das Schul-WLAN mittels HTTP-Requests an die WLED-Streifen.

### 🛠️ Teil 1: Lokale Logik-Rätsel (Ohne WLAN)

In der ersten Phase festigen die Schüler:innen ihr Wissen über die lokale Hardware (Sensoren, Taster, Relais am ESP32). Alle Befehle bleiben im Modul selbst.

> [!todo] Auftrag 1: Die lokale Warnblinkanlage (Schleifen & Timer)
> **Szenario:** Wenn in einem Raum Gefahr droht (z.B. starker Rauch), reicht ein einfaches Licht oft nicht aus, um Aufmerksamkeit zu erregen. Es soll blinken!
> **Ziel:** Programmiert das Modul so, dass beim Drücken und Halten von Taster 1 (`Pin 21`) das Raumlicht (`Pin 2`) in einem Sekundentakt blinkt.
> **Logik-Hilfe:**
> * **WENN** `Pin 21` = `1`
> * **DANN** schalte `Pin 2` auf `0` (Licht AN)
> * Warte 1 Sekunde
> * Schalte `Pin 2` auf `1` (Licht AUS)
> * Warte 1 Sekunde

> [!todo] Auftrag 2: Die intelligente Sommer-Beschattung (Sensoren)
> **Szenario:** Im Sommer heizt sich das Zimmer extrem auf, wenn die Sonne direkt durchs Fenster scheint. Das System soll das rechtzeitig verhindern.
> **Ziel:** Nutzt den Helligkeitssensor (`Pin 0`). Sobald ein bestimmter Schwellenwert unterschritten wird (es ist sehr hell), soll das Rollo (`Pin 10`) für 5 Sekunden nach unten fahren und dann automatisch stoppen.
> **Logik-Hilfe:**
> * **WENN** `Pin 0` < `200` *(Wert an Raumbeleuchtung anpassen!)*
> * **DANN** schalte `Pin 10` (Rollo Runter) auf `0` (Motor AN)
> * Warte 5 Sekunden
> * Schalte `Pin 10` auf `1` (Motor AUS)

> [!todo] Auftrag 3: Die "Stromspar"-Lüftung (Bedingungs-Kombination)
> **Szenario:** Die Lüftung soll nur laufen, wenn jemand manuell den Knopf drückt UND es gleichzeitig hell im Raum ist (weil z.B. tagsüber gearbeitet wird).
> **Ziel:** Verknüpft einen Taster und den Helligkeitssensor mit einer UND-Bedingung. Nur wenn beides zutrifft, startet der Ventilator.
> **Logik-Hilfe:**
> * **WENN** `Pin 22` (Taster 2) = `1` **UND** `Pin 0` < `2000` (Es ist Tag)
> * **DANN** schalte `Pin 3` (Lüftung) auf `0`
> * **SONST** schalte `Pin 3` auf `1`

### 🌐 Teil 2: Das Modul funkt ins Netzwerk (Mit WLED)

*Einführung durch die Lehrperson: Bisher haben wir nur Stromkabel auf dem Modul geschalten. Jetzt wird unser ESP32 zum Sender! Wir nutzen den neuen Bloky-Block **"Sende HTTP-GET Request an URL"**, um unsichtbare Befehle über das WLAN an die bunte WLED-Beleuchtung zu schicken.*

> [!example] Auftrag 4: Der Rote Netzwerk-Alarm (Erster HTTP-Request)
> **Szenario:** Die lokale Warnleuchte aus Auftrag 1 war nicht auffällig genug. Jetzt soll das komplette Haus rot aufleuchten!
> **Ziel:** Wenn Taster 1 gedrückt wird, schickt der ESP32 einen Befehl an die WLED-Zentrale, um alle Lichter auf maximale Helligkeit und die Farbe Rot zu stellen.
> **Logik-Hilfe:**
> * **WENN** `Pin 21` = `1`
> * **DANN** Sende HTTP Request: `http://10.0.0.X5/win&A=255&R=255&G=0&B=0&FX=0`
> *(Hinweis für SuS: Das "X" durch eure Modulnummer ersetzen!)*

> [!example] Auftrag 5: Das automatische Netzwerk-Nachtlicht
> **Szenario:** Wird es im echten Raum dunkel, soll die WLED-Beleuchtung automatisch in einen gedimmten, gemütlichen "Nacht-Modus" wechseln.
> **Ziel:** Nutzt den Lichtsensor, um bei Dunkelheit einen voreingestellten WLED-Effekt (Preset 2) zu starten. Wird es wieder hell, schaltet sich das WLED-Licht aus.
> **Logik-Hilfe:**
> * **WENN** `Pin 0` > `3500` (Es ist dunkel)
> * **DANN** Sende HTTP Request: `http://10.0.0.X5/win&PL=2` (Lädt Preset 2)
> * **SONST** Sende HTTP Request: `http://10.0.0.X5/win&T=0` (Schaltet WLED aus)

> [!example] Auftrag 6: Der Party-Knopf (Fortgeschrittene API-Nutzung)
> **Szenario:** Ihr veranstaltet eine Feier. Niemand will am Computer sitzen, um die Lichter zu steuern. Ein einfacher Knopfdruck an der Wand soll den nächsten coolen Lichteffekt starten.
> **Ziel:** Programmiert Taster 2 so, dass bei jedem Druck der nächste Effekt in der WLED-Liste geladen wird. Nutzt dafür den "Zaubertrick" (`~`) aus eurem API-Cheatsheet.
> **Logik-Hilfe:**
> * **WENN** `Pin 22` = `1`
> * **DANN** Sende HTTP Request: `http://10.0.0.X5/win&FX=~` (Springt einen Effekt weiter)
> * **WARTE** 1 Sekunde *(Wichtig: Ohne Wartezeit würde der ESP32 den Befehl in einer Sekunde 100 Mal senden, während ihr den Knopf drückt!)*

___

# Materialien
- 🏠 Das laufende **Smarthome Modulhaus** inkl. Home Assistant Dashboard am Beamer
- 💻 Laptop mit ESP-IDE im Browser