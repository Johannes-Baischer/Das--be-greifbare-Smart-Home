---
tags:
  - "#Stundenplanung"
Unterrichtsfach: Digitale Grundbildung / Informatik
Schulstufe: 8. Schulstufe
Dauer: 2 EH
Priorität: Hoch
Kurzbeschreibung: Datenschutz und Datensicherheit am Beispiel eines lokal gehosteten Smarthomes (Home Assistant) im Vergleich zu Cloud-Lösungen.
---

# Thema der Stunde(n)
>[!info]+ Beschreibung des Themas
> Wer weiß, wann ich das Licht einschalte? Smarthome-Geräte sammeln enorm viele Nutzerdaten. Diese Stunden behandeln die Gefahren von Cloud-basierten Smarthomes (Alexa, Google, Tuya) und stellen das "Local-only" Konzept (z.B. Home Assistant) als datensichere Alternative gegenüber.

# Aufgaben und Ziele
- [ ] Gefahren von Datenweitergabe im IoT-Bereich (Internet of Things) verstehen.
- [ ] Den Unterschied zwischen "Cloud" und "Local Network" begreifen.
- [ ] Sensibilisierung für Mikrofone, Kameras und Sensoren im privaten Wohnraum.

# Inhalte
___

## ⏱️ Stunde 1: Die Datenkrake im Wohnzimmer

>[!danger] 🎯 Einstieg & Provokation: Was weiß dein Haus über dich?
> **Szenario:** Ein Unternehmen kennt exakt die Zeiten, wann du das Licht einschaltest, wann du den Fernseher nutzt und wann die Heizung hochfährt.
> **Diskussion:** Welche Rückschlüsse auf den Lebensstil, den Schlafrhythmus oder Urlaubszeiten lassen sich ziehen? 

- ☁️ **Cloud vs. Lokal (Architektur)**
	- **Der herkömmliche Weg:** Smartphone -> Internet -> Server in den USA/China -> Zurück ins Wohnzimmer.
	- **Das Risiko:** Hacker-Angriffe, Server-Ausfälle ("Cloud gets unplugged" -> Elektroschrott) und unbemerkter Datenabfluss.

>[!example] 📹 Praxisbeispiel: IoT Kameras
> Wir betrachten die **TP-Link Tapo Kameras** aus dem Modulhaus. 
> *Problem:* Wenn diese frei ans Internet angebunden sind, könnte theoretisch jemand das eigene Wohn- (oder Schlaf-)zimmer live mitstreamen!

___

## ⏱️ Stunde 2: Die Lösung – Ein souveränes Netzwerk

>[!tip] 🛡️ Das "Local-only" Konzept
> Vorstellung des sicheren Gegenmodells anhand unseres Projektes: **Home Assistant**
> Der Server (Xubuntu-Rechner) steht direkt neben den Modulen. Wir kappen live vor der Klasse das WAN (Internet)-Kabel des Routers.
> *Ergebnis:* Das Smart Home funktioniert weiterhin lückenlos, schnell und absolut datensicher offline!

- ⚖️ **Rollenspiel: Bequemlichkeit vs. Privatsphäre**
	- **Gruppe A (Cloud-Fans):** Argumentieren für Amazon Alexa Sprachsteuerung, einfachen Aufbau und App-Zugriff von überall.
	- **Gruppe B (Local-Pioniere):** Argumentieren für absolute Sicherheit, keinen monatlichen Abo-Zwang und vollen Datenschutz.

>[!check] 🔒 Goldene Regeln für Heimnetzwerke
> 1. Starke, einzigartige Passwörter setzen.
> 2. **Gäste-WLAN** oder "IoT-VLANs" für unsichere China-Gadgets nutzen!
> 3. Regelmäßige Firmware-Updates installieren.

___

# Materialien
- 📉 Gegenüberstellung: Cloud-Architektur vs. Lokaler Server
- 🏠 Das Smarthome-Modell (Kapp-Test des Internets vorbereiten!)
- 🛒 Flyer aktueller Smarthome-Geräte (Alexa, Google Home, Philips Hue) zur Analyse