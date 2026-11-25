/* =========================================================
   KASO — ENGLISH TEXT, CHAPTER 1 (+ shared)
   Overlay: same shape as the Filipino data, text fields only.
   Arrays merge by index; {} keeps the original entry.
   ========================================================= */
(function () {
  'use strict';
  window.KASO_EN = window.KASO_EN || { cases: {} };
  const E = window.KASO_EN;

  E.PROLOGUE = [
    { cap: 'Manila. Rainy season. Eleven at night.', beats: [{ sfx: 'KA-BOOM!' }, { sfx: 'Drip-drip-drip...' }] },
    { cap: 'Inspector Mateo Reyes, Manila Police District — Investigation Section.', beats: [{ b: "Ten years, Dad. Ang Anino still hasn't been caught." }] },
    { cap: 'SPO4 Ernesto Reyes — killed while chasing the culprit they called "Ang Anino" (The Shadow). No trace. No face.' },
    { beats: [{}, { b: "Inspector! There's a body under Jones Bridge! Hurry!", who: 'PO2 Jessa (phone)' }] },
    { beats: [{ b: "On my way. No crime is ever without a trace." }] }
  ];

  E.FINALE1 = [
    { cap: 'A-13. XIII. Room 13.', beats: [{ b: "This is no coincidence." }] },
    { beats: [{ b: "Dad... Precinct 13. That's where you were posted that night." }] },
    { beats: [{}, { b: "Well done, Inspector Reyes. You're even better than your father.", who: '???' }, { b: "But the darkness of Manila... is not something you can light up.", who: 'Ang Anino' }, { sfx: 'CLICK.' }] },
    { beats: [{ b: "I'll find you, Anino. No matter how dark the place you hide in." }, { sfx: 'TO BE CONTINUED IN CHAPTER 2' }] }
  ];

  E.cases.c1 = {
    title: 'Secret Under the Bridge',
    victim: { desc: 'Wealthy owner of Villareal Pawnshop in Quiapo', cause: 'Heavy blow to the head (initial estimate)', found: 'Inside her parked sedan near Jones Bridge', foundBy: 'Kuya Ben (driver), 7:20 PM', weather: 'Heavy rain' },
    suspects: [
      { role: 'Night Security Guard', alibi: 'Says he was patrolling the back alley, far from the bridge, around 7:00 PM.', note: 'Wears size 10 boots. His uniform sleeve is freshly torn.',
        greet: "Me? I was just doing my rounds in the alley, Inspector. Just my job.", weak: "Ha! That's all? That's not enough to lock me up, Inspector.",
        check: { text: "NOT CONFIRMED — No witnesses or CCTV in the alley. And in the Villareal Pawnshop ledger: Mang Kanor owes ₱85,000, and Donya Carmen had threatened to sue him." },
        statements: [{ t: "I never went near Donya Carmen's car all night.", lie: { say: "...Fine! I went over. I was only checking she was all right in that rain!" } }, { t: 'I have no problem with the pawnshop.', lie: { say: "Yes, I owe money. But everybody owes somebody, right, Inspector?" } }] },
      { role: 'Food Stall Vendor', alibi: 'Says she closed her carinderia at 6:45 PM because of the rain.', note: 'Her stall was padlocked on the street CCTV at 6:48 PM.',
        greet: "Dear God, Donya Carmen... she was a regular for my kare-kare.", deny: "Inspector, my stall was closed by 6:48! It's on CCTV — I was already on a jeepney!",
        check: { text: 'CONFIRMED — Street CCTV: she padlocked the stall at 6:48 PM and boarded a jeepney to Sta. Cruz at 6:52 PM.' },
        statements: [{ t: "I didn't leave my stall until 7:30.", lie: { say: "Oh... it's true, I closed at 6:48. I was just embarrassed to admit I went home early." } }, { t: 'Donya Carmen was kind to all of us vendors.' }] },
      { role: "Victim's Nephew", alibi: 'Says he was stuck in EDSA traffic the whole time.', note: 'He is the heir to the pawnshop.',
        greet: "Look, Inspector, I'm her nephew. Why would I do that?", deny: "I was twelve kilometers away! Check my toll and parking ticket!",
        check: { text: 'CONFIRMED — Toll and parking ticket: his car entered a parking lot in Ortigas at 7:03 PM, 12 km away.' },
        statements: [{ t: 'I was on EDSA the whole time, stuck in traffic.', lie: { say: "Fine — I was off EDSA by then. I was already parked in Ortigas. That's still 12 kilometers away!" } }, { t: "I don't need my aunt's money." }] },
      { role: 'Family Driver', alibi: 'Says he stepped out to buy pandesal and hot coffee.', note: 'He found the victim at 7:20 PM.',
        greet: "Sir, I only stepped away for a moment... I wish I had never left her.", deny: "I was at the bakery, Sir! Here's the receipt — 7:04!",
        check: { text: 'CONFIRMED — Bakery receipt: 7:04 PM, three blocks away. He is also on the bakery CCTV until 7:16 PM.' },
        statements: [{ t: 'I never left the car, not even for a moment.', lie: { say: "Forgive me, Sir... I went to buy pandesal. Just twelve minutes. I didn't know that..." } }] }
    ],
    clues: [
      { name: 'Muddy Bootprint', info: 'Size 10, heavy tread — security or work boots. Right next to the driver\'s door.', say: "A bootprint! Size 10, Inspector. Someone heavy stood here." },
      { name: 'Torn Blue Fabric', info: 'Dark blue uniform fabric snagged on the door handle. It has the yellow stitching of a security agency.', say: "Fabric caught on the door handle... blue, like a uniform!" },
      { name: 'Broken Dashboard Clock', info: 'Stopped at 7:05 PM — the moment of the struggle inside the car.', say: "The clock stopped at 7:05! This is when it happened." },
      { name: 'Missing Vault Key', info: "Donya Carmen's purse is open. The gold master key to the pawnshop vault is gone.", say: "The gold key is gone from the key ring! Robbery is the motive." },
      { name: 'Bent Side Mirror', info: 'Broken during a struggle at the door. Someone fought back.', say: "The side mirror is bent — someone fought back here." },
      { name: 'Pawn Ticket "A-13"', info: 'An old pawn ticket coded "A-13". It is not from Villareal Pawnshop. Who left it under the wiper?', say: "Inspector... someone left a ticket under the wiper. \"A-13\". That's not normal." }
    ],
    records: {
      cctv1: { name: "CCTV: Ate Lorna's Stall", info: 'Carinderia padlocked at 6:48 PM. Boarded a jeepney to Sta. Cruz at 6:52 PM.' },
      toll: { name: 'Toll and Parking Ticket', info: "Sir Marco's car: entered a parking lot in Ortigas at 7:03 PM — 12 km from the bridge." },
      bakery: { name: 'Bakery Receipt', info: '"Pandesal x10, Barako Coffee x1" — 7:04 PM, three blocks away.' },
      utang: { name: 'Pawnshop Debt Ledger', info: 'Mang Kanor owes ₱85,000 to Villareal Pawnshop. Last reminder: "Pay before Friday or I will sue you." — D.C.' }
    },
    timeline: [
      { text: 'Donya Carmen left the pawnshop in Quiapo with Kuya Ben.' },
      { text: '"I closed the carinderia at 6:45 because of the rain."' },
      { text: 'Last frame on CCTV CAM-03: the sedan is parked under the bridge.' },
      { text: '"I got out to buy pandesal and coffee at the corner."' },
      { text: '"I was patrolling the back alley, far from the bridge."' },
      { text: '"I was stuck in traffic on EDSA."' },
      { text: 'Kuya Ben found Donya Carmen and called 911.' }
    ],
    confess: [
      "Yes! It was me! I'm drowning in debt... I only wanted the key so I could wipe my name from the ledger.",
      "I didn't mean it... she fought back! But it wasn't my idea. There was a man in black — he gave me that ticket. \"Leave it in the car,\" he said."
    ],
    metaText: 'Found: Pawn Ticket "A-13". Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'Jones Bridge, Binondo. 7:40 PM.', beats: [{}, { sfx: 'Drip-drip-drip...' }] },
      { beats: [{ b: 'Inspector! Donya Carmen Villareal, owner of a pawnshop in Quiapo. Found inside her own car.' }, { b: 'Time of death?' }, { b: 'Between 7:00 and 7:15. It was pouring, so hardly anyone saw anything.' }] },
      { cap: 'Four people were nearby when it happened.', beats: [{ sfx: 'SOMEONE IS LYING!' }] },
      { beats: [{ b: "Four suspects. One culprit. Let's begin." }] }
    ]
  };

  E.cases.c2 = {
    title: 'The Missing Boundary',
    victim: { desc: 'Operator of 12 jeepneys on the Lawton–Divisoria route', cause: 'Struck on the head with a steel tool — alive but unconscious (at PGH)', found: 'Behind Jeep #07, Lawton Terminal', foundBy: 'Totoy (barker), 9:20 PM', weather: 'Drizzle' },
    suspects: [
      { role: 'Terminal Barker', alibi: 'Says he was calling passengers at the front of the line the whole time.', note: 'His voice is hoarse. He found Mang Turing.',
        greet: 'Boss, I was shouting all night! "Quiapo! Divisoria! One more seat!" My voice is gone, see?', deny: "I was live on Kuya Jaypee's vlog, Inspector! Watch it — I'm on screen the whole time!",
        check: { text: 'CONFIRMED — A vlogger streamed live at the terminal 9:00–9:25 PM. Totoy is seen and heard the whole time.' },
        statements: [{ t: "I didn't notice anything strange at the terminal.", lie: { say: "Wait... yes! Mang Pido switched his signboard to \"GARAHE\". I thought he was just tired." } }] },
      { role: 'Driver of Jeep #07', alibi: 'Says he was on a trip to Divisoria from 9:00, back at 9:30.', note: 'His hands are freshly washed, but there is still black under his nails.',
        greet: 'I was on the road, Inspector. Divisoria. Ask my passengers.', weak: "So what? You can't catch me with just that.",
        check: { text: "NOT CONFIRMED — In the dispatcher's logbook, Jeep #07 never logged out tonight. Also: he is ₱32,000 behind on his boundary, and Mang Turing was about to take back the jeep." },
        statements: [{ t: 'I was on a trip to Divisoria from 9:00.', lie: { say: "...I never left. I was behind the jeep, fixing the engine." } }, { t: "I'm paid up on my boundary.", lie: { say: "Fine! I'm behind. But I'm no thief!" } }] },
      { role: 'Balut Vendor', alibi: 'Says she crossed the street to buy phone load.', note: 'Her basket was left behind at the terminal.',
        greet: "Balut? Penoy? ...Oh, sorry. I'm just nervous.", deny: "I have a GCash receipt, 9:12! I was across the street, Inspector!",
        check: { text: 'CONFIRMED — GCash receipt from the sari-sari store across the street: 9:12 PM. She dropped her basket when she heard the shout.' },
        statements: [{ t: 'I never left my basket.', lie: { say: "I dropped it when someone screamed! I ran across the street, I was so scared." } }] },
      { role: 'Rival Operator', alibi: 'Says he was at a wake in Tondo all night.', note: "Mang Turing's longtime rival on the route.",
        greet: "Turing was my rival, yes. But I'm not an animal.", deny: "Twenty people were with me at the wake. Want to call them one by one?",
        check: { text: 'CONFIRMED — More than 20 witnesses at the wake in Tondo, including a barangay councilor. There is even a photo on Facebook, 9:10 PM.' },
        statements: [{ t: "If I wanted to bring Turing down, I'd do it in business, not like this." }] }
    ],
    clues: [
      { name: 'Signboard: "GARAHE" (Garage)', info: 'Before the crime: "DIVISORIA". After: "GARAHE". Jeep #07 never left!', say: 'Wait — the signboard says "GARAHE" now? I thought Jeep #07 was out on a trip?' },
      { name: 'Missing Boundary Cash Box', info: "A blue metal box with ₱48,500 — the whole line's takings for the day.", say: "The boundary cash box is gone from the dispatcher's table!" },
      { name: 'Greasy Handprint', info: 'Black engine grease, from the hands of someone who had just been working on a jeep.', say: "A handprint... that's engine grease!" },
      { name: 'Open Toolbox of Jeep #07', info: "Jeep #07's toolbox is open. The lug wrench is missing.", say: "The jeep's toolbox is open, and something is missing." },
      { name: 'Lug Wrench with Blue Tape', info: "Blood on the tip. The handle is wrapped in blue electrical tape — Mang Pido's trademark on all his tools.", say: "A lug wrench! There's still a stain... this was the weapon." },
      { name: 'Tipped-Over Balut Basket', info: 'Aling Nena dropped it when she heard the scream. It is not a weapon.', say: 'Balut everywhere... did someone run off in a hurry?' },
      { name: 'Amulet Marked "XIII"', info: 'A brass amulet with an eye inside a triangle, "XIII" engraved on the back. The same number as the pawn ticket...', say: 'An amulet... engraved "XIII". Inspector, thirteen again!' }
    ],
    records: {
      vlog: { name: "Vlogger's Live Video", info: '9:00–9:25 PM: Totoy is seen and heard calling passengers at the front of the line.' },
      gcash: { name: "Aling Nena's GCash Receipt", info: "₱50 load — Aling Baby's store, across the street. 9:12 PM." },
      lamay: { name: 'Photo from the Wake in Tondo', info: 'Sir Dado with 20+ people at the wake. Posted on Facebook, 9:10 PM.' },
      logbook: { name: "Dispatcher's Logbook", info: 'Jeep #07 — NO log-out tonight. Last trip: 7:40 PM.' },
      atraso: { name: 'Boundary Arrears List', info: 'Pido Bautista — ₱32,000. "Final warning: I\'m taking back the jeep on Monday." — Turing' }
    },
    timeline: [
      { text: "Mang Turing counted the boundary money at the dispatcher's table (CCTV)." },
      { text: '"I left for Divisoria at 9:00."' },
      { text: '"I was at the front of the line, calling passengers."' },
      { text: '"I crossed the street to buy load."' },
      { text: '"I was at a wake in Tondo."' },
      { text: 'Mang Turing was found unconscious behind Jeep #07.' }
    ],
    confess: [
      "He was going to take my jeep! It's the only thing feeding my family... I didn't want to kill him. I just wanted more time.",
      'That amulet? It\'s not mine! A man in black sold me some "luck" last week. He said, "Drop it at the terminal afterward."'
    ],
    metaText: 'Found: Amulet marked "XIII". Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'The next day. The precinct.', beats: [{}, { b: "Reyes. ...Lawton? All right, on my way." }] },
      { cap: 'Lawton Terminal, Ermita. 9:35 PM.', beats: [{}] },
      { beats: [{ b: "Mang Turing, the line operator. Hit on the head, alive but unconscious. The ₱48,500 boundary money is gone!" }, { b: 'Who was at the terminal when it happened?' }, { b: 'Four people, Inspector. And every one of them has a story.' }] }
    ]
  };

  E.cases.c3 = {
    title: 'Last Song at Bituin KTV',
    victim: { desc: 'Owner of Bituin KTV in Malate', cause: 'Poisoned — sleeping pills mixed into her drink (initial result)', found: 'Inside VIP Room 13', foundBy: 'Jun-jun (waiter), 11:30 PM', weather: 'Clear, humid' },
    suspects: [
      { role: 'KTV Singer', alibi: 'Says she was on the main stage, singing her set from 11:00 to 11:30.', note: 'Madam Gloria had told her she was fired.',
        greet: 'I was singing my whole set, Inspector! The crowd was packed!', deny: "The whole KTV has videos of me singing! I never left the stage!",
        check: { text: 'CONFIRMED — Customer videos: she sang "Dahil Sa Iyo" and "Bituing Walang Ningning", 11:00–11:28 PM.' },
        statements: [{ t: "I didn't leave the stage for a single song." }] },
      { role: 'Waiter', alibi: 'Says he was serving Room 5.', note: 'He found the victim at 11:30 PM.',
        greet: "Sir, I was only serving. I was in Room 5 at the time.", deny: "All my orders are in the POS, Sir! The hallway CCTV has me too!",
        check: { text: 'CONFIRMED — POS log: he served Room 5 at 11:04 and 11:12 PM. Also seen on the hallway CCTV.' },
        statements: [{ t: "I didn't go back to VIP 13 after 10:50.", lie: { say: "I brought the juice at 10:55, Sir... but it was clean! There was no powder then!" } }] },
      { role: 'KTV Accountant', alibi: 'Says he was in the office upstairs, counting the takings.', note: 'Only one cufflink left on his left sleeve.',
        greet: 'Inspector, I was doing the books. Numbers are all I know.', weak: "That's circumstantial, Inspector. You'll need something stronger.",
        check: { text: "NOT CONFIRMED — No CCTV in the office. And in the bank records: ₱2.3M is missing from the KTV's account — and only Mr. Sy has access. Madam Gloria was going to audit tomorrow." },
        statements: [{ t: 'I was in the office the whole time. I never came down.', lie: { say: "...I came down for a moment. To... give Madam the report." } }, { t: "The KTV's books are clean.", lie: { say: "There's a... small discrepancy. I was going to fix it before the audit!" } }] },
      { role: "Victim's Ex-Husband", alibi: 'Says he was in the parking lot, arguing with the guard about the parking fee.', note: 'He and Madam Gloria fought this afternoon.',
        greet: "Yes, Gloria and I fought. But I still love her, okay?", deny: "I was outside with the guard! Ask him!",
        check: { text: 'CONFIRMED — Guard and parking CCTV: Bong was outside from 10:55 to 11:20 PM.' },
        statements: [{ t: "I didn't come to the KTV tonight.", lie: { say: "Okay, I was there — in the parking lot. The guard wouldn't let me in, so we fought." } }] }
    ],
    clues: [
      { name: 'Videoke: Stopped at 23:07', info: 'The song stopped at 11:07 PM — that is when Madam Gloria lost consciousness.', say: 'The videoke stopped at 11:07... right inside the time window.' },
      { name: 'Glass with White Powder', info: 'Traces of white powder on the rim of the calamansi juice glass. Crushed sleeping pills.', say: 'White powder in the glass! The juice was poisoned.' },
      { name: 'Missing Ledger', info: "The KTV's green income ledger, brought by Madam Gloria for the audit. It is gone from the table.", say: 'The green ledger was on the table earlier. Where is it now?' },
      { name: 'Dropped Microphone', info: 'Madam Gloria dropped the mic as she grew weak.', say: "The mic is on the floor... this is where she collapsed." },
      { name: 'Gold Cufflink "A.S."', info: 'A gold cufflink engraved "A.S." — dropped on the floor of VIP 13.', say: 'A cufflink... with the initials "A.S."!' },
      { name: 'Matchbook from "Club Anino"', info: 'A black matchbook with a crow on it and handwriting: "Room 13". There is no Club Anino in Malate...', say: 'Matches... "Club Anino, Room 13." Inspector, it\'s him again.' }
    ],
    records: {
      video: { name: 'Customer Videos', info: 'Lyka on the main stage, 11:00–11:28 PM. She never left.' },
      pos: { name: 'Room 5 POS Log', info: "Jun-jun's orders: 11:04 PM (sisig, beer), 11:12 PM (pulutan). Seen on the hallway CCTV." },
      parking: { name: 'Parking CCTV', info: 'Kuya Bong and the guard arguing outside from 10:55 to 11:20 PM.' },
      bank: { name: 'KTV Bank Records', info: '₱2.3M missing over 8 months. Only one person has access: A. Sy. Audit: tomorrow, 9:00 AM.' }
    },
    timeline: [
      { text: 'Madam Gloria went into VIP 13 carrying the green ledger.' },
      { text: '"I was on stage, singing my set."' },
      { text: '"I was in the office upstairs, counting."' },
      { text: '"I was serving Room 5."' },
      { text: '"I was in the parking lot, talking with the guard."' },
      { text: 'Jun-jun found Madam Gloria in VIP 13.' }
    ],
    confess: [
      'One audit, and my life would be over. So... I put sleeping pills in her juice and took the ledger.',
      'The matchbook? A man offered to "fix" my problem. He always said: "Room 13. That\'s where we meet."'
    ],
    metaText: 'Found: Matchbook from "Club Anino — Room 13". Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'Malate. 11:45 PM.', beats: [{ sfx: '♪ Because of you... ♪' }, {}] },
      { cap: 'Bituin KTV — VIP Room 13.' },
      { beats: [{ b: "Madam Gloria Tan, owner of the KTV. No wounds... but there's something off about her drink." }, { b: 'VIP Room 13... Thirteen again.' }] }
    ]
  };

  E.metas = { ticket: ['Ticket "A-13"', 'Case #001'], anting: ['Amulet "XIII"', 'Case #002'], matchbook: ['Matchbook "Room 13"', 'Case #003'] };
  E.shop = {
    halaman: ['Snake Plant', 'Said to bring luck to an office.'],
    radyo: ['Old AM Radio', 'For the late-night radio dramas.'],
    pusa: ['Office Cat', "Sleeps on your desk. Doesn't pay rent."],
    thermos: ['Barako Thermos', '+2 coffee on your next case. You can buy more than one.']
  };
  E.chapters = [
    { title: 'Chapter 1: The Number 13', question: 'What links the three clues?', options: ['The color black', 'The number 13', 'Quiapo', 'The crow'], wrong: 'No... look again at the numbers on each clue.', note: "PRECINCT 13?! Dad's old precinct. There's someone on the inside..." }
  ];
})();
