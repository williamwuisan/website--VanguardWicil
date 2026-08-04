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
    name: "Nightrose Deck",
    clan: "Stoicheia",
    image: "assets/cards/mist-phantasm-pirate-king-nightrose.png",
    cards: [
      {
        name: "Pirate King of Redemption, Dragut",
        nameJp: "贖いの海賊王 ドラクート",
        image: "assets/cards/pirate-king-of-redemption-dragut.png",
        grade: "G (Stride/G unit)",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[ACT](VC) 1/Turn: COST[Counter Blast (1) & turn a card with the same card name as this card from G zone face up], choose a card from your drop, call it to (RC), and it gets \"[AUTO](RC): When your vanguard attacks, if this unit is hollowed, [Stand] this unit.\" until end of turn. If you called a card with the Hollow ability, your opponent chooses one of their rear-guards, and retires it."
      },
      {
        name: "Mist Phantasm Pirate King, Nightrose",
        nameJp: "霧幻の海賊王 ナイトローゼ",
        image: "assets/cards/mist-phantasm-pirate-king-nightrose.png",
        grade: "G (Stride/G unit)",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Discard a grade 3 card with \"Nightrose\" in its card name from your hand], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[AUTO](VC) Generation Break 2: When this unit attacks a vanguard, COST[Counter Blast (1) & retire two rear-guards], choose up to two grade 2 or greater cards with different card names from your drop, and call them to (RC). If your drop has ten or more cards, this unit gets [Critical]+1 until end of that battle, and if your drop has fifteen or more cards, all of those called units get [Power]+10000 until end of turn."
      },
      {
        name: "Ghostie Great King, Obadiah",
        nameJp: "お化け大王 おばだいあ",
        image: "assets/cards/ghostie-great-king-obadiah.png",
        grade: "G (Stride/G unit)",
        effect: "(This card cannot be in your main deck)\n[Stride]-Stride Step-COST[Choose one or more cards with the sum of their grades being 3 or greater from your hand, and discard them], and Stride this card on your (VC) from face down. (When you Stride, your original vanguard becomes a heart card, and this unit gets that card's [Power] and card name. At the end of the turn, return this unit face up)\n[ACT](VC) 1/Turn: COST[Turn a card from G zone face up], look at the top five cards of your deck, choose up to one card from among them, discard it, and shuffle the deck. Choose up to one card from your drop, and call it to (RC). If you called a unit with the Hollow ability, that unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Vampire Princess of Night Fog, Nightrose",
        nameJp: "夜霧の吸血姫 ナイトローゼ",
        image: "assets/cards/vampire-princess-of-night-fog-nightrose.png",
        grade: "G3",
        effect: "[AUTO](VC) 1/Turn Generation Break 2: When your rear-guard is retired, COST[discard the top three cards of the deck], and you may call that retired card to (RC).\n[AUTO](VC): When your G unit Strides during your turn, COST[Counter Blast (1)], choose up to one card from your drop, call it to (RC), and that unit gets [Power]+2000 until end of turn."
      },
      {
        name: "Emperor Fang Dragon, Growleon",
        nameJp: "皇牙竜 グラウリオン",
        image: "assets/cards/emperor-fang-dragon-growleon.png",
        grade: "G3",
        effect: "[CONT](RC/GC): This unit gets \"Intercept\", and [Shield]+5000.\n[AUTO]: When this unit is placed on (RC), if your vanguard is grade 3 or greater, COST[Energy Blast (3)], until end of turn, this unit gets [Power]+5000, and your opponent cannot intercept for the battles this unit attacked. If your damage zone has four or more cards, or you persona rode this turn, it also gets [Power]+5000, choose up to one order card from your drop, and put it into hand."
      },
      {
        name: "Sea Strike Dragon, Enlargulv",
        nameJp: "海撃竜 インラージガルヴ",
        image: "assets/cards/sea-strike-dragon-enlargulv.png",
        grade: "G3",
        effect: "[AUTO]: When this unit is placed on (RC) or put on (GC), choose up to one grade 4 card from your hand, and reveal it. If you revealed a card, or your vanguard is grade 4, perform one of the following according to the circle this unit is on.\n•(RC) - COST[Soul Blast (1)], choose a grade 2 or greater card with a different card name from this unit from your drop, and put it into hand.\n•(GC) - This unit gets [Shield]+15000 until end of that battle.\n[AUTO]: When this card is discarded from hand while riding a grade 3 from the ride deck or paying the cost for Stride, draw a card."
      },
      {
        name: "A Roseate Twilight That Dances in the Nether Hour",
        nameJp: "冥刻に舞う夜薔薇",
        image: "assets/cards/a-roseate-twilight-that-dances-in-the-nether-hour.png",
        grade: "G3",
        effect: "This card can be played from drop, and play this if you have a \"Vampire Princess of Night Fog, Nightrose\" crest.\nBind this card, and perform one of the following.\n•Look at the top seven cards of your deck, choose up to one card from among them, discard it, shuffle the deck, and your vanguard gets [Power]+5000 until end of turn.\n•Choose a card from your drop, call it to (RC), and it gets [Power]+5000 until end of turn.\n[AUTO]: When this card is discarded from hand while paying the cost for Stride, choose one of your vanguards or hearts, and until end of turn, reduce the next Counter Blast cost you pay for that card's ability by (1).\n(Deck contains 2 total copies of this card across two different print rarities, shown as one entry here.)"
      },
      {
        name: "Pirate Swordsman, Colombard",
        nameJp: "海賊剣士 コロンバール",
        image: "assets/cards/pirate-swordsman-colombard.png",
        grade: "G2",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO]: When this unit is rode upon by a grade 3 with \"Nightrose\" in its card name, COST[Soul Blast (1)], look at the top seven cards of your deck, choose up to two normal units without sentinel from among them, reveal them, choose one of the revealed cards, put it into hand, discard the rest of the revealed cards, and shuffle the deck.\n[AUTO](RC): When this unit attacks, if this unit is hollowed, this unit gets [Power]+5000 until end of that battle."
      },
      {
        name: "Ransack Shade",
        nameJp: "ランサック・シェイド",
        image: "assets/cards/ransack-shade.png",
        grade: "G2",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO]: If this unit was placed by the ability of your heart with \"Nightrose\" in its card name, this cost can be paid with Energy Blast (3) instead. When this unit is placed on (RC) during the ride phase or main phase, if you have a vanguard with only «Granblue» for its clan, COST[Counter Blast (1)], and perform one of the following.\n•Draw a card.\n•If your vanguard is grade 3 or greater, choose a card from your drop, and call it to (RC).\n[AUTO](RC): When this unit becomes hollowed, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Power]+5000 until end of turn."
      },
      {
        name: "Corpse Hunting Rend Cataclysm, Roveena & Zuin",
        nameJp: "屍猟裂災 ロヴィーナ＆ズウィン",
        image: "assets/cards/corpse-hunting-rend-cataclysm-roveena-and-zuin.png",
        grade: "G2",
        effect: "[AUTO]: When this unit is placed on (RC) from hand other than during the battle phase, perform one of the following.\n•COST[Counter Blast (1)], look at the top card of your deck, and put it on the bottom of the deck, or discard it. Choose a grade 2 or less card from your drop, and call it to (RC).\n•COST[Energy Blast (2)], look at the top card of your deck, put it on the bottom of the deck or into soul, choose one of your opponent's rear-guards, and put it into soul.\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, this unit gets [Power]+5000 until end of that battle. If you have a vanguard with only one clan, it gets [Power]+5000 until end of that battle if your opponent's vanguard is grade 2 or greater instead of grade 3 or greater."
      },
      {
        name: "Mutual Feelings Maiden, Pense",
        nameJp: "相思の乙女 パンセ",
        image: "assets/cards/mutual-feelings-maiden-pense.png",
        grade: "G2",
        effect: "[Ace Unit] (You may only have one Ace Unit in a deck)\n[Unique Skill]-[AUTO]: When this unit is placed on (RC) other than during the battle phase, this unit gets [Power]+5000 until end of turn. COST[Energy Blast (3)], look at the top seven cards of your deck, choose up to one card from among them, discard it, and shuffle the deck. Choose up to one card with grade less than or equal to your vanguard from your drop, and call it to (RC). (You may only use Unique Skills a total of once per fight among all your cards)\n[AUTO](RC): When this unit attacks, if your opponent's vanguard is grade 3 or greater, until end of that battle, this unit gets [Power]+5000, and if your drop has ten or more cards, it also gets [Power]+5000."
      },
      {
        name: "Marauding Shade",
        nameJp: "マローディング・シェイド",
        image: "assets/cards/marauding-shade.png",
        grade: "G2",
        effect: "[AUTO]: Hollow (When placed on (RC), you may have it become hollowed. If you do, retire it at the end of turn)\n[AUTO](RC): When this unit becomes hollowed, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Power]+5000 until end of turn. If your drop has ten or more cards, it gets [Power]+10000 instead of +5000.\n[AUTO]: When this unit is put on (GC), if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, this unit gets [Shield]+5000 until end of turn. If your drop has ten or more cards, it gets [Shield]+10000 instead of +5000."
      },
      {
        name: "Protection: Twincast",
        nameJp: "双つに連なる守護の法陣",
        image: "assets/cards/protection-twincast.png",
        grade: "G2",
        effect: "[Regalis Piece] (You may only have one Regalis Piece in your deck, and use it a total of one time in a fight.)\nChoose one of your units being attacked, and it gets [Power]+10000 until end of that battle.\n[CONT]: This card's [AUTO] ability can be resolved even if you have resolved a [Regalis Piece] ability this fight.\n[AUTO](Drop): When your unit is attacked, COST[remove this card from drop], choose one of your units being attacked, and it gets [Power]+5000 until end of that battle for each grade of that unit."
      },
      {
        name: "Ghost Chase",
        nameJp: "ゴースト・チェイス",
        image: "assets/cards/ghost-chase.png",
        grade: "G2",
        effect: "Choose one of your units, and it gets [Power]+5000 until end of that battle. Choose one of your rear-guards not being attacked, and return it to your hand."
      },
      {
        name: "Parting Shade",
        nameJp: "パーティング・シェイド",
        image: "assets/cards/parting-shade.png",
        grade: "G1",
        effect: "[AUTO]: When this unit is placed by riding from \"Undying Departed, Grenache\", draw a card, and you get a \"Vampire Princess of Night Fog, Nightrose\" crest."
      },
      {
        name: "Graeme the Ghostie",
        nameJp: "お化けのぐれーむ",
        image: "assets/cards/graeme-the-ghostie.png",
        grade: "G1",
        effect: "[AUTO](Drop): When your vanguard with \"Ghostie\" in its card name is placed, if all of your rear-guards have a different name from this card, you may call this card to (RC).\n[AUTO](RC/Hand): At the beginning of the guard step of the battle your unit with only «Granblue» for its clan was attacked, COST[put this card into drop], choose a unit being attacked, and it gets [Power]+10000 until end of that battle. (Performed before calling guardians and intercepting)"
      },
      {
        name: "Witch Doctor of Powdered Bone, Negrobone",
        nameJp: "粉骨の呪術師 ネグロボーン",
        image: "assets/cards/witch-doctor-of-powdered-bone-negrobone.png",
        grade: "G1",
        effect: "[AUTO](RC): At the end of the battle this unit boosted and it was placed from drop this turn, if you have a \"Vampire Princess of Night Fog, Nightrose\" crest, COST[retire this unit], and draw a card."
      },
      {
        name: "Waterspout Djinn",
        nameJp: "竜巻のジン",
        image: "assets/cards/waterspout-djinn.png",
        grade: "G1",
        effect: "Sentinel.\n[AUTO]: When this unit is put on (GC), choose one of your units, and it cannot be hit until end of that battle. If your hand has two or more cards, choose a card from your hand, and discard it."
      },
      {
        name: "Undying Departed, Grenache",
        nameJp: "死せざる死者 グルナッシュ",
        image: "assets/cards/undying-departed-grenache.png",
        grade: "G0",
        effect: "[AUTO]: When this unit is rode upon, if you went second, draw a card."
      },
      {
        name: "Ancestral Dragon King of Zenith Colors, Founaherdio",
        nameJp: "極彩の祖竜王 ファウナヘルディオ",
        image: "assets/cards/ancestral-dragon-king-of-zenith-colors-founaherdio.png",
        grade: "G0",
        effect: "Over Trigger: [Power]+100 Million (you may only have one Over Trigger in a deck; when revealed as a trigger, remove this card from the game, draw a card, and choose one of your units to get the power boost until end of turn; if revealed during a drive check, its Additional Effect activates instead).\n[CONT]: This card is regarded as \"Spiritual King of Ignition, Valnout\".\nAdditional Effect: Choose one of your [Stand] rear-guards, and it gets \"[AUTO](RC) 1/Turn: At the end of the battle this unit attacked, [Stand] this unit.\" until end of turn. If you did not choose a card, draw a card, choose up to one unit card from your hand, and call it to (RC)."
      },
      {
        name: "Zypsophilia Fairy, Asher",
        nameJp: "ジプソフィラの妖精 アシェル",
        image: "assets/cards/zypsophilia-fairy-asher.png",
        grade: "G0",
        effect: "Heal Trigger: [Power]+10000.\n[AUTO]: When this unit is put on (GC), if your opponent's attacking unit has attacked two or more times this turn, this unit gets [Shield]+15000 until end of that battle. (Active if this battle is its second attack this turn or more)"
      },
      {
        name: "Aspiring Maiden, Alana",
        nameJp: "憧憬の乙女 アラナ",
        image: "assets/cards/aspiring-maiden-alana.png",
        grade: "G0",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\n[AUTO](RC): At the end of the battle this unit boosted, COST[put this unit into your soul], choose one of your units, and it gets [Power]+2000 until end of turn."
      },
      {
        name: "Frenzied Heiress",
        nameJp: "狂乱の令嬢",
        image: "assets/cards/frenzied-heiress.png",
        grade: "G0",
        effect: "Front Trigger: [Power]+10000 to all your front row units.\n[CONT](GC): If your opponent's vanguard is grade 3 or greater, this unit gets [Shield]+5000."
      },
      {
        name: "Abyss Temptation",
        nameJp: "深淵誘い",
        image: "assets/cards/abyss-temptation.png",
        grade: "G0",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\nA grade 0 critical trigger unit for the Nightrose ride line, with no additional abilities beyond its trigger effect, printed at 5000 power / 15000 shield."
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
        name: "Spiritual King of Determination, Olbaria",
        image: "assets/cards/spiritual-king-of-determination-olbaria.png",
        grade: "G0",
        section: "Main Deck",
        effect: "Over Trigger: [Power]+100 Million.\n(You may only have one [Over] trigger in a deck.) When revealed as a trigger, remove that card, draw a card, choose one of your units, and it gets [Power]+100 Million until end of turn. If revealed during drive check, activate its additional effect instead.\nAdditional Effect - Choose one of your units, and it gets [Power]+100 Million until end of turn."
      },
      {
        name: "Diabolos Girls, Maimai",
        image: "assets/cards/diabolos-girls-maimai.png",
        grade: "G0",
        section: "Main Deck",
        effect: "Critical Trigger: [Power]+10000, [Critical]+1.\nWhen revealed as a trigger, choose one of your units, and it gets [Critical]+1 until end of turn. Then, choose one of your units, and it gets [Power]+10000 until end of turn."
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
  }
];
