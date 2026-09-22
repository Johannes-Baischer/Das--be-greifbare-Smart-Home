---
tags:
  - "#Stundenplanung"
Unterrichtsfach: Digitale Grundbildung / Informatik
Schulstufe: 8. Schulstufe
Dauer: 2 EH
Priorität: Mittel
Kurzbeschreibung: Wie kommunizieren die verschiedenen Module und Sensoren miteinander? IP-Adressen, WLAN und das Internet of Things.
---

# Thema der Stunde(n)
>[!info]+ Beschreibung des Themas
> Ein Smarthome bringt nichts, wenn die Geräte nicht miteinander sprechen können. Die Schüler:innen lernen, wie Rechnernetzwerke aufgebaut sind, was IP-Adressen und Subnetze bedeuten und wie Geräte über das WLAN Daten austauschen.

# Aufgaben und Ziele
- [ ] Das Konzept hinter "Internet of Things" (IoT) erklären können.
- [ ] IP-Adressen und Netzwerk-Grundlagen verstehen (Wie findet der Server den Shelly?).
- [ ] Praktische Erfahrung mit der Administration eines kleinen Routers machen.

# Inhalte
___

## ⏱️ Stunde 1: Grundlagen der Kommunikation

>[!question] 🎯 Einstieg: Wenn Häuser reden könnten...
> **Diskussion:** Woher weiß das Licht im Wohnzimmer, dass in der Küche der Schalter gedrückt wurde? 
> *Klären des Begriffs "Internet of Things" (IoT): Dinge, die früher dumm waren, tauschen plötzlich Daten aus.* 

- 📬 **IP-Adressen: Die Hausnummern der Geräte**
	- **Post-Analogie:** Jedes Gerät (Shelly, ESP32, Server, Smartphone) braucht eine eindeutige Adresse. Ohne Adresse, keine Zustellung des Briefes (Datenpakets).
	- **Struktur:** Aufbau eines Subnetzes (z. B. `10.0.0.X`).
	- *Referenz aufs Projekt:* Die fixierte IP-Adressstruktur im Modulhaus (Vermeidung von IP-Kollisionen bei über 20 Aktoren!).

>[!example] 💻 Hands-on: Der Ping-Test
> Die Schüler:innen nutzen das Windows-Terminal / CMD auf ihren Schullaptops.
> **Befehl:** `ping 10.0.0.11` (IP eines Shellys aus dem Modellhaus).
> *Ziel:* Sie sehen live die Antwortzeiten (Latenz) und verstehen, dass dort ein physisches Gerät antwortet.

___

## ⏱️ Stunde 2: Das Zentrum des Heimnetzes

- 🚦 **Der Router als Verkehrspolizist**
	- Was macht ein Router wirklich? (Verkehr leiten, Netzwerk abschirmen).
	- **DHCP vs. Static IP:** Wann verteilen wir dynamische IPs, wann brauchen Geräte (wie unsere Shellys) eine unsterbliche, feste IP?

>[!tip] 🌍 Exkurs: Funkstandards im IoT
> - **WLAN:** Hohe Bandbreite, hoher Stromverbrauch (im Projekt genutzt).
> - **Zigbee / Thread:** Mesh-Netzwerke für Sensoren (z.B. Philips Hue).
> - **Bluetooth (LE):** Geringe Reichweite (für den Audio-Stream via ESP32).

>[!abstract] 🛠️ Admin-Sicht: IPs verwalten
> Gemeinsamer Blick auf den Router des Projekt-Netzwerks über Beamer.
> Wir analysieren die angemeldeten Shellys, vergleichen MAC-Adressen und prüfen, welche Geräte gerade die meiste Bandbreite nutzen.

___

# Materialien
- 💻 Laptops (CLI / Windows Terminal)
- 🖧 Zugang zum Projekt-Router (eingeschränkter View-Modus für SuS am Beamer)
- 🖼️ Tafelbild: Das Netzwerk im "Post-Verteiler-System"