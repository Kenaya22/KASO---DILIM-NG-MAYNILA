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
| 3 | #007 | Ang Huling Biyahe | Escolta Ferry Station, Ilog Pasig |
| 3 | #008 | Ang Imprenta ng Escolta | Escolta |
| 3 | #009 | Gala para sa Maynila | Grand Ballroom, Manila Grand Hotel |

Pagkatapos ng Kabanata 3: **Ang Huling Interogasyon** laban kay Ang Anino (gamit ang lahat ng 9 na palatandaan), ending, at credits.

Bawat kaso ay dumadaan sa limang yugto:

1. **Komiks** — widescreen na mga panel na may dialogue at SFX (KRIIING!, KIDLAT!, BLAG!).
2. **Buod ng Kaso** — manila folder ng biktima + height-chart lineup ng apat na suspek.
3. **Hanapin ang Ebidensya** — split-panel na CCTV (bago) vs SOCO (pagkatapos), flip-clock timer, kape bilang enerhiya, "Suriin" na hint (−1 kape), −5s sa maling tap.
4. **Talaan at Oras** — listahan ng ebidensya na may (i) tags, at timeline na may window of death; suriin ang bawat alibi para lumabas ang mga bagong rekord.
5. **Interogasyon** — kausapin ang mga suspek, pumili ng *pahayag* at ebidensya, at pindutin ang **TUTOL!** para basagin ang kasinungalingan. Saka i-drag (o i-tap) ang dalawang ebidensya sa *Sandata/Paraan* at *Motibo/Patunay*, at **HULIHIN!**

Iba pang features: zoom/pinch/pan sa paghahanap ng ebidensya, tutorial ni PO2 Jessa, generative noir-jazz na musika, 13 medalya, settings (volume ng musika at SFX), at thermos ng kape sa tindahan.

Bawat eksena ay may nakatagong palatandaan ni Ang Anino. Ipunin ang tatlo bawat kabanata at sagutin ang tanong sa corkboard para sa finale ng kabanata.
Ang pera (₱) mula sa mga nalutas na kaso ay pambili ng desk items sa Tindahan ni Aling Sion.

## Wika / Language

Filipino ang default. Pindutin ang **ENGLISH** sa kanang itaas ng title screen, o sa **Settings ⚙ → Wika**, para sa buong English na bersyon (kuwento, komiks, interface). Naka-save ang pinili sa browser.

Ang English na teksto ay nasa `js/lang-en1.js`, `js/lang-en2.js` at `js/lang-en3.js` — kapareho ng hugis ng data ng mga kaso, pero teksto lang. Ang mga salita ng interface ay nasa `js/game.js` bilang `L('Filipino', 'English')`.

## Save at Load

- **Auto-save:** awtomatikong naka-save ang progreso sa browser — pati ang kasong nasa gitna (yugto, nahanap na ebidensya, oras, kape). Pindutin ang **ITULOY** sa title o **▶ ITULOY #00X** sa opisina.
- **3 save slot:** SAVE (opisina) o SAVE / LOAD (title).
- **Ilipat sa ibang device:** gumawa ng **save code** (`KASO1-...`), kopyahin, at i-paste sa laro sa ibang phone/computer. Puwede rin bilang file (i-download / i-upload).

## Developer Mode

Settings ⚙ → **DEVELOPER MODE** → ilagay ang password. Lalabas ang **🛠 DEV** button sa ibabang kaliwa ng screen.

- Pumunta sa kahit anong kaso at yugto (Komiks, Buod, Eksena, Talaan, Interogasyon, Aresto, Resulta)
- Cheats: hindi umaandar ang oras, walang ubos na kape, ipakita ang mga sagot, bukas lahat ng kaso
- Sa kasalukuyang kaso: hanapin lahat ng ebidensya, suriin lahat ng alibi, basagin lahat ng kasinungalingan, ilagay ang tamang sagot
- Progreso: +₱1000, thermos, lutasin lahat, lahat ng medalya, tapusin/reset ang mga kabanata, reset tutorial
- Mga eksena: prologue, mga finale, Huling Interogasyon, ending, credits, corkboards

Paalala: pang-testing lang ang password na ito. Nasa code ng laro ang pagsuri nito, kaya hindi ito tunay na seguridad.

## I-install bilang App (offline)

Kapag naka-host sa HTTPS (hal. GitHub Pages), puwedeng i-install ang laro: sa Chrome ng Android, menu → **Add to Home screen / Install app**. Gagana ito kahit offline. Tuwing may bagong release, palitan ang `VERSION` sa `sw.js` para makuha ng mga player ang update.

## Mga Larawan (Illustrations)

Puwedeng palitan ang mga guhit na gawa sa code ng sarili mong mga larawan. Buksan ang **`docs/art-prompts.html`** sa browser: nandoon ang lahat ng prompt (237), ang eksaktong pangalan ng file, at isang style switch (Komiks/webtoon o Pixel art).

