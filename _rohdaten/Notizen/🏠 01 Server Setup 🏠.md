---
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Pricing.png
thumbnail: thumbnails/resized/ef430b09cdf3ff1357728b6aed6d2cd9_b89e22fb.jpg
---

# Xubuntu Installation

1. Download xubuntu von [Xubuntu – Xubuntu 24.04](https://xubuntu.org/release/24.04/) (aktuellste Xubuntu basierend auf einer LTS Version von Ubuntu)
2. Download balenaEtcher von [balenaEtcher - Flash OS images to SD cards & USB drives](https://etcher.balena.io/)
3. Mit balenaEtcher das heruntergeladene xubuntu Image auf einen USB Stick flashen
4. USB Stick in Server Gerät stecken und durch Bios-Bootmenü von USB Stick starten
	1. Im Bios Boot Order USB Stick an erste Stelle setzen
	2. Neu starten
	3. "Try or install Xubuntu" Option auswählen
	4. Gerät started in Xubuntu Desktop mit Install Verknüpfung zum Ausführen
	5. Installationsprozess durchlaufen
	6. Benutzer "mmse" und sicherem Passwort bei Installation erstellen
	7. Maschine wird mit mmse-smarthome benannt

## Spezialfall für den verwendeten Toshiba Satalite Pro Laptop
- Verwendetes altes Gerät der Schule
	- Specs reichen völlig aus
	- Netzwerktreiber funktioniert nicht out of the box
		- Kernel unterstützt den zu alten Broadcom Chipsatz nicht mehr
		- Lösung: WIFI-USB-Stick verwenden (Edimax)

**Netzwerktreiber installieren:**
- Es handelt sich hier um propriätäre Realtek Treiber, die nicht in den Standard-Repositories von Ubuntu/Xubuntu enthalten sind. Daher müssen sie manuell installiert werden.
- **Problem:** Veralteter Broadcom Chipsatz, der nicht mehr vom Linux-Kernel unterstützt wird. Daher ist die Verwendung eines externen WIFI-USB-Sticks notwendig, um Netzwerkzugang zu ermöglichen.

*Anmerkungen:*
- Es gäbe auch die Option für einen Windows Dual Boot, wird aber als Server nicht benötigt, und schont so Speicherplatz und Ressourcen
- Die Installation dauert je nach Gerät und USB Stick Geschwindigkeit ca. 20-30 Minuten

# SSH einrichten

Um das System bequem von einem anderen Rechner (z.B. Windows) über die Kommandozeile steuern zu können, wird ein SSH-Server benötigt.

### 1. SSH-Server installieren
Öffne das Terminal (`Strg + Alt + T`) auf dem Xubuntu-Gerät und installiere den OpenSSH-Server:
```bash
sudo apt update
sudo apt install openssh-server -y
```

### 2. SSH-Dienst aktivieren
Stelle sicher, dass der Dienst läuft und bei jedem Systemstart automatisch gestartet wird:
```bash
sudo systemctl enable --now ssh
```
*(Den Status kannst du mit `sudo systemctl status ssh` überprüfen. Mit `q` beendest du die Ansicht.)*

### 3. Firewall für SSH freischalten (optional)
Falls die unkomplizierte Firewall (`ufw`) aktiv ist, muss der Port 22 (Standard für SSH) freigegeben werden:
```bash
sudo ufw allow ssh
```

### 4. Von Windows aus verbinden
Um dich von deinem Windows-Rechner zu verbinden, benötigst du die IP-Adresse des Xubuntu-Laptops (herauszufinden mit dem Befehl `hostname -I`).
Öffne auf Windows die PowerShell oder die Eingabeaufforderung (cmd) und verwende folgenden Befehl:
```powershell
ssh mmse@mmse-smarthome
```
Beim ersten Verbinden musst du den Fingerprint mit `yes` bestätigen und anschließend das Passwort des Benutzers eingeben.

## 5. SSH-Key hinterlegen (optional)
Um die Verbindung sicherer und bequemer zu machen, kannst du einen SSH-Key auf dem Windows-Rechner erstellen und auf dem Xubuntu-Laptop hinterlegen. Dadurch kannst du dich ohne Passwort anmelden.

### 5.1 SSH-Schlüsselpaar auf Windows erstellen
Öffne die PowerShell auf deinem Windows-Rechner und führe folgenden Befehl aus:
```powershell
ssh-keygen -t ed25519
```
Bestätige den Standard-Speicherort mit `Enter`. Optional kannst du ein Passwort (Passphrase) für den Key vergeben. Wenn du dich komplett ohne Eingabe anmelden möchtest, drücke einfach bei der Passphrase-Abfrage zweimal `Enter`.

### 5.2 Öffentlichen Schlüssel auf den Server übertragen
Der generierte öffentliche Schlüssel (`id_ed25519.pub`) muss nun auf den Xubuntu-Laptop kopiert werden. Führe dazu in der PowerShell folgenden Befehl aus (ersetze die IP-Adresse):
```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh mmse@mmse-smarthome "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
Hier wirst du voraussichtlich noch ein letztes Mal nach dem Passwort des Benutzers `mmse` gefragt.

### 5.3 Testen der passwortlosen Anmeldung
Verbinde dich nun erneut per SSH:
```powershell
ssh mmse@mmse-smarthome
```
Wenn alles geklappt hat, solltest du nun ohne Passwortabfrage direkt auf der Kommandozeile des Xubuntu-Laptops landen.



# Remote Desktop einrichten

Die Einrichtung von Remote Desktop (xrdp) ermöglicht es, den ressourcenschonenden XFCE-Desktop des Xubuntu-Laptops bequem von einem Windows-Rechner aus fernzusteuern, um auch Probleme mit der GUI lösen zu können, anstatt nur mit der Kommandozeile arbeiten zu müssen.

**Vorbereitung:**
- Einrichten einer Internetzverbindung zu verfügbarem Netzwerk (Über Netzwerk Taskleistenmenü einrichten)
- Öffne das Terminal auf deinem Xubuntu-Laptop mit `Strg + Alt + T`.

### 1. System auf den neuesten Stand bringen
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Den RDP-Server (xrdp) installieren
```bash
sudo apt install xrdp -y
```

### 3. xrdp für XFCE konfigurieren
Damit xrdp beim Verbinden die richtige grafische Oberfläche lädt:
```bash
echo xfce4-session > ~/.xsession
```

### 4. Zertifikats-Rechte vergeben und neu starten
Um Fehler durch fehlende Zertifikatsberechtigungen zu vermeiden:
```bash
sudo adduser xrdp ssl-cert
sudo systemctl restart xrdp
sudo systemctl enable xrdp
```

### 5. Die Firewall anpassen (optional)
Falls die Xubuntu-Firewall (`ufw`) aktiv ist, muss der RDP-Port freigegeben werden. Grundsätzlich macht es Sinn, die Firewall zu aktivieren und nur die benötigten Ports freizugeben.

**rdp:**
```bash
sudo ufw allow 3389/tcp
```

### 6. IP-Adresse herausfinden
Notiere dir die IP-Adresse (Befehl `ip a`), um dich später verbinden zu können, oder verwende den Hostnamen `mmse-smarthome` (funktioniert nur im selben Netzwerk, und wenn die Namensauflösung korrekt funktioniert). Die IP-Adresse findest du mit folgendem Befehl heraus:
```bash
hostname -I
```

> [!warning] WICHTIGER ZWISCHENSCHRITT: Lokal abmelden!
> Linux erlaubt es standardmäßig nicht, mit demselben Benutzer gleichzeitig lokal am Gerät und remote angemeldet zu sein. Bevor du fortfährst:
> **Zwingend am Xubuntu-Laptop abmelden!** (Startmenü -> Abmelden). Es darf nur der Anmeldebildschirm zu sehen sein, sonst droht ein schwarzer Bildschirm oder ein Verbindungsabbruch.

### 7. Von Windows aus verbinden
1. Drücke die Windows-Taste, suche nach **Remotedesktopverbindung** und starte das Programm.
2. Trage bei "Computer" die ermittelte IP-Adresse (aus Schritt 6) ein und klicke auf Verbinden.
3. Bestätige etwaige Zertifikatswarnungen mit **Ja** (Haken setzen bei "Nicht erneut nach Verbindungen mit diesem Computer fragen").
4. Gib deinen Xubuntu-Benutzernamen und dein Passwort ein und bestätige mit **OK**.

*Anmerkungen:*
- Es kann sein, dass beim ersten Verbinden das türkisfarbene Anmeldefenster von xrdp erscheint, in dem du die Desktop-Umgebung auswählen musst. Stelle sicher, dass hier **Xorg** ausgewählt ist, damit die Verbindung stabil funktioniert.

### 8. Power Optionen für Laptop anpassen
Damit der Laptop weder in den Energiesparmodus nach inaktiver Zeit noch bei geschlossenem Deckel wechselt (besonders wichtig, wenn **kein Benutzer lokal angemeldet** ist, da sonst die USB-Stromversorgung für den WLAN-Stick gekappt wird), müssen die systemweiten Energieeinstellungen angepasst werden.

**1. Aktion beim Schließen des Deckels (Lid Switch) deaktivieren:**
Öffne die Systemd-Login-Konfiguration im Terminal:
```bash
sudo nano /etc/systemd/logind.conf
```
Suche nach den folgenden Zeilen, entferne das `#` am Zeilenanfang und ändere den Wert auf `ignore`:
```ini
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
```
Speichere die Datei (in Nano: `Strg+O`, `Enter`, `Strg+X`) und starte den Logind-Dienst neu (Achtung, dies kann die aktuelle Session kurz unterbrechen):
```bash
sudo systemctl restart systemd-logind
```

**2. Systemweiten Standby und Ruhezustand komplett deaktivieren:**
Da der Laptop als Server dient, ist es am sichersten, jegliche Energiespar-Targets auf Systemebene zu blockieren:
```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```
Dadurch kann das Betriebssystem nicht mehr in den Schlafmodus versetzt werden, auch nicht vom Anmeldebildschirm aus. *(Rückgängig machbar mit `sudo systemctl unmask ...`)*


# Docker Installation

Die offizielle Anleitung setzt voraus, dass bereits eine Container-Laufzeitumgebung installiert ist. Es ist wichtig, dass **Docker Engine (Version 23.0.0 oder neuer)** verwendet wird. *Docker Desktop funktioniert in diesem Fall nicht!*

Um die Docker Engine und Docker Compose unter Xubuntu zu installieren, kannst du folgende Befehle im Terminal ausführen:
```bash
sudo apt update
sudo apt install docker.io docker-compose-v2 -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```
*(Nach dem usermod-Befehl am besten einmal vom System ab- und wieder anmelden, damit die Rechtevergabe greift.)*

# Router Setup
> Besonderer Fokus auf Trennung des Lokalen Netzwerks aber alternative Verbindung zum Internet über die Wifi-Anbindung des Server-Laptops (z. B. über einen USB-Wifi-Adapter).

> [!IMPORTANT]- **Kernkonzept des Setups** Dein **Xubuntu-Laptop** fungiert als Router/Gateway. Er nimmt das Internet vom WLAN auf und gibt es über das LAN-Kabel an das isolierte Netz des A1-Routers weiter. Der **A1-Router** dient dabei nur noch als Hardware-Verteiler (Switch und Access Point).

> [!SETTINGUP]- **Schritt 1: Den A1-Router vorbereiten** Bevor Hardware verbunden wird, muss der Router "neutralisiert" werden, damit er nicht mit dem Laptop um die Netzwerk-Hoheit kämpft.
> 
> - Verbinde dich mit dem Router-Webinterface (Standard: `10.0.0.138`).
>     
> - Deaktiviere den **DHCP-Server** (meist unter Heimnetzwerk / LAN). Dies ist **kritisch**, da sonst zwei Geräte versuchen, IPs zu verteilen.
>     
> - Lösche alle **statischen IP-Bindungen** oder Reservierungen.
>     
> - Lass die IP des Routers auf **10.0.0.138** stehen – so bleibt er in deinem neuen Subnetz erreichbar.
>     

> [!TERMINAL]- **Schritt 2: Internet-Sharing auf Xubuntu konfigurieren** Nun wird der Laptop zum DHCP-Server für dein Projekt-Netzwerk.
> 
> 1. Verbinde den Laptop per WLAN mit dem Internet (Handy-Hotspot oder Schulnetz).
>     
> 2. Ermittle den Namen deiner Ethernet-Verbindung: `nmcli connection show` (oft _'Wired connection 1'_).
>     
> 3. Führe diesen Befehl aus, um die Verbindung auf den Bereich des Routers zu zwingen: `sudo nmcli connection modify 'Wired connection 1' ipv4.addresses 10.0.0.1/24 ipv4.method shared`
>     
> 4. Starte die Verbindung neu, um die Änderungen zu übernehmen: `sudo nmcli connection down 'Wired connection 1' && sudo nmcli connection up 'Wired connection 1'`
>     
> 5. Prüfe mit `ip a`, ob das Interface `enp1s0` nun die IP **10.0.0.1** zeigt.
>     

> [!HINT]- **Schritt 3: Geräte-Integration**
> 
> - Schließe den Laptop an **LAN-Port 1** des Routers an.
>     
> - Verbinde deine Smart-Home-Geräte (Kameras, ESP32, etc.) per WLAN oder Kabel mit dem A1-Router.
>     
> - **Wichtig:** Starte alle Endgeräte einmal neu. Sie fragen nun beim Laptop nach einer IP und erhalten eine im Bereich **10.0.0.x**.
>     
> - Dein Home Assistant (Docker) ist nun über `10.0.0.1:8123` im lokalen Netz erreichbar.
>     

> [!WORLD]- **Schritt 4: Globaler Fernzugriff mit Tailscale** Damit du von überall auf die Oberfläche zugreifen kannst, ohne Ports im Schulnetz zu öffnen:
> 
> 1. **Installation auf dem Xubuntu-Laptop:** `curl -fsSL [https://tailscale.com/install.sh](https://tailscale.com/install.sh) | sh` `sudo tailscale up`
>     
> 2. **Authentifizierung:** Folge dem Link im Terminal und logge dich ein.
>     
> 3. **Client-Setup:** Installiere Tailscale auf deinem **Privat-Laptop/Handy**.
>     
> 4. **Verbindung:** Sobald beide Geräte im selben Tailscale-Account eingeloggt sind, nutzt du die **Tailscale-IP** des Xubuntu-Laptops, um Home Assistant aufzurufen: `(http://100.77.67.36:8123`
>

> [!CHECKLIST]- **Prüfung vor der Präsentation**
> 
> - [ ] Hat der Laptop Internetzugriff via WLAN?
>     
> - [ ] Zeigt `ip a` für die Kabelverbindung `10.0.0.1`?
>     
> - [ ] Ist der DHCP-Server am A1-Router wirklich **AUS**?
>     
> - [ ] Kannst du über die Tailscale-IP von deinem Handy (WLAN aus, Mobilfunk an) auf HA zugreifen?
>

## Tailscale

> [!important]- Pricing
> Je nach Anmeldung (über Organisations-Email oder Private) bekommt man einen anderen Plan zugewiesen. Die Organisation bekommt automatisch eine 14-Tage Testversion der "Enterprise" - Funktionen. Man kann aber jederzeit auf die "Personal"-Variante wechseln.
> 
![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Pricing.png]]

> [!example]- Screenshots
> ![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Download.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Connect 1.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Connect 2.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Dashboard.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale Windows GUI.png]]
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Notizen/_attachments/03 Software Setup +Tailscale mögliche Access Controls.png]]

