const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
};

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

function renderDeckGrid() {
  const grid = document.getElementById('deckGrid');
  const empty = document.getElementById('emptyState');
  grid.innerHTML = '';

  if (!DECKS.length) {
    empty.classList.add('is-visible');
    return;
  }
  empty.classList.remove('is-visible');

  DECKS.forEach(deck => {
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

function showDeckDetail(deckId) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} kartu`;

  const list = document.getElementById('cardList');
  list.innerHTML = deck.cards.map(card => `
    <div class="card-item">
      ${card.image ? `<img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy">` : ''}
      <div>
        <div class="card-item__name">${card.name}</div>
        ${card.nameJp ? `<div class="card-item__name-jp">${card.nameJp}</div>` : ''}
        ${card.grade ? `<span class="card-item__grade">${card.grade}</span>` : ''}
        ${card.qty ? `<span class="card-item__qty">×${card.qty}</span>` : ''}
        <div class="card-item__effect">${card.effect || ''}</div>
      </div>
    </div>
  `).join('');

  showView('detail');
}

function renderStats() {
  document.getElementById('deckCount').textContent = DECKS.length;
  document.getElementById('cardCount').textContent = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
}

renderDeckGrid();
renderStats();