1. Gumawa ng larawan gamit ang prompt, at i-save sa `assets/art/` gamit ang eksaktong pangalan (hal. `assets/art/chars/kanor.png`).
2. Patakbuhin ang `python3 tools/art_manifest.py` (o `--pixel` para sa pixel art).
3. Para sa mga eksena: Developer Mode → kaso → EKSENA → **🎯 LAYOUT** → i-tap ang bawat clue sa tamang puwesto → EXPORT → i-save bilang `assets/art/layout.json`.

**Mas mabilis: gawin gamit ang Gemini.** Kumuha ng API key sa https://aistudio.google.com/apikey, saka:

```bash
export GEMINI_API_KEY=iyong-key
python3 tools/gemini_art.py --dry-run                     # tingnan muna kung ano ang gagawin
python3 tools/gemini_art.py --group chars --required-only  # lahat ng base na karakter
python3 tools/gemini_art.py                                # lahat ng kulang pa
```

Nilalaktawan nito ang mga larawang mayroon na, ginagamit ang base na larawan bilang reference ng mga ekspresyon at "after" na sprite, at ipinapadala ang `chars/mateo.png` bilang style reference para pare-pareho ang hitsura. May bayad ang Gemini API para sa larawan (tingnan ang presyo sa Google AI Studio).

Ang eksena ng isang kaso ay lalabas lang kapag kumpleto na ang background AT ang lahat ng clue sprite nito; habang kulang pa, ang dating guhit ang gagamitin para hindi masira ang laro.

Kung kulang pa ang isang larawan, ang dating guhit ang lalabas, kaya puwedeng gawin nang paisa-isang grupo. Para pare-pareho ang hitsura, tapusin ang isang buong grupo (hal. lahat ng karakter) bago i-commit.

Bakit hiwalay ang background at ang mga clue: hindi kayang gumawa ng AI ng dalawang larawang eksaktong pareho maliban sa ilang bagay. Kaya isang malinis na background ang ginagamit, at ang laro mismo ang naglalagay ng "before" at "after" na clue sprites sa ibabaw.

## Paglabas (Release)

**GitHub Pages (awtomatiko):** isang beses lang — sa GitHub, Settings → Pages → Source: **GitHub Actions**. Pagkatapos, bawat push sa `main` ay awtomatikong magde-deploy (`.github/workflows/pages.yml`). Puwede ring patakbuhin nang mano-mano sa tab na Actions.

**itch.io / single file:**

```bash
python3 tools/build.py
```

Gagawa ito sa `dist/`:
- `kaso-dilim-ng-maynila-web.zip` — i-upload sa itch.io bilang HTML5 game (Kind of project: HTML; i-check ang "This file will be played in the browser"; viewport 1280×720 o i-enable ang fullscreen button).
- `kaso-dilim-ng-maynila.html` — iisang file na buong laro; buksan lang sa browser.

## Istruktura

```
index.html        — entry point
css/style.css     — lahat ng style (1280x720 stage na naka-scale sa screen)
js/art.js         — lahat ng guhit (SVG na ginagawa sa code): characters, eksena, desk
js/art2.js        — mga eksena ng Kabanata 2
js/cases.js       — data ng Kabanata 1: mga kaso, suspek, pahayag, ebidensya, komiks
js/cases2.js      — data ng Kabanata 2, mga kabanata (CHAPTERS) at tindahan
js/art3.js        — mga eksena ng Kabanata 3 + dawn background
js/cases3.js      — data ng Kabanata 3, Huling Interogasyon (BOSS), ending at credits
js/lang.js        — pinipili ang wika (tl / en)
js/lang-en*.js    — English na teksto ng mga kaso at kuwento
tools/build.py    — gumagawa ng itch.io zip at single-file na bersyon
manifest.json     — PWA manifest (installable app)
sw.js             — service worker para sa offline play
js/audio.js       — sound effects (WebAudio, walang audio files)
js/game.js        — game engine at mga screen
assets/cover.jpg  — title art
```

### Pagdagdag ng bagong kaso

1. Gumawa ng scene function sa `js/art.js` na `(after, prefix) => svgString` sa 600x400. Ang pagkakaiba sa pagitan ng `after=false` at `after=true` ang mga clue.
2. Magdagdag ng case object (may `chapter`, suspects na may `statements`, clues na may `x,y,r`, records, timeline, solution, intro panels) at i-`push` sa `CASES`, gaya ng `js/cases2.js`.
3. Para sa bagong kabanata: magdagdag ng 3 entry sa `METAS` at isang entry sa `CHAPTERS` (tanong sa corkboard + finale komiks).

Ang progreso ay naka-save sa `localStorage` ng browser (`kaso-dilim-save-v1`); ang mga slot ay sa `kaso-dilim-slots-v1`.
