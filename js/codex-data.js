// Lore for the Codex page. Original short fiction inspired by each card's name/art/effect —
// not reproductions of official Cardfight!! Vanguard story content.

const CODEX_DECKS = {
  "chronojet-deck": {
    intro: "Somewhere outside linear time, the Dark States keep a standing order of dragons and gearfolk whose only allegiance is to the hour that hasn't happened yet. They ride the Chronojet line not to win battles, but to make sure a particular future — one with a dragon in it — still gets to exist.",
    cards: {
      "Chronojet Dragon": "Long before it bore the name Chronojet, it was a lone hatchling lost between two ticking seconds, neither past nor future. The Dark States found it there, flickering in and out of the timeline, and gave it a name so it would have somewhere to return to.\n\nNow it rides the gears of every clock at once. Each battle is just another tick it refuses to let pass — one more turn stolen back from a future that hasn't decided yet whether it wants a dragon in it.",
      "Smokegear Dragon": "Long before it wore the Chrono icon, it was the workshop's failed prototype — all smoke, no spark. It rides upon the line now less to fight and more to prove the gears finally caught.",
      "Masergear Dragon": "It counts seconds the way other dragons count kills, and it has never once forgiven the grade 0 that got there before it.",
      "Chrono Dran": "The line's smallest recruit, riding in second because someone has to watch the door while the future is still being decided.",
      "Steam Fighter, Balih": "He builds an army out of the parts other units left behind, and swears every discard is a promotion in disguise.",
      "Dream Sky Mutual Love, Naama & Samaell": "Two names that were never supposed to share a card, let alone a heartbeat — the Chronojet line borrowed them from a future where that wasn't true yet.",
      "Upstream Dragon": "It only shows up right after the big one lands, insisting — loudly, to anyone who'll listen — that the timing was its idea.",
      "Steam Fighter, Amber": "Youngest of the Steam Fighters, and the only one still convinced this whole timeline thing is temporary.",
      "Steam Gunner, Tizkar": "She rode in on a fake mask and a borrowed name, and decided the persona suited her better than her own.",
      "Mystery Creepy Artillery": "Nobody built it on purpose. It just started showing up wherever the fight was going badly, cannon first, questions never.",
      "Steam Scara, Gigi": "She reads futures for a living and has seen her own ending at least four times — none of them stopped her from riding along anyway.",
      "Steam Breath Dragon": "It can be discarded as any grade the moment calls for, which it finds less like a weakness and more like never having to commit to being one thing.",
      "Steam Maiden, Arlim": "She guards the line not because she was assigned to, but because someone told her once that watching the door was the bravest job, and she never checked if that was true.",
      "Direful Doll, Finley": "A doll that keeps a soul of its own on layaway, drawing it down a little at a time, like it's not sure it's allowed to spend it all at once.",
      "Steam Battler, Dadasig": "Grade 0 and unbothered — he's fought alongside every dragon on this line and still introduces himself like they might not remember him.",
      "Stomach Clock Gear Rabbit": "Its stomach runs on the same gears as the timeline itself, which means somewhere, always, something is running late for dinner.",
      "Steam Maiden, Ururu": "She doesn't have a signature move. She has excellent timing, and in this deck, that's the same thing.",
      "Diabolos Girls, Natalia": "On loan from a rival's card pool, she guards the line's back row and has never explained why, or for whom.",
      "Chronodragon Nextage": "The line's first great leap forward — a dragon built entirely out of the moment right before something changes.",
      "Interdimensional Dragon, Mystery-Flare Dragon": "It doesn't fight across space so much as across the idea of it, borrowing power from front-row allies like it's asking permission after the fact.",
      "Interdimensional Dragon, Chronoscommand Dragon": "When both sides have run out of turns to waste, this is the dragon that decides the waiting is over — for everyone."
    }
  },
  "nightrose-deck": {
    intro: "The fog doesn't pick sides, and neither does Nightrose's crew — a company of drowned pirates, hollow servants, and one vampire princess who collects grudges the way other captains collect gold.",
    cards: {
      "Pirate King of Redemption, Dragut": "He died owing the sea a debt he still hasn't figured out how to pay, so he keeps sailing, hoping the interest runs out before he does.",
      "Mist Phantasm Pirate King, Nightrose": "The fog picks its own hour to roll in, and when it does, the sailors on watch already know better than to reach for their swords. Nightrose doesn't take ships. She takes crews — the drowned, the marooned, the ones a captain quietly stopped counting.\n\nHer throne was carved from the wreck of the first vessel foolish enough to fire on her. Everyone after that just signed on willingly. It's a longer afterlife than any of them were promised on land.",
      "Ghostie Great King, Obadiah": "King of a crew that was never technically alive to begin with, which makes the title mostly ceremonial and entirely his.",
      "Vampire Princess of Night Fog, Nightrose": "The fog picks its own hour to roll in, and when it does, the sailors on watch already know better than to reach for their swords. Nightrose doesn't take ships. She takes crews — the drowned, the marooned, the ones a captain quietly stopped counting.\n\nHer throne was carved from the wreck of the first vessel foolish enough to fire on her. Everyone after that just signed on willingly. It's a longer afterlife than any of them were promised on land.",
      "Emperor Fang Dragon, Growleon": "He answers to no flag but hers, and intercepts every blow meant for her ship like the ocean owes him that much too.",
      "Sea Strike Dragon, Enlargulv": "It only reveals its true size to a vanguard that's already bigger than reasonable — modesty, it turns out, is for smaller dragons.",
      "A Roseate Twilight That Dances in the Nether Hour": "A page torn from the log of a battle Nightrose already lost once, kept in the drop zone for the day she needs to lose it better.",
      "Pirate Swordsman, Colombard": "He signed on hollow and has never once asked what that cost him — the crew stopped asking that question generations ago.",
      "Ransack Shade": "It doesn't loot ships so much as loot moments — the half-second right before a rear-guard realizes it's already retired.",
      "Corpse Hunting Rend Cataclysm, Roveena & Zuin": "Two hunters who split every kill down the middle, right down to the name on the tombstone.",
      "Mutual Feelings Maiden, Pense": "The one ace this crew is allowed to play, and she plays it exactly once a fight — she was never the type to repeat herself.",
      "Marauding Shade": "It grows stronger the fuller the drop zone gets, which on this crew's ship, is not a matter of if.",
      "Protection: Twincast": "A ward cast twice for a crew that's already died once — Nightrose isn't taking chances on a third time.",
      "Ghost Chase": "The order given right before the retreat that was never actually a retreat.",
      "Parting Shade": "The last thing Grenache says before it stops being undying — a favor, a name, and permission to keep going without it.",
      "Graeme the Ghostie": "It answers to the word \"Ghostie\" the way a sailor answers to a bell — immediately, and without asking why.",
      "Witch Doctor of Powdered Bone, Negrobone": "He boosts the fight and then asks to be retired for it, like dying twice on the same crew is simply good manners.",
      "Waterspout Djinn": "It doesn't guard the captain out of loyalty — it guards her because it's genuinely curious how this story ends.",
      "Undying Departed, Grenache": "The first name on the crew roster, and the only one who remembers what the ship looked like before the fog found it.",
      "Ancestral Dragon King of Zenith Colors, Founaherdio": "It was a king once, under a different banner and a different color entirely — the fog doesn't ask a card to give that up, only to remember it quietly.",
      "Zypsophilia Fairy, Asher": "It counts every hit the crew takes and heals exactly one — the fairy version of keeping score.",
      "Aspiring Maiden, Alana": "She wants to be crew so badly she keeps volunteering for the boost, even though nobody's confirmed she's allowed on deck yet.",
      "Frenzied Heiress": "Heiress to a fortune nobody in this crew has ever seen — she still throws her whole front row behind the claim.",
      "Abyss Temptation": "It doesn't tempt anyone in particular. It just waits at the bottom of the deck, patient the way only a grade 0 can afford to be."
    }
  },
  "heartluru-deck": {
    intro: "The carnival only appears where a town has stopped believing in it, and Heartluru is always first through the gate — ringmaster to a company of living toys who charge admission in things you didn't know you could lose.",
    cards: {
      "Sugary and Scary Land, Heartluru": "The carnival only sets up where a town has stopped believing in it. One night the tents are just there, striped and glowing, and Heartluru is already bowing at the gate, sugar-sweet and a little too pleased to see you.\n\nEvery game can be won. Every prize is real. Nobody ever seems to notice what they quietly stopped having in exchange — until they try to remember it later, and find the memory tastes like cotton candy instead.",
      "Coaster Shark": "It only runs the track once someone's already strapped in — turning back was never part of the ride's design.",
      "Nutcracker Soldier, Nutcrumbs": "He guards the gate between \"toy\" and \"soldier,\" and privately isn't sure which side of that line he actually landed on.",
      "Cute Teddy Bear, Titi": "First toy off the shelf, and the only one who still remembers it used to be a shelf and not a battlefield.",
      "Fire Regalis": "A piece of the old carnival that burned down once — Heartluru kept the ember, just in case the next one needs lighting.",
      "Toys Monster, Blavyloss": "It swallowed a balloon vendor's whole stock once and has been rewarded for bad behavior ever since — the carnival's rules are stranger than most.",
      "Giant Fluffy": "Too big for the prize wall, too soft to be scary — Heartluru keeps it around anyway, because scary was never really the point.",
      "Fashion Doll, Ruby Rouge": "She trades her own outfit for a favor and never asks for it back — fashion, to her, was always meant to be spent.",
      "Block Horse": "Built from a child's building blocks left behind at closing time — Heartluru never throws anything away, especially not what a kid forgot to take home.",
      "Sparkly Bunny": "It borrows a soul's worth of shine from the deck and pays it back the same night, standing tall for exactly as long as it's asked to.",
      "Purple Jeweled Beast, Almethys": "It trades old tricks for new circles to stand on — Heartluru's carnival runs on favors owed, not coins spent.",
      "Darkside Mirror Master": "Twin reflections who guard the mirror maze — step through wrong, and only one of them steps back out with you.",
      "Opener of Heart, Philya": "She opens doors nobody else can find the handle to, then quietly disappears once you're through — the carnival's kindest, least-thanked attraction.",
      "Elementaria Sanctitude": "A shield cast once and then gone for good — Heartluru only allows one per show, because the surprise wears off after that.",
      "Toys Are Made for Children": "The order that keeps the whole carnival's promise honest — as long as it's in play, every toy remembers exactly who it was made for.",
      "Hades Dragon Deity of Resentment, Gallmageheld": "The one ride Heartluru doesn't advertise — you only find it after the carnival's already decided you deserve it.",
      "Swanky Enthraller": "She dances the tightrope for tips nobody's thrown yet, betting the whole show on somebody eventually looking up.",
      "Silky Sky Actress": "Every night she takes the same bow to the same empty rafters, certain that this is the performance someone finally stayed to watch.",
      "Intrepid Spinner": "He spins more plates than the act calls for, purely because stopping at \"enough\" has never once occurred to him.",
      "Gambling Juggler": "She'll juggle your luck, your cards, and your composure, and she's genuinely delighted regardless of which one you lose first."
    }
  }
};

