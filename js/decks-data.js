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
    image: "assets/cards/chronojet-dragon.webp",
    cards: [
      {
        name: "Chronojet Dragon",
        nameJp: "クロノジェット・ドラゴン",
        image: "assets/cards/chronojet-dragon.webp",
        grade: "G3",
        qty: 2,
        section: "Ride Line",
        effect: "[CONT]: This card can only be ridden if your crest zone has no cards other than \"Energy Generator\".\n[CONT](VC): You can Stride, during your turn, if your G zone has one or more face up cards, all of your front row units get [Power]+5000. If your G zone has three or more face up cards, they get [Power]+10000 instead of +5000.\n[AUTO](VC): When your G unit Stride, choose one of your opponent's rear-guards, and put it on the bottom of the deck. If you did not choose a card, draw a card.\n[AUTO](VC) Generation Break 2: When this unit attacks a vanguard, for each card with \"Chronojet\" in its card name in your bind zone, this unit gets [Power]+5000 until end of that battle. Your opponent cannot call grade 1 or greater cards from hand to (GC) until end of that battle."
      },
      {
        name: "Smokegear Dragon",
        nameJp: "スモークギア・ドラゴン",
        image: "assets/cards/smokegear-dragon.webp",
        grade: "G2",
        qty: 4,
        section: "Ride Line",
        effect: "[AUTO]: When this unit is rode upon by a grade 3 card with a Chrono icon, [COST][Soul-Blast 1], search your deck for up to one grade 3 card, reveal it and put it into hand, and shuffle the deck.\n[CONT](RC/GC) Generation Break 1: If your vanguard has a Chrono icon, this unit gets [Power]+5000/[Shield]+5000."
      },
      {
        name: "Masergear Dragon",
        nameJp: "メーザーギア・ドラゴン",
        image: "assets/cards/masergear-dragon.webp",
        grade: "G1",
        qty: 4,
        section: "Ride Line",
        effect: "[AUTO]: When this unit is placed by riding from a grade 0 card with a Chrono icon, [COST][reveal a grade 3 card with a Chrono icon from ride deck], draw two cards, choose a card from your hand, and put it on the bottom of the deck.\n[ACT](Drop): If your vanguard has a Chrono icon, and your opponent's vanguard is grade 3 or greater, [COST][put this card that was in the ride deck into the ride deck face up], choose one of your rear-guards, put it on the bottom of the deck, search your deck for up to one unit card with grade equal to that chosen card's grade +1, call it to (RC), and it gets [Power]+5000 until end of turn. Shuffle the deck."
      },
      {
        name: "Chrono Dran",
        nameJp: "クロノ・ドラン",
        image: "assets/cards/chrono-dran.webp",
        grade: "G0",
        qty: 4,
        section: "Ride Line",
        effect: "[AUTO]: When this unit is ridden over, if you were the player who took the second turn in this fight, draw a card."
      },
      {
        name: "Steam Fighter, Balih",
        nameJp: "スチームファイター バリフ",
        image: "assets/cards/steam-fighter-balih.webp",
        grade: "G3",
        qty: 4,
        section: "Main Deck",
        effect: "[AUTO]: When this card is discarded from hand for the cost of Stride, if all of your rear-guards have different card names from this card, you may call this card to (RC). If you called it, this unit gets grade -2 until end of turn.\n[AUTO](RC) Generation Break 1: When this unit attacks, if your vanguard has a Chrono icon, this unit gets [Power]+10000 until end of that battle.\n[CONT](GC): If your vanguard has a Chrono icon, this unit gets [Shield]+10000."
      },
      {
        name: "Dream Sky Mutual Love, Naama & Samaell",
        nameJp: "夢天相愛 ナアマ＆サマエル",
        image: "assets/cards/naama-and-samaell.webp",
        grade: "G2",
        qty: 4,
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC) from hand other than during the battle phase, perform one of the following.\n•COST[Counter Blast (1)], choose a card from your damage zone, put it into hand, and put the top card of your deck in the damage zone face down.\n•COST[Energy Blast (3)], look at the top five cards of your deck, choose up to one grade 3 card without [Regalis Piece] from among them, reveal it and put it into hand, and shuffle the deck.\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of that battle. If you have a vanguard with only one clan, it gets [Power]+5000 until end of that battle if your opponent's vanguard is grade 2 or greater instead of grade 3 or greater."
      },
      {
        name: "Upstream Dragon",
        nameJp: "アップストリーム・ドラゴン",
        image: "assets/cards/upstream-dragon.webp",
        grade: "G2",
        qty: 4,
        section: "Main Deck",
        effect: "[AUTO](Drop): When your grade 3 or greater vanguard with a Chrono icon is placed, [COST][Counter Blast (1) or Energy Blast (3)], and call this card to (RC).\n[AUTO](RC): When this unit attacks, if your grade 3 or greater vanguard has a Chrono icon, you may have this unit get [Power]+5000 until end of that battle. If you do, at the end of that battle, put this unit on the bottom of the deck, search your deck for up to one grade 1 card with a Chrono icon, call it to a back row (RC), and shuffle the deck. If it is the first battle of this turn, and your vanguard is grade 3, you may call it to a front row (RC) instead of a back row."
      },
      {
        name: "Steam Fighter, Amber",
        nameJp: "スチームファイター アンバー",
        image: "assets/cards/steam-fighter-amber.webp",
        grade: "G2",
        qty: 1,
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), if your vanguard has a Chrono icon, [COST][Counter Blast (1)], and draw a card. If your vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn.\n[CONT](RC/GC) Generation Break 1: If your vanguard has a Chrono icon, this unit gets [Power]+5000/[Shield]+5000."
      },
      {
        name: "Steam Gunner, Tizkar",
        nameJp: "スチームガンナー ティズカール",
        image: "assets/cards/steam-gunner-tizkar.webp",
        grade: "G2",
        qty: 3,
        section: "Main Deck",
        effect: "[AUTO]: When this unit is put on (GC) from hand or discarded from hand while riding from the ride deck, [COST][Counter Blast (1) or Energy Blast (3)], and draw a card.\n[AUTO]: When this unit is placed on (RC), if you persona rode this turn, [COST][Counter Blast (1) or Energy Blast (3)], and you may Soul Charge (1). Until end of turn, this unit gets \"Boost\", and [Power]+5000."
      },
      {
        name: "Mystery Creepy Artillery",
        nameJp: "Mystery Creepy Artillery",
        image: "assets/cards/mystery-creepy-artillery.webp",
        grade: "G2",
        qty: 1,
        section: "Main Deck",
        effect: "[CONT]: Up to two copies of \"Mystery Creepy Artillery\" can be included in a deck. If your vanguard's grade is lower than your opponent's vanguard's grade, you can play this unit's ability ignoring grade.\n[ACT]: [COST][put this card into the drop zone], choose one unit being attacked; that unit gets [Power]+15000 until end of that battle. If you are the player who took the second turn and have not added a Persona Shield Ticket to hand by a card with the same name this fight, add a Persona Shield Ticket to your hand, and during this turn you may play one additional order, but only a Persona Shield Ticket. If your opponent Persona Rode this turn, choose one unit being attacked, and it gets [Power]+5000 until end of that battle instead."
      },
      {
        name: "Steam Scara, Gigi",
        nameJp: "スチームスカラー ジジ",
        image: "assets/cards/steam-scara-gigi.webp",
        grade: "G1",
        qty: 4,
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), if your grade 3 or greater vanguard has a Chrono icon, this unit gets [Power]+5000 until end of turn.\n[AUTO](RC): At the end of the battle this unit attacked or boosted, if your vanguard has a Chrono icon, and you Stride this turn, [COST][put this unit into soul], and draw a card."
      },
      {
        name: "Steam Breath Dragon",
        nameJp: "スチームブレス・ドラゴン",
        image: "assets/cards/steam-breath-dragon.webp",
        grade: "G1",
        qty: 4,
        section: "Main Deck",
        effect: "[CONT](Hand): When you would discard cards from hand for the cost of your G unit's ability, you may discard this card as any grade 0~3. (This also includes the cost for Stride)\n[AUTO]: When this unit is placed on (RC), if your vanguard has a Chrono icon, perform all of the following.\n•COST[Counter Blast (1)], look at the top seven cards of your deck, choose up to one grade 3 card from among them, reveal it and put it into hand, and shuffle the deck. If you did not reveal a card, Counter Charge (1).\n•If your vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Steam Maiden, Arlim",
        nameJp: "スチームメイデン アルリム",
        image: "assets/cards/steam-maiden-arlim.webp",
        grade: "G1",
        qty: 3,
        section: "Main Deck",
        effect: "Sentinel.\n[AUTO]: When this unit is placed on (GC), choose one of your units, and until end of that battle, that unit cannot be hit. If you have two or more cards in hand, discard a card from hand."
      },
      {
        name: "Direful Doll, Finley",
        nameJp: "ダイアフルドール ふぃんりー",
        image: "assets/cards/direful-doll-finley.webp",
        grade: "G1",
        qty: 1,
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), Soul Charge (1).\n[ACT](RC) 1/Turn: [COST][Soul Blast (3)], draw a card, and if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn.\n[ACT](Soul): [COST][Bind this card], and Soul Charge (2)."
      },
      {
        name: "Steam Battler, Dadasig",
        nameJp: "スチームバトラー ダダシグ",
        image: "assets/cards/steam-battler-dadasig.webp",
        grade: "G0",
        qty: 4,
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+5000, [Critical]+1.\nA grade 0 critical trigger unit for the Chronojet ride line, printed at 5000 power / 10000 shield."
      },
      {
        name: "Stomach Clock Gear Rabbit",
        nameJp: "腹時計付きのギアラビット",
        image: "assets/cards/stomach-clock-gear-rabbit.webp",
        grade: "G0",
        qty: 4,
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+5000, [Critical]+1.\nA grade 0 critical trigger unit released alongside Steam Battler, Dadasig and Lucky Pot, Dracokid."
      },
      {
        name: "Steam Maiden, Ururu",
        nameJp: "スチームメイデン ウルル",
        image: "assets/cards/steam-maiden-ururu.webp",
        grade: "G0",
        qty: 4,
        section: "Main Deck",
        effect: "Front Trigger: [Power]+10000.\nA grade 0 front trigger unit for the Chronojet ride line, printed at 5000 power / 15000 shield."
      },
      {
        name: "Diabolos Girls, Natalia",
        nameJp: "ディアブロスガールズ ナタリア",
        image: "assets/cards/diabolos-girls-natalia.png",
        grade: "G0",
        qty: 3,
        section: "Main Deck",
        effect: "[CONT](GC): If your opponent's vanguard is grade 3 or greater, this unit gets [Shield]+5000.\n(Deck contains 3 total copies of this card across two different print rarities, shown as separate entries in the source decklist.)"
      },
      {
        name: "Chronodragon Nextage",
        nameJp: "クロノドラゴン・ネクステージ",
        image: "assets/cards/chronodragon-nextage.webp",
        grade: "G (Stride/G unit)",
        qty: 4,
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down.\n[CONT]: This card can only be Stride if your vanguard has a Chrono icon.\n[AUTO](VC): At the end of the battle this unit attacked a vanguard, COST[Counter Blast (1) & discard a card from hand & turn a card with a Chrono icon and the same card name as this card from G zone face up], put this unit into G zone face up, choose one of your vanguards with a Chrono icon, [Stand] it, and it gets drive -2 until end of turn. COST[Bind a card with \"Chronojet\" in its card name from hand or drop], and that unit gets drive +1 until end of turn. If your G zone has three or more face up cards, it gets drive +2 instead of +1."
      },
      {
        name: "Interdimensional Dragon, Mystery-Flare Dragon",
        nameJp: "時空竜 ミステリーフレア・ドラゴン",
        image: "assets/cards/mystery-flare-dragon.webp",
        grade: "G (Stride/G unit)",
        qty: 4,
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down.\n[CONT]: This card can only be Stride if your vanguard has a Chrono icon.\n[ACT](VC) 1/Turn: COST[Turn a card from G zone face up], and perform all of the following.\n•Until the end of your opponent's next turn, you get \"All of your front row units get [Power]+5000.\". Choose one of your rear-guards, and it gets \"[AUTO](RC): When your vanguard attacks, [Stand] this unit.\" until end of turn.\n•If your G zone has five or more face up cards, until end of turn, this unit gets \"[AUTO](VC): At the end of the battle this unit attacked, COST[discard four cards with different grades from hand], and you get an additional turn. During that additional turn, you skip the ride phase, and you cannot Stride.\"."
      },
      {
        name: "Interdimensional Dragon, Chronoscommand Dragon",
        nameJp: "時空竜 クロノスコマンド・ドラゴン",
        image: "assets/cards/chronoscommand-dragon.png",
        grade: "G (Stride/G unit)",
        qty: 4,
        section: "Stride",
        effect: "This card cannot be placed in your main deck. Grade 4 / Triple Drive.\n[Stride] -Stride Step-: released when both players' vanguards are grade 3 or greater; choose cards from your hand with a total grade of 3 or greater and discard them to [Stride] this card on your (VC) from face down.\n[ACT](VC): [COST][Counter-Blast 2, Soul-Blast 1, discard a card from your hand], your opponent puts all of their rear-guards on the bottom of their deck in any order."
      }
    ]
  },
  {
    id: "nightrose-deck",
    name: "Nightrose Standard",
    clan: "Stoicheia",
    image: "assets/cards/vampire-princess-of-night-fog-nightrose.webp",
    cards: [
      {
        name: "Vampire Princess of Night Fog, Nightrose",
        nameJp: "夜霧の吸血姫 ナイトローゼ",
        image: "assets/cards/vampire-princess-of-night-fog-nightrose.webp",
        grade: "G3",
        section: "Ride Line",
        effect: "[AUTO](VC) 1/Turn Generation Break 2: When your rear-guard is retired, COST[discard the top three cards of the deck], and you may call that retired card to (RC).\n[AUTO](VC): When your G unit Strides during your turn, COST[Counter Blast (1)], choose up to one card from your drop, call it to (RC), and that unit gets [Power]+2000 until end of turn."
      },
      {
        name: "Pirate Swordsman, Colombard",
        nameJp: "海賊剣士 コロンバール",
        image: "assets/cards/pirate-swordsman-colombard.webp",
        grade: "G2",
        section: "Ride Line",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO]: When this unit is rode upon by a grade 3 with \"Nightrose\" in its card name, COST[Soul Blast (1)], look at the top seven cards of your deck, choose up to two normal units without sentinel from among them, reveal them, choose one of the revealed cards, put it into hand, discard the rest of the revealed cards, and shuffle the deck.\n[AUTO](RC): When this unit attacks, if this unit is hollowed, this unit gets [Power]+5000 until end of that battle."
      },
      {
        name: "Parting Shade",
        nameJp: "パーティング・シェイド",
        image: "assets/cards/parting-shade.webp",
        grade: "G1",
        section: "Ride Line",
        effect: "[AUTO]: When this unit is placed by riding from \"Undying Departed, Grenache\", draw a card, and you get a \"Vampire Princess of Night Fog, Nightrose\" crest."
      },
      {
        name: "Undying Departed, Grenache",
        nameJp: "死せざる死者 グルナッシュ",
        image: "assets/cards/undying-departed-grenache.webp",
        grade: "G0",
        section: "Ride Line",
        effect: "[AUTO]: When this unit is rode upon, if you went second, draw a card."
      },
      {
        name: "Sea Strike Dragon, Enlargulv",
        nameJp: "海撃竜 インラージガルヴ",
        image: "assets/cards/sea-strike-dragon-enlargulv.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC) or put on (GC), choose up to one grade 4 card from your hand, and reveal it. If you revealed a card, or your vanguard is grade 4, perform one of the following according to the circle this unit is on.\n•(RC) - COST[Soul Blast (1)], choose a grade 2 or greater card with a different card name from this unit from your drop, and put it into hand.\n•(GC) - This unit gets [Shield]+15000 until end of that battle.\n[AUTO]: When this card is discarded from hand while riding a grade 3 from the ride deck or paying the cost for Stride, draw a card."
      },
      {
        name: "Mighty Rogue, Nightstorm",
        nameJp: "一鬼当千 ナイトストーム",
        image: "assets/cards/mighty-rogue-nightstorm.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[CONT](RC) Generation Break 2: During your turn, if this unit is hollowed, this unit gets [Power]+10000.\n[AUTO]: When this card is discarded from hand while paying the cost for Stride, draw a card."
      },
      {
        name: "Ghost Chase",
        nameJp: "ゴースト・チェイス",
        image: "assets/cards/ghost-chase.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "Choose one of your units, and it gets [Power]+5000 until end of that battle. Choose one of your rear-guards not being attacked, and return it to your hand."
      },
      {
        name: "Protection: Twincast",
        nameJp: "双つに連なる守護の法陣",
        image: "assets/cards/protection-twincast.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[Regalis Piece] (You may only have one Regalis Piece in your deck, and use it a total of one time in a fight.)\nChoose one of your units being attacked, and it gets [Power]+10000 until end of that battle.\n[CONT]: This card's [AUTO] ability can be resolved even if you have resolved a [Regalis Piece] ability this fight.\n[AUTO](Drop): When your unit is attacked, COST[remove this card from drop], choose one of your units being attacked, and it gets [Power]+5000 until end of that battle for each grade of that unit."
      },
      {
        name: "Ransack Shade",
        nameJp: "ランサック・シェイド",
        image: "assets/cards/ransack-shade.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO]: If this unit was placed by the ability of your heart with \"Nightrose\" in its card name, this cost can be paid with Energy Blast (3) instead. When this unit is placed on (RC) during the ride phase or main phase, if you have a vanguard with only «Granblue» for its clan, COST[Counter Blast (1)], and perform one of the following.\n•Draw a card.\n•If your vanguard is grade 3 or greater, choose a card from your drop, and call it to (RC).\n[AUTO](RC): When this unit becomes hollowed, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Marauding Shade",
        nameJp: "マローディング・シェイド",
        image: "assets/cards/marauding-shade.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO](RC): When this unit becomes hollowed, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Power]+5000 until end of turn. If your drop has ten or more cards, it gets [Power]+10000 instead of +5000.\n[AUTO]: When this unit is put on (GC), if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Shield]+5000 until end of turn. If your drop has ten or more cards, it gets [Shield]+10000 instead of +5000."
      },
      {
        name: "Mutual Feelings Maiden, Pense",
        nameJp: "相思の乙女 パンセ",
        image: "assets/cards/mutual-feelings-maiden-pense.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[Ace Unit] (You may only have one Ace Unit in a deck)\n[Unique Skill]-[AUTO]: When this unit is placed on (RC) other than during the battle phase, this unit gets [Power]+5000 until end of turn. COST[Energy Blast (3)], look at the top seven cards of your deck, choose up to one card from among them, discard it, and shuffle the deck. Choose up to one card with grade less than or equal to your vanguard from your drop, and call it to (RC). (You may only use Unique Skills a total of once per fight among all your cards)\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, until end of that battle, this unit gets [Power]+5000, and if your drop has ten or more cards, it also gets [Power]+5000."
      },
      {
        name: "Corpse Hunting Rend Cataclysm, Roveena & Zuin",
        nameJp: "屍猟裂災 ロヴィーナ＆ズウィン",
        image: "assets/cards/corpse-hunting-rend-cataclysm-roveena-and-zuin.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC) from hand other than during the battle phase, perform one of the following.\n•COST[Counter Blast (1)], look at the top card of your deck, and put it on the bottom of the deck, or discard it. Choose a grade 2 or less card from your drop, and call it to (RC).\n•COST[Energy Blast (2)], look at the top card of your deck, put it on the bottom of the deck or into soul, choose one of your opponent's rear-guards, and put it into soul.\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of that battle. If you have a vanguard with only one clan, it gets [Power]+5000 until end of that battle if your opponent's vanguard is grade 2 or greater instead of grade 3 or greater."
      },
      {
        name: "Insetti Omertà",
        nameJp: "蟲の掟",
        image: "assets/cards/insetti-omerta.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[CONT]: You may only have up to two \"Insetti Omertà\" in a deck.\nIf your vanguard's grade is less than your opponent's vanguard's grade, this ability can be played while ignoring grade. COST[Remove this card], choose a unit being attacked, until end of that battle, it gets [Power]+15000, and perform all of the following.\n•If you went second, and you did not put a Persona Shield ticket into hand by the ability of a card with the same card name as this card this fight, put a Persona Shield ticket into hand, and until end of turn, you can play an additional order, and cannot play orders other than Persona Shield tickets.\n•If your opponent persona rode this turn, choose a unit being attacked, and it gets [Power]+5000 until end of that battle."
      },
      {
        name: "Graeme the Ghostie",
        nameJp: "お化けのぐれーむ",
        image: "assets/cards/graeme-the-ghostie.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](Drop): When your vanguard with \"Ghostie\" in its card name is placed, if all of your rear-guards have a different name from this card, you may call this card to (RC).\n[AUTO](RC/Hand): At the beginning of the guard step of the battle your unit with only «Granblue» for its clan was attacked, COST[put this card into drop], choose a unit being attacked, and it gets [Power]+10000 until end of that battle. (Performed before calling guardians and intercepting)"
      },
      {
        name: "Witch Doctor of Powdered Bone, Negrobone",
        nameJp: "粉骨の呪術師 ネグロボーン",
        image: "assets/cards/witch-doctor-of-powdered-bone-negrobone.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): At the end of the battle this unit boosted and it was placed from drop this turn, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, COST[retire this unit], and draw a card."
      },
      {
        name: "Waterspout Djinn",
        nameJp: "竜巻のジン",
        image: "assets/cards/waterspout-djinn.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "Sentinel.\n[AUTO]: When this unit is put on (GC), choose one of your units, and it cannot be hit until end of that battle. If your hand has two or more cards, choose a card from your hand, and discard it."
      },
      {
        name: "Cam the Ghostie",
        nameJp: "お化けのきゃむ",
        image: "assets/cards/cam-the-ghostie.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO]: When this unit is placed on (RC) from hand, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, look at the top five cards of your deck, choose up to one card from among them, discard it, and shuffle the deck.\n[CONT](RC): During your turn, if this unit is hollowed, this unit gets [Power]+5000."
      },
      {
        name: "Tommy the Ghostie Brothers",
        nameJp: "お化けのとみー兄弟",
        image: "assets/cards/tommy-the-ghostie-brothers.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT](Hand): While you are paying the cost for [Stride], this card may be discarded as a grade 3.\n[ACT](Hand): If you have a \"Vampire Princess of Night Fog, Nightrose\" crest, COST[discard this card], search your deck or drop for up to one grade 3 card with \"Nightrose\" in its card name, reveal it and put it into hand, and if you searched the deck, shuffle the deck."
      },
      {
        name: "Abyss Temptation",
        nameJp: "深淵誘い",
        image: "assets/cards/abyss-temptation.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\nA grade 0 critical trigger unit for the Nightrose ride line, with no additional abilities beyond its trigger effect, printed at 5000 power / 15000 shield."
      },
      {
        name: "Lost Child of Attachment",
        nameJp: "愛執の迷い子",
        image: "assets/cards/lost-child-of-attachment.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Draw Trigger: [Power]+10000, draw a card.\nA grade 0 draw trigger unit for the Nightrose ride line, with no additional abilities beyond its trigger effect, printed at 5000 power / 5000 shield."
      },
      {
        name: "Grudgeful Hatchet",
        nameJp: "怨みの手斧",
        image: "assets/cards/grudgeful-hatchet.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Front Trigger: [Power]+10000.\nA grade 0 front trigger unit for the Nightrose ride line, with no additional abilities beyond its trigger effect, printed at 5000 power / 15000 shield."
      },
      {
        name: "Elegy Pixy",
        nameJp: "哀歌の妖精",
        image: "assets/cards/elegy-pixy.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Heal Trigger: [Power]+10000. (You may only have up to four [Heal] triggers in a deck.)\nA grade 0 heal trigger unit for the Nightrose ride line, with no additional abilities beyond its trigger effect, printed at 5000 power / 15000 shield."
      },
      {
        name: "Source Dragon Deity of Blessings, Blessfavor",
        nameJp: "天恵の源竜王 ブレスファボール",
        image: "assets/cards/source-dragon-deity-of-blessings-blessfavor.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Over Trigger: [Power]+100 Million.\n(You may only have one [Over] trigger in a deck.) When revealed as a trigger, remove that card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn. If revealed during drive check, activate its additional effect instead.\nAdditional Effect - Draw a card. Choose one of your units, and it gets [Critical]+1 until end of turn. All of your front row units get [Power]+10000. If your damage zone has the same number of cards as your opponent's or more, choose a card from your damage zone, and heal it."
      },
      {
        name: "Pirate King of Redemption, Dragut",
        nameJp: "贖いの海賊王 ドラクート",
        image: "assets/cards/pirate-king-of-redemption-dragut.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[ACT](VC) 1/Turn: COST[Counter Blast (1) & turn a card with the same card name as this card from G zone face up], choose a card from your drop, call it to (RC), and it gets \"[AUTO](RC): When your vanguard attacks, if this unit is hollowed, [Stand] this unit.\" until end of turn. If you called a card with the Hollow ability, your opponent chooses one of their rear-guards, and retires it."
      },
      {
        name: "Mist Phantasm Pirate King, Nightrose",
        nameJp: "霧幻の海賊王 ナイトローゼ",
        image: "assets/cards/mist-phantasm-pirate-king-nightrose.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Discard a grade 3 card with \"Nightrose\" in its card name from your hand], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[AUTO](VC) Generation Break 2: When this unit attacks a vanguard, COST[Counter Blast (1) & retire two rear-guards], choose up to two grade 2 or greater cards with different card names from your drop, and call them to (RC). If your drop has ten or more cards, this unit gets [Critical]+1 until end of that battle, and if your drop has fifteen or more cards, all of those called units get [Power]+10000 until end of turn."
      },
      {
        name: "Ghostie Great King, Obadiah",
        nameJp: "お化け大王 おばだいあ",
        image: "assets/cards/ghostie-great-king-obadiah.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[ACT](VC) 1/Turn: COST[Turn a card from G zone face up], look at the top five cards of your deck, choose up to one card from among them, discard it, and shuffle the deck. Choose up to one card from your drop, and call it to (RC). If you called a unit with the Hollow ability, that unit gets [Power]+5000 until end of turn."
      }
    ]
  },
  {
    id: "heartluru-deck",
    name: "Heartluru Deck",
    clan: "Dark States",
    image: "assets/cards/sugary-and-scary-land-heartluru.webp",
    cards: [
      {
        name: "Sugary and Scary Land, Heartluru",
        image: "assets/cards/sugary-and-scary-land-heartluru.webp",
        grade: "G3",
        section: "Ride Line",
        effect: "[CONT](VC): During your turn, if your order zone has three or more \"Toys Are Made for Children\", all of your front row units get [Power]+5000.\n[ACT](VC)[1/Turn]: [COST][Energy-Blast 3], choose up to the same number of [Happy Toys] from your soul as the number of \"Toys Are Made for Children\" in your order zone, and call them to (RC).\n[AUTO](VC)[1/Turn]: When this unit attacks, [COST][Counter-Blast 1], and perform all of the following according to the number of \"Toys Are Made for Children\" in your order zone.\n・Two or more - Choose one of your front row [Happy Toys], [Stand] it, and it gets [Power]+10000 until end of turn.\n・Three or more - Until end of turn, this unit gets [Power]+5000, and if your opponent's vanguard is grade 3 or greater, it also gets drive +1.\n・Four or more - Choose one of your front row [Happy Toys], [Stand] it, and it gets [Power]+10000 until end of turn."
      },
      {
        name: "Coaster Shark",
        image: "assets/cards/coaster-shark.webp",
        grade: "G2",
        section: "Ride Line",
        effect: "[AUTO]: When this unit is placed by riding from \"Nutcracker Soldier, Nutcrumbs\", [COST][reveal a grade 3 card with \"Heartluru\" in its card name from the ride deck], search your deck for up to one \"Toys Are Made for Children\", reveal it and put it into hand, and shuffle the deck.\n[AUTO]Front Row Right (RC)[1/Turn]: At the end of the battle this unit attacked a rear-guard, if your order zone has a \"Toys Are Made for Children\", and this unit was placed on (RC) from soul this turn, [COST][Soul-Blast 1], and [Stand] this unit.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Nutcracker Soldier, Nutcrumbs",
        image: "assets/cards/nutcracker-soldier-nutcrumbs.webp",
        grade: "G1",
        section: "Ride Line",
        effect: "[AUTO]: When this unit is placed by riding from \"Cute Teddy Bear, Titi\", [COST][reveal a grade 3 card with \"Heartluru\" in its card name from the ride deck], search your deck for up to one \"Toys Are Made for Children\", reveal it and put it into hand, and shuffle the deck.\n[AUTO]Back Row Center (RC): When this unit is placed by a card's ability, if your opponent's vanguard is grade 3 or greater, and your bind zone does not have a \"Cute Teddy Bear, Titi\", [COST][Counter-Blast 1 & bind a \"Cute Teddy Bear, Titi\" from soul], search your deck for up to one \"Toys Are Made for Children\", reveal it and put it into hand, and shuffle the deck.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Cute Teddy Bear, Titi",
        image: "assets/cards/cute-teddy-bear-titi.webp",
        grade: "G0",
        section: "Ride Line",
        effect: "[AUTO]: When this unit is rode upon, if you went second, draw a card.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Fire Regalis",
        image: "assets/cards/fire-regalis.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "Regalis Piece (You may only have one Regalis Piece in your deck, and use it a total of one time in a fight)\n[CONT]: This card cannot be played.\n[ACT](Hand)/(Drop): [COST][Remove this card], look at the top five cards of your deck, choose up to one card from among them, and reveal it. If you did not reveal a card, shuffle the deck, and draw a card. If you revealed a card, perform one of the following, and shuffle the deck.\n・If the revealed card is a [Glitter], put it into hand.\n・If the revealed card is less than or equal to your vanguard's grade, call it to (RC)."
      },
      {
        name: "Toys Monster, Blavyloss",
        image: "assets/cards/toys-monster-blavyloss.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), if your order zone has a \"Toys Are Made for Children\", [COST][Counter-Blast 1], draw a card, and if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of turn.\n[AUTO]Front Row Left (RC): When this unit [Stand] by the ability of your grade 3 or greater vanguard with \"Heartluru\" in its card name, this unit gets [Critical]+1 until end of turn.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Giant Fluffy",
        image: "assets/cards/giant-fluffy.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), [COST][Soul-Blast 2], choose a \"Toys Are Made for Children\" from your drop or face up damage zone cards, and put it into hand. If you put a card from the damage zone, put the top card of your deck into the damage zone.\n[AUTO]Front Row Right (RC): When this unit [Stand] by the ability of your grade 3 or greater vanguard with \"Heartluru\" in its card name, until end of turn, this unit gets \"[CONT](RC): During the battle this unit attacked, when your opponent would call cards from hand to (GC), they must call two or more at the same time.\", and [Power]+10000.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Fashion Doll, Ruby Rouge",
        image: "assets/cards/fashion-doll-ruby-rouge.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: When this card is discarded from hand during your ride phase, you may reveal a grade 3 card with \"Heartluru\" in its card name from your ride deck. If you revealed a card, or you have a grade 3 or greater vanguard with \"Heartluru\" in its card name, [COST][Counter-Blast 1 or Energy-Blast 3], and draw a card.\n[ACT](RC): If you have a grade 3 or greater vanguard with \"Heartluru\" in its card name, and your card with the same card name as this card was not bound this turn, [COST][bind this unit], choose a [Happy Toys] from your drop, and call it to (RC).\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Block Horse",
        image: "assets/cards/block-horse.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT]Back Row Right (RC): This unit gets \"Intercept\", and can intercept from the back row.\n[CONT](GC): If your order zone has a \"Toys Are Made for Children\", this unit gets [Shield]+5000.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Sparkly Bunny",
        image: "assets/cards/sparkly-bunny.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), if your order zone has a \"Toys Are Made for Children\", look at the top three cards of your deck, choose up to one card from among them, put it into soul, and shuffle the deck.\n[AUTO]Back Row Left (RC): When your [Happy Toys] in the same column as this unit [Stand] by your card's ability, you may [Stand] this unit. If you [Stand] it, at the end of that turn, retire this unit.\n[Happy Toys] (This card is a Happy Toys made for children)"
      },
      {
        name: "Purple Jeweled Beast, Almethys",
        image: "assets/cards/purple-jeweled-beast-almethys.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC) or put on (GC), [COST][put a total of two cards from soul or drop that were in the ride deck into ride deck face up], and perform either of the following according to the circle this unit is on.\n・(RC) - [Counter-Charge 1].\n・(GC) - This unit gets [Shield]+15000 until end of that battle."
      },
      {
        name: "Darkside Mirror Master",
        image: "assets/cards/darkside-mirror-master.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "Sentinel (You may only have up to four cards with \"[CONT]:Sentinel\" in a deck.)\n[AUTO]: When this unit is put on (GC), choose one of your units, and it cannot be hit until end of that battle. If your hand has two or more cards, choose a card from your hand, and discard it."
      },
      {
        name: "Opener of Heart, Philya",
        image: "assets/cards/opener-of-heart-philya.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit boosts, if your opponent has one or less rear-guards, or you played an order this turn, this unit gets [Power]+5000 until end of that battle, and at the end of that battle, [COST][put this unit into soul], and draw a card."
      },
      {
        name: "Elementaria Sanctitude",
        image: "assets/cards/elementaria-sanctitude.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT]: Sentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)\n[CONT]: You may only have one \"Elementaria Sanctitude\" in a deck.\nIf your opponent's vanguard has \"Triple Drive\", this ability can be played without paying the cost.\nPlay this with [COST][discard a card from hand] if your vanguard is grade 3 or less!\nChoose one of your units, and it cannot be hit until end of that battle. Remove this card."
      },
      {
        name: "Toys Are Made for Children",
        image: "assets/cards/toys-are-made-for-children.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "(After a set order is played, put it into the order zone)\n[CONT]: If your vanguard is a [Happy Toys], or you have a grade 3 or greater vanguard with \"Heartluru\" in its card name, this card gets all of the following.\n・[AUTO]: When this card is put into the order zone, look at the top five cards of your deck, choose up to two [Happy Toys] from among them, reveal them, choose up to one card from among the revealed cards, put it into hand, put the rest of the revealed cards into soul, and shuffle the deck.\n・[ACT]Order Zone: [COST][Rest two cards with the same card name as this card from the order zone], choose up to one [Happy Toys] from your drop, and put it into soul."
      },
      {
        name: "Hades Dragon Deity of Resentment, Gallmageheld",
        image: "assets/cards/hades-dragon-deity-of-resentment-gallmageheld.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Over Trigger: [Power]+100 Million.\n(You may only have one [Over] trigger in a deck.) When revealed as a trigger, remove that card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn. If revealed during drive check, activate its additional effect instead.\nAdditional Effect - You get \"During your turn, all of your vanguards get [Power]+10000/[Critical]+1\" until end of this fight."
      },
      {
        name: "Swanky Enthraller",
        image: "assets/cards/swanky-enthraller.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\nWhen revealed as a trigger, choose one of your units, and it gets [Critical]+1 until end of turn. Then, choose one of your units, and it gets [Power]+10000 until end of turn."
      },
      {
        name: "Silky Sky Actress",
        image: "assets/cards/silky-sky-actress.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Draw Trigger: [Power]+10000, draw a card.\nWhen revealed as a trigger, draw a card. Then, choose one of your units, and it gets [Power]+10000 until end of turn."
      },
      {
        name: "Intrepid Spinner",
        image: "assets/cards/intrepid-spinner.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Power Trigger: [Power]+10000 (front row units only).\nWhen revealed as a trigger, all of your front row units get [Power]+10000 until end of turn."
      },
      {
        name: "Gambling Juggler",
        image: "assets/cards/gambling-juggler.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Heal Trigger: [Power]+10000.\n(You may only have up to four [Heal] triggers in a deck.) When revealed as a trigger, choose one of your units, and it gets [Power]+10000 until end of turn. Then, if the number of cards in your damage zone is equal to or more than your opponent's, choose a card from your damage zone, and heal it."
      }
    ]
  },
  {
    id: "jewel-knight-deck",
    name: "Jewel Knight",
    clan: "Keter Sanctuary",
    image: "assets/cards/leading-jewel-knight-salome.webp",
    cards: [
      {
        name: "Leading Jewel Knight, Salome",
        image: "assets/cards/leading-jewel-knight-salome.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO](VC)[LB4]: When this unit attacks, if you have four or more rear-guards with \"Jewel Knight\" in their card names, this unit gets [Power]+2000/[Critical]+1 until end of that battle.\n[ACT](VC): [COST][Counter Blast 2 cards with \"Jewel Knight\" in their card names], search your deck for up to one card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck."
      },
      {
        name: "Broken Heart Jewel Knight, Ashlei \"Reverse\"",
        image: "assets/cards/broken-heart-jewel-knight-ashlei-reverse.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[ACT](VC) 1/Turn: [COST][Soul Blast 2 & Lock one of your rear-guards], choose one of your opponent's front row rear-guards, retire it, look at the top four cards of your deck, choose up to one card with \"Jewel Knight\" in its card name from among them, call it to (RC), and put the rest on the bottom of your deck in any order.\n[AUTO](VC): When this unit attacks, if you have two or more locked cards, [COST][Counter Blast 1], search your deck for up to two grade 2 or lower cards with \"Jewel Knight\" in their card names, call them to (RC), shuffle your deck, and for each of your locked cards, this unit gets [Power]+10000 until end of turn. If you have three or more locked cards, until end of that battle, your opponent cannot call sentinels from hand to (GC)."
      },
      {
        name: "Leading Jewel Knight, Salome (V Series)",
        image: "assets/cards/leading-jewel-knight-salome-v.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO](VC)1/Turn: At the end of the battle this unit attacked, [COST][Counter Blast 1], choose any number of cards with \"Jewel Knight\" in their card name from your hand, and call them to (RC) with units. Then, if you called three or more cards, and your opponent's vanguard is grade 3 or greater, [COST][Soul Blast 4], and [Stand] this unit.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, [COST][Counter Blast 1], and that placed unit gets [Power]+10000/drive+1 until end of turn.\n(An earlier printing of Leading Jewel Knight, Salome, kept as its own entry since its ability is different from the version above, which has the [LB4] ability instead.)"
      },
      {
        name: "Pure Heart Jewel Knight, Ashlei",
        image: "assets/cards/pure-heart-jewel-knight-ashlei-dz.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): At the end of the battle this unit attacked, [COST][Soul Blast 2], search your deck for up to one grade 2 or less card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck. If this unit is on (VC), search for up to two cards instead of one.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, [COST][Counter Blast 1], and that placed unit gets [Critical]+1 until end of turn."
      },
      {
        name: "Dogmatize Jewel Knight, Sybill",
        image: "assets/cards/dogmatize-jewel-knight-sybill.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): When this unit attacks, [COST][put one grade 2 or less card from your hand into your soul], and draw a card.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, look at three cards from the top of your deck, choose up to one grade 2 or less card with \"Jewel Knight\" in its card name from among them, call it to (RC), and put the rest on the bottom of your deck in any order."
      },
      {
        name: "Banding Jewel Knight, Miranda",
        image: "assets/cards/banding-jewel-knight-miranda.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit attacks while not boosted, if you have a vanguard with \"Jewel Knight\" in its card name, [COST][Counter Blast 1], choose one of your vanguards, and until end of that battle, increase or decrease this unit's [Power] to match that unit's [Power].\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, [COST][Soul Charge 1], and if you have no face up cards in your damage zone, [COST][Counter Charge 1]."
      },
      {
        name: "Jewel Knight, Swordmy",
        image: "assets/cards/jewel-knight-swordmy.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: [COST][Counter Blast 1 card with \"Jewel Knight\" in its card name] When this unit is placed on (RC), you may pay the cost. If you do, search your deck for up to one grade 1 or less card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck."
      },
      {
        name: "Explode Jewel Knight, Laile",
        image: "assets/cards/explode-jewel-knight-laile.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When it attacks, [COST][put two normal units from your drop zone on the bottom of your deck in any order], [COST][Soul Charge 1], and this unit gets [Power]+5000 until end of that battle.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, that placed unit gets [Power]+10000 until end of turn."
      },
      {
        name: "Fruiting Jewel Knight, Eunice",
        image: "assets/cards/fruiting-jewel-knight-eunice.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): At the end of the battle this unit boosted, [COST][put one normal unit from your drop on the bottom of your deck], and [COST][Soul Charge 1]. You may return this unit to your hand.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, choose one of your opponent's rear-guards in the same column as that placed unit, and retire it. If no units were retired, draw a card."
      },
      {
        name: "Security Jewel Knight, Alwain",
        image: "assets/cards/security-jewel-knight-alwain.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[ACT](RC): [COST][This unit & put a normal unit from your drop on the bottom of your deck], [COST][Counter Charge 1], choose one of your vanguards with \"Jewel Knight\" in its card name, and it gets [Power]+5000 until end of turn.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, look at the top two cards of your deck, choose up to one card with \"Jewel Knight\" from among them, reveal it and put it into your hand, and put the rest on the bottom of your deck in any order."
      },
      {
        name: "Calling Jewel Knight, Christine",
        image: "assets/cards/calling-jewel-knight-christine.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is placed on (RC), if you have three or more other rear-guards with \"Jewel Knight\" in their card names, [COST][Counter Blast 1 & reveal a grade 3 card from your hand], search your deck for up to one grade 3 card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck. At the end of that turn, put that unit into hand, choose a card from your hand, and discard it."
      },
      {
        name: "Charging Jewel Knight, Morvidus",
        image: "assets/cards/charging-jewel-knight-morvidus.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[ACT](RC): [COST][Counter Blast 1 & Put a normal unit from your drop zone on the bottom of your deck], [COST][Soul Charge 1], and one of your units with \"Jewel Knight\" in its card name gets [Power]+5000 until end of turn.\n[AUTO](VC/RC): When your other unit is placed on this unit's circle, draw a card."
      },
      {
        name: "Elementaria Sanctitude",
        image: "assets/cards/elementaria-sanctitude.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT]: Sentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)\n[CONT]: You may only have one \"Elementaria Sanctitude\" in a deck.\nIf your opponent's vanguard has \"Triple Drive\", this ability can be played without paying the cost.\nPlay this with [COST][discard a card from hand] if your vanguard is grade 3 or less!\nChoose one of your units, and it cannot be hit until end of that battle. Remove this card."
      },
      {
        name: "Light Dragon Deity of Honors, Amartinoa",
        image: "assets/cards/light-dragon-deity-of-honors-amartinoa.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Over Trigger: [Power]+100 Million.\n(You may only have one [Over] trigger in a deck.) When revealed as a trigger, remove that card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn. If revealed during drive check, activate its additional effect instead.\nAdditional Effect - Until end of turn, you also perform drive checks for the battles your rear-guards attack."
      },
      {
        name: "Jewel Knight of Great Ambition, Tiffany",
        image: "assets/cards/jewel-knight-of-great-ambition-tiffany.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "[AUTO]: When this unit is ridden upon, draw a card. Furthermore, if your opponent's vanguard is grade 1 or greater, add a Quick Shield Ticket to your hand."
      },
      {
        name: "Flash Shield, Iseult",
        image: "assets/cards/flash-shield-iseult.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Draw Trigger: [Power]+10000, draw a card.\nSentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)\n[AUTO](GC): When placed, [COST][discard a card from your hand], and one of your units cannot be hit until end of that battle."
      },
      {
        name: "Amulet Pure Eagle",
        image: "assets/cards/amulet-pure-eagle.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\n[AUTO](RC)[GB1]: When your vanguard attacks, [COST][put this unit into your soul], draw a card, and one of your vanguards gets [Power]+10000 until end of that battle."
      },
      {
        name: "Sentflare Dracokid",
        image: "assets/cards/sentflare-dracokid.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\n[CONT](Hand): While paying the cost for [Stride], this card may be discarded as a grade 3."
      },
      {
        name: "Innocent Ray Dragon",
        image: "assets/cards/innocent-ray-dragon.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "Heal Trigger: [Power]+10000.\n[AUTO]: When this unit is placed on (VC) from hand, if you have not ridden a grade 3 or greater unit this fight, perform one of the following.\n・Choose one of your vanguards, and it gets [Power]+10000 until end of turn.\n・Choose one of your opponent's units, and it gets [Power]-3000 until end of that battle.\n[AUTO]: When this unit is placed on (RC) from hand, if your damage zone has no cards, put the top card of your deck into your damage zone."
      },
      {
        name: "Climax Jewel Knight Lord, Evangeline",
        image: "assets/cards/climax-jewel-knight-lord-evangeline.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card on your (VC) from face down.\n[ACT](G zone)1/Turn: If your vanguard is a grade 3 \"Leading Jewel Knight, Salome\" with the [LB4] ability, and you did not get an Imaginary Gift this fight, [COST][choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card from your G zone from face down. Then, [COST][turn a card with \"Jewel Knight\" in its card name from G zone face up], you get two Imaginary Gift: Force, and you get a \"Leading Jewel Knight, Salome\" crest.\n[ACT](VC)1/Turn: [COST][Turn a card from G zone face up], if you have a heart card with \"Jewel Knight\" in its card name, and if you have three or more rear-guards with \"Jewel Knight\" in their card names, all of your units with \"Jewel Knight\" in their card names get [Power]+3000 until end of turn for each face up card named \"Climax Jewel Knight Lord, Evangeline\" in your G zone."
      },
      {
        name: "Divine Knight of Triumph, Eulogias",
        image: "assets/cards/divine-knight-of-triumph-eulogias.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO](VC): When this unit attacks, [COST][Counter Blast 1 & turn a card from your G zone face up], draw the same number of cards as the number of your rear-guards, choose the same number of cards from your hand as the number of cards drawn, and call them to (RC). Then, if you have five or more rear-guards, you get an Imaginary Gift: Force."
      },
      {
        name: "Holy Dragon, Crystaluster Dragon",
        image: "assets/cards/holy-dragon-crystaluster-dragon.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card on your (VC) from face down.\n[ACT](VC)1/Turn: [COST][Turn a card from G zone face up], choose one of your heart cards, and until end of turn, this unit gets all of the original abilities of that card.\n[CONT](VC): If you have three or more grade 2 or greater units, when your opponent would call cards from their hand to (GC), they must call three or more cards at the same time."
      },
      {
        name: "Aerial Divine Knight, Altmile",
        image: "assets/cards/aerial-divine-knight-altmile.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO]: [Choose a face down card named \"Aerial Divine Knight, Altmile\" from your G zone, and turn it face up] When this unit is placed on (VC), you may pay the cost. If you do, until end of turn, this unit gets \"[CONT](VC): All of the units in your front row get [Power]+3000.\" Then, if the number of face up cards in your G zone is two or more, search your deck for up to one grade 2 card, call it to (RC), shuffle your deck, and that unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Divine Knight of Condensed Light, Olbius Avalon",
        image: "assets/cards/divine-knight-of-condensed-light-olbius-avalon.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO](VC)[GB8]: [COST][Counter Blast 1] When this unit attacks a vanguard, you may pay the cost. If you do, search your deck for up to five cards, call them to separate (RC), and until end of turn, they get [Power]+4000, and this unit gets [Critical]+1. Shuffle your deck."
      },
      {
        name: "Divine Knight of Twin Absolutes, Saint of Twin Sword",
        image: "assets/cards/divine-knight-of-twin-absolutes-saint-of-twin-sword.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO](VC): When it attacks a vanguard while boosted, [COST][Counter Blast 1 & turn a card from your G zone face up], search your deck for up to two grade 2 cards, call them to (RC), and shuffle your deck.\n[AUTO](VC): When your rear-guard is placed from deck, that unit gets [Power]+5000 until end of turn for each face up card in your G zone."
      },
      {
        name: "Harmonics Messiah",
        image: "assets/cards/harmonics-messiah.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[CONT]: You may only have one \"Harmonics Messiah\" G unit in a G deck.\n[STRIDE]-Stride Step-[Choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO]: When this unit is placed on (VC), choose any number of your locked cards, and unlock them. Choose the same number of cards from your hand as the number of cards unlocked by this effect, and discard them.\n[AUTO](VC/G Zone): When this unit is placed on (VC), or at the beginning of your turn, if this card is face up, your damage zone has two or less cards, and no new card was put into your damage zone during your opponent's preceding turn, [COST][put the top card of the deck into damage zone], and draw a card.\n[AUTO](G Zone): When your grade 1 unit is placed by riding from a grade 0, if you went second, [COST][reveal this card], and put a Guardian Shield ticket into your hand."
      },
      {
        name: "Faithful Sacred Staff, Morgause",
        image: "assets/cards/faithful-sacred-staff-morgause.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN]-Opponent Turn's Guard Step-[Discard a card with (Force) from your hand], and call this card to your (GC) from face down.\n[AUTO]: When this unit is put on (GC), choose one of your grade 2 units, and until end of turn, it gets [Shield]+10000, and \"[AUTO]: When this unit intercepts, [COST][Counter Blast 1 & Soul Blast 1], choose one of your units, and it cannot be hit until end of that battle.\"."
      },
      {
        name: "Vivid Sacred Staff, Andragius",
        image: "assets/cards/vivid-sacred-staff-andragius.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN] (Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[Choose a card with \"Heal\" from your hand, and discard it] Call this card to your (GC) from face down.\n[CONT](GC): If you have two or more grade 2 rear-guards, this unit gets [Shield]+10000."
      },
      {
        name: "Mixed Element, Colburn",
        image: "assets/cards/mixed-element-colburn.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck. This card is from all clans and nations.)\n[G GUARDIAN] (Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[Choose a card with \"Heal\" from your hand, and discard it] Call this card to your (GC) from face down.\n[AUTO]: [Choose a card from your hand, and discard it] When this unit is placed on (GC) during the battle that your opponent's vanguard attacked, you may pay the cost. If you do, this unit gets [Shield]+5000 until end of that battle for every two cards in your opponent's hand."
      },
      {
        name: "Holy Dragon, Laserguard Dragon",
        image: "assets/cards/holy-dragon-laserguard-dragon.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN] (Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[Choose a card with \"Heal\" from your hand, and discard it] Call this card to your (GC) from face down.\n[AUTO]: When this unit is placed on (GC), if you have one or more grade 2 rear-guards, this unit gets [Shield]+5000 until end of that battle."
      },
      {
        name: "Holy Beast, Divine Maskkgal",
        image: "assets/cards/holy-beast-divine-maskkgal.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN] (Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[Choose a card with \"Heal\" from your hand, and discard it] Call this card to your (GC) from face down.\n[AUTO][GB1]: [Choose a face down G guardian from your G zone, and turn it face up] When this unit is placed on (GC), if there is a rear-guard in your front row, you may pay the cost. If you do, this unit gets [Shield]+10000 until end of that battle."
      },
      {
        name: "Leading Jewel Knight, Salome (Crest)",
        image: "assets/cards/leading-jewel-knight-salome-crest.webp",
        grade: "Crest",
        section: "Stride",
        effect: "(This is a Crest — a support card tied to the G zone, not part of the 50-card main deck.)\n[CONT]: If your heart is a \"Leading Jewel Knight, Salome\" with the [LB4] ability, the \"Climax Jewel Knight Lord, Evangeline\" on your (VC) gets all of the original abilities of your heart, and when you would pay the cost for those acquired abilities for the first time each turn, reduce that cost by [Counter Blast]2.\n[CONT]: The original [Power] of your grade 3 cards with the [LB4] ability become 13000. (Including heart cards)\n[CONT]: Your vanguard's [LB4] abilities are active even if your damage zone has three or less cards."
      }
    ]
  },
  {
    id: "silver-thorn-deck",
    name: "Silver Thorn",
    clan: "Dark States",
    image: "assets/cards/silver-thorn-dragon-tamer-luquier-sv.webp",
    cards: [
      {
        name: "Silver Thorn Dragon Tamer, Luquier",
        image: "assets/cards/silver-thorn-dragon-tamer-luquier.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[CONT](VC/RC): During your turn, if you called two or more cards from your soul this turn, this unit gets [Power]+10000.\n[ACT](VC)1/Turn: [COST][Counter Blast 2 & Discard a card from your hand], call any number of cards with \"Silver Thorn\" in their card names from your soul to (RC), and all of your front row rear-guards get [Power]+3000 until end of turn."
      },
      {
        name: "Silver Thorn Dragon Empress, Venus Luquier",
        image: "assets/cards/silver-thorn-dragon-empress-venus-luquier.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[CONT](VC): During your turn, if all of your front row circles have units, all of your front row units get [Power]+5000.\n[ACT](VC)1/Turn: [COST][Counter Blast 1 & Discard a card from your hand], call any number of cards with \"Silver Thorn\" in their card names from your soul to front row (RC). At the end of that turn, [COST][you have four or more rear-guards, and put all of your rear-guards into your soul], and get an Imaginary Gift: Accel."
      },
      {
        name: "Silver Thorn Beast Tamer, Doriane",
        image: "assets/cards/silver-thorn-beast-tamer-doriane.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): At the end of your turn, [COST][put all of your other rear-guards into your soul], and draw a card for every two cards put into your soul for this cost. If you put four or more cards, return a grade 3 card with \"Silver Thorn\" in its card name from your soul to your hand. Retire this unit if it is on (RC)."
      },
      {
        name: "Silver Thorn, Rising Dragon",
        image: "assets/cards/silver-thorn-rising-dragon.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit is placed on (RC), [COST][put a card from hand into soul], and draw a card.\n[CONT]: During your turn, if you have a vanguard with \"Luquier\" in its card name, and two or more of your units were placed on (RC) from soul this turn, this unit gets [Power]+10000, and if four or more were placed, it gets [Power]+10000 more."
      },
      {
        name: "Silver Thorn, Rising Dragon (V Series)",
        image: "assets/cards/silver-thorn-rising-dragon-v.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[CONT](RC): If you called two or more cards from your soul this turn, this unit gets [Power]+10000.\n(An earlier printing of Silver Thorn, Rising Dragon, kept as its own entry since its ability is simpler than the version above.)"
      },
      {
        name: "Silver Thorn Marionette, Lilian",
        image: "assets/cards/silver-thorn-marionette-lilian.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): When placed from hand, [COST][Counter Blast 1], search your deck for up to one card with \"Silver Thorn\" in its card name, put it into your soul, and shuffle your deck.\n[AUTO](RC): When it attacks a vanguard, if your soul has four or more cards with \"Silver Thorn\" in their different card names, this unit gets [Power]+10000 until end of that battle."
      },
      {
        name: "Silver Thorn Beast Tamer, Shayda",
        image: "assets/cards/silver-thorn-beast-tamer-shayda.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When placed, [COST][put this unit into your soul], and if your soul has four or more cards with \"Silver Thorn\" in their different card names, one of your units gets [Power]+15000 until end of that battle."
      },
      {
        name: "Silver Thorn Diva, Selvia",
        image: "assets/cards/silver-thorn-diva-selvia.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): When placed, [COST][Counter Blast 1], choose up to two cards with \"Silver Thorn\" in their card names not named \"Silver Thorn Diva, Selvia\" from your soul, and call them to (RC)."
      },
      {
        name: "Silver Thorn Assistant, Irina",
        image: "assets/cards/silver-thorn-assistant-irina.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): When placed from hand, look at two cards from the top of your deck, put one card from among them into your soul, and put one card from among them on the bottom of your deck.\n[AUTO]: When rode upon, look at three cards from the top of your deck, put any number of cards with \"Silver Thorn\" in their card names from among them into your soul, and put the rest on the bottom of your deck in any order. If you put two or more cards into your soul, draw a card."
      },
      {
        name: "Silver Thorn, Breathing Dragon",
        image: "assets/cards/silver-thorn-breathing-dragon.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): At the end of the battle it boosted, if your soul has four or more cards with \"Silver Thorn\" in their different card names, [COST][Counter Blast 1 & put one rear-guard with \"Silver Thorn\" in its card name that this unit boosted into your soul], call a card with \"Silver Thorn\" in its card name from your soul to (RC)."
      },
      {
        name: "Silver Thorn Conjurer, Romy",
        image: "assets/cards/silver-thorn-conjurer-romy.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[ACT](RC): [COST][Retire this unit, and put it into your soul], look at three cards from the top of your deck, put any number of cards with \"Silver Thorn\" in their card names from among them into your soul, and put the rest on the bottom of your deck in any order."
      },
      {
        name: "Silver Thorn Handlegrip, Linnea",
        image: "assets/cards/silver-thorn-handlegrip-linnea.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](VC/RC): When it attacks or boosts, [COST][Soul Charge 1], and this unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Quick Shield",
        image: "assets/cards/quick-shield.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "(This is a Blitz Order card — play it directly from hand instead of calling it as a unit.)\nChoose one of your attacked units, and it gets [Power]+5000 until end of that battle."
      },
      {
        name: "Silver Thorn Assistant, Dixie",
        image: "assets/cards/silver-thorn-assistant-dixie.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+5000, [Critical]+1.\n[ACT](RC): [COST][Put this unit on the top of your deck], if you have a vanguard with \"Luquier\" in its card name, choose up to one card with \"Silver Thorn\" in its card name from your soul, and call it to (RC). Shuffle your deck."
      },
      {
        name: "Silver Thorn Beast Tamer, Lolotte",
        image: "assets/cards/silver-thorn-beast-tamer-lolotte.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "[AUTO]: Forerunner\n[AUTO](RC): [COST][Choose this unit and another of your rear-guards with \"Silver Thorn\" in its card name, and put them into your soul] At the end of your turn, if you have a vanguard with \"Silver Thorn\" in its card name, you may pay the cost. If you do, [COST][Soul Charge 1], choose up to one grade 3 card from your soul, and put it into your hand."
      },
      {
        name: "Hades Hypnotist",
        image: "assets/cards/hades-hypnotist.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Draw Trigger: [Power]+10000.\n[CONT]: Sentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)\n[AUTO](RC): When placed, [COST][discard a card from your hand], and one of your units cannot be hit until end of that battle."
      },
      {
        name: "Darkside Sword Master",
        image: "assets/cards/darkside-sword-master.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\n[CONT]: Sentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)"
      },
      {
        name: "Silver Thorn, Barking Dragon",
        image: "assets/cards/silver-thorn-barking-dragon.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1."
      },
      {
        name: "Silver Thorn Beast Tamer, Serge",
        image: "assets/cards/silver-thorn-beast-tamer-serge.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Front Trigger: [Power]+10000. (May only be given to a front row unit.)"
      },
      {
        name: "Silver Thorn Assistant, Ionela",
        image: "assets/cards/silver-thorn-assistant-ionela.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "[AUTO]: When rode upon, draw a card. Then, if your opponent's vanguard is grade 1 or greater, put a Quick Shield ticket into your hand."
      },
      {
        name: "Nightmare Doll, Lindy",
        image: "assets/cards/nightmare-doll-lindy.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "Heal Trigger: [Power]+10000.\n[AUTO](VC): When this unit is put on (VC) from hand, if you did not ride a grade 3 or greater unit this fight, perform one of the following.\n・Choose one of your vanguards, and it gets [Power]+10000 until end of turn.\n・Choose one of your opponent's units, and it gets [Critical]-2 until end of that battle.\n[AUTO](RC): When this unit is placed on (RC) from hand, if your damage zone has no cards, put the top card of your deck into your damage zone."
      },
      {
        name: "Dragon Masquerade, Harri",
        image: "assets/cards/dragon-masquerade-harri.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\nMagia-[AUTO](VC)[GB3]: [COST][Counter Blast 2 & Choose one of your rear-guards, and put it into your soul] When this unit attacks a vanguard, you may pay the cost. If you do, choose up to three cards from your soul, and call them to separate (RC). Then, if you have five or more rear-guards, your opponent chooses two of his or her rear-guards, and puts them into his or her soul. At the end of that turn, put the units called with this effect into your soul."
      },
      {
        name: "Parallel Megatrick, Fairfield",
        image: "assets/cards/parallel-megatrick-fairfield.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\nMagia-[ACT](VC)1/Turn[GB3]: [COST][Counter Blast 2 & Choose a card from your drop zone and soul, and return them to your deck] Choose a card from your soul, call it to (RC), and until end of turn, it gets [Power]+10000/[Critical]+1, \"[ACT](RC): [COST][Soul Blast 2] Until end of turn, this unit gets [Power]+5000, and cannot be chosen by card effects.\", and shuffle your deck. At the end of that turn, put that unit into your soul."
      },
      {
        name: "Scream Dragon Master, Droll Kimberly",
        image: "assets/cards/scream-dragon-master-droll-kimberly.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO](VC)[GB8]: When this unit attacks a vanguard, choose up to five cards from your soul, call them to separate (RC), and until end of turn, they get [Power]+5000, and <Abyss Dragon>. Until end of that battle, this unit gets \"[CONT](VC): This unit gets [Power]+10000 for each <Abyss Dragon> on your (RC).\""
      },
      {
        name: "Masquerade Master, Harri",
        image: "assets/cards/masquerade-master-harri.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\nMagia-[AUTO](VC): [COST][Counter Blast 1 & Choose a face down card with the same card name as this unit from your G zone, turn it face up, choose two cards in your other circles, and put them into your soul] When this unit attacks, you may pay the cost. If you do, choose up to three cards from your soul, call them to separate (RC), and at the end of that turn, put them into your soul.\n[CONT](VC): All of your rear-guards with the magia ability get [Power]+3000 for each face up card with \"Harri\" in its card name in your G zone."
      },
      {
        name: "Fancy Megatrick, Darklord Princess",
        image: "assets/cards/fancy-megatrick-darklord-princess.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\n[AUTO](VC): At the end of the battle it attacked a vanguard, [COST][turn a card from your G zone face up], [STRIDE] a face up G unit with [Power]+ and the magia ability from your G zone on your (VC) as an additional stride, and that unit gets [Drive]-2 until end of turn. If you stride this way, call this card to (RC)."
      },
      {
        name: "Midair Megatrick, Yvette",
        image: "assets/cards/midair-megatrick-yvette.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and [STRIDE] this card on your (VC) from face down.\nMagia-[AUTO](VC): [COST][put a card from your hand into your soul & turn a card from your G zone face up], get an Imaginary Gift: Accel. When it attacks, call a card from your soul to an additional (RC), that unit gets [Power]+15000 until end of turn, and at the end of that turn, put that called unit into your soul."
      },
      {
        name: "Trenchant Megatrick, Leontina",
        image: "assets/cards/trenchant-megatrick-leontina.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[AUTO](VC): [COST][Counter Blast 1 & discard a card from your hand], put all of your rear-guards into your soul. For each card put into your soul, choose up to two unit cards from your soul, and call them to (RC). If you called four or more different grades, until end of turn, when your opponent would call cards from hand to (RC), they must call two or more at the same time."
      },
      {
        name: "Zeroth Dragon of End of the World, Dust",
        image: "assets/cards/zeroth-dragon-of-end-of-the-world-dust.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[ULTIMATE STRIDE]-Stride Step-[COST][Choose a card with the same card name as your vanguard from your hand, and discard it], and [STRIDE] this card on your (VC) from face down.\n[AUTO]: When placed on (VC), [COST][Counter Blast 2], until end of turn, your opponent's vanguards and rear-guards lose all of their abilities, and their grade and [Power] increase or decrease to 1. If the number of cards in your opponent's damage zone is four or less, choose one of your opponent's vanguards, and deal one damage."
      },
      {
        name: "Jester Demonic Beast, Flection Chimera",
        image: "assets/cards/jester-demonic-beast-flection-chimera.webp",
        grade: "G (Guardian)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN]-Opponent Turn's Guard Step-[COST][Discard a card from your hand], call this card to your (GC) from face down.\n[AUTO]: When this unit is put on (GC), [COST][put one or more cards from your hand into your soul], and this unit gets [Shield]+10000 until end of that battle for each card put into your soul for this cost. If you put two or more cards into your soul for this cost, your opponent chooses one of their rear-guards, and puts it into their soul."
      },
      {
        name: "Jester Demonic Dragon, Wandering Dragon",
        image: "assets/cards/jester-demonic-dragon-wandering-dragon.webp",
        grade: "G (Guardian)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN](Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[COST][Discard a card with \"Heal\" in its card name from your hand], call this card to your (GC) from face down.\n[AUTO]: When this unit is placed on (GC), [COST][Soul Charge 1], choose a card from your soul, and call it to (GC)."
      },
      {
        name: "Chainsaw Megatrick, Furnival",
        image: "assets/cards/chainsaw-megatrick-furnival.webp",
        grade: "G (Guardian)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN](Usable when both fighters' vanguards are grade 3 or greater, and the number of face up G guardians in your G zone is three or less)-Opponent Turn's Guard Step-[COST][Discard a card with \"Heal\" in its card name from your hand], call this card to your (GC) from face down.\n[AUTO]: When this unit is placed on (GC), look at three cards from the top of your deck, search for one card from among them, put it into your soul, and put the rest on the bottom of your deck in any order. If the card put into your soul with this effect is grade 1 or greater, this unit gets [Shield]+5000 until end of that battle."
      },
      {
        name: "Kinesis Megatrick, Coulthard",
        image: "assets/cards/kinesis-megatrick-coulthard.webp",
        grade: "G (Guardian)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[G GUARDIAN]-Opponent Turn's Guard Step-[COST][Discard a card with \"Heal\" in its card name from your hand], call this card to your (GC) from face down.\n[AUTO]1/Turn: When placed on (GC), if there are cards of four or more different grades in your soul, [COST][choose a face down G Guardian from your G zone, and turn it face up], and this unit gets [Shield]+15000 until end of that battle."
      }
    ]
  },
  {
    id: "og-knight-deck",
    name: "OG Knight",
    clan: "Keter Sanctuary",
    image: "assets/cards/pure-heart-jewel-knight-ashlei-bt10.webp",
    cards: [
      {
        name: "Pure Heart Jewel Knight, Ashlei",
        image: "assets/cards/pure-heart-jewel-knight-ashlei-bt10.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO][LB4] (This ability is active if you have four or more damage): When a «Royal Paladin» rides this unit, choose your vanguard, and that unit gets [Power]+10000/[Critical]+1 until end of turn.\n[AUTO](VC): When this unit attacks a vanguard, this unit gets [Power]+2000 until end of that battle.\n[CONT](VC/RC): Lord (If you have a unit without a same clan as this unit, this unit cannot attack)"
      },
      {
        name: "Broken Heart Jewel Knight, Ashlei \"Reverse\"",
        image: "assets/cards/broken-heart-jewel-knight-ashlei-reverse-og.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[ACT](VC)[LB4] (This ability is active if you have four or more damage): [COST][Counter Blast 1 & Choose one of your rear-guards with \"Jewel Knight\" in its card name, and lock it] Choose up to one rear-guard in your opponent's front row, retire it, search your deck for up to one card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck. This ability cannot be used for the rest of that turn. (The locked card is turned face down, and cannot do anything. It turns face up at end of the owner's turn.)\n[CONT](VC): If you have a card named \"Pure Heart Jewel Knight, Ashlei\" in your soul, this unit gets [Power]+2000.\n[CONT](VC/RC): Lord (If you have a unit without a same clan as this unit, this unit cannot attack)"
      },
      {
        name: "Leading Jewel Knight, Salome",
        image: "assets/cards/leading-jewel-knight-salome.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[AUTO](VC)[LB4]: When this unit attacks, if you have four or more rear-guards with \"Jewel Knight\" in their card names, this unit gets [Power]+2000/[Critical]+1 until end of that battle.\n[ACT](VC): [COST][Counter Blast 2 cards with \"Jewel Knight\" in their card names], search your deck for up to one card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck."
      },
      {
        name: "Prevail Jewel Knight, Yvain",
        image: "assets/cards/prevail-jewel-knight-yvain.webp",
        grade: "G3",
        section: "Main Deck",
        effect: "[ACT](VC): Legion 20000 \"Jewel Knight, Swordmy\" (If your opponent's vanguard is grade 3 or greater, this unit may return four cards from your drop zone into your deck once, search your deck for the specified card, and Legion)\n[AUTO](VC): When this unit attacks a vanguard, if this unit is Legion, if you have six or more units with \"Jewel Knight\" in its card name, this unit gets [Power]+5000/[Critical]+1 until end of that battle.\n[AUTO](VC): When this unit attacks a vanguard, this unit gets [Power]+2000 until end of that battle."
      },
      {
        name: "Fellowship Jewel Knight, Tracie",
        image: "assets/cards/fellowship-jewel-knight-tracie.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit attacks, if the number of other rear-guards you have with \"Jewel Knight\" in its card name is three or more, this unit gets [Power]+3000 until end of that battle."
      },
      {
        name: "Banding Jewel Knight, Miranda",
        image: "assets/cards/banding-jewel-knight-miranda-bt14.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit attacks, if you have a vanguard with \"Ashlei\" in its card name, this unit gets [Power]+2000 until end of that battle.\n[AUTO](RC): When this unit's attack hits a vanguard, if you have a vanguard with \"Ashlei\" in its card name, choose one of your «Royal Paladin», and that unit gets [Power]+3000 until end of turn."
      },
      {
        name: "Pure Wind Jewel Knight, Kymbelinus",
        image: "assets/cards/pure-wind-jewel-knight-kymbelinus.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: [COST][Soul Blast 1 card with \"Jewel Knight\" in its card name] When this unit intercepts, if the number of other rear-guards with \"Jewel Knight\" in its card name is three or more, you may pay the cost. If you do, this unit gets [Shield]+10000 until end of that battle."
      },
      {
        name: "Jewel Knight, Swordmy",
        image: "assets/cards/jewel-knight-swordmy.webp",
        grade: "G2",
        section: "Main Deck",
        effect: "[AUTO]: [COST][Counter Blast 1 card with \"Jewel Knight\" in its card name] When this unit is placed on (RC), you may pay the cost. If you do, search your deck for up to one grade 1 or less card with \"Jewel Knight\" in its card name, call it to (RC), and shuffle your deck."
      },
      {
        name: "Flashing Jewel Knight, Iseult",
        image: "assets/cards/flashing-jewel-knight-iseult.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT]: Sentinel (You may only have up to four cards with \"[CONT]: Sentinel\" in a deck.)\n[AUTO]: [COST][Choose a «Royal Paladin» from your hand, and discard it] When this unit is placed on (GC), you may pay the cost. If you do, choose one of your «Royal Paladin» that is being attacked, and that unit cannot be hit until end of that battle."
      },
      {
        name: "Jewel Knight, Prizmy",
        image: "assets/cards/jewel-knight-prizmy.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO]: [COST][Choose a card from your hand, and discard it] When this unit is placed on (RC), if the number of other rear-guards you have with \"Jewel Knight\" in its card name is three or more, you may pay the cost. If you do, draw a card."
      },
      {
        name: "Stinging Jewel Knight, Shellie",
        image: "assets/cards/stinging-jewel-knight-shellie.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[AUTO](RC): When this unit attacks, if the number of other rear-guards you have with \"Jewel Knight\" in its card name is three or more, this unit gets [Power]+3000 until end of that battle."
      },
      {
        name: "Jewel Knight, Sabremy",
        image: "assets/cards/jewel-knight-sabremy.webp",
        grade: "G1",
        section: "Main Deck",
        effect: "[CONT](RC): Your vanguard's \"[LB4]\" is active even when you have three or less damage."
      },
      {
        name: "Blazing Jewel Knight, Rachelle",
        image: "assets/cards/blazing-jewel-knight-rachelle.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+5000, [Critical]+1."
      },
      {
        name: "Devoting Jewel Knight, Tabitha",
        image: "assets/cards/devoting-jewel-knight-tabitha.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Draw Trigger: [Power]+5000, draw a card."
      },
      {
        name: "Ardent Jewel Knight, Polli",
        image: "assets/cards/ardent-jewel-knight-polli.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Heal Trigger: [Power]+5000. (You may only have up to four cards with \"[Heal]\" in a deck.)"
      },
      {
        name: "Desire Jewel Knight, Heloise",
        image: "assets/cards/desire-jewel-knight-heloise.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "[AUTO]: Forerunner (When a unit of the same clan rides this unit, you may call this unit to (RC))\n[AUTO](RC): When this unit boosts, if the number of your other \"Jewel Knight\" rear-guards is three or more, the boosted unit gets [Power]+3000 until end of that battle."
      },
      {
        name: "Jewel Knight, Noble Stinger",
        image: "assets/cards/jewel-knight-noble-stinger.webp",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+5000, [Critical]+1."
      },
      {
        name: "Shrouded Divine Knight, Gablade",
        image: "assets/cards/shrouded-divine-knight-gablade.webp",
        grade: "G (Stride/G unit)",
        section: "Stride",
        effect: "(This card cannot be in your main deck)\n[STRIDE]-Stride Step-[Choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card on your (VC) from face down.\n[ACT](G Zone)1/Turn: If your vanguard is a grade 3 \"Blue Sky Knight, Altmile\", and you did not get an Imaginary Gift this fight, [COST][choose one or more cards from hand with the sum of their grades being 3 or greater, and discard them], and [STRIDE] this card on your (VC) from face down. Then, [turn a card from G zone with the same card name as this unit face up], and you get two Imaginary Gift: Force.\n[CONT](VC): This unit's \"when attack hits\" effects activate even if the attack did not hit.\n[AUTO](VC): When this unit's attack hits a vanguard, search your deck for up to one grade 2 or greater card, call it to (RC), and shuffle your deck."
      }
    ]
  }
];
