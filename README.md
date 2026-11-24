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

## Laman

| Kabanata | Kaso | Pamagat | Lugar |
|---|---|---|---|
| 1 | #001 | Lihim sa Ilalim ng Tulay | Jones Bridge, Binondo |
| 1 | #002 | Ang Nawawalang Boundary | Lawton Terminal, Ermita |
| 1 | #003 | Huling Kanta sa Bituin KTV | Malate |
| 2 | #004 | Ang Gintong Anting-anting | Plaza Miranda, Quiapo |
| 2 | #005 | Apoy sa Bodega | Divisoria |
| 2 | #006 | Mga Pader ng Intramuros | Fort Santiago |

Bawat kaso ay dumadaan sa limang yugto:

1. **Komiks** — widescreen na mga panel na may dialogue at SFX (KRIIING!, KIDLAT!, BLAG!).
2. **Buod ng Kaso** — manila folder ng biktima + height-chart lineup ng apat na suspek.
3. **Hanapin ang Ebidensya** — split-panel na CCTV (bago) vs SOCO (pagkatapos), flip-clock timer, kape bilang enerhiya, "Suriin" na hint (−1 kape), −5s sa maling tap.
4. **Talaan at Oras** — listahan ng ebidensya na may (i) tags, at timeline na may window of death; suriin ang bawat alibi para lumabas ang mga bagong rekord.
5. **Interogasyon** — kausapin ang mga suspek, pumili ng *pahayag* at ebidensya, at pindutin ang **TUTOL!** para basagin ang kasinungalingan. Saka i-drag (o i-tap) ang dalawang ebidensya sa *Sandata/Paraan* at *Motibo/Patunay*, at **HULIHIN!**

Iba pang features: zoom/pinch/pan sa paghahanap ng ebidensya, tutorial ni PO2 Jessa, generative noir-jazz na musika, 11 medalya, settings (volume ng musika at SFX), at thermos ng kape sa tindahan.

Bawat eksena ay may nakatagong palatandaan ni Ang Anino. Ipunin ang tatlo bawat kabanata at sagutin ang tanong sa corkboard para sa finale ng kabanata.
Ang pera (₱) mula sa mga nalutas na kaso ay pambili ng desk items sa Tindahan ni Aling Sion.

## Istruktura

```
index.html        — entry point
css/style.css     — lahat ng style (1280x720 stage na naka-scale sa screen)
js/art.js         — lahat ng guhit (SVG na ginagawa sa code): characters, eksena, desk
js/art2.js        — mga eksena ng Kabanata 2
js/cases.js       — data ng Kabanata 1: mga kaso, suspek, pahayag, ebidensya, komiks
js/cases2.js      — data ng Kabanata 2, mga kabanata (CHAPTERS) at tindahan
js/audio.js       — sound effects (WebAudio, walang audio files)
js/game.js        — game engine at mga screen
assets/cover.jpg  — title art
```

### Pagdagdag ng bagong kaso

1. Gumawa ng scene function sa `js/art.js` na `(after, prefix) => svgString` sa 600x400. Ang pagkakaiba sa pagitan ng `after=false` at `after=true` ang mga clue.
2. Magdagdag ng case object (may `chapter`, suspects na may `statements`, clues na may `x,y,r`, records, timeline, solution, intro panels) at i-`push` sa `CASES`, gaya ng `js/cases2.js`.
3. Para sa bagong kabanata: magdagdag ng 3 entry sa `METAS` at isang entry sa `CHAPTERS` (tanong sa corkboard + finale komiks).

Ang progreso ay naka-save sa `localStorage` ng browser.
