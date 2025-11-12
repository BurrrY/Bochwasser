# Bachwasser Rezeptrechner

Ein mobiler, responsiver Rezeptrechner für das beliebte Partygetränk Bachwasser aus der Pfalz.

## Über Bachwasser

Bachwasser ist ein erfrischendes Partygetränk, das Körner-Eistee mit Korn kombiniert. Perfekt für gesellige Sommerabende und Partys!

## Features

- **Intelligenter Rechner**: Alle Zutaten passen sich automatisch proportional an
- **Flexible Eingabe**: Ändere beliebige Werte - die anderen passen sich automatisch an
- **Mobile-First Design**: Optimiert für Smartphones und Tablets
- **Responsives Layout**: Funktioniert auf allen Bildschirmgrößen
- **Modernes Design**: Helles Grau mit roten Akzenten
- **Keine Dependencies**: Reines HTML, CSS und JavaScript - keine Frameworks nötig

## Grundrezept (100L Fass)

- 8 Dosen Körner-Eistee (à 0,5L = 4L)
- 12 Liter Korn
- 84 Liter Wasser

**Unsere Empfehlung:**
- Pfirsich-Eistee von Edeka
- Billigster Korn (mild, damit er den Tee nicht überdeckt)

## Installation

### Lokal (ohne Docker)

1. Repository klonen:
```bash
git clone https://github.com/BurrrY/Bochwasser.git
cd Bochwasser
```

2. `index.html` im Browser öffnen - fertig!

### Mit Docker

#### Docker Compose (empfohlen)

```bash
docker-compose up -d
```

Die Website ist dann erreichbar unter: `http://localhost:8080`

#### Docker direkt

```bash
# Image bauen
docker build -t bachwasser .

# Container starten
docker run -d -p 8080:80 --name bachwasser-rechner bachwasser
```

### Docker Befehle

```bash
# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f

# Nach Änderungen neu bauen
docker-compose up -d --build
```

## Verwendung

1. **Gesamtmenge ändern**: Alle Zutaten passen sich proportional an
2. **Eistee ändern**: Korn, Wasser und Gesamtmenge passen sich an
3. **Korn ändern**: Eistee, Wasser und Gesamtmenge passen sich an
4. **Wasser ändern**: Eistee, Korn und Gesamtmenge passen sich an

Die Verhältnisse aus dem Grundrezept bleiben immer erhalten:
- Eistee: 4%
- Korn: 12%
- Wasser: 84%

## Technologie

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Container**: Docker mit nginx:alpine
- **Server**: nginx
- **Lizenz**: MIT

## Zubereitungstipps

- Gut gekühlt servieren
- Milden Korn verwenden, der den Tee nicht überdeckt
- Optional mit Limettenscheibe oder frischer Minze garnieren
- Am besten mit Eiswürfeln genießen

## Projektstruktur

```
.
├── index.html          # Haupt-HTML-Datei
├── style.css           # Styling
├── script.js           # Berechnungslogik
├── Dockerfile          # Docker Image Definition
├── docker-compose.yml  # Docker Compose Konfiguration
├── .dockerignore       # Docker Ignore Regeln
├── LICENSE             # MIT Lizenz
└── README.md           # Diese Datei
```

## Beitragen

Contributions sind willkommen! Bitte erstelle ein Issue oder einen Pull Request.

1. Fork das Projekt
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz - siehe [LICENSE](LICENSE) für Details.

## Haftungsausschluss

Bitte genieße Bachwasser verantwortungsvoll. Dieser Rechner dient nur zu Informationszwecken.

---

**GitHub Repository**: [github.com/BurrrY/Bochwasser](https://github.com/BurrrY/Bochwasser)

Made by Claude Code.
