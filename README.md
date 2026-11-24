# Kaso: Dilim ng Maynila

Isang Filipino webtoon-style detective at spot-the-clue na laro para sa **landscape 16:9**.
Si Inspector Mateo Reyes ay lumulutas ng mga krimen sa Maynila habang hinahabol si **Ang Anino**, ang salaring pumatay sa kaniyang ama.

## Paano laruin

Walang kailangang i-install. Buksan ang `index.html` sa browser, o mag-serve ng folder:

```bash
python3 -m http.server 8000
# buksan ang http://localhost:8000
```

Sa telepono: i-rotate sa landscape at pindutin ang ⛶ para sa fullscreen.

## Laman (Kabanata 1)

| Kaso | Pamagat | Lugar |
|---|---|---|
| #001 | Lihim sa Ilalim ng Tulay | Jones Bridge, Binondo |
| #002 | Ang Nawawalang Boundary | Lawton Terminal, Ermita |
| #003 | Huling Kanta sa Bituin KTV | Malate |

Bawat kaso ay dumadaan sa limang yugto:

1. **Komiks** — widescreen na mga panel na may dialogue at SFX (KRIIING!, KIDLAT!, BLAG!).
2. **Buod ng Kaso** — manila folder ng biktima + height-chart lineup ng apat na suspek.
3. **Hanapin ang Ebidensya** — split-panel na CCTV (bago) vs SOCO (pagkatapos), flip-clock timer, kape bilang enerhiya, "Suriin" na hint (−1 kape), −5s sa maling tap.
4. **Talaan at Oras** — listahan ng ebidensya na may (i) tags, at timeline na may window of death; suriin ang bawat alibi para lumabas ang mga bagong rekord.
5. **Interogasyon** — piliin ang salarin, i-drag (o i-tap) ang dalawang ebidensya sa *Sandata/Paraan* at *Motibo/Patunay*, saka **HULIHIN!**

Bawat eksena ay may nakatagong palatandaan ni Ang Anino. Ipunin ang tatlo sa corkboard para sa finale ng Kabanata 1.
Ang pera (₱) mula sa mga nalutas na kaso ay pambili ng desk items sa Tindahan ni Aling Sion.

## Istruktura

```
index.html        — entry point
css/style.css     — lahat ng style (1280x720 stage na naka-scale sa screen)
js/art.js         — lahat ng guhit (SVG na ginagawa sa code): characters, eksena, desk
js/cases.js       — data ng mga kaso, suspek, ebidensya, komiks
js/audio.js       — sound effects (WebAudio, walang audio files)
js/game.js        — game engine at mga screen
assets/cover.jpg  — title art
```

### Pagdagdag ng bagong kaso

1. Gumawa ng scene function sa `js/art.js` na `(after, prefix) => svgString` sa 600x400. Ang pagkakaiba sa pagitan ng `after=false` at `after=true` ang mga clue.
2. Magdagdag ng case object sa `js/cases.js` (suspects, clues na may `x,y,r`, records, timeline, solution, intro panels) at isama sa `CASES`.

Ang progreso ay naka-save sa `localStorage` ng browser.
