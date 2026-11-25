/* =========================================================
   KASO — ENGLISH TEXT, CHAPTER 2
   ========================================================= */
(function () {
  'use strict';
  window.KASO_EN = window.KASO_EN || { cases: {} };
  const E = window.KASO_EN;

  E.cases.c4 = {
    title: 'The Golden Amulet',
    victim: { desc: 'Sold amulets and herbal oils beside the church', cause: 'Struck on the head with a heavy object', found: 'Behind his stall at Plaza Miranda', foundBy: 'Aling Rosing (neighboring vendor), 9:25 PM', weather: 'Drizzle' },
    suspects: [
      { role: 'Candle Vendor', alibi: 'Says she was selling candles to devotees at the church door.', note: 'She found the victim.',
        greet: 'Celso and I were neighbors for thirty years... dear God.', deny: "I was at the church door, Inspector! The parish CCTV has me!",
        check: { text: 'CONFIRMED — Parish CCTV: she was at the church entrance 8:55–9:24 PM.' },
        statements: [{ t: 'I never left my stall all night.', lie: { say: "Oh, right... I moved to the church door to sell more. But I was still far from Celso!" } }, { t: 'Celso had no enemies.' }] },
      { role: 'Church Sacristan', alibi: 'Says he was leading the novena inside the church.', note: 'Often bought oils from Mang Celso.',
        greet: "I've already prayed for Mang Celso's soul.", deny: 'The whole novena was livestreamed, Inspector. I was in front of the altar.',
        check: { text: 'CONFIRMED — Parish livestream: he led the novena 8:45–9:30 PM.' },
        statements: [{ t: "I didn't leave the church during the novena." }] },
      { role: 'Rival Fortune-Teller', alibi: 'Says he was at the cockpit in Pasay.', note: 'Says Celso stole his regular customers.',
        greet: "I saw this in my cards. A bad night for Celso.", deny: "I have a cockpit ticket, Inspector — and my rooster won!",
        check: { text: 'CONFIRMED — Ticket and CCTV from the cockpit in Pasay: 8:30–10:15 PM.' },
        statements: [{ t: "I'm not angry at Celso. It's just business.", lie: { say: "Hah! I was angry, yes. But while he was dying, I was screaming at a cockfight. Look at my ticket." } }] },
      { role: 'Antique Collector', alibi: 'Says he was dining at a restaurant in Binondo until 9:30.', note: 'The left lens of his glasses is cracked.',
        greet: 'A tragedy. That amulet is a national treasure, you know?', weak: "Hah. Those are just stories, Inspector. You'll need something stronger.",
        check: { text: 'NOT CONFIRMED — The restaurant in Binondo says he left at 8:40 PM. And on Mang Celso\'s phone: Dr. Velasco offered ₱500,000 for the gold amulet. Celso replied: "My grandfather\'s heirloom is not for sale."' },
        statements: [{ t: "I didn't come to Quiapo tonight.", lie: { say: "...The lens? Ah— I only passed by. I just wanted to talk to him!" } }, { t: "I have no interest in Celso's wares.", lie: { say: 'Fine, I made him an offer. Business is business!' } }] }
    ],
    clues: [
      { name: 'Missing Gold Amulet', info: "Mang Celso's most valuable piece — a gold amulet passed down from his grandfather. Gone from the rack.", say: 'The gold amulet in the middle of the rack is gone!' },
      { name: 'Bloodied Brass Candlestick', info: "From Mang Celso's table. It was the weapon, then thrown on the ground.", say: "The candlestick — it was on the table before, now it's on the ground with a stain!" },
      { name: 'Cracked Eyeglass Lens', info: 'A lens from expensive glasses with a gold frame. Cracked in the struggle.', say: "A cracked lens on the ground... these are expensive glasses." },
      { name: 'Tipped-Over Coin Tin', info: 'Knocked over in the struggle, but the money was not taken. The culprit was not after cash.', say: "The coin tin fell over... but the money wasn't touched." },
      { name: 'Restaurant Receipt — 20:40', info: 'A receipt from a restaurant in Binondo, 8:40 PM. Dropped by someone who came from there.', say: 'A restaurant receipt from Binondo, 8:40 PM. Someone brought it here.' },
      { name: 'Call-sign Card "BRAVO-13"', info: 'A laminated police radio call-sign card: "BRAVO-13". Only officers of Precinct 13 use it.', say: 'Inspector... a police radio card. "BRAVO-13." It\'s from Precinct 13!' }
    ],
    records: {
      parokya: { name: 'Parish CCTV', info: 'Aling Rosing at the church entrance, selling candles, 8:55–9:24 PM.' },
      livestream: { name: 'Novena Livestream', info: 'Brother Jun in front of the altar, 8:45–9:30 PM.' },
      sabungan: { name: 'Cockpit Ticket', info: 'Cockpit in Pasay — entry 8:30 PM. Seen on CCTV until 10:15 PM.' },
      alok: { name: "Dr. Velasco's Text to Celso", info: '"₱500,000 for the gold amulet. Final offer." — Reply: "My grandfather\'s heirloom is not for sale."' }
    },
    timeline: [
      { text: '"I was at the cockpit in Pasay from 8:30."' },
      { text: '"I started the novena at 8:45."' },
      { text: 'Last frame on CCTV: Mang Celso arranging his wares.' },
      { text: '"I was at my stall, selling candles."' },
      { text: '"I was dining in Binondo until 9:30."' },
      { text: 'Aling Rosing found Mang Celso behind his stall.' }
    ],
    confess: [
      'That amulet belonged in my collection, not in some filthy stall in Quiapo! He fought back...',
      'And the radio card? A policeman sold me "protection". He said, "If things go wrong, Bravo-13 will take care of it."'
    ],
    metaText: 'Found: Call-sign Card "BRAVO-13". Added to Mateo\'s corkboard.',
    intro: [
      { cap: "Precinct 13. Mateo's new post.", beats: [{ b: 'Welcome to Precinct 13, Reyes. I knew your father. A good cop.' }, { b: 'Thank you, Captain. This was his last post.' }, { b: "There's a case in Quiapo. It's all yours." }] },
      { cap: 'Plaza Miranda, Quiapo. 9:40 PM.', beats: [{ sfx: 'DONG! DONG!' }] },
      { beats: [{ b: 'Mang Celso has sold amulets here for forty years. Struck on the head.' }, { b: 'Is anything missing from his stall?' }, { b: "That's what we'll find out, Inspector." }] }
    ]
  };

  E.cases.c5 = {
    title: 'Fire at the Warehouse',
    place: 'Fabric Warehouse, Divisoria',
    victim: { desc: 'Owner of a fabric warehouse in Divisoria', cause: 'Overcome by smoke — alive, in hospital', found: 'Inside the burning warehouse', foundBy: 'Ka Pedring (guard), 10:20 PM', weather: 'Heavy rain' },
    suspects: [
      { role: 'Porter', alibi: 'Says he was unloading cargo at the warehouse next door.', note: 'His clothes smell of fuel — from the truck, he says.',
        greet: "Boss, I'm just a porter. Carrying things is all I know.", deny: "There's a delivery receipt, Boss! I even signed it, 10:10!",
        check: { text: 'CONFIRMED — Delivery receipt and the truck driver: he was unloading at the warehouse next door 9:50–10:30 PM.' },
        statements: [{ t: "I didn't touch any gasoline tonight.", lie: { say: "Ah... I filled the truck with diesel earlier. That's why I smell of fuel! Diesel, Boss, not gasoline!" } }] },
      { role: 'Vendor Across the Street', alibi: 'Says she was closing up her carinderia across the street.', note: 'She was the first to shout "Fire!"',
        greet: 'It was pouring, then suddenly there was smoke! I was the one who yelled "Fire!"', deny: "I'm on CCTV, putting away my pots!",
        check: { text: 'CONFIRMED — Street CCTV: she was packing up the carinderia 9:55–10:18 PM.' },
        statements: [{ t: "I didn't see anyone near the warehouse.", lie: { say: "Wait... I saw a shadow at the window! A big man, in a polo shirt. I thought it was Sir Henry." } }] },
      { role: 'Night Guard', alibi: 'Says he was doing rounds at the far end of the street.', note: 'Said to nap on duty sometimes.',
        greet: "Thirty years as a guard. First time anything burned on my watch.", deny: "I'm on the guard tour log! I punch in every ten minutes!",
        check: { text: 'CONFIRMED — Guard tour system: he punched in at checkpoints at the far end at 10:00, 10:10 and 10:20 PM.' },
        statements: [{ t: "I didn't sleep on duty.", lie: { say: "All right... I dozed off for ten minutes. But I was at the far end, nowhere near the warehouse!" } }] },
      { role: 'Business Partner', alibi: 'Says he was in Tagaytay all night.', note: 'A big man. Always carries a lighter.',
        greet: 'I was in Tagaytay, Inspector. I just got here when I heard the news.', weak: "You can't prove anything with that, Inspector. Call my lawyer.",
        check: { text: "NOT CONFIRMED — Toll records: his car entered Manila at 9:30 PM. And the warehouse insurance: raised to ₱10M last month — Mr. Chua is the beneficiary." },
        statements: [{ t: 'I was in Tagaytay all night.', lie: { say: "...I came back to Manila for a bit. I had to... pick something up." } }, { t: "I don't smoke.", lie: { say: "That... it was a gift. I never use it." } }] }
    ],
    clues: [
      { name: 'Origin of the Fire', info: 'The fire started on the bottom shelf — not electrical. It smells of gasoline.', say: "The fire started here. This wasn't electrical — it was set!" },
      { name: 'Missing Fire Extinguisher', info: 'The extinguisher was taken before the fire so it could not be put out quickly.', say: 'The fire extinguisher is missing from the wall!' },
      { name: 'Open Window', info: 'Opened from the inside — the culprit escaped here. It can be seen from the carinderia across the street.', say: 'The window is open... this is how he got out.' },
      { name: 'Gasoline Can', info: 'A red gasoline can, almost empty. Nothing like it is in the warehouse inventory.', say: 'A gasoline can! This is what started the fire.' },
      { name: 'Lighter Engraved "WC"', info: 'A silver lighter with "WC" engraved on the side.', say: 'A lighter... with the initials "WC".' },
      { name: 'Car Key with a "C"', info: 'A car key with a gold "C" keychain. Dropped while escaping.', say: 'A car key! Its owner was here tonight.' },
      { name: 'Torn Duty Roster — "R.D."', info: "A torn Precinct 13 duty roster from the night Dad died. Officer on duty: \"R.D.\"", say: "Inspector... a Precinct 13 duty roster. The date... the night your father died." }
    ],
    records: {
      delivery: { name: 'Truck Delivery Receipt', info: 'Signed by Bebot at the warehouse next door: 10:10 PM. With the driver until 10:30.' },
      cctvtess: { name: "CCTV: Aling Tess's Carinderia", info: 'Putting away pots 9:55–10:18 PM. She looked toward the warehouse at 10:12.' },
      guardlog: { name: 'Guard Tour Log', info: "Ka Pedring's punches: 10:00, 10:10, 10:20 PM — all at the far end of the street." },
      toll2: { name: "Toll Records of Mr. Chua's Car", info: 'SLEX Calamba → Manila: 9:30 PM. No return to Tagaytay until 11:40 PM.' },
      insurance: { name: 'Warehouse Insurance Policy', info: 'Raised to ₱10,000,000 last month. Beneficiary: William Chua.' }
    },
    timeline: [
      { text: 'Last frame on CCTV: Mr. Henry Go taking inventory.' },
      { text: '"I was unloading cargo at the warehouse next door."' },
      { text: '"I was closing the carinderia across the street."' },
      { text: '"I was doing rounds at the far end of the street."' },
      { text: '"I was in Tagaytay all night."' },
      { text: 'Ka Pedring saw the smoke. Mr. Go was rescued.' }
    ],
    confess: [
      'Ten million, Inspector. The business was failing... I thought nobody was in the warehouse!',
      'And the roster? It came from a cop who sold me "protection". He said, "We\'ll handle the investigation." Looks like he didn\'t know about you.'
    ],
    metaText: 'Found: Torn Precinct 13 Duty Roster — "R.D." Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'Divisoria. 10:30 PM.', beats: [{ sfx: 'FIRE! FIRE!' }, {}] },
      { cap: "Mr. Henry Go's fabric warehouse." },
      { beats: [{ b: "The firefighters put it out. Mr. Go is alive, but in hospital." }, { b: 'An accident, or on purpose?' }, { b: 'Captain Dizon says we should close it as "electrical."' }, { b: 'Not yet. I want to look first.' }] }
    ]
  };

  E.cases.c6 = {
    title: 'The Walls of Intramuros',
    victim: { desc: "Retired police officer — Mateo's father's former partner", cause: 'Struck on the head with a nightstick (initial estimate)', found: 'Beside the cannon, Fort Santiago', foundBy: 'Ms. Bianca (tour guide), 9:50 PM', weather: 'Clear, full moon' },
    suspects: [
      { role: 'Calesa Driver', alibi: 'Says he was at Plaza Roma with tourists aboard.', note: 'Often saw Mang Bert by the cannon.',
        greet: 'Mang Bert was a kind man. He always gave my horse a treat.', deny: "My tourists have photos, Inspector! I was with them the whole time!",
        check: { text: 'CONFIRMED — Tourist photos (time-stamped): Mang Gorio was with them at Plaza Roma 9:05–9:45 PM.' },
        statements: [{ t: "I didn't see Mang Bert tonight." }] },
      { role: 'Tour Guide (Ghost Tour)', alibi: 'Says she was running a ghost tour with 15 tourists.', note: 'She found the victim.',
        greet: "Ghost tours are my job... but I never thought I'd find a real body.", deny: 'Fifteen people were with me, Inspector! Ask all of them!',
        check: { text: 'CONFIRMED — 15 tourists and the booking app: she was at San Agustin 9:00–9:40 PM.' },
        statements: [{ t: 'It was already dark around the cannon when we arrived.', lie: { say: 'Yes, that was strange... the lamp here is always on. Only tonight it went out.' } }] },
      { role: 'Fishball Vendor', alibi: 'Says he was selling fishballs outside the gate.', note: 'Has a past pickpocketing case.',
        greet: "Why me again? Just because I have a record?", deny: "I was at the barangay hall, Sir! I was locked up at the time!",
        check: { text: 'CONFIRMED — Barangay blotter: Lito was detained at the barangay hall 9:00–10:00 PM over a street fight.' },
        statements: [{ t: 'I was selling fishballs all night.', lie: { say: "Heh... truth is, I was at the barangay hall. I got into a fight. Still an alibi, right?" } }] },
      { role: 'Fort Santiago Night Guard', alibi: 'Says he was in the guardhouse watching TV.', note: 'He alone has the keys to the gate and the light switch.',
        greet: "I didn't hear a thing, Inspector. The TV was loud.", weak: "Every guard carries one of those. You can't prove it was me.",
        check: { text: "NOT CONFIRMED — The guardhouse CCTV was switched off at 9:05 PM using Ka Santi's account. And yesterday, ₱200,000 was deposited into his bank account by an unknown sender." },
        statements: [{ t: "I didn't leave the guardhouse.", lie: { say: "...I stepped out for a moment to... use the toilet. That's all!" } }, { t: 'The gate was locked all night.', lie: { say: 'Maybe... I forgot to lock it. I was tired.' } }] }
    ],
    clues: [
      { name: 'Unlocked Gate Padlock', info: 'Opened with a key — no damage. Only the guard has the key.', say: 'The padlock is open but not broken... someone used a key.' },
      { name: 'Lamp Switched Off', info: 'The lamp near the cannon was switched off before the crime. The switch is in the guardhouse.', say: 'The lamp post is off. Someone wanted it dark here.' },
      { name: 'Flashlight Marked "FS"', info: 'A Fort Santiago guard flashlight ("FS").', say: 'A Fort Santiago guard flashlight!' },
      { name: 'Nightstick Under the Bench', info: 'A black nightstick with a stain on the tip. Hidden under the bench.', say: 'A nightstick... this was the weapon.' },
      { name: 'Crumpled Note', info: '"Mateo — 9:30, by the cannon. I have something to tell you about your father. — B." They never met.', say: 'Inspector... this note is for you. It\'s from Mang Bert.' },
      { name: 'Old Photo — "...ZON"', info: 'An old photo of Dad with a young officer. The face is scratched out, but the name tape still reads "...ZON".', say: 'A photo of your father... with another cop. The name tape says "...ZON".' }
    ],
    records: {
      turista: { name: 'Tourist Photos', info: 'Mang Gorio and his calesa at Plaza Roma, 9:05–9:45 PM (time-stamped).' },
      tour: { name: 'Ghost Tour Booking', info: 'Ghost tour, 15 tourists, San Agustin: 9:00–9:40 PM. Guide: Bianca.' },
      blotter: { name: 'Barangay Blotter', info: 'Lito "Payat" — detained 9:00–10:00 PM. Street fight over change.' },
      cctvoff: { name: 'Guardhouse CCTV Log', info: 'CCTV switched off at 9:05 PM. Account used: SANTI-G2.' },
      deposito: { name: 'Bank Deposit to Ka Santi', info: '₱200,000 — deposited yesterday, 4:12 PM. Sender: unknown (cash deposit).' }
    },
    timeline: [
      { text: 'Last frame on CCTV: Mang Bert walking toward the cannon.' },
      { text: '"I started the ghost tour at San Agustin."' },
      { text: '"I was selling fishballs outside the gate."' },
      { text: '"I was at Plaza Roma with tourists aboard."' },
      { text: '"I was in the guardhouse watching TV."' },
      { text: 'Ms. Bianca found Mang Bert beside the cannon.' }
    ],
    confess: [
      'Two hundred thousand, Inspector. The orders: kill the lights, open the gate, and silence Mang Bert before he could talk to you.',
      "A captain from Precinct 13 gave the order. I don't know his name... but he dropped that photo."
    ],
    metaText: 'Found: Old Photo of Dad — "...ZON". Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'That evening.', beats: [{}, { b: "Mateo... it's Bert, your father's old partner. There's something you need to know. Tomorrow, 9:30, by the cannon at Fort Santiago.", who: 'Mang Bert (phone)' }] },
      { cap: 'Fort Santiago, Intramuros. 9:55 PM.', beats: [{ sfx: 'Too late...' }] },
      { beats: [{ b: 'Inspector... Mang Bert. He was gone when we arrived.' }, { b: 'Who knew we were meeting?!' }, { b: '...Only people at the precinct. He called on the precinct line.' }] }
    ]
  };

  E.FINALE2 = [
    { cap: 'BRAVO-13. "R.D." "...ZON."', beats: [{ b: 'Only one person matches all of them.' }] },
    { beats: [{ b: "Captain Rodel Dizon! You're Ang Anino's accomplice!" }, { b: "Brilliant, Reyes. Just like your father... and you know what happened to him." }] },
    { cap: 'Dizon cut the precinct lights.', beats: [{}, { b: "You'll never catch me. And you'll never know who he is." }] },
    { cap: 'Captain Dizon escaped into the darkness of Manila.', beats: [{ b: "I'll hunt you down, Dizon. And you, Anino... I'm getting close." }, { sfx: 'TO BE CONTINUED IN CHAPTER 3' }] }
  ];

  Object.assign(E.metas, { radio: ['Card "BRAVO-13"', 'Case #004'], roster: ['Roster — "R.D."', 'Case #005'], litrato: ['Photo — "...ZON"', 'Case #006'] });
  E.chapters.push({ title: 'Chapter 2: The Accomplice', question: "Who is Ang Anino's accomplice inside Precinct 13?", options: ['Capt. Ramon Dela Cruz', 'Sgt. Leo Rizon', 'Capt. Rodel Dizon', 'Maj. Dante Ocampo'], wrong: 'No match. It has to fit "R.D." AND "...ZON".', note: 'CAPT. RODEL DIZON — my own commander. He escaped. To be continued in Chapter 3...' });
})();
