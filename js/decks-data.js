// Data deck & kartu. Tambahkan deck baru di sini — struktur website tidak perlu diubah.
// Format per deck:
// {
//   id: "slug-unik",
//   name: "Nama Deck",
//   clan: "Nama Clan/Nation (opsional)",
//   image: "URL gambar cover (opsional)",
//   cards: [
//     { name: "Nama Kartu (EN)", nameJp: "Nama Kartu (JP, opsional)", image: "URL gambar kartu", grade: "G3", qty: 4, effect: "Teks skill dalam Bahasa Inggris" }
//   ]
// }

const DECKS = [
  {
    id: "chronojet-deck",
    name: "Chronojet Deck",
    clan: "Dark States",
    image: "assets/cards/chronoscommand-dragon.png",
    cards: [
      {
        name: "Chronojet Dragon",
        nameJp: "クロノジェット・ドラゴン",
        image: "assets/cards/chronojet-dragon.png",
        grade: "G3",
        qty: 2,
        effect: "[CONT](VC): This card also has the [Stride] ability of the ride-deck cards it is riding on top of.\n[AUTO](VC): When this unit attacks a vanguard, until end of that battle, this unit gets [Power]+5000, and your opponent cannot call grade 1 or greater cards from hand to (GC) during that battle.\n[AUTO](VC): When a G unit is Stride on this unit, [COST][Counter-Blast 1], choose one of your opponent's rear-guards, and put it on the bottom of their deck."
      },
      {
        name: "Smokegear Dragon",
        nameJp: "スモークギア・ドラゴン",
        image: "assets/cards/smokegear-dragon.png",
        grade: "G2",
        qty: 4,
        effect: "[AUTO]: When a grade 3 unit with \"Chronojet\" in its card name rides this unit, [COST][Soul-Blast 1], search your deck for up to one grade 3 unit, reveal it, put it into your hand, and shuffle your deck.\nNote: Decklog shows this card in the deck's \"ride line\" preview row with no printed quantity badge — qty here is assumed as a standard 4-of playset. Please double-check against your physical decklist."
      },
      {
        name: "Masergear Dragon",
        nameJp: "メーザーギア・ドラゴン",
        image: "assets/cards/masergear-dragon.png",
        grade: "G1",
        qty: 4,
        effect: "[AUTO]: When this unit is placed on (RC) by the ride of \"Chrono Dran\", draw a card, and this unit gets a Chronojet Dragon crest.\nNote: shown in the deck's \"ride line\" preview row with no printed quantity badge — qty here is assumed as a standard 4-of playset. Please double-check against your physical decklist."
      },
      {
        name: "Chrono Dran",
        nameJp: "クロノ・ドラン",
        image: "assets/cards/chrono-dran.png",
        grade: "G0",
        qty: 4,
        effect: "[AUTO]: When this unit is ridden over, if you were the player who took the second turn in this fight, draw a card.\nNote: shown in the deck's \"ride line\" preview row with no printed quantity badge — qty here is assumed as a standard 4-of playset. Please double-check against your physical decklist."
      },
      {
        name: "Steam Fighter, Balih",
        nameJp: "スチームファイター バリフ",
        image: "assets/cards/steam-fighter-balih.png",
        grade: "G3",
        qty: 4,
        effect: "[CONT](VC/RC): During your turn, if a card was put on the bottom of a deck from play this turn, this unit gets [Power]+10000.\n[AUTO]: When this card is discarded from hand due to a Stride cost, draw a card."
      },
      {
        name: "Dream Sky Mutual Love, Naama & Samaell",
        nameJp: "夢天相愛 ナアマ＆サマエル",
        image: "assets/cards/naama-and-samaell.png",
        grade: "G4",
        qty: 4,
        effect: "[AUTO]: When this unit is placed on (RC) from hand outside the battle phase, choose one: [COST][Counter-Blast 1] — put a card from your damage zone into your hand and put the top card of your deck into the damage zone face down; or [COST][Energy-Blast 3] — look at the top 5 cards of your deck, reveal up to one grade 3 card, put it into your hand, and shuffle your deck.\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of that battle."
      },
      {
        name: "Upstream Dragon",
        nameJp: "アップストリーム・ドラゴン",
        image: "assets/cards/upstream-dragon.png",
        grade: "G2",
        qty: 4,
        effect: "[CONT]: This unit gets [Power]+5000 when attacking a vanguard.\n[AUTO]: After that battle if this unit attacked, [COST] put this unit on the bottom of your deck — search your deck for up to one grade 1 unit, reveal it, put it into your hand, and shuffle your deck."
      },
      {
        name: "Steam Fighter, Amber",
        nameJp: "スチームファイター アンバー",
        image: "assets/cards/steam-fighter-amber.png",
        grade: "G2",
        qty: 1,
        effect: "[AUTO](RC) Generation Break 1: [COST][Counter-Blast 1], when this unit boosted a unit that attacks a vanguard, you may pay the cost. If you do, choose one of your opponent's grade 2 or less rear-guards, and put it on the bottom of their deck."
      },
      {
        name: "Cutlery Stubber",
        nameJp: "カトラリー・スタバー",
        image: "assets/cards/cutlery-stubber.png",
        grade: "G2",
        qty: 1,
        effect: "(Terjemahan belum ditemukan — perlu dicek manual. This is a very recent Dark States card; no official or community English translation could be confidently located. Japanese text on the card mentions returning a card revealed by a hand effect and adding a rear-guard unit.)"
      },
      {
        name: "Steam Gunner, Tizkar",
        nameJp: "スチームガンナー ティズカール",
        image: "assets/cards/steam-gunner-tizkar.png",
        grade: "G2",
        qty: 3,
        effect: "[AUTO]: When this unit is placed on (GC) from hand, or discarded from your ride deck due to a ride, [COST][Counter-Blast 1] or [Energy-Blast 3], draw a card.\n[AUTO](RC): When this unit is placed on (RC) after you Persona Ride this turn, [COST][Counter-Blast 1] or [Energy-Blast 3], you may [Soul-Charge 1]. If you do, this unit gets Boost and [Power]+5000 until end of turn."
      },
      {
        name: "Steam Scara, Gigi",
        nameJp: "スチームスカラー ジジ",
        image: "assets/cards/steam-scara-gigi.png",
        grade: "G1",
        qty: 4,
        effect: "[AUTO](RC): When this unit is placed on (RC), if you have a Chronojet Dragon crest, [COST][Soul-Blast 2], draw a card.\n[CONT]: This unit gets [Power]+5000 while placed on (RC) by another card's ability."
      },
      {
        name: "Steam Breath Dragon",
        nameJp: "スチームブレス・ドラゴン",
        image: "assets/cards/steam-breath-dragon.png",
        grade: "G1",
        qty: 4,
        effect: "[CONT]: This card is treated as grade 3 for the cost of Stride.\n[AUTO]: If you have a Chronojet Dragon crest, [COST] discard this card from hand — search your deck for up to one grade 3 card with \"Chronojet\" in its card name, reveal it, put it into your hand, and shuffle your deck."
      },
      {
        name: "Steam Maiden, Arlim",
        nameJp: "スチームメイデン アルリム",
        image: "assets/cards/steam-maiden-arlim.png",
        grade: "G1",
        qty: 3,
        effect: "Sentinel.\n[AUTO]: When this unit is placed on (GC), choose one of your units, and until end of that battle, that unit cannot be hit. If you have two or more cards in hand, discard a card from hand."
      },
      {
        name: "Direful Doll, Finley",
        nameJp: "ダイアフルドール ふぃんりー",
        image: "assets/cards/direful-doll-finley.png",
        grade: "G1",
        qty: 1,
        effect: "[AUTO]: When this unit is placed on (RC), [Soul-Charge 1].\n[ACT](RC)[1/turn]: [COST][Soul-Blast 3], draw a card. If your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Steam Battler, Dadasig",
        nameJp: "スチームバトラー ダダシグ",
        image: "assets/cards/steam-battler-dadasig.png",
        grade: "G0",
        qty: 4,
        effect: "Critical Trigger: [Power]+5000, [Critical]+1.\nA grade 0 critical trigger unit for the Chronojet ride line, printed at 5000 power / 10000 shield."
      },
      {
        name: "Stomach Clock Gear Rabbit",
        nameJp: "腹時計付きのギアラビット",
        image: "assets/cards/stomach-clock-gear-rabbit.png",
        grade: "G0",
        qty: 4,
        effect: "Critical Trigger: [Power]+5000, [Critical]+1.\nA grade 0 critical trigger unit released alongside Steam Battler, Dadasig and Lucky Pot, Dracokid."
      },
      {
        name: "Steam Maiden, Ururu",
        nameJp: "スチームメイデン ウルル",
        image: "assets/cards/steam-maiden-ururu.png",
        grade: "G0",
        qty: 4,
        effect: "(Terjemahan belum ditemukan — perlu dicek manual. Card name transcribed from a low-resolution decklist image and not independently confirmed; treat spelling as tentative. No English translation of the effect text could be confidently located.)"
      },
      {
        name: "Night Sky's Secretary, Niklaus",
        nameJp: "（未確認） ○天の秘書官 ニクラス○○",
        image: "assets/cards/night-sky-secretary-niklaus.png",
        grade: "G0",
        qty: 1,
        effect: "(Terjemahan belum ditemukan — perlu dicek manual. Both the Japanese card name and the effect text were too small/blurred in the source decklist image to transcribe with confidence, and no matching card could be found via web search. Please verify against the physical card.)"
      },
      {
        name: "Diabolos Girls, Natalia",
        nameJp: "ディアブロスガールズ ナタリア",
        image: "assets/cards/diabolos-girls-natalia.png",
        grade: "G0",
        qty: 3,
        effect: "[CONT](GC): If your opponent's vanguard is grade 3 or greater, this unit gets [Shield]+5000.\n(Deck contains 3 total copies of this card across two different print rarities, shown as separate entries in the source decklist.)"
      },
      {
        name: "Stardust-Scattering Treasure Sword",
        nameJp: "（未確認）星屑をぶちまける宝剣",
        image: "assets/cards/stardust-scattering-treasure-sword.png",
        grade: "Trigger",
        qty: 1,
        effect: "(Terjemahan belum ditemukan — perlu dicek manual. Card name transcribed from a low-resolution decklist image and not independently confirmed; treat spelling as tentative. No English translation of the effect text could be confidently located.)"
      },
      {
        name: "Mystery Creepy Artillery",
        nameJp: "Mystery Creepy Artillery",
        image: "assets/cards/mystery-creepy-artillery.png",
        grade: "G2",
        qty: 1,
        effect: "[CONT]: Up to two copies of \"Mystery Creepy Artillery\" can be included in a deck. If your vanguard's grade is lower than your opponent's vanguard's grade, you can play this unit's ability ignoring grade.\n[ACT]: [COST][put this card into the drop zone], choose one unit being attacked; that unit gets [Power]+15000 until end of that battle. If you are the player who took the second turn and have not added a Persona Shield Ticket to hand by a card with the same name this fight, add a Persona Shield Ticket to your hand, and during this turn you may play one additional order, but only a Persona Shield Ticket. If your opponent Persona Rode this turn, choose one unit being attacked, and it gets [Power]+5000 until end of that battle instead."
      },
      {
        name: "Vessel of War Beyond Time",
        nameJp: "（未確認）刻を越えて成す戦争の器",
        image: "assets/cards/vessel-of-war-beyond-time.png",
        grade: "G1",
        qty: 1,
        effect: "(Terjemahan belum ditemukan — perlu dicek manual. Card name transcribed from a low-resolution decklist image and not independently confirmed; treat spelling as tentative. The visible Japanese text references Triple Drive and Persona Ride mechanics, but a full, confident translation could not be produced.)"
      },
      {
        name: "Chronodragon Nextage",
        nameJp: "クロノドラゴン・ネクステージ",
        image: "assets/cards/chronodragon-nextage.png",
        grade: "G (Stride/G unit)",
        qty: 4,
        effect: "This card cannot be placed in your main deck.\n[Stride] -Stride Step- [COST][discard a grade 3 card with \"Chronojet\" in its card name from hand], and [Stride] this card on your (VC) from face down.\n[AUTO](VC): At the end of the battle that it attacked a grade 3 or greater vanguard, if your soul has a card named \"Chronojet Dragon\", [COST][discard two cards from your hand], retire this unit, ride the \"Chronojet Dragon\" from your soul as [Stand], and it gets [Power]+15000 until end of turn."
      },
      {
        name: "Interdimensional Dragon, Mystery-Flare Dragon",
        nameJp: "時空竜 ミステリーフレア・ドラゴン",
        image: "assets/cards/mystery-flare-dragon.png",
        grade: "G (Stride/G unit)",
        qty: 4,
        effect: "This card cannot be placed in your main deck. Grade 4 / Triple Drive.\n[Stride] -Stride Step-: pay the Stride cost to [Stride] this card on your (VC) from face down.\n[AUTO](VC): When this unit's attack hits a vanguard, [COST][Counter-Blast 4], you may reveal the top 4 cards of your deck. If the revealed cards have 4 or more different grades among them, you get an additional turn after this one, then put those cards into your drop zone."
      },
      {
        name: "Interdimensional Dragon, Chronoscommand Dragon",
        nameJp: "時空竜 クロノスコマンド・ドラゴン",
        image: "assets/cards/chronoscommand-dragon.png",
        grade: "G (Stride/G unit)",
        qty: 4,
        effect: "This card cannot be placed in your main deck. Grade 4 / Triple Drive.\n[Stride] -Stride Step-: released when both players' vanguards are grade 3 or greater; choose cards from your hand with a total grade of 3 or greater and discard them to [Stride] this card on your (VC) from face down.\n[ACT](VC): [COST][Counter-Blast 2, Soul-Blast 1, discard a card from your hand], your opponent puts all of their rear-guards on the bottom of their deck in any order."
      }
    ]
  }
];