> [!info]- Technische Funktionsweise und Datenschutzarchitektur von Tailscale
>
> Tailscale realisiert ein virtuelles Overlay-Netzwerk (Mesh-VPN), das auf dem zustandslosen **WireGuard®-Protokoll** basiert. Es ermöglicht eine direkte Peer-to-Peer-Kommunikation (P2P) zwischen Endpunkten, unabhängig von deren Netzwerktopologie oder wechselnden IP-Adressen.
> 
> ### 1. Systemarchitektur und Verbindungsaufbau
> * **Separation von Control Plane und Data Plane:** Tailscale trennt die Steuerungsebene strikt von der Datenebene. Ein zentraler Koordinationsserver fungiert ausschließlich als Verzeichnisdienst. Die Endpunkte (Nodes) authentifizieren sich dort und tauschen Routing-Informationen sowie öffentliche kryptografische Schlüssel aus. Der tatsächliche Datenverkehr fließt jedoch direkt zwischen den Endpunkten.
> * **NAT-Traversal (STUN/ICE):** Da Firewalls und Network Address Translation (NAT) in fremden Netzwerken eingehende Verbindungen blockieren, setzt Tailscale Mechanismen zur Lochbohrung (*STUN/ICE-Verfahren*) ein. Dadurch ermitteln die Geräte die für eine Direktverbindung notwendigen öffentlichen UDP-Ports.
> * **Verschlüsselter Relay-Mechanismus (DERP):** In hochgradig restriktiven Netzwerkumgebungen, die eine P2P-Verbindung technisch unterbinden, greift das System auf ein globales Netzwerk von Relay-Servern (*Designated Encrypted Relay for Packets*) zurück. Auch hier erfolgt die Weiterleitung rein auf Paketebene, ohne dass der Relay-Server den Inhalt einsehen kann.
>
> ---
>
> ### 2. Sicherheits- und Datenschutzbetrachtung (Privacy)
> * **Ende-zu-Ende-Verschlüsselung (E2EE):** Der Datenaustausch ist mittels des Noise-Protokoll-Frameworks kryptografisch abgesichert. Da die privaten Schlüssel die lokalen Endpunkte niemals verlassen, besitzt der Betreiber des Koordinationsservers keine Möglichkeit, den Payload-Datenstrom zu entschlüsseln oder zu inspizieren.
> * **Isolierung in fremden Netzwerken (Zero-Trust-Modell):** Befindet sich ein Endpunkt in einem potenziell unsicheren oder öffentlichen Netzwerk (z. B. einem unverschlüsselten WLAN), bleibt die Netzwerkschnittstelle für externe Akteure in diesem physischen Segment isoliert. Das System akzeptiert ausschließlich Pakete, die über das virtuelle Tailscale-Interface eintreffen und kryptografisch verifiziert sind.
> * **Split-Tunneling-Standard:** Die Routing-Tabelle wird so modifiziert, dass standardmäßig nur Datenverkehr, der explizit an den IP-Adressraum des internen Netzes ($100.64.0.0/10$) adressiert ist, über den VPN-Tunnel geleitet wird. Der reguläre WAN-Verkehr (z. B. allgemeine HTTP-Anfragen an das Internet) verbleibt auf dem lokalen Gateway, wodurch Latenzen minimiert und die Privatsphäre bei der allgemeinen Netznutzung gewahrt bleiben.
---
