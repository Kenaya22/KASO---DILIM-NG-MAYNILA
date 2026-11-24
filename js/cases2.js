/* =========================================================
   KASO — KABANATA 2: ANG KASABWAT
   ========================================================= */
(function () {
  'use strict';
  const A = window.ART, K = window.KASO;

  Object.assign(K.CHARS, {
    dizon: { skin: '#c08d64', hair: 'short', hairColor: '#5a5450', outfit: 'police', color: '#2a3550', hat: 'police', mustache: true, mustacheColor: '#4a4440', jaw: 'square', heavy: true },
    celso: { skin: '#a06a44', hair: 'bald', hairColor: '#666', outfit: 'polo', color: '#8a6a3a', mustache: true, mustacheColor: '#777', wrinkles: true },
    rosing: { skin: '#b98258', hair: 'curly', hairColor: '#8a8580', outfit: 'blouse', color: '#7a3a8a', earrings: true, wrinkles: true },
    brojun: { skin: '#d2a078', hair: 'short', hairColor: '#17110d', outfit: 'tshirt', color: '#f2efe8', glasses: true },
    isko: { skin: '#9a6442', hair: 'short', hairColor: '#17110d', outfit: 'jacket', color: '#4a3a2a', color2: '#c9a24a', hat: 'bandana', hatColor: '#6a2a8a', stubble: true },
    velasco: { skin: '#e4bd98', hair: 'slick', hairColor: '#8a8580', outfit: 'suit', color: '#5a4a3a', color2: '#2a5a3a', glasses: true, mustache: true, mustacheColor: '#8a8580', pants: '#5a4a3a' },
    henry: { skin: '#e6c39e', hair: 'slick', hairColor: '#222', outfit: 'polo', color: '#d9c9a0', glasses: true },
    bebot: { skin: '#8a5636', hair: 'buzz', hairColor: '#17110d', outfit: 'sando', color: '#e8e2d0', towel: true, pants: '#4a4a3a' },
    tess: { skin: '#c48c62', hair: 'pony', hairColor: '#2a1d14', outfit: 'apron', color: '#3a7a8a', earrings: true },
    pedring: { skin: '#a8724c', hair: 'short', hairColor: '#8a8580', outfit: 'guard', color: '#5a5a3a', hat: 'guardcap', hatColor: '#4a4a2a', wrinkles: true, mustache: true, mustacheColor: '#8a8580', pants: '#3a3a2a' },
    chua: { skin: '#ecc9a4', hair: 'slick', hairColor: '#17110d', outfit: 'polo', color: '#1a3a5a', chain: true, glasses: true, heavy: true, jaw: 'square' },
    bert: { skin: '#a8724c', hair: 'short', hairColor: '#9a9590', outfit: 'polo', color: '#6a7a8a', mustache: true, mustacheColor: '#9a9590', wrinkles: true },
    gorio: { skin: '#94603e', hair: 'short', hairColor: '#17110d', outfit: 'tshirt', color: '#c9b37a', hat: 'cap', hatColor: '#3a5a3a', stubble: true },
    bianca: { skin: '#dcae86', hair: 'long', hairColor: '#2a1a12', outfit: 'jacket', color: '#c43f2a', color2: '#f2efe8', earrings: true, lipstick: true },
    lito: { skin: '#a06a44', hair: 'buzz', hairColor: '#17110d', outfit: 'tshirt', color: '#e2b84a', pants: '#3a4a6a' },
    santi: { skin: '#9a6442', hair: 'short', hairColor: '#17110d', outfit: 'guard', color: '#3d4a2f', hat: 'guardcap', hatColor: '#2f3a24', stubble: true, jaw: 'square', pants: '#2f3a24' }
  });

  /* ---------------- CASE 4 ---------------- */
  const c4 = {
    id: 'c4', chapter: 2, num: '004', title: 'Ang Gintong Anting-anting', place: 'Plaza Miranda, Quiapo', time: 150, scene: A.sceneQuiapo,
    beforeLabel: 'CCTV PLAZA · 20:50', afterLabel: 'SOCO · 21:40',
    victim: { name: 'Mang Celso Dimagiba', look: 'celso', desc: 'Nagtitinda ng anting-anting at langis sa tabi ng simbahan', cause: 'Hinampas ng mabigat na bagay sa ulo', found: 'Sa likod ng kaniyang puwesto sa Plaza Miranda', foundBy: 'Aling Rosing (kapitbahay na tindera), 9:25 PM', windowText: '9:00 PM – 9:20 PM', weather: 'Ambon' },
    win: ['21:00', '21:20'],
    suspects: [
      { id: 'rosing', name: 'Aling Rosing', role: 'Tindera ng Kandila', h: 149,
        alibi: 'Nagbebenta raw siya ng kandila sa mga deboto sa pinto ng simbahan.', note: 'Siya ang nakatagpo sa biktima.',
        greet: 'Tatlumpung taon kaming magkapitbahay ni Celso... Diyos ko.',
        deny: 'Nasa pinto ako ng simbahan, Inspector! Kita ako sa CCTV ng parokya!',
        check: { ok: true, text: 'KUMPIRMADO — CCTV ng parokya: nasa pintuan siya ng simbahan 8:55–9:24 PM.', unlock: ['parokya'] },
        statements: [{ t: 'Hindi ako umalis sa puwesto ko buong gabi.', lie: { ev: ['parokya'], say: 'Ay, oo nga pala... lumipat ako sa pinto ng simbahan para mas mabenta. Pero malayo pa rin ako kay Celso!' } }, { t: 'Wala namang kaaway si Celso.' }] },
      { id: 'brojun', name: 'Brother Jun', role: 'Sakristan ng Simbahan', h: 166,
        alibi: 'Nangunguna raw siya sa nobena sa loob ng simbahan.', note: 'Madalas bumili ng langis kay Mang Celso.',
        greet: 'Ipinagdasal ko na ang kaluluwa ni Mang Celso.',
        deny: 'Naka-livestream ang buong nobena, Inspector. Nasa harap ako ng altar.',
        check: { ok: true, text: 'KUMPIRMADO — Livestream ng parokya: nangunguna siya sa nobena 8:45–9:30 PM.', unlock: ['livestream'] },
        statements: [{ t: 'Hindi ako lumabas ng simbahan habang nobena.' }] },
      { id: 'isko', name: 'Mang Isko', role: 'Karibal na Manghuhula', h: 160,
        alibi: 'Nasa sabungan daw siya sa Pasay.', note: 'Inagawan daw siya ni Celso ng mga suki.',
        greet: 'Nakita ko na \'to sa baraha ko. Masamang gabi para kay Celso.',
        deny: 'May tiket ako ng sabungan, Inspector — at nanalo pa ang manok ko!',
        check: { ok: true, text: 'KUMPIRMADO — Tiket at CCTV ng sabungan sa Pasay: 8:30–10:15 PM.', unlock: ['sabungan'] },
        statements: [{ t: 'Hindi ako nagagalit kay Celso. Negosyo lang.', lie: { ev: ['sabungan'], say: 'Hah! Galit ako, oo. Pero habang namamatay siya, nagsisigaw ako sa sabungan. Tingnan mo ang tiket ko.' } }] },
      { id: 'velasco', name: 'Dr. Velasco', role: 'Kolektor ng Antigo', h: 174,
        alibi: 'Kumakain daw siya sa isang restaurant sa Binondo hanggang 9:30.', note: 'Basag ang kaliwang lente ng salamin niya.',
        greet: 'Isang trahedya. Ang anting-anting na iyon ay pambansang kayamanan, alam mo ba?',
        weak: 'Hah. Mga kuwento lang \'yan, Inspector. Kailangan mo ng mas matibay.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Ayon sa restaurant sa Binondo, umalis siya nang 8:40 PM pa lang. At sa cellphone ni Mang Celso: nag-alok si Dr. Velasco ng ₱500,000 para sa gintong anting-anting. Sagot ni Celso: "Hindi ipinagbibili ang mana ng lolo ko."', unlock: ['alok'] },
        statements: [{ t: 'Hindi ako pumunta sa Quiapo ngayong gabi.', lie: { ev: ['lens', 'resibo'], say: '...Ang lente? Ah— dumaan lang ako saglit. Gusto ko lang siyang kausapin!' } },
          { t: 'Wala akong interes sa paninda ni Celso.', lie: { ev: ['alok'], say: 'Oo na, inalok ko siya. Pero ang negosyo ay negosyo!' } }] }
    ],
    clues: [
      { id: 'amulet', x: 476, y: 243, r: 22, thumbBefore: true, name: 'Nawawalang Gintong Anting-anting', info: 'Ang pinakamahal na paninda ni Mang Celso — gintong anting-anting na mana pa ng kaniyang lolo. Wala na sa sabitan.', say: 'Wala na ang gintong anting-anting sa gitna ng sabitan!' },
      { id: 'kandelero', x: 296, y: 368, r: 26, alt: [[404, 280]], name: 'Tansong Kandelero na may Dugo', info: 'Galing sa mesa ni Mang Celso. Ito ang ipinanghampas, saka itinapon sa sahig.', say: 'Ang kandelero — nasa mesa kanina, ngayon nasa sahig at may bahid!' },
      { id: 'lens', x: 232, y: 358, r: 20, name: 'Basag na Lente ng Salamin', info: 'Lente ng mamahaling salamin sa mata, may gintong frame. Nabasag sa agawan.', say: 'May basag na lente sa sahig... mamahaling salamin \'to.' },
      { id: 'tin', x: 524, y: 294, r: 24, name: 'Natumbang Lata ng Barya', info: 'Natumba sa agawan, pero hindi kinuha ang pera. Hindi pera ang habol ng salarin.', say: 'Natumba ang lata ng barya... pero hindi ginalaw ang pera.' },
      { id: 'resibo', x: 150, y: 380, r: 22, name: 'Resibo ng Restaurant — 20:40', info: 'Resibo mula sa isang restaurant sa Binondo, 8:40 PM. Nahulog ng taong nanggaling doon.', say: 'Resibo ng restaurant sa Binondo, 8:40 PM. May nagdala nito rito.' },
      { id: 'radio', x: 560, y: 378, r: 22, meta: true, name: 'Call-sign Card "BRAVO-13"', info: 'Laminated na radio call-sign card: "BRAVO-13". Ginagamit lang ito ng mga opisyal ng Presinto 13.', say: 'Inspector... radio card ng pulis. "BRAVO-13." Taga-Presinto 13 ito!' }
    ],
    records: {
      parokya: { name: 'CCTV ng Parokya', icon: 'cctv', info: 'Si Aling Rosing sa pintuan ng simbahan, nagtitinda ng kandila, 8:55–9:24 PM.' },
      livestream: { name: 'Livestream ng Nobena', icon: 'video', info: 'Si Brother Jun sa harap ng altar, 8:45–9:30 PM.' },
      sabungan: { name: 'Tiket ng Sabungan', icon: 'receipt', info: 'Sabungan sa Pasay — pasok 8:30 PM. Kita sa CCTV hanggang 10:15 PM.' },
      alok: { name: 'Text ni Dr. Velasco kay Celso', icon: 'phone', info: '"₱500,000 para sa gintong anting-anting. Huling alok." — Sagot: "Hindi ipinagbibili ang mana ng lolo ko."' }
    },
    timeline: [
      { t: '20:30', who: 'isko', alibi: true, text: '"Nasa sabungan ako sa Pasay mula 8:30."' },
      { t: '20:45', who: 'brojun', alibi: true, text: '"Nagsimula ako ng nobena nang 8:45."' },
      { t: '20:50', who: 'victim', text: 'Huling kuha ng CCTV: nag-aayos ng paninda si Mang Celso.' },
      { t: '20:55', who: 'rosing', alibi: true, text: '"Nasa puwesto ko lang ako, nagtitinda ng kandila."' },
      { t: '21:00', who: 'velasco', alibi: true, text: '"Kumakain ako sa Binondo hanggang 9:30."' },
      { t: '21:25', who: 'victim', text: 'Natagpuan ni Aling Rosing si Mang Celso sa likod ng puwesto.' }
    ],
    solution: { culprit: 'velasco', slot1: ['kandelero', 'lens'], slot2: ['amulet', 'alok', 'resibo'] },
    confess: [
      'Ang anting-anting na \'yon ay dapat nasa koleksyon ko, hindi sa isang maduming puwesto sa Quiapo! Nanlaban siya...',
      'At ang radio card? Ibinigay ng isang pulis na nagbenta sa akin ng "proteksyon." Sabi niya, "Kapag nagkagulo, si Bravo-13 ang bahala."'
    ],
    metaId: 'radio',
    metaText: 'Natagpuan: Call-sign Card "BRAVO-13". Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'office', chars: [{ c: 'mateo', x: 140, y: 64, s: 6.4, e: 'neutral' }, { c: 'dizon', x: 390, y: 56, s: 6.6, e: 'smug', flip: true }], cap: 'Presinto 13. Ang bagong destino ni Mateo.', beats: [
        { b: 'Maligayang pagdating sa Presinto 13, Reyes. Kilala ko ang tatay mo. Mabuting pulis.', who: 'Kapt. Rodel Dizon', x: 50, y: 4, w: 46, tail: 'r' },
        { b: 'Salamat po, Kapitan. Dito po siya huling naka-destino.', who: 'Mateo', x: 2, y: 4, w: 42, tail: 'l' },
        { b: 'May kaso sa Quiapo. Ikaw na ang bahala.', who: 'Kapt. Rodel Dizon', x: 52, y: 4, w: 42, tail: 'r' }] },
      { bg: { scene: 'c4', after: true, vb: '40 40 520 340' }, cap: 'Plaza Miranda, Quiapo. 9:40 ng gabi.', beats: [{ sfx: 'DONG! DONG!', x: 50, y: 8, rot: -6, size: 44, color: '#ffd34a' }] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'determined' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'neutral', flip: true }], beats: [
        { b: 'Si Mang Celso, apatnapung taon nang nagtitinda ng anting-anting dito. Hinampas sa ulo.', who: 'PO2 Jessa', x: 2, y: 4, w: 48, tail: 'l' },
        { b: 'May nawawala ba sa puwesto niya?', who: 'Mateo', x: 58, y: 6, w: 34, tail: 'r' },
        { b: 'Iyan ang aalamin natin, Inspector.', who: 'PO2 Jessa', x: 2, y: 4, w: 40, tail: 'l' }] }
    ]
  };

  /* ---------------- CASE 5 ---------------- */
  const c5 = {
    id: 'c5', chapter: 2, num: '005', title: 'Apoy sa Bodega', place: 'Bodega ng Tela, Divisoria', time: 160, scene: A.sceneBodega,
    beforeLabel: 'CCTV BODEGA · 21:45', afterLabel: 'SOCO · 22:50',
    victim: { name: 'Mr. Henry Go', look: 'henry', desc: 'May-ari ng bodega ng tela sa Divisoria', cause: 'Nawalan ng malay sa usok — buhay, nasa ospital', found: 'Sa loob ng nasusunog na bodega', foundBy: 'Ka Pedring (guwardiya), 10:20 PM', windowText: '10:00 PM – 10:20 PM', weather: 'Malakas na ulan' },
    win: ['22:00', '22:20'],
    suspects: [
      { id: 'bebot', name: 'Bebot', role: 'Kargador', h: 167,
        alibi: 'Nagbababa raw siya ng kargamento sa kabilang bodega.', note: 'Amoy-gasolina ang damit niya — galing daw sa trak.',
        greet: 'Boss, kargador lang ako. Buhat-buhat lang ang alam ko.',
        deny: 'May resibo ng delivery, Boss! Pirmado ko pa, 10:10!',
        check: { ok: true, text: 'KUMPIRMADO — Delivery receipt at driver ng trak: nagbababa siya sa kabilang bodega 9:50–10:30 PM.', unlock: ['delivery'] },
        statements: [{ t: 'Hindi ako humawak ng gasolina ngayong gabi.', lie: { ev: ['delivery'], say: 'Ah... nagkarga ako ng diesel sa trak kanina. Kaya ako amoy-gasolina! Diesel \'yon, Boss, hindi gasolina!' } }] },
      { id: 'tess', name: 'Aling Tess', role: 'Tindera sa Tapat', h: 153,
        alibi: 'Nagsasara raw siya ng karinderya sa tapat.', note: 'Siya ang unang sumigaw ng "Sunog!"',
        greet: 'Ang lakas ng ulan, tapos biglang may usok! Ako ang sumigaw ng "Sunog!"',
        deny: 'Nasa CCTV ako, nagliligpit ng mga kaldero!',
        check: { ok: true, text: 'KUMPIRMADO — CCTV ng kalye: nagliligpit siya ng karinderya 9:55–10:18 PM.', unlock: ['cctvtess'] },
        statements: [{ t: 'Wala akong nakitang tao malapit sa bodega.', lie: { ev: ['bintana'], say: 'Teka... may nakita akong anino sa may bintana! Malaki ang katawan, naka-polo. Akala ko si Sir Henry.' } }] },
      { id: 'pedring', name: 'Ka Pedring', role: 'Night Guard', h: 162,
        alibi: 'Nagroronda raw siya sa kabilang dulo ng kalye.', note: 'Natutulog daw siya minsan sa duty.',
        greet: 'Tatlumpung taon akong guwardiya. Ngayon lang may nasunog sa duty ko.',
        deny: 'Nasa guard tour log ako! Bawat sampung minuto, nagpa-punch ako!',
        check: { ok: true, text: 'KUMPIRMADO — Guard tour system: nag-punch siya sa mga checkpoint sa kabilang dulo nang 10:00, 10:10 at 10:20 PM.', unlock: ['guardlog'] },
        statements: [{ t: 'Hindi ako natulog sa duty.', lie: { ev: ['guardlog'], say: 'Sige na... umidlip ako ng sampung minuto. Pero nasa kabilang dulo ako, malayo sa bodega!' } }] },
      { id: 'chua', name: 'Mr. Chua', role: 'Business Partner', h: 172,
        alibi: 'Nasa Tagaytay daw siya buong gabi.', note: 'Malaki ang katawan. Laging may dalang lighter.',
        greet: 'Nasa Tagaytay ako, Inspector. Kakarating ko lang nang mabalitaan ko.',
        weak: 'Hindi mo ako mapapatunayan diyan, Inspector. Tawagan mo ang abogado ko.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Toll records: pumasok ang kotse niya sa Maynila nang 9:30 PM. At ang insurance ng bodega: itinaas sa ₱10M noong isang buwan — si Mr. Chua ang beneficiary.', unlock: ['toll2', 'insurance'] },
        statements: [{ t: 'Nasa Tagaytay ako buong gabi.', lie: { ev: ['susi', 'toll2'], say: '...Bumalik ako saglit sa Maynila. May... kinuha lang ako.' } },
          { t: 'Hindi ako naninigarilyo.', lie: { ev: ['lighter'], say: 'Iyan... regalo lang sa akin \'yan. Hindi ko ginagamit.' } }] }
    ],
    clues: [
      { id: 'apoy', x: 115, y: 262, r: 40, name: 'Pinagmulan ng Apoy', info: 'Nagsimula ang apoy sa ibabang estante — hindi sa kuryente. May amoy ng gasolina.', say: 'Dito nagsimula ang apoy. Hindi \'to electrical — sinadya!' },
      { id: 'extinguisher', x: 331, y: 199, r: 24, thumbBefore: true, name: 'Nawawalang Fire Extinguisher', info: 'Kinuha ang fire extinguisher bago ang sunog para hindi agad maapula.', say: 'Nawawala ang fire extinguisher sa dingding!' },
      { id: 'bintana', x: 472, y: 117, r: 34, name: 'Bukás na Bintana', info: 'Binuksan mula sa loob — dito lumabas ang salarin. Tanaw ito mula sa karinderya sa tapat.', say: 'Nakabukas ang bintana... dito siya tumakas.' },
      { id: 'gasolina', x: 302, y: 356, r: 26, name: 'Lata ng Gasolina', info: 'Pulang lata ng gasolina, halos ubos. Walang ganito sa imbentaryo ng bodega.', say: 'Lata ng gasolina! Ito ang ginamit sa sunog.' },
      { id: 'lighter', x: 200, y: 382, r: 20, name: 'Lighter na may "WC"', info: 'Pilak na lighter na may ukit na "WC" sa gilid.', say: 'Lighter... may initials na "WC".' },
      { id: 'susi', x: 522, y: 372, r: 22, name: 'Susi ng Kotse na may "C"', info: 'Susi ng kotse na may gintong keychain na "C". Nahulog habang tumatakas.', say: 'Susi ng kotse! Ang may-ari nito ay nandito ngayong gabi.' },
      { id: 'roster', x: 430, y: 352, r: 22, meta: true, name: 'Punit na Duty Roster — "R.D."', info: 'Punit na duty roster ng Presinto 13 mula sa gabing namatay si Tatay. Ang naka-duty: "R.D."', say: 'Inspector... duty roster ng Presinto 13. Ang petsa... gabi nang mamatay ang tatay mo.' }
    ],
    records: {
      delivery: { name: 'Delivery Receipt ng Trak', icon: 'receipt', info: 'Pinirmahan ni Bebot sa kabilang bodega: 10:10 PM. Kasama niya ang driver hanggang 10:30.' },
      cctvtess: { name: 'CCTV: Karinderya ni Aling Tess', icon: 'cctv', info: 'Nagliligpit ng mga kaldero 9:55–10:18 PM. Tumingin siya sa bodega nang 10:12.' },
      guardlog: { name: 'Guard Tour Log', icon: 'log', info: 'Mga punch ni Ka Pedring: 10:00, 10:10, 10:20 PM — lahat sa kabilang dulo ng kalye.' },
      toll2: { name: 'Toll Records ng Kotse ni Mr. Chua', icon: 'receipt', info: 'SLEX Calamba → Maynila: 9:30 PM. Walang balik papuntang Tagaytay hanggang 11:40 PM.' },
      insurance: { name: 'Insurance Policy ng Bodega', icon: 'book', info: 'Itinaas sa ₱10,000,000 noong isang buwan. Beneficiary: William Chua.' }
    },
    timeline: [
      { t: '21:45', who: 'victim', text: 'Huling kuha ng CCTV: nag-iimbentaryo si Mr. Henry Go.' },
      { t: '21:50', who: 'bebot', alibi: true, text: '"Nagbababa ako ng kargamento sa kabilang bodega."' },
      { t: '21:55', who: 'tess', alibi: true, text: '"Nagsasara ako ng karinderya sa tapat."' },
      { t: '22:00', who: 'pedring', alibi: true, text: '"Nagroronda ako sa kabilang dulo ng kalye."' },
      { t: '22:00', who: 'chua', alibi: true, text: '"Nasa Tagaytay ako buong gabi."' },
      { t: '22:20', who: 'victim', text: 'Nakita ni Ka Pedring ang usok. Nailigtas si Mr. Go.' }
    ],
    solution: { culprit: 'chua', slot1: ['gasolina', 'lighter', 'apoy'], slot2: ['insurance', 'toll2', 'susi'] },
    confess: [
      'Sampung milyon, Inspector. Lugi na ang negosyo... Akala ko walang tao sa bodega!',
      'At \'yung roster? Galing sa isang pulis na nagbenta sa akin ng "proteksyon." Sabi niya, "Kami ang bahala sa imbestigasyon." Mukhang hindi ka niya kilala.'
    ],
    metaId: 'roster',
    metaText: 'Natagpuan: Punit na Duty Roster ng Presinto 13 — "R.D." Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'street', cap: 'Divisoria. 10:30 ng gabi.', beats: [{ sfx: 'SUNOG! SUNOG!', x: 6, y: 14, rot: -6, size: 46, color: '#ff7a1a' }, { sfx: 'WEE-WOO!', x: 54, y: 64, rot: 6, size: 40, color: '#ff4f6a' }] },
      { bg: { scene: 'c5', after: true, vb: '40 40 520 340' }, cap: 'Bodega ng tela ni Mr. Henry Go.', beats: [] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'nervous' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'determined', flip: true }], beats: [
        { b: 'Naapula na ng mga bumbero. Buhay si Mr. Go, pero nasa ospital.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
        { b: 'Aksidente ba, o sinadya?', who: 'Mateo', x: 58, y: 6, w: 34, tail: 'r' },
        { b: 'Sabi ni Kapitan Dizon, isara na raw natin bilang "electrical."', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
        { b: 'Hindi pa. Titingnan ko muna.', who: 'Mateo', x: 58, y: 6, w: 34, tail: 'r' }] }
    ]
  };

  /* ---------------- CASE 6 ---------------- */
  const c6 = {
    id: 'c6', chapter: 2, num: '006', title: 'Mga Pader ng Intramuros', place: 'Fort Santiago, Intramuros', time: 150, scene: A.sceneIntramuros,
    beforeLabel: 'CCTV FORT · 21:00', afterLabel: 'SOCO · 22:10',
    victim: { name: 'SPO3 Bert Manalastas (ret.)', look: 'bert', desc: 'Retiradong pulis — dating partner ng tatay ni Mateo', cause: 'Hinampas sa ulo ng batuta (paunang tantiya)', found: 'Sa tabi ng kanyon, Fort Santiago', foundBy: 'Ms. Bianca (tour guide), 9:50 PM', windowText: '9:15 PM – 9:35 PM', weather: 'Maaliwalas, bilog ang buwan' },
    win: ['21:15', '21:35'],
    suspects: [
      { id: 'gorio', name: 'Mang Gorio', role: 'Kutsero ng Kalesa', h: 165,
        alibi: 'Nasa Plaza Roma daw siya, may sakay na mga turista.', note: 'Madalas niyang makita si Mang Bert sa may kanyon.',
        greet: 'Mabait na tao si Mang Bert. Lagi siyang nagbibigay ng pang-merienda sa kabayo ko.',
        deny: 'May mga litrato ang mga turista ko, Inspector! Kasama nila ako buong oras!',
        check: { ok: true, text: 'KUMPIRMADO — Mga litrato ng turista (may timestamp): kasama nila si Mang Gorio sa Plaza Roma 9:05–9:45 PM.', unlock: ['turista'] },
        statements: [{ t: 'Hindi ko nakita si Mang Bert ngayong gabi.' }] },
      { id: 'bianca', name: 'Ms. Bianca', role: 'Tour Guide (Ghost Tour)', h: 160,
        alibi: 'Nag-gi-ghost tour daw siya kasama ang 15 turista.', note: 'Siya ang nakatagpo sa biktima.',
        greet: 'Ghost tour ang trabaho ko... pero hindi ko inakalang makakakita ako ng totoong bangkay.',
        deny: 'Labinlimang tao ang kasama ko, Inspector! Tanungin mo silang lahat!',
        check: { ok: true, text: 'KUMPIRMADO — 15 turista at ang booking app: nasa San Agustin siya 9:00–9:40 PM.', unlock: ['tour'] },
        statements: [{ t: 'Madilim na ang paligid ng kanyon nang dumating kami.', lie: { ev: ['ilaw'], say: 'Oo, kakaiba nga... laging bukas ang ilaw-poste dito. Ngayong gabi lang namatay.' } }] },
      { id: 'lito', name: 'Lito "Payat"', role: 'Tindero ng Fishball', h: 158,
        alibi: 'Nagtitinda raw siya ng fishball sa labas ng gate.', note: 'May dating kaso ng pandurukot.',
        greet: 'Bakit ako na naman? Porke\'t may record ako?',
        deny: 'Nasa barangay hall nga ako, Sir! Nakakulong pa nga ako noon!',
        check: { ok: true, text: 'KUMPIRMADO — Blotter ng barangay: nakadetine si Lito sa barangay hall 9:00–10:00 PM dahil sa away sa kanto.', unlock: ['blotter'] },
        statements: [{ t: 'Nagtitinda ako ng fishball buong gabi.', lie: { ev: ['blotter'], say: 'Hehe... ang totoo, nasa barangay hall ako. Nakipag-away kasi ako. Pero alibi pa rin \'yon, \'di ba?' } }] },
      { id: 'santi', name: 'Ka Santi', role: 'Night Guard ng Fort Santiago', h: 176,
        alibi: 'Nasa guardhouse daw siya, nanonood ng TV.', note: 'Siya lang ang may susi ng gate at ng switch ng ilaw.',
        greet: 'Wala akong narinig, Inspector. Malakas ang TV.',
        weak: 'Lahat ng guwardiya may ganyan. Hindi mo ako mapapatunayan.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Pinatay ang CCTV ng guardhouse nang 9:05 PM gamit ang account ni Ka Santi. At kahapon, may ₱200,000 na idineposito sa bank account niya mula sa hindi kilalang nagpadala.', unlock: ['cctvoff', 'deposito'] },
        statements: [{ t: 'Hindi ako lumabas ng guardhouse.', lie: { ev: ['flashlight', 'cctvoff'], say: '...Lumabas ako saglit para... magbanyo. Iyon lang!' } },
          { t: 'Naka-lock ang gate buong gabi.', lie: { ev: ['padlock'], say: 'Baka... nakalimutan ko lang i-lock. Pagod ako.' } }] }
    ],
    clues: [
      { id: 'padlock', x: 115, y: 248, r: 24, name: 'Bukás na Padlock ng Gate', info: 'Binuksan gamit ang susi — walang sira. Ang guwardiya lang ang may susi.', say: 'Bukás ang padlock pero walang sira... may susi ang nagbukas.' },
      { id: 'ilaw', x: 230, y: 150, r: 26, name: 'Pinatay na Ilaw-poste', info: 'Pinatay ang ilaw sa paligid ng kanyon bago ang krimen. Nasa guardhouse ang switch.', say: 'Patay ang ilaw-poste. Sinadyang padilimin ang lugar.' },
      { id: 'flashlight', x: 398, y: 372, r: 24, name: 'Flashlight na may "FS"', info: 'Flashlight na pang-guwardiya ng Fort Santiago ("FS").', say: 'Flashlight ng guwardiya ng Fort Santiago!' },
      { id: 'batuta', x: 488, y: 352, r: 26, name: 'Batuta sa Ilalim ng Upuan', info: 'Itim na batuta na may bahid sa dulo. Itinago sa ilalim ng upuan.', say: 'Batuta... ito ang ipinanghampas.' },
      { id: 'sulat', x: 290, y: 384, r: 18, name: 'Nakalukot na Sulat', info: '"Mateo — 9:30, sa may kanyon. May sasabihin ako tungkol sa tatay mo. — B." Hindi na sila nagkita.', say: 'Inspector... para sa \'yo ang sulat na \'to. Galing kay Mang Bert.' },
      { id: 'litrato', x: 562, y: 376, r: 24, meta: true, name: 'Lumang Litrato — "...ZON"', info: 'Lumang litrato ni Tatay kasama ang isang batang pulis. Ginasgas ang mukha, pero nababasa pa ang name tape: "...ZON".', say: 'Litrato ng tatay mo... may kasama siyang pulis. "...ZON" ang nasa name tape.' }
    ],
    records: {
      turista: { name: 'Mga Litrato ng Turista', icon: 'photo', info: 'Si Mang Gorio at ang kaniyang kalesa sa Plaza Roma, 9:05–9:45 PM (may timestamp).' },
      tour: { name: 'Booking ng Ghost Tour', icon: 'phone', info: 'Ghost tour, 15 turista, San Agustin: 9:00–9:40 PM. Guide: Bianca.' },
      blotter: { name: 'Blotter ng Barangay', icon: 'log', info: 'Lito "Payat" — nakadetine 9:00–10:00 PM. Away sa kanto dahil sa sukli.' },
      cctvoff: { name: 'Log ng CCTV ng Guardhouse', icon: 'cctv', info: 'Pinatay ang CCTV nang 9:05 PM. Account na ginamit: SANTI-G2.' },
      deposito: { name: 'Bank Deposit kay Ka Santi', icon: 'receipt', info: '₱200,000 — idineposito kahapon, 4:12 PM. Nagpadala: hindi kilala (cash deposit).' }
    },
    timeline: [
      { t: '21:00', who: 'victim', text: 'Huling kuha ng CCTV: naglalakad si Mang Bert papunta sa kanyon.' },
      { t: '21:00', who: 'bianca', alibi: true, text: '"Nagsimula ako ng ghost tour sa San Agustin."' },
      { t: '21:00', who: 'lito', alibi: true, text: '"Nagtitinda ako ng fishball sa labas ng gate."' },
      { t: '21:05', who: 'gorio', alibi: true, text: '"Nasa Plaza Roma ako, may sakay na turista."' },
      { t: '21:05', who: 'santi', alibi: true, text: '"Nasa guardhouse ako, nanonood ng TV."' },
      { t: '21:50', who: 'victim', text: 'Natagpuan ni Ms. Bianca si Mang Bert sa tabi ng kanyon.' }
    ],
    solution: { culprit: 'santi', slot1: ['batuta', 'flashlight'], slot2: ['deposito', 'cctvoff', 'padlock', 'ilaw'] },
    confess: [
      'Dalawang daang libo, Inspector. Ang utos: patayin ang ilaw, buksan ang gate, at patahimikin si Mang Bert bago niya kayo makausap.',
      'Isang kapitan mula sa Presinto 13 ang nag-utos. Hindi ko alam ang pangalan... pero nahulog niya ang litratong \'yan.'
    ],
    metaId: 'litrato',
    metaText: 'Natagpuan: Lumang Litrato ni Tatay — "...ZON". Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 64, s: 6.6, e: 'shock' }], cap: 'Kinagabihan.', beats: [{ sfx: 'KRIIING!', x: 54, y: 10, rot: -10, size: 50, color: '#ffd34a' }, { b: 'Mateo... si Bert \'to, dating partner ng tatay mo. May kailangan kang malaman. Bukas, 9:30, sa may kanyon ng Fort Santiago.', who: 'Mang Bert (telepono)', x: 44, y: 40, w: 52, tail: 'l' }] },
      { bg: { scene: 'c6', after: true, vb: '40 40 520 340' }, cap: 'Fort Santiago, Intramuros. 9:55 ng gabi.', beats: [{ sfx: 'Huli na...', x: 8, y: 72, rot: -4, size: 40, color: '#cfe0ff' }] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'sad' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'shout', flip: true }], beats: [
        { b: 'Inspector... si Mang Bert. Wala na siya nang dumating kami.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
        { b: 'Sino ang nakakaalam na magkikita kami?!', who: 'Mateo', x: 56, y: 6, w: 38, tail: 'r' },
        { b: '...Ang nasa presinto lang. Sa linya ng presinto siya tumawag.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' }] }
    ]
  };

  const FINALE2 = [
    { bg: 'cork', cap: 'BRAVO-13. "R.D." "...ZON."', chars: [{ c: 'mateo', x: 380, y: 70, s: 6.4, e: 'determined', flip: true }], beats: [{ b: 'Iisang tao lang ang tugma sa lahat.', who: 'Mateo', x: 4, y: 30, w: 38, tail: 'r' }] },
    { bg: 'office', chars: [{ c: 'mateo', x: 130, y: 56, s: 6.8, e: 'shout', pose: 'point' }, { c: 'dizon', x: 400, y: 60, s: 6.6, e: 'smug', flip: true }], beats: [
      { b: 'Kapitan Rodel Dizon! Ikaw ang kasabwat ni Ang Anino!', who: 'Mateo', x: 2, y: 4, w: 44, tail: 'l' },
      { b: 'Napakagaling mo, Reyes. Gaya ng tatay mo... at alam mo kung ano\'ng nangyari sa kaniya.', who: 'Kapt. Rodel Dizon', x: 52, y: 4, w: 44, tail: 'r' }] },
    { bg: 'dark', chars: [{ c: 'dizon', x: 260, y: 60, s: 7, e: 'angry' }], cap: 'Pinatay ni Dizon ang ilaw ng presinto.', beats: [{ sfx: 'KRASH!', x: 8, y: 20, rot: -10, size: 56, color: '#ffd34a' }, { b: 'Hindi mo ako mahuhuli. At hindi mo siya kailanman makikilala.', who: 'Kapt. Rodel Dizon', x: 50, y: 50, w: 46, tail: 'l', dark: true }] },
    { bg: 'street', chars: [{ c: 'mateo', x: 260, y: 40, s: 8, e: 'shout' }], cap: 'Nakatakas si Kapitan Dizon sa dilim ng Maynila.', beats: [{ b: 'Hahabulin kita, Dizon. At ikaw, Anino... malapit na kita.', who: 'Mateo', x: 4, y: 14, w: 40, tail: 'r' }, { sfx: 'ITUTULOY SA KABANATA 3', x: 18, y: 80, rot: -3, size: 38, color: '#e1b866' }] }
  ];

  K.CASES.push(c4, c5, c6);
  K.METAS.forEach((m) => { m.chapter = 1; });
  K.METAS.push(
    { id: 'radio', caseId: 'c4', name: 'Card "BRAVO-13"', from: 'Kaso #004', chapter: 2 },
    { id: 'roster', caseId: 'c5', name: 'Roster — "R.D."', from: 'Kaso #005', chapter: 2 },
    { id: 'litrato', caseId: 'c6', name: 'Litrato — "...ZON"', from: 'Kaso #006', chapter: 2 }
  );
  K.CHAPTERS = [
    { n: 1, title: 'Kabanata 1: Ang Numerong 13', question: 'Ano ang nag-uugnay sa tatlong palatandaan?', options: ['Ang kulay itim', 'Ang numerong 13', 'Ang Quiapo', 'Ang uwak'], answer: 1, wrong: 'Hindi... tingnan mo ulit ang mga numero sa bawat palatandaan.', finale: K.FINALE, note: 'PRESINTO 13?! Ang dating presinto ni Tatay. May kasabwat sa loob...', reward: 300 },
    { n: 2, title: 'Kabanata 2: Ang Kasabwat', question: 'Sino ang kasabwat ni Ang Anino sa loob ng Presinto 13?', options: ['Kapt. Ramon Dela Cruz', 'Sgt. Leo Rizon', 'Kapt. Rodel Dizon', 'Maj. Dante Ocampo'], answer: 2, wrong: 'Hindi tugma. Kailangang tumugma sa "R.D." AT sa "...ZON".', finale: FINALE2, note: 'KAPT. RODEL DIZON — ang hepe ko mismo. Tumakas siya. Itutuloy sa Kabanata 3...', reward: 500 }
  ];
  K.SHOP.push({ id: 'thermos', name: 'Thermos ng Barako', price: 80, desc: '+2 kape sa susunod na kaso. Puwedeng bumili nang paulit-ulit.', consumable: true });
})();
