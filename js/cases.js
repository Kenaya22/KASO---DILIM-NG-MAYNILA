/* =========================================================
   KASO: DILIM NG MAYNILA — MGA KASO (data)
   ========================================================= */
(function () {
  'use strict';
  const A = window.ART;

  const CHARS = {
    mateo: { skin: '#c48a5f', hair: 'messy', hairColor: '#17110d', outfit: 'barong', stubble: true, jaw: 'square' },
    jessa: { skin: '#d6a179', hair: 'pony', hairColor: '#20150f', outfit: 'soco', glasses: true },
    tatay: { skin: '#b07a52', hair: 'short', hairColor: '#4a4040', outfit: 'police', color: '#2a3550', hat: 'police', mustache: true, mustacheColor: '#3a3333', wrinkles: true, jaw: 'square' },
    anino: { silhouette: true },
    carmen: { skin: '#e2b994', hair: 'bun', hairColor: '#5a4a46', outfit: 'blouse', color: '#5a2a6a', earrings: true, lipstick: true, wrinkles: true },
    turing: { skin: '#9a6440', hair: 'bald', hairColor: '#555', outfit: 'tshirt', color: '#c9b37a', mustache: true, wrinkles: true },
    gloria: { skin: '#ecc8a4', hair: 'long', hairColor: '#6a2a1a', outfit: 'sequin', color: '#1a1a2a', earrings: true, lipstick: true },
    // case 1
    kanor: { skin: '#a9734d', hair: 'short', hairColor: '#2a211c', outfit: 'guard', color: '#23395d', hat: 'guardcap', mustache: true, torn: true, heavy: true, jaw: 'square', pants: '#1c2a44' },
    lorna: { skin: '#c98e64', hair: 'bun', hairColor: '#3a2a22', outfit: 'apron', color: '#c4473a', earrings: true },
    marco: { skin: '#e0b48c', hair: 'slick', hairColor: '#1c1410', outfit: 'polo', color: '#4d6fa8', glasses: true, pants: '#d8cdb4' },
    ben: { skin: '#8f5c3a', hair: 'short', hairColor: '#17110d', outfit: 'jacket', color: '#5b5a3a', color2: '#e8e1d0', hat: 'cap', hatColor: '#a5342b', stubble: true },
    // case 2
    totoy: { skin: '#a46a43', hair: 'buzz', hairColor: '#17110d', outfit: 'vest', color: '#e2702a', color2: '#2e3440' },
    pido: { skin: '#93603e', hair: 'short', hairColor: '#3a3330', outfit: 'sando', color: '#efefe8', towel: true, mustache: true, wrinkles: true, jaw: 'square', pants: '#3b4a5e' },
    nena: { skin: '#b97f56', hair: 'long', hairColor: '#2b1f1a', outfit: 'blouse', color: '#5d8a6a', hat: 'bandana', hatColor: '#d9a43a', earrings: true },
    dado: { skin: '#d6a47c', hair: 'slick', hairColor: '#17110d', outfit: 'polo', color: '#7a2238', chain: true, shades: true, heavy: true },
    // case 3
    lyka: { skin: '#dcae86', hair: 'long', hairColor: '#5a2d1c', outfit: 'sequin', color: '#b8336a', lipstick: true, earrings: true, mole: true },
    junjun: { skin: '#b07b52', hair: 'short', hairColor: '#17110d', outfit: 'waiter', pants: '#1d1c22' },
    sy: { skin: '#e8c3a0', hair: 'slick', hairColor: '#222', glasses: true, outfit: 'suit', color: '#3a3f4a', color2: '#7a1d2a', cuff: true, pants: '#3a3f4a' },
    bong: { skin: '#a8714b', hair: 'curly', hairColor: '#1e1714', stubble: true, outfit: 'jacket', color: '#2f2f35', color2: '#b8b0a0' }
  };

  /* ---------------- CASE 1 ---------------- */
  const c1 = {
    id: 'c1', num: '001', title: 'Lihim sa Ilalim ng Tulay', en: 'Secret Under the Bridge',
    place: 'Jones Bridge, Binondo', time: 120, scene: A.sceneTulay,
    beforeLabel: 'CCTV CAM-03 · 18:50', afterLabel: 'SOCO · 19:40',
    victim: { name: 'Donya Carmen Villareal', look: 'carmen', desc: 'Mayamang may-ari ng Sanglaang Villareal sa Quiapo', cause: 'Malakas na hampas sa ulo (paunang tantiya)', found: 'Sa loob ng nakaparadang sedan malapit sa Jones Bridge', foundBy: 'Kuya Ben (driver), 7:20 PM', windowText: '7:00 PM – 7:15 PM', weather: 'Malakas na ulan' },
    win: ['19:00', '19:15'],
    snap: [300, 280, 300],
    suspects: [
      { id: 'kanor', name: 'Mang Kanor', role: 'Night Security Guard', h: 178,
        alibi: 'Nagpapatrolya raw siya sa likod na eskinita, malayo sa tulay, bandang 7:00 PM.',
        note: 'Nakasuot ng size 10 na bota. Bagong punit ang manggas ng uniporme.',
        greet: 'Ako? Nagroronda lang ako sa eskinita, Inspector. Trabaho lang.',
        weak: 'Ha! \'Yan lang? Hindi sapat \'yan para ikulong ako, Inspector.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Walang saksi o CCTV sa eskinita. At sa talaan ng Sanglaang Villareal: may utang si Mang Kanor na ₱85,000, at binantaan siya ni Donya Carmen na idedemanda.', unlock: ['utang'] } },
      { id: 'lorna', name: 'Ate Lorna', role: 'Karinderya Vendor', h: 152,
        alibi: 'Nagsara raw siya ng karinderya nang 6:45 PM dahil sa lakas ng ulan.',
        note: 'Naka-padlock ang stall sa CCTV ng kalye, 6:48 PM.',
        greet: 'Diyos ko, si Donya Carmen... suki ko pa naman \'yan sa kare-kare.',
        deny: 'Inspector, sarado na ang stall ko 6:48 pa lang! Kita sa CCTV, nakasakay na ako ng jeep!',
        check: { ok: true, text: 'KUMPIRMADO — CCTV ng kalye: ni-padlock niya ang stall 6:48 PM at sumakay ng jeep pa-Sta. Cruz 6:52 PM.', unlock: ['cctv1'] } },
      { id: 'marco', name: 'Sir Marco', role: 'Pamangkin ng Biktima', h: 170,
        alibi: 'Naipit daw siya sa trapik sa EDSA buong oras.',
        note: 'Siya ang tagapagmana ng sanglaan.',
        greet: 'Look, Inspector, pamangkin niya ako. Bakit ko gagawin \'yon?',
        deny: 'Twelve kilometers away ako! Tingnan mo ang toll at parking ticket ko!',
        check: { ok: true, text: 'KUMPIRMADO — Toll at parking ticket: pumasok ang kotse niya sa parking sa Ortigas 7:03 PM, 12 km ang layo.', unlock: ['toll'] } },
      { id: 'ben', name: 'Kuya Ben', role: 'Family Driver', h: 165,
        alibi: 'Bumaba raw siya para bumili ng pandesal at mainit na kape.',
        note: 'Siya ang nakatagpo sa biktima, 7:20 PM.',
        greet: 'Sir, saglit lang akong umalis... Sana hindi ko na lang siya iniwan.',
        deny: 'Nasa panaderya ako, Sir! Heto pa ang resibo — 7:04!',
        check: { ok: true, text: 'KUMPIRMADO — Resibo ng panaderya: 7:04 PM, tatlong kanto ang layo. Kita rin siya sa CCTV ng bakery hanggang 7:16 PM.', unlock: ['bakery'] } }
    ],
    clues: [
      { id: 'boot', x: 318, y: 370, r: 24, name: 'Putikang Bakas ng Bota', info: 'Size 10, makapal na tread — pang-sekyu o pang-trabaho. Nasa tabi ng pinto ng driver.', say: 'Bakas ng bota! Size 10 \'to, Inspector. Mabigat ang tumapak.' },
      { id: 'fabric', x: 360, y: 293, r: 22, name: 'Punit na Asul na Tela', info: 'Maitim na asul na tela ng uniporme, sumabit sa hawakan ng pinto. May dilaw na tahi ng security agency.', say: 'May sumabit na tela sa hawakan ng pinto... asul, parang uniporme!' },
      { id: 'clock', x: 337, y: 250, r: 24, name: 'Basag na Orasan sa Dashboard', info: 'Huminto sa 7:05 PM — oras ng pakikipagbuno sa loob ng kotse.', say: 'Huminto ang orasan sa 7:05! Dito nangyari ang gulo.' },
      { id: 'key', x: 272, y: 258, r: 24, name: 'Nawawalang Susi ng Vault', info: 'Bukás ang pitaka ni Donya Carmen. Wala na ang gintong master key ng vault ng sanglaan.', say: 'Wala na ang gintong susi sa key ring! Pagnanakaw ang motibo.', thumbBefore: true },
      { id: 'mirror', x: 404, y: 262, r: 22, name: 'Baluktot na Side Mirror', info: 'Nabali sa agawan sa may pinto. May nanlaban.', say: 'Baluktot ang side mirror — may nanlaban dito.' },
      { id: 'ticket', x: 456, y: 270, r: 24, meta: true, name: 'Tiket ng Sanglaan "A-13"', info: 'Lumang tiket na may kodigong "A-13". Hindi ito galing sa Sanglaang Villareal. Sino ang nag-iwan nito sa wiper?', say: 'Inspector... may iniwang tiket sa wiper. "A-13". Hindi ito karaniwan.' }
    ],
    records: {
      cctv1: { name: 'CCTV: Stall ni Ate Lorna', icon: 'cctv', info: 'Ni-padlock ang karinderya 6:48 PM. Sumakay ng jeep pa-Sta. Cruz 6:52 PM.' },
      toll: { name: 'Toll at Parking Ticket', icon: 'receipt', info: 'Kotse ni Sir Marco: pumasok sa parking sa Ortigas 7:03 PM — 12 km mula sa tulay.' },
      bakery: { name: 'Resibo ng Panaderya', icon: 'receipt', info: '"Pandesal x10, Kapeng Barako x1" — 7:04 PM, tatlong kanto ang layo.' },
      utang: { name: 'Talaan ng Utang sa Sanglaan', icon: 'book', info: 'Si Mang Kanor ay may utang na ₱85,000 sa Sanglaang Villareal. Huling paalala: "Bayaran mo bago mag-Biyernes o idedemanda kita." — D.C.' }
    },
    timeline: [
      { t: '18:30', who: 'victim', text: 'Umalis si Donya Carmen sa sanglaan sa Quiapo, kasama si Kuya Ben.' },
      { t: '18:45', who: 'lorna', alibi: true, text: '"Nagsara ako ng karinderya nang 6:45 dahil sa ulan."' },
      { t: '18:50', who: 'victim', text: 'Huling kuha ng CCTV CAM-03: nakaparada ang sedan sa ilalim ng tulay.' },
      { t: '18:55', who: 'ben', alibi: true, text: '"Bumaba ako para bumili ng pandesal at kape sa kanto."' },
      { t: '19:00', who: 'kanor', alibi: true, text: '"Nagpapatrolya ako sa likod na eskinita, malayo sa tulay."' },
      { t: '19:00', who: 'marco', alibi: true, text: '"Naipit ako sa trapik sa EDSA."' },
      { t: '19:20', who: 'victim', text: 'Natagpuan ni Kuya Ben si Donya Carmen. Tumawag siya sa 911.' }
    ],
    solution: { culprit: 'kanor', slot1: ['fabric', 'boot'], slot2: ['key', 'utang'] },
    confess: [
      'Oo na! Ako na! Lubog ako sa utang... Gusto ko lang kunin ang susi para mabura ang pangalan ko sa talaan.',
      'Hindi ko sinasadya... nanlaban siya! Pero hindi akin ang ideya. May lalaking naka-itim — siya ang nagbigay ng tiket na \'yan. "Iwan mo sa kotse," sabi niya.'
    ],
    metaId: 'ticket',
    metaText: 'Natagpuan: Tiket ng Sanglaan "A-13". Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: { scene: 'c1', after: true, vb: '60 120 520 340' }, cap: 'Jones Bridge, Binondo. 7:40 ng gabi.', beats: [{ sfx: 'WEE-WOO!', x: 58, y: 12, rot: -8, size: 46, color: '#ff4f6a' }, { sfx: 'Tik-tik-tik...', x: 6, y: 72, rot: 4, size: 26, color: '#cfe0ff' }] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'determined' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'neutral', flip: true }], beats: [
        { b: 'Inspector! Si Donya Carmen Villareal, may-ari ng sanglaan sa Quiapo. Natagpuan sa loob ng kotse niya.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
        { b: 'Oras ng kamatayan?', who: 'Mateo', x: 58, y: 6, w: 34, tail: 'r' },
        { b: 'Bandang 7:00 hanggang 7:15. Malakas ang ulan, kaya kaunti ang nakakita.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' }] },
      { bg: 'interrog', chars: [{ c: 'kanor', x: 70, y: 60, s: 4.6, e: 'neutral' }, { c: 'lorna', x: 195, y: 84, s: 4.6, e: 'sad' }, { c: 'marco', x: 320, y: 66, s: 4.6, e: 'smug' }, { c: 'ben', x: 445, y: 74, s: 4.6, e: 'nervous' }], cap: 'Apat ang nasa paligid nang mangyari ito.', beats: [{ sfx: 'MAY NAGSISINUNGALING!', x: 8, y: 74, rot: -4, size: 40, color: '#ff4f6a' }] },
      { bg: 'street', chars: [{ c: 'mateo', x: 260, y: 40, s: 8, e: 'determined' }], beats: [{ b: 'Apat na suspek. Iisang salarin. Simulan na natin.', who: 'Mateo', x: 4, y: 8, w: 40, tail: 'r' }] }
    ]
  };

  /* ---------------- CASE 2 ---------------- */
  const c2 = {
    id: 'c2', num: '002', title: 'Ang Nawawalang Boundary', en: 'The Missing Boundary',
    place: 'Lawton Terminal, Ermita', time: 150, scene: A.sceneLawton,
    beforeLabel: 'CCTV TERMINAL · 20:55', afterLabel: 'SOCO · 21:35',
    victim: { name: 'Mang Turing Salvador', look: 'turing', desc: 'Operator ng 12 jeep sa rutang Lawton–Divisoria', cause: 'Hinampas ng bakal sa ulo — buhay pero walang malay (nasa PGH)', found: 'Sa likod ng Jeep #07, Lawton Terminal', foundBy: 'Totoy (barker), 9:20 PM', windowText: '9:05 PM – 9:20 PM', weather: 'Ambon' },
    win: ['21:05', '21:20'],
    snap: [300, 270, 320],
    suspects: [
      { id: 'totoy', name: 'Totoy', role: 'Barker ng Terminal', h: 163,
        alibi: 'Nagtatawag daw siya ng pasahero sa harap ng pila buong oras.',
        note: 'Paos na ang boses. Siya ang nakakita kay Mang Turing.',
        greet: 'Boss, buong gabi akong sumisigaw! "Quiapo! Divisoria! Isa na lang!" Paos na nga ako o!',
        deny: 'Live ako sa vlog ni Kuya Jaypee, Inspector! Panoorin mo, kita ako buong oras!',
        check: { ok: true, text: 'KUMPIRMADO — May vlogger na nag-live sa terminal 9:00–9:25 PM. Kita at rinig si Totoy buong oras.', unlock: ['vlog'] } },
      { id: 'pido', name: 'Mang Pido', role: 'Driver ng Jeep #07', h: 172,
        alibi: 'Nasa biyahe raw siya papuntang Divisoria mula 9:00, bumalik nang 9:30.',
        note: 'Bagong hugas ang mga kamay pero may itim pa sa kuko.',
        greet: 'Nasa biyahe ako, Inspector. Divisoria. Tanungin mo pa mga pasahero ko.',
        weak: 'E ano ngayon? Hindi mo ako mahuhuli sa ganyan lang.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Sa logbook ng dispatcher, HINDI nag-log out ang Jeep #07 ngayong gabi. Dagdag pa: may ₱32,000 siyang atraso sa boundary, at babawiin na raw ni Mang Turing ang jeep.', unlock: ['logbook', 'atraso'] } },
      { id: 'nena', name: 'Aling Nena', role: 'Tindera ng Balut', h: 150,
        alibi: 'Tumawid daw siya sa kabilang kalye para bumili ng load.',
        note: 'Naiwan ang basket niya sa terminal.',
        greet: 'Balut po? Penoy? ...Ay, pasensya na po. Kinakabahan lang ako.',
        deny: 'May resibo po ako ng GCash, 9:12! Nasa kabilang kalye ako, Inspector!',
        check: { ok: true, text: 'KUMPIRMADO — GCash receipt sa sari-sari store sa kabilang kalye: 9:12 PM. Nabitawan niya ang basket nang marinig ang sigaw.', unlock: ['gcash'] } },
      { id: 'dado', name: 'Sir Dado', role: 'Karibal na Operator', h: 168,
        alibi: 'Nasa lamay raw siya sa Tondo buong gabi.',
        note: 'Matagal nang kaaway ni Mang Turing sa ruta.',
        greet: 'Karibal ko si Turing, oo. Pero hindi ako hayop.',
        deny: 'Dalawampung tao ang kasama ko sa lamay. Gusto mo silang tawagan isa-isa?',
        check: { ok: true, text: 'KUMPIRMADO — Mahigit 20 saksi sa lamay sa Tondo, kasama ang barangay kagawad. May litrato pa sa FB, 9:10 PM.', unlock: ['lamay'] } }
    ],
    clues: [
      { id: 'sign', x: 185, y: 182, r: 28, name: 'Signboard: "GARAHE"', info: 'Bago ang krimen: "DIVISORIA". Pagkatapos: "GARAHE". Hindi pala umalis ang Jeep #07!', say: 'Teka — "GARAHE" na ang signboard? Akala ko nasa biyahe ang Jeep #07?' },
      { id: 'cashbox', x: 566, y: 292, r: 22, name: 'Nawawalang Kahon ng Boundary', info: 'Asul na metal na kahon na may ₱48,500 — kita ng buong linya ngayong araw.', say: 'Wala na ang kahon ng boundary sa mesa ng dispatcher!', thumbBefore: true },
      { id: 'hand', x: 465, y: 282, r: 20, name: 'Bakas ng Kamay na may Grasa', info: 'Itim na grasa ng makina, galing sa kamay ng taong kagagaling mag-ayos ng jeep.', say: 'Bakas ng kamay... grasa ng makina \'to!' },
      { id: 'toolbox', x: 305, y: 334, r: 22, name: 'Bukás na Toolbox ng Jeep #07', info: 'Bukás ang toolbox ng Jeep #07. Nawawala ang lug wrench.', say: 'Bukás ang toolbox ng jeep, at may kulang na gamit.' },
      { id: 'wrench', x: 300, y: 377, r: 22, name: 'Lug Wrench na may Asul na Tape', info: 'May bahid ng dugo sa dulo. Ang hawakan ay binalot ng asul na electrical tape — tatak ng mga gamit ni Mang Pido.', say: 'Lug wrench! May bahid pa... ito ang ipinanghampas.' },
      { id: 'basket', x: 62, y: 352, r: 28, name: 'Natumbang Basket ng Balut', info: 'Nabitawan ni Aling Nena nang marinig ang sigaw. Hindi ito sandata.', say: 'Natapon ang balut... may nagmadaling tumakbo?' },
      { id: 'anting', x: 211, y: 376, r: 22, meta: true, name: 'Anting-anting na "XIII"', info: 'Tansong anting-anting na may matang nasa tatsulok at nakaukit na "XIII" sa likod. Parehong numero sa tiket ng sanglaan...', say: 'Anting-anting... may nakaukit na "XIII". Inspector, labintatlo ulit!' }
    ],
    records: {
      vlog: { name: 'Live Video ng Vlogger', icon: 'video', info: '9:00–9:25 PM: kita at rinig si Totoy na nagtatawag ng pasahero sa harap ng pila.' },
      gcash: { name: 'GCash Receipt ni Aling Nena', icon: 'phone', info: 'Load ₱50 — Tindahan ni Aling Baby, kabilang kalye. 9:12 PM.' },
      lamay: { name: 'Litrato sa Lamay sa Tondo', icon: 'photo', info: 'Si Sir Dado kasama ang 20+ tao sa lamay. Naka-post sa FB, 9:10 PM.' },
      logbook: { name: 'Logbook ng Dispatcher', icon: 'log', info: 'Jeep #07 — WALANG log-out ngayong gabi. Huling biyahe: 7:40 PM pa.' },
      atraso: { name: 'Listahan ng Atraso sa Boundary', icon: 'book', info: 'Pido Bautista — ₱32,000. "Huling babala: babawiin ko na ang jeep sa Lunes." — Turing' }
    },
    timeline: [
      { t: '20:55', who: 'victim', text: 'Binilang ni Mang Turing ang boundary sa mesa ng dispatcher (CCTV).' },
      { t: '21:00', who: 'pido', alibi: true, text: '"Umalis ako papuntang Divisoria nang 9:00."' },
      { t: '21:00', who: 'totoy', alibi: true, text: '"Nasa harap ako ng pila, nagtatawag ng pasahero."' },
      { t: '21:05', who: 'nena', alibi: true, text: '"Tumawid ako para bumili ng load."' },
      { t: '21:05', who: 'dado', alibi: true, text: '"Nasa lamay ako sa Tondo."' },
      { t: '21:20', who: 'victim', text: 'Natagpuang walang malay si Mang Turing sa likod ng Jeep #07.' }
    ],
    solution: { culprit: 'pido', slot1: ['wrench', 'hand'], slot2: ['sign', 'logbook', 'atraso'] },
    confess: [
      'Babawiin niya ang jeep ko! \'Yon lang ang bumubuhay sa pamilya ko... Hindi ko siya gustong patayin. Gusto ko lang ng panahon.',
      'Yung anting-anting? Hindi akin \'yan! May lalaking naka-itim na nagbenta sa akin ng "swerte" noong isang linggo. Sabi niya, "Ihulog mo sa terminal pagkatapos."'
    ],
    metaId: 'anting',
    metaText: 'Natagpuan: Anting-anting na "XIII". Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 70, s: 6.4, e: 'neutral' }], cap: 'Kinabukasan. Presinto.', beats: [{ sfx: 'KRIIING!', x: 55, y: 50, rot: -10, size: 50, color: '#ffd34a' }, { b: 'Reyes. ...Lawton? Sige, papunta na.', who: 'Mateo', x: 46, y: 6, w: 40, tail: 'l' }] },
      { bg: { scene: 'c2', after: true, vb: '40 90 520 340' }, cap: 'Lawton Terminal, Ermita. 9:35 ng gabi.', beats: [{ sfx: 'BEEP! BEEEP!', x: 54, y: 66, rot: 6, size: 38, color: '#ffd34a' }] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'nervous' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'determined', flip: true }], beats: [
        { b: 'Si Mang Turing, operator ng linya. Hinampas sa ulo, buhay pero walang malay. Nawawala ang ₱48,500 na boundary!', who: 'PO2 Jessa', x: 2, y: 4, w: 48, tail: 'l' },
        { b: 'Sino ang nasa terminal nang mangyari ito?', who: 'Mateo', x: 56, y: 6, w: 36, tail: 'r' },
        { b: 'Apat, Inspector. At lahat sila, may kuwento.', who: 'PO2 Jessa', x: 2, y: 4, w: 44, tail: 'l' }] }
    ]
  };

  /* ---------------- CASE 3 ---------------- */
  const c3 = {
    id: 'c3', num: '003', title: 'Huling Kanta sa Bituin KTV', en: 'Last Song at Bituin KTV',
    place: 'Bituin KTV, Malate', time: 150, scene: A.sceneKTV,
    beforeLabel: 'CCTV VIP-13 · 22:55', afterLabel: 'SOCO · 23:45',
    victim: { name: 'Madam Gloria Tan', look: 'gloria', desc: 'May-ari ng Bituin KTV sa Malate', cause: 'Nalason — pampatulog na hinalo sa inumin (paunang resulta)', found: 'Sa loob ng VIP Room 13', foundBy: 'Jun-jun (waiter), 11:30 PM', windowText: '11:00 PM – 11:15 PM', weather: 'Maaliwalas, maalinsangan' },
    win: ['23:00', '23:15'],
    snap: [280, 250, 320],
    suspects: [
      { id: 'lyka', name: 'Lyka', role: 'Singer ng KTV', h: 158,
        alibi: 'Nasa main stage raw siya, kumakanta ng set mula 11:00 hanggang 11:30.',
        note: 'Sinabihan daw siya ni Madam Gloria na tatanggalin na siya.',
        greet: 'Kumakanta ako buong set, Inspector! Ang daming nanonood!',
        deny: 'May video ang buong KTV na kumakanta ako! Hindi ako umalis sa stage!',
        check: { ok: true, text: 'KUMPIRMADO — Mga video ng customer: kumakanta siya ng "Dahil Sa Iyo" at "Bituing Walang Ningning", 11:00–11:28 PM.', unlock: ['video'] } },
      { id: 'junjun', name: 'Jun-jun', role: 'Waiter', h: 165,
        alibi: 'Nagse-serve daw siya sa Room 5.',
        note: 'Siya ang nakatagpo sa biktima, 11:30 PM.',
        greet: 'Sir, nagse-serve lang po ako. Room 5 po ako noon.',
        deny: 'Nasa POS po lahat ng order ko, Sir! Kita rin po ako sa hallway CCTV!',
        check: { ok: true, text: 'KUMPIRMADO — POS log: nag-serve siya sa Room 5 nang 11:04 at 11:12 PM. Kita rin sa hallway CCTV.', unlock: ['pos'] } },
      { id: 'sy', name: 'Mr. Albert Sy', role: 'Accountant ng KTV', h: 170,
        alibi: 'Nasa opisina raw siya sa itaas, nagbibilang ng kita.',
        note: 'Isa na lang ang gemelos (cufflink) sa kaniyang kaliwang manggas.',
        greet: 'Inspector, I was doing the books. Numbers lang ang alam ko.',
        weak: 'Circumstantial \'yan, Inspector. Kailangan mo ng mas matibay.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Walang CCTV sa opisina. At sa bank records: ₱2.3M ang nawawala sa account ng KTV — si Mr. Sy lang ang may access. Mag-o-audit sana si Madam Gloria bukas.', unlock: ['bank'] } },
      { id: 'bong', name: 'Kuya Bong', role: 'Dating Asawa ng Biktima', h: 175,
        alibi: 'Nasa parking lot daw siya, nakikipagtalo sa guard tungkol sa parking fee.',
        note: 'Nag-away sila ni Madam Gloria kaninang hapon.',
        greet: 'Oo, nag-away kami ni Gloria. Pero mahal ko pa rin siya, okay?',
        deny: 'Nasa labas ako, kausap ang guard! Tanungin mo siya!',
        check: { ok: true, text: 'KUMPIRMADO — Guard at parking CCTV: nasa labas si Bong mula 10:55 hanggang 11:20 PM.', unlock: ['parking'] } }
    ],
    clues: [
      { id: 'tv', x: 186, y: 145, r: 46, name: 'Videoke: Huminto 23:07', info: 'Huminto ang kanta nang 11:07 PM — doon nawalan ng malay si Madam Gloria.', say: 'Huminto ang videoke nang 11:07... sakto sa window of death.' },
      { id: 'glass', x: 250, y: 296, r: 20, name: 'Baso na may Puting Pulbos', info: 'May bakas ng puting pulbos sa gilid ng baso ng calamansi juice. Dinurog na pampatulog.', say: 'May puting pulbos sa baso! Nilagyan ng lason ang juice.' },
      { id: 'ledger', x: 416, y: 307, r: 22, name: 'Nawawalang Ledger', info: 'Ang berdeng ledger ng kita ng KTV, dala ni Madam Gloria para sa audit. Wala na sa mesa.', say: 'Nasa mesa ang berdeng ledger kanina. Nasaan na?', thumbBefore: true },
      { id: 'mic', x: 92, y: 372, r: 22, alt: [[452, 316]], name: 'Nahulog na Mikropono', info: 'Nabitawan ni Madam Gloria ang mic nang manghina siya.', say: 'Nasa sahig na ang mic... dito siya bumagsak.' },
      { id: 'cufflink', x: 300, y: 382, r: 20, name: 'Gintong Gemelos "A.S."', info: 'Gintong cufflink na may ukit na "A.S." — nahulog sa sahig ng VIP 13.', say: 'Gemelos... may initial na "A.S."!' },
      { id: 'matchbook', x: 198, y: 322, r: 20, meta: true, name: 'Posporo ng "Club Anino"', info: 'Itim na posporo na may larawan ng uwak at sulat-kamay: "Kuwarto 13". Walang Club Anino sa Malate...', say: 'Posporo... "Club Anino, Kuwarto 13." Inspector, siya na naman.' }
    ],
    records: {
      video: { name: 'Video ng mga Customer', icon: 'video', info: 'Si Lyka sa main stage, 11:00–11:28 PM. Hindi umalis.' },
      pos: { name: 'POS Log ng Room 5', icon: 'receipt', info: 'Order ni Jun-jun: 11:04 PM (sisig, beer), 11:12 PM (pulutan). Kita sa hallway CCTV.' },
      parking: { name: 'Parking CCTV', icon: 'cctv', info: 'Si Kuya Bong at ang guard, nagtatalo sa labas mula 10:55 hanggang 11:20 PM.' },
      bank: { name: 'Bank Records ng KTV', icon: 'bank', info: '₱2.3M ang nawawala sa loob ng 8 buwan. Iisa lang ang may access: A. Sy. Audit: bukas, 9:00 AM.' }
    },
    timeline: [
      { t: '22:50', who: 'victim', text: 'Pumasok si Madam Gloria sa VIP 13 dala ang berdeng ledger.' },
      { t: '23:00', who: 'lyka', alibi: true, text: '"Nasa stage ako, kumakanta ng set ko."' },
      { t: '23:00', who: 'sy', alibi: true, text: '"Nasa opisina ako sa itaas, nagbibilang."' },
      { t: '23:04', who: 'junjun', alibi: true, text: '"Nagse-serve ako sa Room 5."' },
      { t: '23:05', who: 'bong', alibi: true, text: '"Nasa parking ako, kausap ang guard."' },
      { t: '23:30', who: 'victim', text: 'Natagpuan ni Jun-jun si Madam Gloria sa VIP 13.' }
    ],
    solution: { culprit: 'sy', slot1: ['glass', 'cufflink'], slot2: ['ledger', 'bank'] },
    confess: [
      'Isang audit lang, at tapos ang buhay ko. Kaya... nilagyan ko ng pampatulog ang juice niya at kinuha ang ledger.',
      'Ang posporo? May lalaking nag-alok na "aayusin" ang problema ko. Lagi niyang sinasabi: "Kuwarto 13. Doon tayo magkikita."'
    ],
    metaId: 'matchbook',
    metaText: 'Natagpuan: Posporo ng "Club Anino — Kuwarto 13". Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'street', cap: 'Malate. 11:45 ng gabi.', beats: [{ sfx: '♪ Dahil sa iyo... ♪', x: 10, y: 20, rot: -6, size: 34, color: '#ff9ccf' }, { sfx: 'KYAAAH!', x: 52, y: 60, rot: 8, size: 52, color: '#ff4f6a' }] },
      { bg: { scene: 'c3', after: true, vb: '40 40 520 340' }, cap: 'Bituin KTV — VIP Room 13.', beats: [] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'nervous' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'determined', flip: true }], beats: [
        { b: 'Si Madam Gloria Tan, may-ari ng KTV. Walang sugat... pero may kakaiba sa inumin niya.', who: 'PO2 Jessa', x: 2, y: 4, w: 48, tail: 'l' },
        { b: 'VIP Room 13... Labintatlo na naman.', who: 'Mateo', x: 56, y: 6, w: 36, tail: 'r' }] }
    ]
  };

  const PROLOGUE = [
    { bg: 'street', cap: 'Maynila. Tag-ulan. Alas-onse ng gabi.', beats: [{ sfx: 'KIDLAT!', x: 56, y: 8, rot: -8, size: 50, color: '#fff7c0', flash: true }, { sfx: 'Tik-tik-tik...', x: 6, y: 74, rot: 4, size: 26, color: '#cfe0ff' }] },
    { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 64, s: 6.6, e: 'sad' }], cap: 'Inspector Mateo Reyes, Manila Police District — Investigation Section.', beats: [{ b: 'Sampung taon na, Tay. Hindi pa rin nahuhuli ang Anino.', who: 'Mateo', x: 48, y: 22, w: 42, tail: 'l' }] },
    { bg: 'dark', chars: [{ c: 'tatay', x: 150, y: 60, s: 6.4, e: 'determined' }, { c: 'anino', x: 380, y: 40, s: 7 }], cap: 'SPO4 Ernesto Reyes — namatay habang hinahabol ang salaring tinatawag nilang "Ang Anino." Walang bakas. Walang mukha.', beats: [] },
    { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 64, s: 6.6, e: 'shock' }], beats: [{ sfx: 'KRIIING!', x: 54, y: 10, rot: -10, size: 52, color: '#ffd34a' }, { b: 'Inspector! May bangkay sa ilalim ng Jones Bridge! Bilisan mo!', who: 'PO2 Jessa (telepono)', x: 46, y: 46, w: 48, tail: 'l' }] },
    { bg: 'street', chars: [{ c: 'mateo', x: 260, y: 40, s: 8, e: 'determined' }], beats: [{ b: 'Papunta na ako. Walang krimen na walang iniiwang bakas.', who: 'Mateo', x: 4, y: 8, w: 40, tail: 'r' }] }
  ];

  const FINALE = [
    { bg: 'cork', cap: 'A-13. XIII. Kuwarto 13.', chars: [{ c: 'mateo', x: 380, y: 70, s: 6.4, e: 'determined', flip: true }], beats: [{ b: 'Hindi ito nagkataon lang.', who: 'Mateo', x: 4, y: 30, w: 38, tail: 'r' }] },
    { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 64, s: 6.6, e: 'shock' }], beats: [{ b: 'Tay... Presinto 13. Doon ka naka-destino noong gabing iyon.', who: 'Mateo', x: 48, y: 18, w: 44, tail: 'l' }] },
    { bg: 'dark', chars: [{ c: 'anino', x: 260, y: 40, s: 8 }], beats: [{ sfx: 'KRIIING!', x: 4, y: 8, rot: -10, size: 44, color: '#ffd34a' }, { b: 'Magaling, Inspector Reyes. Mas magaling ka pa sa ama mo.', who: '???', x: 54, y: 10, w: 42, tail: 'l', dark: true }, { b: 'Pero ang dilim ng Maynila... hindi mo kayang liwanagan.', who: 'Ang Anino', x: 54, y: 52, w: 42, tail: 'l', dark: true }, { sfx: 'KLIK.', x: 10, y: 74, rot: 0, size: 40, color: '#ddd' }] },
    { bg: 'street', chars: [{ c: 'mateo', x: 260, y: 40, s: 8, e: 'shout' }], beats: [{ b: 'Hahanapin kita, Anino. Kahit saang dilim ka magtago.', who: 'Mateo', x: 4, y: 8, w: 40, tail: 'r' }, { sfx: 'ITUTULOY SA KABANATA 2', x: 14, y: 80, rot: -3, size: 38, color: '#e1b866' }] }
  ];

  const METAS = [
    { id: 'ticket', caseId: 'c1', name: 'Tiket "A-13"', from: 'Kaso #001' },
    { id: 'anting', caseId: 'c2', name: 'Anting-anting "XIII"', from: 'Kaso #002' },
    { id: 'matchbook', caseId: 'c3', name: 'Posporo "Kuwarto 13"', from: 'Kaso #003' }
  ];

  const SHOP = [
    { id: 'halaman', name: 'Halamang Sanseviera', price: 100, desc: 'Pampaswerte raw sa opisina.' },
    { id: 'radyo', name: 'Lumang Radyong AM', price: 200, desc: 'Para sa mga drama sa hatinggabi.' },
    { id: 'pusa', name: 'Pusang Tambay', price: 300, desc: 'Natutulog sa mesa mo. Hindi nagbabayad ng renta.' }
  ];

  /* ---------------- PAHAYAG (interrogation statements) ---------------- */
  const ST = (c, map) => c.suspects.forEach((sp) => { sp.statements = map[sp.id] || []; });
  ST(c1, {
    kanor: [{ t: 'Hindi ako lumapit sa kotse ni Donya Carmen buong gabi.', lie: { ev: ['boot', 'fabric'], say: '...Sige na! Lumapit ako. Tiningnan ko lang kung okay siya dahil sa lakas ng ulan!' } },
      { t: 'Wala akong problema sa sanglaan.', lie: { ev: ['utang'], say: 'Oo, may utang ako. Pero lahat naman tayo may utang, \'di ba, Inspector?' } }],
    lorna: [{ t: 'Hindi ako umalis ng stall hanggang 7:30.', lie: { ev: ['cctv1'], say: 'Ay... totoo, nagsara ako ng 6:48. Nahiya lang akong aminin na umuwi ako nang maaga.' } },
      { t: 'Mabait si Donya Carmen sa lahat ng tindera dito.' }],
    marco: [{ t: 'Nasa EDSA ako buong oras, naipit sa trapik.', lie: { ev: ['toll'], say: 'Fine — wala na ako sa EDSA. Nasa parking na ako sa Ortigas. Pero 12 kilometro pa rin \'yon!' } },
      { t: 'Hindi ko kailangan ang pera ng tita ko.' }],
    ben: [{ t: 'Hindi ako umalis sa tabi ng kotse kahit saglit.', lie: { ev: ['bakery'], say: 'Patawad, Sir... bumili ako ng pandesal. Labindalawang minuto lang. Hindi ko alam na...' } }]
  });
  ST(c2, {
    totoy: [{ t: 'Wala akong napansing kakaiba sa terminal.', lie: { ev: ['sign'], say: 'Teka... oo nga! Pinalitan ni Mang Pido ang signboard ng "GARAHE." Akala ko pagod lang siya.' } }],
    pido: [{ t: 'Nasa biyahe ako papuntang Divisoria mula 9:00.', lie: { ev: ['sign', 'logbook'], say: '...Hindi ako umalis. Nasa likod lang ako ng jeep, inaayos ang makina.' } },
      { t: 'Bayad ako sa boundary ko.', lie: { ev: ['atraso'], say: 'Oo na! Atrasado ako. Pero hindi ako magnanakaw!' } }],
    nena: [{ t: 'Hindi ko iniwan ang basket ko.', lie: { ev: ['basket'], say: 'Nabitawan ko po nang may sumigaw! Tumakbo ako sa kabilang kalye sa takot.' } }],
    dado: [{ t: 'Kung gusto kong pabagsakin si Turing, gagawin ko sa negosyo, hindi sa ganyan.' }]
  });
  ST(c3, {
    lyka: [{ t: 'Hindi ako umalis sa stage kahit isang kanta.' }],
    junjun: [{ t: 'Hindi na ako bumalik sa VIP 13 pagkatapos ng 10:50.', lie: { ev: ['glass'], say: 'Ako po ang nagdala ng juice nang 10:55... pero malinis po \'yon! Wala pong pulbos noon!' } }],
    sy: [{ t: 'Nasa opisina ako buong oras. Hindi ako bumaba.', lie: { ev: ['cufflink'], say: '...Bumaba ako saglit. Para... ibigay ang ulat kay Madam.' } },
      { t: 'Malinis ang mga libro ng KTV.', lie: { ev: ['bank', 'ledger'], say: 'May... kaunting diperensya. Aayusin ko sana bago ang audit!' } }],
    bong: [{ t: 'Hindi ako pumunta sa KTV ngayong gabi.', lie: { ev: ['parking'], say: 'Okay, nandoon ako — sa parking lang. Ayaw akong papasukin ng guard, kaya nag-away kami.' } }]
  });
  [c1, c2, c3].forEach((c) => { c.chapter = 1; });

  window.KASO = { CHARS, CASES: [c1, c2, c3], PROLOGUE, FINALE, METAS, SHOP };
})();
