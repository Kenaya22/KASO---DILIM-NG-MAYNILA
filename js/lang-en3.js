/* =========================================================
   KASO — ENGLISH TEXT, CHAPTER 3 + ENDING
   ========================================================= */
(function () {
  'use strict';
  window.KASO_EN = window.KASO_EN || { cases: {} };
  const E = window.KASO_EN;

  E.cases.c7 = {
    title: 'The Last Trip',
    place: 'Escolta Ferry Station, Pasig River',
    victim: { name: 'Capt. Rodel Dizon (fugitive)', desc: "Former Precinct 13 commander — Ang Anino's accomplice, in hiding", cause: 'Struck on the head — alive, but in a coma', found: 'On the ferry pier, Escolta', foundBy: 'Mang Ambo (boatman), 10:50 PM', weather: 'Foggy' },
    suspects: [
      { role: 'Ferry Boatman', alibi: 'Says he was across the river, at Guadalupe, with the ferry.', note: 'He found Dizon.',
        greet: "Thirty years a boatman. I've never seen anything like this.", deny: "The ferry has GPS, Inspector! I was at Guadalupe!",
        check: { text: 'CONFIRMED — Ferry GPS log: it was at Guadalupe station 10:15–10:48 PM.' },
        statements: [{ t: "I didn't see any other boat on the river.", lie: { say: 'Oh... a motorboat left without its lights on. I thought it was just a fisherman.' } }] },
      { role: 'Ticket Booth Cashier', alibi: 'Says she was counting sales in the booth.', note: 'The booth closed at 10:30.',
        greet: "I've only worked here a year, Inspector. Nothing like this has ever happened.", deny: "The booth has CCTV! I was counting coins!",
        check: { text: 'CONFIRMED — Booth CCTV: she was counting sales 10:25–10:50 PM.' },
        statements: [{ t: 'Nobody else was on the pier after I closed.', lie: { say: 'Wait... there was a man in a black suit. He asked when the last trip was. I thought he was a passenger.' } }] },
      { role: 'Boat for Hire', alibi: 'Says he was fishing under Jones Bridge.', note: 'Has a past smuggling case.',
        greet: "Why me? Fish are all I catch.", deny: "The barangay patrol even took my photo under the bridge!",
        check: { text: 'CONFIRMED — Barangay patrol photo: he was fishing under Jones Bridge, 10:35 PM.' },
        statements: [{ t: "I didn't rent out my boat to anyone tonight.", lie: { say: "All right... someone rented my boat — ₱5,000, cash. Black suit. He's the one who untied the rope!" } }] },
      { role: "Councilor's Bodyguard", alibi: "Says he was at the Councilor's office in Ermita all night.", note: 'Black suit and an earpiece. Big hands.',
        greet: "I was at Councilor Medina's office. Ask him yourself.", weak: "You can't catch me with that. My boss has lawyers.",
        check: { text: 'NOT CONFIRMED — Cell site data: Dante\'s phone was in Escolta 10:20–10:50 PM, not Ermita. And on Dizon\'s phone, a text to Dante yesterday: "If Boss won\'t help me, I\'ll tell them everything."' },
        statements: [{ t: "I didn't go to Escolta tonight.", lie: { say: "...I passed by. Boss told me to collect some papers. That's all." } }, { t: "I don't know Rodel Dizon.", lie: { say: "Yes, I know him. He was threatening to talk. I was sent to... have a word with him." } }] }
    ],
    clues: [
      { name: 'Briefcase — Papers Missing', info: "Dizon's briefcase. On CCTV it was full of papers before the crime. Now it is empty.", say: 'The briefcase is open... and the papers are gone!' },
      { name: 'Steel Pipe', info: 'A steel pipe with a bloodstain on the tip. This was the weapon.', say: 'A steel pipe... this was used.' },
      { name: 'Security Earpiece', info: 'A bodyguard-style earpiece with a coiled cord. Dropped in the struggle.', say: "An earpiece... that's security gear, Inspector." },
      { name: 'Business Card: "MEDINA SECURITY"', info: 'A black business card with gold letters: "MEDINA SECURITY".', say: 'A business card... "Medina Security."' },
      { name: 'Untied Rope — Missing Boat', info: 'On CCTV a motorboat was tied up here. Now it is gone — the rope was untied. The culprit escaped this way.', say: 'The boat that was tied here is gone! The culprit escaped on it.' },
      { name: 'Crow Seal — "A.M."', info: 'A torn envelope with a red wax seal: a crow, and the letters "A.M." It came from Dizon\'s briefcase.', say: 'A red seal... a crow, and "A.M." Inspector, this is the mark of Dizon\'s boss!' }
    ],
    records: {
      gps: { name: 'Ferry GPS Log', info: 'Ferry 13: at Guadalupe station 10:15–10:48 PM. Mang Ambo was the boatman.' },
      booth: { name: 'Ticket Booth CCTV', info: 'Nympha counting sales, 10:25–10:50 PM.' },
      patrol: { name: 'Barangay Patrol Photo', info: 'Jake fishing under Jones Bridge, 10:35 PM.' },
      cellsite: { name: "Dante's Cell Site Data", info: "Dante Cruz's phone: Escolta tower, 10:20–10:50 PM." },
      banta: { name: "Dizon's Text to Dante", info: '"If Boss won\'t help me, I\'ll tell them everything. The receipts are in my briefcase."' }
    },
    timeline: [
      { text: '"I was at Guadalupe with the ferry."' },
      { text: 'Last frame on CCTV: Dizon waiting on the pier, holding a briefcase.' },
      { text: '"I was counting sales in the booth."' },
      { text: '"I was fishing under Jones Bridge."' },
      { text: '"I was at the Councilor\'s office in Ermita."' },
      { text: 'Mang Ambo found Dizon on the pier.' }
    ],
    confess: [
      "For three days Dizon had been threatening to spill everything. My orders: take the papers... and make sure he could never talk.",
      'I\'ve never seen Boss\'s face on any of the orders. But the letters always carry a crow seal and "A.M."'
    ],
    metaText: 'Found: Crow Seal marked "A.M." Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'One week after Dizon escaped.', beats: [{}, { b: "Inspector! Captain Dizon was found on the ferry pier in Escolta. He's alive, but unconscious!", who: 'PO2 Jessa (phone)' }] },
      { cap: 'Escolta Ferry Station, Pasig River. 11:00 PM.', beats: [{ sfx: 'PLOP... PLOP...' }] },
      { beats: [{ b: 'No wallet, no phone. But his briefcase is open.' }, { b: 'They were looking for something on him. Evidence against Ang Anino.' }] }
    ]
  };

  E.cases.c8 = {
    title: 'The Escolta Press',
    place: 'Old Printing Press, Escolta',
    victim: { desc: 'Veteran journalist investigating corruption in the City Council', cause: 'Fell down the stairs — with signs he was pushed', found: 'At the foot of the old printing press stairs', foundBy: 'Ricky (apprentice), 7:30 PM', weather: 'Heavy rain' },
    suspects: [
      { role: 'Printing Press Owner', alibi: 'Says she was at the hospital for a checkup.', note: "Ka Lino's close friend.",
        greet: "Lino... I told him to drop that article. It was dangerous.", deny: "I was at the hospital, Inspector! I still have the receipt for my checkup!",
        check: { text: 'CONFIRMED — Hospital log: Aling Perla was in for a checkup 6:30–7:40 PM.' },
        statements: [{ t: 'Nobody threatened Lino.', lie: { say: 'Fine... someone called him every night. "Leave the Councilor alone," they said.' } }] },
      { role: 'Press Apprentice', alibi: 'Says he was delivering flyers in Sta. Cruz.', note: 'He found Ka Lino.',
        greet: "Ka Lino taught me everything... I can't take this.", deny: "My delivery app has GPS! I was in Sta. Cruz!",
        check: { text: 'CONFIRMED — Delivery app GPS: Ricky was in Sta. Cruz 6:50–7:25 PM.' },
        statements: [{ t: 'Nobody else came into the press today.', lie: { say: 'Wait... this afternoon, a man with a camera asked Ka Lino about "negatives."' } }] },
      { role: 'Lawyer (libel case)', alibi: 'Says he was at a dinner meeting in Intramuros.', note: 'Filed a libel case against Ka Lino. Initials: A.M.',
        greet: "Pascual was sued by my client. But I fight in court, Inspector, not on staircases.", deny: 'Twelve people were at that dinner with me, Inspector. I have the receipt.',
        check: { text: 'CONFIRMED — Restaurant in Intramuros: Atty. Amado Mercado was at dinner 6:30–8:30 PM, with 11 witnesses.' },
        statements: [{ t: 'The "A.M." on those letters? That isn\'t me.' }] },
      { role: 'Campaign Photographer', alibi: "Says he was at the Councilor's event in Tondo, taking photos.", note: 'His camera lens cap is missing.',
        greet: 'I was taking photos in Tondo all night, Inspector.', weak: "That's all guesswork. You have no proof it was me.",
        check: { text: 'NOT CONFIRMED — His photos from the event: last shot 6:40 PM, next shot 7:45 PM — an hour-long gap. And the taxi app: Tondo → Escolta, 6:48 PM.' },
        statements: [{ t: "I never left the event in Tondo.", lie: { say: "...I left for a bit. Boss had me pick something up." } }, { t: "I don't know anything about any negatives.", lie: { say: "The negatives... Lino had photos that couldn't get out. I was ordered to take them." } }] }
    ],
    clues: [
      { name: 'Missing Film Negatives', info: 'Two strips of negatives were hanging on the CCTV before the crime. Now they are gone — cut down and taken.', say: 'Some of the hanging negatives are gone! Someone took them.' },
      { name: 'Torn Page in the Typewriter', info: 'Ka Lino\'s article was torn out. On the scrap left behind: "ANG ANINO NG KONSE—" (The Shadow of the Coun—).', say: 'The article was ripped out... "Ang Anino ng Konse—" The Council?!' },
      { name: 'Broken Stair Railing', info: 'The stair railing snapped — there was a struggle here before Ka Lino fell.', say: 'The railing is broken... there was a struggle here.' },
      { name: 'Inky Shoeprints', info: 'Shoeprints in blue printing ink, heading for the door. Size 9.', say: 'Prints with ink in them! He went out this way.' },
      { name: 'Lens Cap "GL"', info: 'A professional camera lens cap, marked "GL".', say: 'A camera lens cap... with the initials "GL".' },
      { name: 'Old Newspaper: "Precinct 13, 2014"', info: 'A clipping: "Opening of the new Precinct 13." In the photo: a COUNCILOR beside Dizon, wearing a crow ring. The name is torn off.', say: 'An old newspaper... a councilor at the Precinct 13 opening. He\'s wearing a crow ring!' }
    ],
    records: {
      ospital: { name: 'Hospital Log', info: 'Aling Perla — checkup, 6:30–7:40 PM.' },
      delivery3: { name: 'Delivery App GPS', info: 'Ricky in Sta. Cruz, 6:50–7:25 PM.' },
      hapunan: { name: 'Dinner Receipt from Intramuros', info: 'Atty. Amado Mercado and 11 guests, 6:30–8:30 PM.' },
      camera: { name: "Gener's Camera Metadata", info: 'Last shot in Tondo: 6:40 PM. Next: 7:45 PM. One hour with no photos.' },
      taxi: { name: "Gener's Taxi App", info: 'Tondo → Escolta, pickup 6:48 PM. Escolta → Tondo, 7:28 PM.' }
    },
    timeline: [
      { text: '"I was at the hospital for a checkup."' },
      { text: '"I had a dinner meeting in Intramuros."' },
      { text: '"I was at the Councilor\'s event in Tondo."' },
      { text: 'Last frame on CCTV: Ka Lino typing at the typewriter.' },
      { text: '"I was delivering flyers in Sta. Cruz."' },
      { text: 'Ricky found Ka Lino at the foot of the stairs.' }
    ],
    confess: [
      'Ka Lino had photos — Boss and Dizon, handing over money. I was ordered to take the negatives.',
      'I didn\'t mean to push him... we were fighting over them on the stairs. "Ang Anino" is what they call Boss. And he owns the campaign I work for.'
    ],
    metaText: 'Found: Old Newspaper — a Councilor at the opening of Precinct 13. Added to the corkboard.',
    intro: [
      { cap: 'Escolta. 7:45 PM.', beats: [{ sfx: 'KA-BOOM!' }] },
      { cap: "Aling Perla's old printing press." },
      { beats: [{ b: 'Ka Lino Pascual, a journalist. They say he fell down the stairs... but he was writing about corruption in the Council.' }, { b: "There are no accidents when Ang Anino is involved." }] }
    ]
  };

  E.cases.c9 = {
    title: 'A Gala for Manila',
    victim: { desc: "Mateo's partner — investigating undercover at the gala", cause: 'Drink was poisoned — alive, in hospital', found: 'At Table 7 in the Grand Ballroom', foundBy: 'Paolo (waiter), 8:15 PM', weather: 'Indoors' },
    suspects: [
      { role: 'Hotel Waiter', alibi: 'Says he was serving Tables 1 to 5.', note: 'He brought the drinks to Table 7 at 7:50.',
        greet: "Sir, I brought her the drink... but it was clean!", deny: "The event photographer's video has me, Sir! I was at the other end!",
        check: { text: 'CONFIRMED — Event video: Paolo was serving Tables 1–5, 7:58–8:20 PM.' },
        statements: [{ t: "Nobody else touched Ma'am Jessa's glass.", lie: { say: 'Ah... I left the tray in the pantry for a moment. Someone could have passed by there.' } }] },
      { role: 'Head Chef', alibi: 'Says she was in the kitchen the whole time.', note: 'She alone holds the pantry key — or so she thinks.',
        greet: 'No poison leaves my kitchen, Inspector!', deny: 'My kitchen has CCTV! Look for yourself!',
        check: { text: 'CONFIRMED — Kitchen CCTV: Chef Marga was in the kitchen 7:45–8:30 PM.' },
        statements: [{ t: "I'm the only one with a key to the drinks pantry.", lie: { say: "Wait... there's a duplicate. The Councilor's office asked for one, \"for security.\"" } }] },
      { role: 'Guest Speaker', alibi: 'Says he was on stage, giving a speech.', note: "Also the lawyer in Ka Lino's case. Initials: A.M.",
        greet: 'Again, Inspector? I was on stage, in front of 300 guests.', deny: "My whole speech was livestreamed. I never left the stage.",
        check: { text: 'CONFIRMED — Livestream: Atty. Mercado was on stage 7:55–8:18 PM.' },
        statements: [{ t: 'I am not the "A.M." you are looking for.' }] },
      { role: "Councilor's Executive Secretary", alibi: "Says she was backstage, preparing the Councilor's speech.", note: 'Wearing only one white glove. Where is the other one?',
        greet: "I'm far too busy for this kind of drama, Inspector.", weak: 'Anyone could have one of those. Show me your real evidence.',
        check: { text: 'NOT CONFIRMED — Nobody saw her backstage 8:00–8:15. Hallway CCTV: she entered the drinks pantry at 8:04 PM, using the duplicate key.' },
        statements: [{ t: 'I never left the backstage area.', lie: { say: "...I went to the pantry. To get water for the Councilor." } }, { t: "I don't know that policewoman.", lie: { say: "That card... those were orders for me. I didn't write it." } }] }
    ],
    clues: [
      { name: "Jessa's Spilled Glass", info: "Jessa's glass was knocked over. There is a white residue inside — crushed sleeping pills.", say: "Jessa's glass... there's white residue!" },
      { name: 'Vial Hidden in the Flowers', info: 'A small vial of sleeping drops, hidden in the Table 7 centerpiece.', say: 'A vial inside the flowers! This is where the poison was hidden.' },
      { name: 'White Silk Glove', info: "A white silk woman's glove. Powder on the fingertip.", say: 'A silk glove... powder on the fingertip.' },
      { name: 'Card: "Deal with the cop at Table 7"', info: 'A card from the Councilor\'s speech. Handwritten on the back: "Deal with the cop at Table 7. — A.M."', say: '"Deal with the cop at Table 7"... signed A.M.!' },
      { name: "Jessa's Phone", info: 'Jessa\'s last text to Mateo, never sent: "Inspector, I know who he is. The ring—"', say: 'Jessa\'s phone... "I know who he is. The ring—"' },
      { name: 'Crow Ring', info: "A gold ring with a black crow. Left on the podium — where the gala's host, Councilor Arturo Medina, spoke just before Atty. Mercado.", say: 'The crow ring! Left on the podium.' }
    ],
    records: {
      eventvid: { name: "Event Photographer's Video", info: 'Paolo serving Tables 1–5, 7:58–8:20 PM.' },
      kitchen: { name: 'Kitchen CCTV', info: 'Chef Marga in the kitchen, 7:45–8:30 PM.' },
      livestream2: { name: 'Gala Livestream', info: 'Atty. Mercado on stage, 7:55–8:18 PM. Before him, Councilor Medina spoke (7:40–7:55).' },
      hallway: { name: 'Hallway CCTV', info: 'Lorie Vidal entered the drinks pantry at 8:04 PM using the duplicate key.' }
    },
    timeline: [
      { text: '"I was in the kitchen all night."' },
      { text: 'Paolo brought the drinks to Table 7.' },
      { text: '"I was on stage, giving my speech."' },
      { text: '"I was serving Tables 1 to 5."' },
      { text: '"I was backstage, preparing the speech."' },
      { text: 'Jessa collapsed at Table 7. Rushed to hospital.' }
    ],
    confess: [
      'The Councilor\'s orders. "That cop is getting too close," he said. Just sleeping drops — she wouldn\'t die, he said.',
      "I can't say his name... I'm afraid. But that ring? He never takes it off. Never."
    ],
    metaText: 'Found: Crow Ring. Added to Mateo\'s corkboard.',
    intro: [
      { cap: 'Manila Grand Hotel. A Gala for Manila.', beats: [{}, { sfx: 'CRASH!' }] },
      { cap: 'Jessa collapsed in the middle of the gala.' },
      { beats: [{ b: "She's alive, Inspector. Sleeping drops in her drink. I'll be your SOCO tonight." }, { b: "They tried to silence Jessa. Tonight, I'm ending this." }] }
    ]
  };

  E.FINALE3 = [
    { cap: '"A.M." A Councilor at Precinct 13. The crow ring.', beats: [{ b: "Councilor Arturo Medina. You are Ang Anino." }] },
    { cap: 'The next morning. Hospital.', beats: [{ b: 'The ring, Inspector... he was wearing it at the gala.' }, { b: "Rest. I'll take it from here. Tonight, I face him." }] },
    { cap: 'Precinct 13. Interrogation room.', beats: [{ b: "Inspector Reyes. Ernesto's son. What can I do for you?" }, { sfx: 'THE FINAL INTERROGATION' }] }
  ];

  E.BOSS = {
    role: 'Ang Anino?',
    greet: "You have no evidence, Inspector. I'm the Councilor who built schools and hospitals. And you? A cop chasing ghosts.",
    statements: [
      { t: 'I have never had anything to do with Precinct 13.', say: "That photo... that was just the opening. A ceremony. Every official was there!" },
      { t: "I don't know these people — Dizon, Dante, Gener, Lorie.", say: 'The seal... plenty of people have the initials "A.M."!' },
      { t: 'The crow? That\'s just the symbol of some old club.', say: "...My ring. I left it on the podium. That doesn't mean—" },
      { t: 'I had nothing to do with the death of SPO4 Ernesto Reyes.', say: "The A-13 ticket... Ernesto pawned his watch to pay an informant. I redeemed it that very night to erase the trail— ...How did you know?!" }
    ],
    wrong: ['Hahaha. Is that your best?', "That has nothing to do with anything, Inspector.", "You're wasting my time.", 'Your father thought like that too. That\'s why he lost.']
  };

  E.ENDING = [
    { beats: [{}, { b: "Councilor Arturo Medina — YOU ARE ANG ANINO! You're under arrest for the murder of SPO4 Ernesto Reyes, and for everything you ordered!" }] },
    { beats: [{ b: "The darkness of Manila... never goes away, Inspector. It only moves." }] },
    { cap: 'One week later.', beats: [{ b: "You caught him, Inspector. And Dizon, and the whole syndicate." }, { b: "WE caught him, Jessa. I couldn't have done it alone." }] },
    { cap: 'Manila North Cemetery. Dawn.', beats: [{ b: "Dad... it's over. You can rest now." }, { sfx: 'THE END' }] }
  ];

  E.CREDITS = [
    ['KASO: DILIM NG MAYNILA', 'Case: Darkness of Manila'],
    ['A Manila mystery', 'Chapters 1 – 3'],
    ['Game Concept and Direction', 'The project owner'],
    ['Story, Code and Art', 'Made with Claude Code'],
    ['Music and Sound', 'Generated live by WebAudio while you play'],
    ['Locations', 'Binondo · Ermita · Malate · Quiapo · Divisoria · Intramuros · Escolta'],
    ['For every honest cop', "and for Manila's journalists"],
    ['THANK YOU FOR PLAYING!', '']
  ];

  Object.assign(E.metas, { selyo: ['Crow Seal "A.M."', 'Case #007'], diyaryo: ['Newspaper — Councilor', 'Case #008'], singsing: ['Crow Ring', 'Case #009'] });
  E.chapters.push({ title: 'Chapter 3: The Shadow', question: 'Who is Ang Anino?', options: ['Atty. Amado Mercado', 'Councilor Arturo Medina', 'Don Alfonso Montenegro', 'Capt. Rodel Dizon'], wrong: 'No match. Three clues: "A.M.", a COUNCILOR at Precinct 13, and the owner of the crow ring.', note: 'COUNCILOR ARTURO MEDINA — ANG ANINO. Caught at last. You can rest now, Dad.' });

  /* ---------------- APPLY (runs after all lang-en files are loaded) ---------------- */
  if (window.KASO_LANG !== 'en' || !window.KASO) return;
  const K = window.KASO;
  function merge(t, src) {
    if (!t || src == null) return;
    if (Array.isArray(src)) {
      src.forEach((v, i) => {
        if (v == null) return;
        if (typeof v === 'object' && t[i] && typeof t[i] === 'object') merge(t[i], v);
        else if (typeof v !== 'object') t[i] = v;
        else t[i] = v;
      });
      return;
    }
    Object.keys(src).forEach((k) => {
      const v = src[k];
      if (v && typeof v === 'object' && t[k] && typeof t[k] === 'object') merge(t[k], v);
      else if (v != null) t[k] = v;
    });
  }
  K.CASES.forEach((c) => merge(c, E.cases[c.id]));
  merge(K.PROLOGUE, E.PROLOGUE);
  merge(K.CHAPTERS[0].finale, E.FINALE1);
  merge(K.CHAPTERS[1].finale, E.FINALE2);
  merge(K.CHAPTERS[2].finale, E.FINALE3);
  merge(K.BOSS, E.BOSS);
  merge(K.ENDING, E.ENDING);
  K.CREDITS.splice(0, K.CREDITS.length, ...E.CREDITS);
  K.CHAPTERS.forEach((ch, i) => merge(ch, E.chapters[i]));
  K.METAS.forEach((m) => { const v = E.metas[m.id]; if (v) { m.name = v[0]; m.from = v[1]; } });
  K.SHOP.forEach((it) => { const v = E.shop[it.id]; if (v) { it.name = v[0]; it.desc = v[1]; } });
  document.documentElement.lang = 'en';
})();