const CODEX_IDLE = {
  "Blaster Dark": "He carries the sword his brother once swore never to draw for the wrong reason, and has spent every fight since figuring out what a right one actually looks like.",
  "Silver Thorn Dragon Tamer, Luquier": "She calls her serpents by name and means it as both an introduction and a warning.",
  "Pure Heart Jewel Knight, Ashlei": "Before there was ever a Reverse, a Ruin, or a grief to reverse from, there was just a knight who believed the foundation could hold — and built it that way, one shield at a time.",
  "Chronojet Dragon": "Long before it bore the name Chronojet, it was a lone hatchling lost between two ticking seconds, neither past nor future. The Dark States found it there, flickering in and out of the timeline, and gave it a name so it would have somewhere to return to.\n\nNow it rides the gears of every clock at once. Each battle is just another tick it refuses to let pass — one more turn stolen back from a future that hasn't decided yet whether it wants a dragon in it.",
  "Masked Magician, Harri": "Nobody remembers booking Harri for the show. He simply appears once the lights dim, mask already on, bird already perched, as if the checkered stage had been waiting for him longer than anyone else in the room.\n\nHis tricks never repeat the same way twice — cards vanish into the wrong pocket, doves land as something else entirely. The one thing that never changes is the mask, and the quiet rule everyone in the circus knows better than to ask about: never wonder what it's hiding.",
  "Blue Sky Knight, Altmile": "He tells every doubting recruit the same thing before a fight: simple, just believe in your own possibility — and somehow it keeps working.",
  "Ranunculus Flower Maiden, Ahsha": "She grows a garden that remembers every ally who's ever stood beside it, and calls them back to bloom exactly when it matters.",
  "Vampire Princess of Night Fog, Nightrose": "The fog picks its own hour to roll in, and when it does, the sailors on watch already know better than to reach for their swords. Nightrose doesn't take ships. She takes crews — the drowned, the marooned, the ones a captain quietly stopped counting.\n\nHer throne was carved from the wreck of the first vessel foolish enough to fire on her. Everyone after that just signed on willingly. It's a longer afterlife than any of them were promised on land.",
  "Blaster Blade": "The first sword raised in defense of the kingdom, and — after every reprint, every era, every rewritten history — still somehow the first one people think of.",
  "Dragonic Overlord": "He doesn't conquer out of ambition. He conquers because leaving anything standing feels, to him, like an unfinished sentence."
};
