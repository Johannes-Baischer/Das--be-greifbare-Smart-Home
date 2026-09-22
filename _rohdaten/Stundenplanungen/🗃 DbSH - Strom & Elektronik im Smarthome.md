---
tags:
  - "#Stundenplanung"
Unterrichtsfach: Digitale Grundbildung / Informatik
Schulstufe: 7. Schulstufe
Dauer: 3 EH
Priorität: Hoch
Kurzbeschreibung: Grundlagen der Elektrik anhand des Smarthome-Hausmodells (12V SELV vs. lebensgefährliche 230V, Grundbegriffe, Schaltelemente).
feature: Studium/Master Lehramt/2-tes Semester/Masterarbeit/Stundenplanungen/_attachments/Stundenplanung - Strom & Elektronik im Smarthome+5 Sicherheitsregeln.png
thumbnail: thumbnails/resized/5b5ff261dd8b92a297d0de0e477cdf5c_b89e22fb.jpg
---
# Thema der Stunde(n)
>[!info]+ Beschreibung des Themas
> Bevor programmiert wird, muss die Hardware verstanden werden. Diese Einheit widmet sich den absoluten Sicherheitsregeln der Elektronik und dem Unterschied zwischen 230V Netzspannung und 12V Schutzkleinspannung (SELV). Zudem werden die physikalischen Grundbegriffe (Spannung, Strom, Widerstand, Leistung) und elementare elektrotechnische Bauteile (Schalter vs. Taster, Relais) greifbar gemacht.

# Aufgaben und Ziele
- [ ] Absolute Sicherheitsregeln im Umgang mit Strom lernen (Die 5 Sicherheitsregeln & Lebensgefahr bei 230V).
- [ ] Vokabular beherrschen: Spannung (Volt), Stromstärke (Ampere), Widerstand (Ohm), Leistung (Watt).
- [ ] Den Unterschied zwischen Schalter und Taster in der Praxis (Smarthome-Trigger) verstehen.
- [ ] Das Konzept des Kurzschlusses und der galvanischen Trennung (Relais) begreifen.

# Inhalte
___

## ⏱️ Lebensgefahr, Sicherheitsregeln & Vokabeln

>[!danger] ⚡ Einstieg: Die 5 Sicherheitsregeln & Das SELV-Konzept
> **Warum arbeiten wir nicht mit dem echten Hausstrom?** 230V aus der Steckdose sind lebensgefährlich. Elektriker:innen müssen zwingend die **5 Sicherheitsregeln** beachten:
>
>![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Stundenplanungen/_attachments/Stundenplanung - Strom & Elektronik im Smarthome+5 Sicherheitsregeln.png]]
> 
> **Unsere Lösung - Das SELV-Konzept (Safety Extra-Low Voltage):** Im Modulhaus arbeiten wir mit nur 12V oder 5V Gleichspannung. Selbst bei einem Fehler ist das für Menschen absolut ungefährlich – die Haut blockiert diese geringe Spannung.

> [!todo]+ Erklärvideos
>[Stromstärke & Spannung Grundlagen - REMAKE](https://www.youtube.com/watch?v=irh9kFv68sA)
>[Ohm'sches Gesetz & Widerstände - REMAKE](https://www.youtube.com/watch?v=xklPZ1tzNTc)

- 💧 **Das Wasser-Modell: Wir lernen die Grundbegriffe**
	- **Spannung (U) in Volt (V):** Der Wasserdruck im Rohr. (Vergleich: 12V ist ein Gartenschlauch, 230V ist ein Feuerwehrschlauch).
	- **Stromstärke (I) in Ampere (A):** Die Menge an Wasser, die durch das Rohr fließt. (Strom = Bewegung von Elektronen).
	- **Widerstand (R) in Ohm ($\Omega$):** Eine Verengung im Rohr. Je enger das Rohr, desto weniger Wasser (Strom) fließt.
	- **Leistung (P) in Watt (W):** Wie viel Kraft das Wasser am Ende hat (Druck $\cdot$ Menge). $P = U \cdot I$.
	- *Berechnung:* Das Ohmsche Gesetz greifbar gemacht ($U = R \cdot I$).

>[!warning] 🔥 "Lessons Learned" aus dem Projekt
> **Was ist ein Kurzschluss?** Strom sucht sich immer den einfachsten Weg. Wenn Plus- und Minuspol ohne Widerstand (ohne Verbraucher) verbunden werden, fließt unendlich viel Strom. Bauteile überhitzen!

![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Stundenplanungen/_attachments/Stundenplanung - Strom & Elektronik im Smarthome+gefährliche Ströme.png]]
©️ MEBEDO

**Bei uns z.B.:**
- pro LED 12mA
- 129 LEDs in Serie = 1 548 mA

*Aber:* Wir arbeiten mit 12V SELV, also ungefährlich:
![[Studium/Master Lehramt/2-tes Semester/Masterarbeit/Stundenplanungen/_attachments/Stundenplanung - Strom & Elektronik im Smarthome+Körperwiderstand.png]]
©️ krafthand technikmagazin

$$I_{max} = \frac{U}{R} = \frac{12V}{450\Omega} = 26,67mA$$


___

## ⏱️ Schaltelemente, Komponenten & Messen live

- 🔘 **Der kleine aber feine Unterschied: Schalter vs. Taster**
	- **Schalter (Switch):** Bleibt in seiner Position (z.B. klassischer Lichtschalter). Er öffnet oder schließt den Stromkreis dauerhaft.
	- **Taster (Button):** Schließt den Stromkreis nur *solange man ihn drückt* (z.B. Tastatur, Türklingel). Eine Feder drückt ihn wieder zurück.
	- *Smarthome-Bezug:* Warum nutzen wir für den ESP32 Taster als "Trigger" (Auslöser) für unsere Software, statt Schalter?

- 🔌 **Der Stromlaufplan im Modulhaus**
	- Wir analysieren live am Objekt: Der Weg vom PC-Netzteil (Transformation 230V auf 12V) ➡️ zu den dicken WAGO-Klemmen ➡️ zum Step-Down-Converter (12V zu 5V) ➡️ in den ESP32 (Lernebene).

- 🔀 **Der Übersetzer: Das Relais**
	- Das Relais ist ein elektronisch gesteuerter *Schalter*.
	- Kernstück der "Galvanischen Trennung": Der 5V ESP32 steuert den Shelly, der 12V/230V schalten könnte. Wir klären, wie der kleine Elektromagnet einen massiven Schalter umlegt, ohne dass Strom zurückfließen kann.

___

# Materialien
- 🏠 Das teilzerlegte Modulhaus zur Betrachtung der "Innereien" (WAGO-Klemmen, Step-Down, Relais)
- 💥 Ansichtsexemplare: Durchgebrannte Bauteile ("Lessons Learned"-Tüte)