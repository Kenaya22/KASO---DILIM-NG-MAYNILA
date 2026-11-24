/* =========================================================
   KASO — KABANATA 3: ANG ANINO
   ========================================================= */
(function () {
  'use strict';
  const A = window.ART, K = window.KASO;

  Object.assign(K.CHARS, {
    medina: { skin: '#d8ab84', hair: 'slick', hairColor: '#7a7570', outfit: 'barong', mustache: true, mustacheColor: '#6a6560', jaw: 'square', wrinkles: true },
    nards: { skin: '#a8724c', hair: 'buzz', hairColor: '#17110d', outfit: 'soco', stubble: true, jaw: 'square' },
    ambo: { skin: '#8a5636', hair: 'short', hairColor: '#8a8580', outfit: 'tshirt', color: '#3a6a8a', hat: 'cap', hatColor: '#e2b84a', wrinkles: true, mustache: true, mustacheColor: '#8a8580' },
    nympha: { skin: '#cf9a72', hair: 'bun', hairColor: '#3a1a1a', outfit: 'blouse', color: '#2a63c4', earrings: true, glasses: true },
    jake: { skin: '#94603e', hair: 'curly', hairColor: '#17110d', outfit: 'sando', color: '#d9a43a', stubble: true },
    dante: { skin: '#a8724c', hair: 'buzz', hairColor: '#17110d', outfit: 'suit', color: '#141418', color2: '#141418', shades: true, jaw: 'square', heavy: true, pants: '#141418' },
    lino: { skin: '#b88660', hair: 'short', hairColor: '#9a9590', outfit: 'polo', color: '#8a7a5a', glasses: true, stubble: true, wrinkles: true },
    perla: { skin: '#c48c62', hair: 'curly', hairColor: '#5a3a2a', outfit: 'apron', color: '#6a4a8a', earrings: true, wrinkles: true },
    ricky: { skin: '#a06a44', hair: 'messy', hairColor: '#2a1d14', outfit: 'tshirt', color: '#c43f2a' },
    mercado: { skin: '#e2b994', hair: 'slick', hairColor: '#3a3330', outfit: 'suit', color: '#2a3a5a', color2: '#c9a24a', glasses: true, pants: '#2a3a5a' },
    gener: { skin: '#b07b52', hair: 'short', hairColor: '#17110d', outfit: 'jacket', color: '#5a6a3a', color2: '#2a2a2e', hat: 'cap', hatColor: '#1a1a1e', stubble: true },
    paolo: { skin: '#c48c62', hair: 'short', hairColor: '#17110d', outfit: 'waiter', pants: '#1d1c22' },
    marga: { skin: '#dcae86', hair: 'pony', hairColor: '#3a1a12', outfit: 'apron', color: '#f2efe8', earrings: true },
    lorie: { skin: '#e4bd98', hair: 'bun', hairColor: '#17110d', outfit: 'blouse', color: '#1a1a2a', earrings: true, lipstick: true, mole: true }
  });

  /* ---------------- CASE 7 ---------------- */
  const c7 = {
    id: 'c7', chapter: 3, num: '007', title: 'Ang Huling Biyahe', place: 'Escolta Ferry Station, Ilog Pasig', time: 150, scene: A.sceneFerry,
    beforeLabel: 'CCTV PIER · 22:20', afterLabel: 'SOCO · 23:10',
    victim: { name: 'Kapt. Rodel Dizon (takas)', look: 'dizon', desc: 'Dating hepe ng Presinto 13 — kasabwat ni Ang Anino na nagtatago', cause: 'Hinampas sa ulo — buhay, pero comatose', found: 'Sa pantalan ng ferry, Escolta', foundBy: 'Mang Ambo (bangkero), 10:50 PM', windowText: '10:30 PM – 10:45 PM', weather: 'Mahamog' },
    win: ['22:30', '22:45'],
    suspects: [
      { id: 'ambo', name: 'Mang Ambo', role: 'Bangkero ng Ferry', h: 166,
        alibi: 'Nasa kabilang pampang daw siya, sa Guadalupe, kasama ang ferry.', note: 'Siya ang nakatagpo kay Dizon.',
        greet: 'Tatlumpung taon na akong bangkero. Ngayon lang ako nakakita ng ganito.',
        deny: 'Naka-GPS ang ferry, Inspector! Nasa Guadalupe ako!',
        check: { ok: true, text: 'KUMPIRMADO — GPS log ng ferry: nasa Guadalupe station ito 10:15–10:48 PM.', unlock: ['gps'] },
        statements: [{ t: 'Wala akong nakitang ibang bangka sa ilog.', lie: { ev: ['lubid'], say: 'Ay... may bangkang de-motor na umalis nang walang ilaw. Akala ko mangingisda lang.' } }] },
      { id: 'nympha', name: 'Nympha', role: 'Kahera ng Ticket Booth', h: 155,
        alibi: 'Nagbibilang daw siya ng benta sa booth.', note: 'Nagsara ang booth nang 10:30.',
        greet: 'Isang taon pa lang ako rito, Inspector. Ngayon lang may ganito.',
        deny: 'Naka-CCTV ang booth ko! Nagbibilang ako ng barya!',
        check: { ok: true, text: 'KUMPIRMADO — CCTV ng booth: nagbibilang siya ng benta 10:25–10:50 PM.', unlock: ['booth'] },
        statements: [{ t: 'Walang ibang tao sa pier pagkasara ko.', lie: { ev: ['card'], say: 'Teka... may lalaking naka-itim na suit. Nagtanong kung saan ang huling biyahe. Akala ko pasahero.' } }] },
      { id: 'jake', name: 'Jake "Bangka"', role: 'Bangkang Paupahan', h: 170,
        alibi: 'Nangingisda raw siya sa ilalim ng Jones Bridge.', note: 'May dating kaso ng smuggling.',
        greet: 'Bakit ako? Isda lang ang hinuhuli ko.',
        deny: 'Nakunan pa ako ng litrato ng barangay patrol sa ilalim ng tulay!',
        check: { ok: true, text: 'KUMPIRMADO — Litrato ng barangay patrol: nangingisda siya sa ilalim ng Jones Bridge, 10:35 PM.', unlock: ['patrol'] },
        statements: [{ t: 'Hindi ko pinaupahan ang bangka ko kaninuman ngayong gabi.', lie: { ev: ['lubid'], say: 'Sige na... may umarkila ng bangka ko — ₱5,000, cash. Naka-itim na suit. Siya ang nagkalas ng lubid!' } }] },
      { id: 'dante', name: 'Dante Cruz', role: 'Bodyguard ng Konsehal', h: 183,
        alibi: 'Nasa opisina raw siya ng Konsehal sa Ermita buong gabi.', note: 'Naka-itim na suit at earpiece. Malalaki ang kamay.',
        greet: 'Nasa opisina ako ni Konsehal Medina. Itanong mo pa sa kaniya.',
        weak: 'Hindi mo ako mahuhuli sa ganyan. May abogado ang amo ko.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Cell site data: ang telepono ni Dante ay nasa Escolta 10:20–10:50 PM, hindi sa Ermita. At sa telepono ni Dizon, text kay Dante kahapon: "Kung hindi ako tutulungan ni Boss, ilalabas ko ang lahat."', unlock: ['cellsite', 'banta'] },
        statements: [{ t: 'Hindi ako pumunta sa Escolta ngayong gabi.', lie: { ev: ['earpiece', 'cellsite'], say: '...Dumaan ako. Utos ni Boss na kunin ang ilang papeles. Iyon lang.' } },
          { t: 'Hindi ko kilala si Rodel Dizon.', lie: { ev: ['banta'], say: 'Oo, kilala ko siya. Nagbabanta siyang magsalita. Pinapunta ako para... kausapin siya.' } }] }
    ],
    clues: [
      { id: 'briefcase', x: 330, y: 340, r: 28, thumbBefore: true, name: 'Briefcase — Nawawala ang mga Papeles', info: 'Briefcase ni Dizon. Sa CCTV, puno ito ng papeles bago ang krimen. Ngayon, wala nang laman.', say: 'Bukás ang briefcase... at wala na ang mga papeles!' },
      { id: 'tubo', x: 462, y: 370, r: 26, name: 'Bakal na Tubo', info: 'Bakal na tubo na may bahid ng dugo sa dulo. Ito ang ipinanghampas.', say: 'Bakal na tubo... ito ang ginamit.' },
      { id: 'earpiece', x: 250, y: 382, r: 20, name: 'Earpiece ng Security', info: 'Earpiece na pang-bodyguard, may kulot na kable. Nahulog sa agawan.', say: 'Earpiece... pang-security \'to, Inspector.' },
      { id: 'card', x: 140, y: 372, r: 20, name: 'Calling Card: "MEDINA SECURITY"', info: 'Itim na calling card na may gintong letra: "MEDINA SECURITY".', say: 'Calling card... "Medina Security."' },
      { id: 'lubid', x: 212, y: 318, r: 28, name: 'Kinalas na Lubid — Nawawalang Bangka', info: 'May nakataling bangkang de-motor dito sa CCTV. Ngayon, wala na — kinalas ang lubid. Dito tumakas ang salarin.', say: 'Nawala ang bangkang nakatali rito! Sakay nito tumakas ang salarin.' },
      { id: 'selyo', x: 545, y: 376, r: 24, meta: true, name: 'Selyong Uwak — "A.M."', info: 'Punit na sobre na may pulang wax seal: isang uwak, at ang mga letrang "A.M." Galing ito sa briefcase ni Dizon.', say: 'Selyong pula... uwak, at "A.M." Inspector, ito ang marka ng amo ni Dizon!' }
    ],
    records: {
      gps: { name: 'GPS Log ng Ferry', icon: 'log', info: 'Ferry 13: nasa Guadalupe station 10:15–10:48 PM. Si Mang Ambo ang bangkero.' },
      booth: { name: 'CCTV ng Ticket Booth', icon: 'cctv', info: 'Si Nympha, nagbibilang ng benta, 10:25–10:50 PM.' },
      patrol: { name: 'Litrato ng Barangay Patrol', icon: 'photo', info: 'Si Jake, nangingisda sa ilalim ng Jones Bridge, 10:35 PM.' },
      cellsite: { name: 'Cell Site Data ni Dante', icon: 'phone', info: 'Telepono ni Dante Cruz: Escolta tower, 10:20–10:50 PM.' },
      banta: { name: 'Text ni Dizon kay Dante', icon: 'phone', info: '"Kung hindi ako tutulungan ni Boss, ilalabas ko ang lahat. Nasa briefcase ko ang mga resibo."' }
    },
    timeline: [
      { t: '22:15', who: 'ambo', alibi: true, text: '"Nasa Guadalupe ako kasama ang ferry."' },
      { t: '22:20', who: 'victim', text: 'Huling kuha ng CCTV: naghihintay si Dizon sa pier, may dalang briefcase.' },
      { t: '22:25', who: 'nympha', alibi: true, text: '"Nagbibilang ako ng benta sa booth."' },
      { t: '22:30', who: 'jake', alibi: true, text: '"Nangingisda ako sa ilalim ng Jones Bridge."' },
      { t: '22:30', who: 'dante', alibi: true, text: '"Nasa opisina ako ni Konsehal sa Ermita."' },
      { t: '22:50', who: 'victim', text: 'Natagpuan ni Mang Ambo si Dizon sa pantalan.' }
    ],
    solution: { culprit: 'dante', slot1: ['tubo', 'earpiece'], slot2: ['briefcase', 'banta', 'cellsite', 'lubid'] },
    confess: [
      'Tatlong araw nang nagbabanta si Dizon na ilalabas ang lahat. Ang utos sa akin: kunin ang mga papeles... at siguraduhing hindi na siya makakapagsalita.',
      'Hindi ko pa nakikita ang mukha ni Boss sa mga utos. Pero laging may selyong uwak at "A.M." ang mga sulat.'
    ],
    metaId: 'selyo',
    metaText: 'Natagpuan: Selyong Uwak na may "A.M." Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: 'office', chars: [{ c: 'mateo', x: 150, y: 64, s: 6.6, e: 'shock' }], cap: 'Isang linggo matapos tumakas si Dizon.', beats: [{ sfx: 'KRIIING!', x: 54, y: 8, rot: -10, size: 50, color: '#ffd34a' }, { b: 'Inspector! Natagpuan si Kapitan Dizon sa pantalan ng ferry sa Escolta. Buhay pa, pero walang malay!', who: 'PO2 Jessa (telepono)', x: 44, y: 40, w: 52, tail: 'l' }] },
      { bg: { scene: 'c7', after: true, vb: '40 40 520 340' }, cap: 'Escolta Ferry Station, Ilog Pasig. 11:00 ng gabi.', beats: [{ sfx: 'PLOK... PLOK...', x: 8, y: 72, rot: -4, size: 36, color: '#cfe0ff' }] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'determined' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'determined', flip: true }], beats: [
        { b: 'Walang wallet, walang telepono. Pero bukás ang briefcase niya.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
        { b: 'May hinahanap sila sa kaniya. Ebidensya laban kay Ang Anino.', who: 'Mateo', x: 54, y: 6, w: 40, tail: 'r' }] }
    ]
  };

  /* ---------------- CASE 8 ---------------- */
  const c8 = {
    id: 'c8', chapter: 3, num: '008', title: 'Ang Imprenta ng Escolta', place: 'Lumang Imprenta, Escolta', time: 160, scene: A.sceneImprenta,
    beforeLabel: 'CCTV IMPRENTA · 18:45', afterLabel: 'SOCO · 19:50',
    victim: { name: 'Ka Lino Pascual', look: 'lino', desc: 'Beteranong mamamahayag na nag-iimbestiga sa korapsyon sa Konseho', cause: 'Nahulog sa hagdan — may palatandaan ng pagtulak', found: 'Sa paanan ng hagdan ng lumang imprenta', foundBy: 'Ricky (aprentis), 7:30 PM', windowText: '7:00 PM – 7:20 PM', weather: 'Malakas na ulan' },
    win: ['19:00', '19:20'],
    suspects: [
      { id: 'perla', name: 'Aling Perla', role: 'May-ari ng Imprenta', h: 152,
        alibi: 'Nasa ospital daw siya, nagpapa-checkup.', note: 'Matalik na kaibigan ni Ka Lino.',
        greet: 'Si Lino... sabi ko sa kaniya, tigilan na ang artikulong \'yon. Delikado.',
        deny: 'Nasa ospital ako, Inspector! Nandoon pa ang resibo ng checkup ko!',
        check: { ok: true, text: 'KUMPIRMADO — Log ng ospital: naka-checkup si Aling Perla 6:30–7:40 PM.', unlock: ['ospital'] },
        statements: [{ t: 'Walang nagbanta kay Lino.', lie: { ev: ['artikulo'], say: 'Sige na... may tumatawag sa kaniya gabi-gabi. "Tigilan mo ang Konsehal," sabi raw.' } }] },
      { id: 'ricky', name: 'Ricky', role: 'Aprentis sa Imprenta', h: 164,
        alibi: 'Nagde-deliver daw siya ng mga flyer sa Sta. Cruz.', note: 'Siya ang nakatagpo kay Ka Lino.',
        greet: 'Si Ka Lino ang nagturo sa akin ng lahat... hindi ko kaya \'to.',
        deny: 'Naka-GPS ang delivery app ko! Nasa Sta. Cruz ako!',
        check: { ok: true, text: 'KUMPIRMADO — Delivery app GPS: nasa Sta. Cruz si Ricky 6:50–7:25 PM.', unlock: ['delivery3'] },
        statements: [{ t: 'Walang ibang pumasok sa imprenta ngayong araw.', lie: { ev: ['tinta'], say: 'Teka... kaninang hapon, may lalaking may kamera na nagtanong kay Ka Lino tungkol sa "negatives."' } }] },
      { id: 'mercado', name: 'Atty. Mercado', role: 'Abogado (kaso ng libel)', h: 171,
        alibi: 'Nasa dinner meeting daw siya sa Intramuros.', note: 'Nagsampa ng libel case laban kay Ka Lino. Initials: A.M.',
        greet: 'Kliyente ko ang idinemanda ni Pascual. Pero sa korte ako lumalaban, hindi sa hagdan.',
        deny: 'Labindalawang tao ang kasama ko sa hapunan, Inspector. May resibo pa.',
        check: { ok: true, text: 'KUMPIRMADO — Restaurant sa Intramuros: nasa hapunan si Atty. Amado Mercado 6:30–8:30 PM, may 11 saksi.', unlock: ['hapunan'] },
        statements: [{ t: 'Ang "A.M." sa mga sulat? Hindi ako \'yan.' }] },
      { id: 'gener', name: 'Gener', role: 'Photographer ng Kampanya', h: 169,
        alibi: 'Nasa event daw siya ng Konsehal sa Tondo, kumukuha ng litrato.', note: 'Nawawala ang takip ng lente ng kamera niya.',
        greet: 'Buong gabi akong kumukuha ng litrato sa Tondo, Inspector.',
        weak: 'Puro hula \'yan. Wala kang patunay na ako \'yon.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Ang mga litrato niya sa event: huling kuha 6:40 PM, sunod na kuha 7:45 PM — may isang oras na puwang. At ang taxi app: Tondo → Escolta, 6:48 PM.', unlock: ['camera', 'taxi'] },
        statements: [{ t: 'Hindi ako umalis sa event sa Tondo.', lie: { ev: ['taxi', 'camera'], say: '...Umalis ako saglit. May pinakuha lang sa akin si Boss.' } },
          { t: 'Hindi ko alam ang tungkol sa anumang negatives.', lie: { ev: ['negatives', 'lenscap'], say: 'Ang negatives... may mga litrato si Lino na hindi dapat lumabas. Inutos sa akin na kunin.' } }] }
    ],
    clues: [
      { id: 'negatives', x: 420, y: 108, r: 34, thumbBefore: true, name: 'Nawawalang Film Negatives', info: 'Dalawang strip ng negatives ang nakasabit sa CCTV bago ang krimen. Ngayon, wala na — pinutol at kinuha.', say: 'Kulang na ang mga negatives na nakasabit! May kumuha.' },
      { id: 'artikulo', x: 110, y: 258, r: 28, name: 'Pinunit na Pahina sa Makinilya', info: 'Pinunit ang artikulo ni Ka Lino. Sa natirang piraso: "ANG ANINO NG KONSE—".', say: 'Pinunit ang artikulo... "Ang Anino ng Konse—" Konseho?!' },
      { id: 'hagdan', x: 528, y: 252, r: 28, name: 'Sirang Hawakan ng Hagdan', info: 'Nabali ang hawakan ng hagdan — may nag-agawan dito bago nahulog si Ka Lino.', say: 'Sira ang hawakan ng hagdan... may nag-agawan dito.' },
      { id: 'tinta', x: 380, y: 372, r: 30, name: 'Bakas ng Sapatos na may Tinta', info: 'Mga bakas ng sapatos na may asul na tinta ng imprenta, papunta sa pinto. Size 9.', say: 'Mga bakas na may tinta! Dito siya dumaan palabas.' },
      { id: 'lenscap', x: 212, y: 382, r: 20, name: 'Takip ng Lente "GL"', info: 'Takip ng lente ng propesyonal na kamera, may nakasulat na "GL".', say: 'Takip ng lente ng kamera... may initials na "GL".' },
      { id: 'diyaryo', x: 90, y: 378, r: 22, meta: true, name: 'Lumang Diyaryo: "Presinto 13, 2014"', info: 'Ginupit na diyaryo: "Pagbubukas ng bagong Presinto 13." Sa litrato: isang KONSEHAL kasama si Dizon, may suot na singsing na uwak. Punit ang pangalan.', say: 'Lumang diyaryo... isang konsehal sa pagbubukas ng Presinto 13. May singsing na uwak siya!' }
    ],
    records: {
      ospital: { name: 'Log ng Ospital', icon: 'log', info: 'Aling Perla — checkup, 6:30–7:40 PM.' },
      delivery3: { name: 'GPS ng Delivery App', icon: 'phone', info: 'Si Ricky sa Sta. Cruz, 6:50–7:25 PM.' },
      hapunan: { name: 'Resibo ng Hapunan sa Intramuros', icon: 'receipt', info: 'Atty. Amado Mercado at 11 bisita, 6:30–8:30 PM.' },
      camera: { name: 'Metadata ng Kamera ni Gener', icon: 'photo', info: 'Huling kuha sa Tondo: 6:40 PM. Sunod: 7:45 PM. Isang oras na walang litrato.' },
      taxi: { name: 'Taxi App ni Gener', icon: 'phone', info: 'Tondo → Escolta, pickup 6:48 PM. Escolta → Tondo, 7:28 PM.' }
    },
    timeline: [
      { t: '18:30', who: 'perla', alibi: true, text: '"Nasa ospital ako para sa checkup."' },
      { t: '18:30', who: 'mercado', alibi: true, text: '"May dinner meeting ako sa Intramuros."' },
      { t: '18:40', who: 'gener', alibi: true, text: '"Nasa event ako ng Konsehal sa Tondo."' },
      { t: '18:45', who: 'victim', text: 'Huling kuha ng CCTV: nagta-type si Ka Lino sa makinilya.' },
      { t: '18:50', who: 'ricky', alibi: true, text: '"Nagde-deliver ako ng flyers sa Sta. Cruz."' },
      { t: '19:30', who: 'victim', text: 'Natagpuan ni Ricky si Ka Lino sa paanan ng hagdan.' }
    ],
    solution: { culprit: 'gener', slot1: ['tinta', 'lenscap', 'hagdan'], slot2: ['negatives', 'taxi', 'camera'] },
    confess: [
      'May mga litrato si Ka Lino — si Boss at si Dizon, nag-aabutan ng pera. Inutos sa akin na kunin ang negatives.',
      'Hindi ko siya sinadyang itulak... nag-agawan kami sa hagdan. "Ang Anino" ang tawag nila kay Boss. At siya ang may-ari ng kampanyang pinagtatrabahuhan ko.'
    ],
    metaId: 'diyaryo',
    metaText: 'Natagpuan: Lumang Diyaryo — isang Konsehal sa pagbubukas ng Presinto 13. Idinagdag sa corkboard.',
    intro: [
      { bg: 'street', cap: 'Escolta. 7:45 ng gabi.', beats: [{ sfx: 'KIDLAT!', x: 56, y: 8, rot: -8, size: 50, color: '#fff7c0', flash: true }] },
      { bg: { scene: 'c8', after: true, vb: '40 40 520 340' }, cap: 'Ang lumang imprenta ni Aling Perla.', beats: [] },
      { bg: 'street', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'sad' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'determined', flip: true }], beats: [
        { b: 'Si Ka Lino Pascual, mamamahayag. Nahulog daw sa hagdan... pero sinusulat niya ang tungkol sa korapsyon sa Konseho.', who: 'PO2 Jessa', x: 2, y: 4, w: 48, tail: 'l' },
        { b: 'Walang aksidente kapag Ang Anino ang pinag-uusapan.', who: 'Mateo', x: 56, y: 6, w: 38, tail: 'r' }] }
    ]
  };

  /* ---------------- CASE 9 ---------------- */
  const c9 = {
    id: 'c9', chapter: 3, num: '009', title: 'Gala para sa Maynila', place: 'Grand Ballroom, Manila Grand Hotel', time: 150, scene: A.sceneGala,
    partner: { c: 'nards', name: 'SPO1 NARDS BAUTISTA · SOCO' },
    beforeLabel: 'CCTV BALLROOM · 19:55', afterLabel: 'SOCO · 20:40',
    victim: { name: 'PO2 Jessa Dimaculangan', look: 'jessa', desc: 'Partner ni Mateo — nag-iimbestiga nang palihim sa gala', cause: 'Nalason ang inumin — buhay, nasa ospital', found: 'Sa Mesa 7 ng Grand Ballroom', foundBy: 'Paolo (waiter), 8:15 PM', windowText: '8:00 PM – 8:15 PM', weather: 'Sa loob ng hotel' },
    win: ['20:00', '20:15'],
    suspects: [
      { id: 'paolo', name: 'Paolo', role: 'Waiter ng Hotel', h: 168,
        alibi: 'Nagse-serve daw siya sa Mesa 1 hanggang 5.', note: 'Siya ang nagdala ng inumin sa Mesa 7 nang 7:50.',
        greet: 'Sir, ako po ang nagdala ng inumin niya... pero malinis po \'yon!',
        deny: 'Kita po ako sa video ng event photographer, Sir! Nasa kabilang dulo ako!',
        check: { ok: true, text: 'KUMPIRMADO — Video ng event: nagse-serve si Paolo sa Mesa 1–5, 7:58–8:20 PM.', unlock: ['eventvid'] },
        statements: [{ t: 'Walang ibang humawak ng baso ni Ma\'am Jessa.', lie: { ev: ['hallway'], say: 'Ah... iniwan ko po saglit ang tray sa pantry. Baka may dumaan doon.' } }] },
      { id: 'marga', name: 'Chef Marga', role: 'Head Chef', h: 158,
        alibi: 'Nasa kusina raw siya buong oras.', note: 'Siya lang ang may hawak ng susi ng pantry — o iyon ang akala niya.',
        greet: 'Walang lason na lumalabas sa kusina ko, Inspector!',
        deny: 'May CCTV ang kusina ko! Tingnan mo!',
        check: { ok: true, text: 'KUMPIRMADO — CCTV ng kusina: nasa kusina si Chef Marga 7:45–8:30 PM.', unlock: ['kitchen'] },
        statements: [{ t: 'Ako lang ang may susi ng pantry ng inumin.', lie: { ev: ['hallway'], say: 'Teka... may duplicate pala. Hiningi ng opisina ni Konsehal para sa "seguridad."' } }] },
      { id: 'mercado', name: 'Atty. Mercado', role: 'Panauhing Tagapagsalita', h: 171,
        alibi: 'Nasa entablado raw siya, nagbibigay ng talumpati.', note: 'Siya rin ang abogado sa kaso ni Ka Lino. Initials: A.M.',
        greet: 'Na naman, Inspector? Nasa entablado ako, kita ng 300 na bisita.',
        deny: 'Livestream ang buong talumpati ko. Hindi ako bumaba ng entablado.',
        check: { ok: true, text: 'KUMPIRMADO — Livestream: nasa entablado si Atty. Mercado 7:55–8:18 PM.', unlock: ['livestream2'] },
        statements: [{ t: 'Hindi ako ang "A.M." na hinahanap mo.' }] },
      { id: 'lorie', name: 'Ms. Lorie Vidal', role: 'Executive Secretary ng Konsehal', h: 163,
        alibi: 'Nasa backstage raw siya, inaayos ang talumpati ng Konsehal.', note: 'Nakasuot ng iisang puting guwantes. Nasaan ang isa pa?',
        greet: 'Masyado akong abala para sa ganitong drama, Inspector.',
        weak: 'Kahit sino ay puwedeng magkaroon niyan. Ilabas mo ang tunay mong ebidensya.',
        check: { ok: false, text: 'HINDI KUMPIRMADO — Walang nakakita sa kaniya sa backstage 8:00–8:15. Sa CCTV ng hallway: pumasok siya sa pantry ng inumin nang 8:04 PM, gamit ang duplicate na susi.', unlock: ['hallway'] },
        statements: [{ t: 'Hindi ako umalis sa backstage.', lie: { ev: ['hallway', 'glove'], say: '...Pumunta ako sa pantry. Para kumuha ng tubig para kay Konsehal.' } },
          { t: 'Hindi ko kilala ang pulis na \'yon.', lie: { ev: ['speechcard'], say: 'Ang card na \'yan... utos \'yan sa akin. Hindi ako ang sumulat.' } }] }
    ],
    clues: [
      { id: 'glass', x: 388, y: 312, r: 24, name: 'Basong Natapon ni Jessa', info: 'Natapon ang baso ni Jessa. May puting bakas sa loob — pampatulog na dinurog.', say: 'Ang baso ni Jessa... may puting bakas!' },
      { id: 'vial', x: 306, y: 288, r: 18, name: 'Boteng Itinago sa Bulaklak', info: 'Maliit na bote ng pampatulog, itinago sa centerpiece ng Mesa 7.', say: 'May bote sa loob ng bulaklak! Dito itinago ang lason.' },
      { id: 'glove', x: 180, y: 380, r: 24, name: 'Puting Guwantes na Seda', info: 'Isang puting guwantes na seda, pambabae. May bakas ng pulbos sa daliri.', say: 'Guwantes na seda... may pulbos sa dulo ng daliri.' },
      { id: 'speechcard', x: 512, y: 262, r: 22, name: 'Card: "Ayusin ang pulis sa Mesa 7"', info: 'Card mula sa talumpati ng Konsehal. Sulat-kamay sa likod: "Ayusin ang pulis sa Mesa 7. — A.M."', say: '"Ayusin ang pulis sa Mesa 7"... pirmado ng A.M.!' },
      { id: 'phone', x: 430, y: 380, r: 22, name: 'Cellphone ni Jessa', info: 'Huling text ni Jessa kay Mateo, hindi naipadala: "Inspector, alam ko na kung sino siya. Ang singsing—"', say: 'Telepono ni Jessa... "Alam ko na kung sino siya. Ang singsing—"' },
      { id: 'singsing', x: 468, y: 184, r: 20, meta: true, name: 'Singsing na Uwak', info: 'Gintong singsing na may itim na uwak. Naiwan sa podium — kung saan nagsalita ang host ng gala, si Konsehal Arturo Medina, bago si Atty. Mercado.', say: 'Ang singsing na uwak! Naiwan sa podium.' }
    ],
    records: {
      eventvid: { name: 'Video ng Event Photographer', icon: 'video', info: 'Si Paolo, nagse-serve sa Mesa 1–5, 7:58–8:20 PM.' },
      kitchen: { name: 'CCTV ng Kusina', icon: 'cctv', info: 'Si Chef Marga sa kusina, 7:45–8:30 PM.' },
      livestream2: { name: 'Livestream ng Gala', icon: 'video', info: 'Atty. Mercado sa entablado, 7:55–8:18 PM. Bago siya, si Konsehal Medina ang nagsalita (7:40–7:55).' },
      hallway: { name: 'CCTV ng Hallway', icon: 'cctv', info: 'Si Lorie Vidal, pumasok sa pantry ng inumin nang 8:04 PM gamit ang duplicate na susi.' }
    },
    timeline: [
      { t: '19:45', who: 'marga', alibi: true, text: '"Nasa kusina ako buong gabi."' },
      { t: '19:50', who: 'victim', text: 'Dinala ni Paolo ang inumin sa Mesa 7.' },
      { t: '19:55', who: 'mercado', alibi: true, text: '"Nasa entablado ako, nagtatalumpati."' },
      { t: '19:58', who: 'paolo', alibi: true, text: '"Nagse-serve ako sa Mesa 1 hanggang 5."' },
      { t: '20:00', who: 'lorie', alibi: true, text: '"Nasa backstage ako, inaayos ang talumpati."' },
      { t: '20:15', who: 'victim', text: 'Bumagsak si Jessa sa Mesa 7. Isinugod sa ospital.' }
    ],
    solution: { culprit: 'lorie', slot1: ['vial', 'glass', 'glove'], slot2: ['speechcard', 'hallway'] },
    confess: [
      'Utos ng Konsehal. "Masyado nang malapit ang pulis na \'yan," sabi niya. Pampatulog lang daw — hindi raw siya mamamatay.',
      'Hindi ko masasabi ang pangalan niya... takot ako. Pero ang singsing na \'yan? Hindi niya \'yan inaalis. Kailanman.'
    ],
    metaId: 'singsing',
    metaText: 'Natagpuan: Singsing na Uwak. Idinagdag sa corkboard ni Mateo.',
    intro: [
      { bg: { scene: 'c9', after: false, vb: '40 40 520 340' }, cap: 'Manila Grand Hotel. Gala para sa Maynila.', beats: [{ sfx: '♪ ♫ ♪', x: 10, y: 30, rot: -6, size: 34, color: '#ffe7ae' }, { sfx: 'KRASH!', x: 50, y: 60, rot: 8, size: 52, color: '#ff4f6a' }] },
      { bg: 'interrog', chars: [{ c: 'mateo', x: 260, y: 44, s: 7.6, e: 'shout' }], cap: 'Bumagsak si Jessa sa gitna ng gala.', beats: [{ b: 'JESSA!!', who: 'Mateo', x: 4, y: 10, w: 30, tail: 'r' }] },
      { bg: 'street', chars: [{ c: 'nards', x: 150, y: 70, s: 6.4, e: 'determined' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'angry', flip: true }], beats: [
        { b: 'Buhay siya, Inspector. Pampatulog ang nasa inumin. Ako muna ang SOCO mo ngayong gabi.', who: 'SPO1 Nards', x: 2, y: 4, w: 48, tail: 'l' },
        { b: 'Sinubukan nilang patahimikin si Jessa. Ngayong gabi, tatapusin ko na \'to.', who: 'Mateo', x: 52, y: 6, w: 44, tail: 'r' }] }
    ]
  };

  const FINALE3 = [
    { bg: 'cork', cap: '"A.M." Isang Konsehal sa Presinto 13. Ang singsing na uwak.', chars: [{ c: 'mateo', x: 380, y: 70, s: 6.4, e: 'determined', flip: true }], beats: [{ b: 'Konsehal Arturo Medina. Ikaw si Ang Anino.', who: 'Mateo', x: 4, y: 30, w: 38, tail: 'r' }] },
    { bg: 'street', chars: [{ c: 'mateo', x: 150, y: 56, s: 6.6, e: 'determined' }, { c: 'jessa', x: 380, y: 70, s: 6.4, e: 'determined', flip: true }], cap: 'Kinaumagahan. Ospital.', beats: [
      { b: 'Ang singsing, Inspector... siya ang may suot noong gala.', who: 'PO2 Jessa', x: 52, y: 4, w: 44, tail: 'r' },
      { b: 'Magpahinga ka. Ako na ang bahala. Ngayong gabi, haharapin ko siya.', who: 'Mateo', x: 2, y: 4, w: 46, tail: 'l' }] },
    { bg: 'interrog', chars: [{ c: 'medina', x: 260, y: 56, s: 7.4, e: 'smug' }], cap: 'Presinto 13. Silid ng interogasyon.', beats: [{ b: 'Inspector Reyes. Ang anak ni Ernesto. Ano\'ng maipaglilingkod ko?', who: 'Konsehal Arturo Medina', x: 52, y: 4, w: 44, tail: 'l' }, { sfx: 'ANG HULING INTEROGASYON', x: 6, y: 80, rot: -3, size: 34, color: '#ff4f6a' }] }
  ];

  const BOSS = {
    char: 'medina', name: 'Konsehal Arturo Medina', role: 'Ang Anino?',
    greet: 'Wala kang ebidensya, Inspector. Ako ang Konsehal na nagpatayo ng mga paaralan at ospital. Ikaw? Isang pulis na naghahabol ng multo.',
    statements: [
      { t: 'Hindi ako kailanman nagkaroon ng kinalaman sa Presinto 13.', ev: ['diyaryo', 'radio'], say: 'Ang litratong \'yan... pagbubukas lang \'yon. Isang seremonya. Lahat ng opisyal ay naroon!' },
      { t: 'Hindi ko kilala ang mga taong \'yan — sina Dizon, Dante, Gener, Lorie.', ev: ['selyo', 'roster'], say: 'Ang selyo... maraming tao ang may initials na "A.M."!' },
      { t: 'Ang uwak? Simbolo lang \'yan ng isang lumang club.', ev: ['singsing', 'matchbook'], say: '...Ang singsing ko. Naiwan ko sa podium. Hindi ibig sabihin—' },
      { t: 'Wala akong kinalaman sa pagkamatay ni SPO4 Ernesto Reyes.', ev: ['ticket', 'litrato'], say: 'Ang tiket na A-13... Isinanla ni Ernesto ang relo niya para bayaran ang impormante. Ako ang tumubos nito kinagabihan para burahin ang bakas— ...Paano mo nalaman?!' }
    ],
    wrong: ['Hahaha. Iyan na ba ang pinakamagaling mo?', 'Walang kinalaman \'yan, Inspector.', 'Sayang ang oras ko.', 'Ganyan din mag-isip ang tatay mo. Kaya siya natalo.']
  };

  const ENDING = [
    { bg: 'interrog', chars: [{ c: 'mateo', x: 130, y: 50, s: 7.4, e: 'shout', pose: 'point' }, { c: 'medina', x: 400, y: 64, s: 7, e: 'shock', flip: true }], beats: [
      { sfx: 'BLAG!', x: 4, y: 64, rot: -12, size: 60, color: '#ffd34a' },
      { b: 'Konsehal Arturo Medina — IKAW SI ANG ANINO! Arestado ka sa pagpatay kay SPO4 Ernesto Reyes, at sa lahat ng iniutos mo!', who: 'Mateo', x: 3, y: 4, w: 52, tail: 'l' }] },
    { bg: 'dark', chars: [{ c: 'medina', x: 260, y: 60, s: 7.4, e: 'sad' }], beats: [{ b: 'Ang dilim ng Maynila... hindi nawawala, Inspector. Lumilipat lang.', who: 'Ang Anino', x: 50, y: 10, w: 46, tail: 'l', dark: true }] },
    { bg: 'office', chars: [{ c: 'jessa', x: 150, y: 70, s: 6.4, e: 'neutral' }, { c: 'mateo', x: 380, y: 56, s: 6.6, e: 'neutral', flip: true }], cap: 'Makalipas ang isang linggo.', beats: [
      { b: 'Nahuli mo na siya, Inspector. Pati sina Dizon at ang buong sindikato.', who: 'PO2 Jessa', x: 2, y: 4, w: 46, tail: 'l' },
      { b: 'Nahuli NATIN, Jessa. Hindi ko \'to magagawa nang mag-isa.', who: 'Mateo', x: 54, y: 6, w: 40, tail: 'r' }] },
    { bg: 'dawn', chars: [{ c: 'mateo', x: 200, y: 50, s: 7.4, e: 'closed' }], cap: 'Manila North Cemetery. Madaling-araw.', beats: [
      { b: 'Tay... tapos na. Makakapagpahinga ka na.', who: 'Mateo', x: 46, y: 10, w: 46, tail: 'l' },
      { sfx: 'WAKAS', x: 54, y: 66, rot: -4, size: 64, color: '#ffe7ae' }] }
  ];

  K.CASES.push(c7, c8, c9);
  K.METAS.push(
    { id: 'selyo', caseId: 'c7', name: 'Selyong Uwak "A.M."', from: 'Kaso #007', chapter: 3 },
    { id: 'diyaryo', caseId: 'c8', name: 'Diyaryo — Konsehal', from: 'Kaso #008', chapter: 3 },
    { id: 'singsing', caseId: 'c9', name: 'Singsing na Uwak', from: 'Kaso #009', chapter: 3 }
  );
  K.CHAPTERS.push({ n: 3, title: 'Kabanata 3: Ang Anino', question: 'Sino si Ang Anino?', options: ['Atty. Amado Mercado', 'Konsehal Arturo Medina', 'Don Alfonso Montenegro', 'Kapt. Rodel Dizon'], answer: 1, wrong: 'Hindi tugma. Tatlong palatandaan: "A.M.", isang KONSEHAL sa Presinto 13, at ang may-ari ng singsing na uwak.', finale: FINALE3, boss: true, note: 'KONSEHAL ARTURO MEDINA — ANG ANINO. Nahuli na. Makakapagpahinga ka na, Tay.', reward: 1000 });
  K.BOSS = BOSS; K.ENDING = ENDING;
  K.CREDITS = [
    ['KASO: DILIM NG MAYNILA', ''],
    ['Isang misteryo ng Maynila', 'Kabanata 1 – 3'],
    ['Konsepto at Gabay ng Laro', 'Ang may-ari ng proyekto'],
    ['Kuwento, Code at Guhit', 'Ginawa gamit ang Claude Code'],
    ['Musika at Tunog', 'Nililikha ng WebAudio habang naglalaro'],
    ['Mga Lugar', 'Binondo · Ermita · Malate · Quiapo · Divisoria · Intramuros · Escolta'],
    ['Para sa lahat ng tapat na pulis', 'at sa mga mamamahayag ng Maynila'],
    ['SALAMAT SA PAGLALARO!', '']
  ];
})();
