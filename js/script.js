const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
};

let selectedClan = null;

function showView(name) {
  Object.values(views).forEach(v => v.classList.add('view--hidden'));
  views[name].classList.remove('view--hidden');
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.toggle('is-active', link.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.nav;
    if (target === 'home' || target === 'decks') showView(target);
  });
});

function getClans() {
  const clans = [];
  DECKS.forEach(deck => {
    const clan = deck.clan || 'Lainnya';
    if (!clans.includes(clan)) clans.push(clan);
  });
  return clans;
}

function renderClanTabs() {
  const container = document.getElementById('clanTabs');
  const clans = getClans();

  if (clans.length <= 1) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = clans.map(clan => `
    <button class="clan-tab${clan === selectedClan ? ' is-active' : ''}" data-clan="${clan}">${clan}</button>
  `).join('');

  container.querySelectorAll('.clan-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedClan = btn.dataset.clan;
      renderClanTabs();
      renderDeckGrid();
    });
  });
}

function renderDeckGrid() {
  const grid = document.getElementById('deckGrid');
  const empty = document.getElementById('emptyState');
  grid.innerHTML = '';

  if (!DECKS.length) {
    empty.classList.add('is-visible');
    return;
  }
  empty.classList.remove('is-visible');

  const filtered = DECKS.filter(deck => (deck.clan || 'Lainnya') === selectedClan);

  filtered.forEach(deck => {
    const card = document.createElement('button');
    card.className = 'deck-card';
    card.innerHTML = `
      ${deck.image ? `<img class="deck-card__image" src="${deck.image}" alt="${deck.name}" loading="lazy">` : ''}
      <div class="deck-card__body">
        <div class="deck-card__name">${deck.name}</div>
        <div class="deck-card__meta">${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} kartu</div>
      </div>
    `;
    card.addEventListener('click', () => showDeckDetail(deck.id));
    grid.appendChild(card);
  });
}

function renderCardItem(card) {
  return `
    <div class="card-item">
      ${card.image ? `<img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy">` : ''}
      <div class="card-item__body">
        <div class="card-item__name">${card.name}</div>
        ${card.nameJp ? `<div class="card-item__name-jp">${card.nameJp}</div>` : ''}
        ${card.grade ? `<span class="card-item__grade">${card.grade}</span>` : ''}
        <div class="card-item__effect">${card.effect || ''}</div>
      </div>
    </div>
  `;
}

const SECTION_ORDER = ['Ride Line', 'Main Deck', 'Stride'];

function showDeckDetail(deckId) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} kartu`;

  const list = document.getElementById('cardList');
  const hasSections = deck.cards.some(card => card.section);

  if (!hasSections) {
    list.innerHTML = `<div class="card-list">${deck.cards.map(renderCardItem).join('')}</div>`;
  } else {
    const sections = SECTION_ORDER.filter(name => deck.cards.some(c => c.section === name));
    deck.cards.forEach(c => {
      if (c.section && !sections.includes(c.section)) sections.push(c.section);
    });

    list.innerHTML = sections.map(sectionName => {
      const cardsInSection = deck.cards.filter(c => c.section === sectionName);
      return `
        <div class="card-section">
          <h3 class="card-section__title">${sectionName}</h3>
          <div class="card-list">${cardsInSection.map(renderCardItem).join('')}</div>
        </div>
      `;
    }).join('');
  }

  showView('detail');
}

function renderStats() {
  document.getElementById('deckCount').textContent = DECKS.length;
  document.getElementById('cardCount').textContent = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
}

const initialClans = getClans();
selectedClan = initialClans[0] || null;
renderClanTabs();
renderDeckGrid();
renderStats();
