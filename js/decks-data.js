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
        effect: "[CONT]: This card can only be ridden if your crest zone has no cards other than \"Energy Generator\".\n[CONT](VC): You can Stride, during your turn, if your G zone has one or more face up cards, all of your front row units get [Power]+5000. If your G zone has three or more face up cards, they get [Power]+10000 instead of +5000.\n[AUTO](VC): When your G unit Stride, choose one of your opponent's rear-guards, and put it on the bottom of the deck. If you did not choose a card, draw a card.\n[AUTO](VC) Generation Break 2: When this unit attacks a vanguard, for each card with \"Chronojet\" in its card name in your bind zone, this unit gets [Power]+5000 until end of that battle. Your opponent cannot call grade 1 or greater cards from hand to (GC) until end of that battle."
      },
      {
        name: "Smokegear Dragon",
        nameJp: "スモークギア・ドラゴン",
        image: "assets/cards/smokegear-dragon.png",
        grade: "G2",
        qty: 4,
        effect: "[AUTO]: When this unit is rode upon by a grade 3 card with a Chrono icon, [COST][Soul-Blast 1], search your deck for up to one grade 3 card, reveal it and put it into hand, and shuffle the deck.\n[CONT](RC/GC) Generation Break 1: If your vanguard has a Chrono icon, this unit gets [Power]+5000/[Shield]+5000."
      },
      {
        name: "Masergear Dragon",
        nameJp: "メーザーギア・ドラゴン",
        image: "assets/cards/masergear-dragon.png",
        grade: "G1",
        qty: 4,
        effect: "[AUTO]: When this unit is placed by riding from a grade 0 card with a Chrono icon, [COST][reveal a grade 3 card with a Chrono icon from ride deck], draw two cards, choose a card from your hand, and put it on the bottom of the deck.\n[ACT](Drop): If your vanguard has a Chrono icon, and your opponent's vanguard is grade 3 or greater, [COST][put this card that was in the ride deck into the ride deck face up], choose one of your rear-guards, put it on the bottom of the deck, search your deck for up to one unit card with grade equal to that chosen card's grade +1, call it to (RC), and it gets [Power]+5000 until end of turn. Shuffle the deck."
      },
      {
        name: "Chrono Dran",
        nameJp: "クロノ・ドラン",
        image: "assets/cards/chrono-dran.png",
        grade: "G0",
        qty: 4,
        effect: "[AUTO]: When this unit is ridden over, if you were the player who took the second turn in this fight, draw a card."
      },
      {
        name: "Steam Fighter, Balih",
        nameJp: "スチームファイター バリフ",
        image: "assets/cards/steam-fighter-balih.png",
        grade: "G3",
        qty: 4,
        effect: "[AUTO]: When this card is discarded from hand for the cost of Stride, if all of your rear-guards have different card names from this card, you may call this card to (RC). If you called it, this unit gets grade -2 until end of turn.\n[AUTO](RC) Generation Break 1: When this unit attacks, if your vanguard has a Chrono icon, this unit gets [Power]+10000 until end of that battle.\n[CONT](GC): If your vanguard has a Chrono icon, this unit gets [Shield]+10000."
      },
      {
        name: "Dream Sky Mutual Love, Naama & Samaell",
        nameJp: "夢天相愛 ナアマ＆サマエル",
        image: "assets/cards/naama-and-samaell.png",
        grade: "G2",
        qty: 4,
        effect: "[AUTO]: When this unit is placed on (RC) from hand other than during the battle phase, perform one of the following.\n•COST[Counter Blast (1)], choose a card from your damage zone, put it into hand, and put the top card of your deck in the damage zone face down.\n•COST[Energy Blast (3)], look at the top five cards of your deck, choose up to one grade 3 card without [Regalis Piece] from among them, reveal it and put it into hand, and shuffle the deck.\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of that battle. If you have a vanguard with only one clan, it gets [Power]+5000 until end of that battle if your opponent's vanguard is grade 2 or greater instead of grade 3 or greater."
      },
      {
        name: "Upstream Dragon",
        nameJp: "アップストリーム・ドラゴン",
        image: "assets/cards/upstream-dragon.png",
        grade: "G2",
        qty: 4,
        effect: "[AUTO](Drop): When your grade 3 or greater vanguard with a Chrono icon is placed, [COST][Counter Blast (1) or Energy Blast (3)], and call this card to (RC).\n[AUTO](RC): When this unit attacks, if your grade 3 or greater vanguard has a Chrono icon, you may have this unit get [Power]+5000 until end of that battle. If you do, at the end of that battle, put this unit on the bottom of the deck, search your deck for up to one grade 1 card with a Chrono icon, call it to a back row (RC), and shuffle the deck. If it is the first battle of this turn, and your vanguard is grade 3, you may call it to a front row (RC) instead of a back row."
      },
      {
        name: "Steam Fighter, Amber",
        nameJp: "スチームファイター アンバー",
        image: "assets/cards/steam-fighter-amber.png",
        grade: "G2",
        qty: 1,
        effect: "[AUTO]: When this unit is placed on (RC), if your vanguard has a Chrono icon, [COST][Counter Blast (1)], and draw a card. If your vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn.\n[CONT](RC/GC) Generation Break 1: If your vanguard has a Chrono icon, this unit gets [Power]+5000/[Shield]+5000."
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
        effect: "[AUTO]: When this unit is put on (GC) from hand or discarded from hand while riding from the ride deck, [COST][Counter Blast (1) or Energy Blast (3)], and draw a card.\n[AUTO]: When this unit is placed on (RC), if you persona rode this turn, [COST][Counter Blast (1) or Energy Blast (3)], and you may Soul Charge (1). Until end of turn, this unit gets \"Boost\", and [Power]+5000."
      },
      {
        name: "Steam Scara, Gigi",
        nameJp: "スチームスカラー ジジ",
        image: "assets/cards/steam-scara-gigi.png",
        grade: "G1",
        qty: 4,
        effect: "[AUTO]: When this unit is placed on (RC), if your grade 3 or greater vanguard has a Chrono icon, this unit gets [Power]+5000 until end of turn.\n[AUTO](RC): At the end of the battle this unit attacked or boosted, if your vanguard has a Chrono icon, and you Stride this turn, [COST][put this unit into soul], and draw a card."
      },
      {
        name: "Steam Breath Dragon",
        nameJp: "スチームブレス・ドラゴン",
        image: "assets/cards/steam-breath-dragon.png",
        grade: "G1",
        qty: 4,
        effect: "[CONT](Hand): When you would discard cards from hand for the cost of your G unit's ability, you may discard this card as any grade 0~3. (This also includes the cost for Stride)\n[AUTO]: When this unit is placed on (RC), if your vanguard has a Chrono icon, perform all of the following.\n•COST[Counter Blast (1)], look at the top seven cards of your deck, choose up to one grade 3 card from among them, reveal it and put it into hand, and shuffle the deck. If you did not reveal a card, Counter Charge (1).\n•If your vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn."
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
        effect: "[AUTO]: When this unit is placed on (RC), Soul Charge (1).\n[ACT](RC) 1/Turn: [COST][Soul Blast (3)], draw a card, and if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn.\n[ACT](Soul): [COST][Bind this card], and Soul Charge (2)."
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
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down.\n[CONT]: This card can only be Stride if your vanguard has a Chrono icon.\n[AUTO](VC): At the end of the battle this unit attacked a vanguard, COST[Counter Blast (1) & discard a card from hand & turn a card with a Chrono icon and the same card name as this card from G zone face up], put this unit into G zone face up, choose one of your vanguards with a Chrono icon, [Stand] it, and it gets drive -2 until end of turn. COST[Bind a card with \"Chronojet\" in its card name from hand or drop], and that unit gets drive +1 until end of turn. If your G zone has three or more face up cards, it gets drive +2 instead of +1."
      },
      {
        name: "Interdimensional Dragon, Mystery-Flare Dragon",
        nameJp: "時空竜 ミステリーフレア・ドラゴン",
        image: "assets/cards/mystery-flare-dragon.png",
        grade: "G (Stride/G unit)",
        qty: 4,
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down.\n[CONT]: This card can only be Stride if your vanguard has a Chrono icon.\n[ACT](VC) 1/Turn: COST[Turn a card from G zone face up], and perform all of the following.\n•Until the end of your opponent's next turn, you get \"All of your front row units get [Power]+5000.\". Choose one of your rear-guards, and it gets \"[AUTO](RC): When your vanguard attacks, [Stand] this unit.\" until end of turn.\n•If your G zone has five or more face up cards, until end of turn, this unit gets \"[AUTO](VC): At the end of the battle this unit attacked, COST[discard four cards with different grades from hand], and you get an additional turn. During that additional turn, you skip the ride phase, and you cannot Stride.\"."
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
