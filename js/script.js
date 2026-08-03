const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
};

let selectedClan = null;

function showView(name) {
  Object.values(views).forEach(v => v.classList.add('view--hidden'));
  views[name].classList.remove('view--hidden');
  document.querySelectorAll('.drawer__item').forEach(link => {
    link.classList.toggle('is-active', link.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.nav;
    if (target === 'home' || target === 'decks') showView(target);
    closeDrawer();
  });
});

const menuToggle = document.getElementById('menuToggle');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('is-open');
  drawerOverlay.classList.add('is-open');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  drawerOverlay.classList.remove('is-open');
}

menuToggle.addEventListener('click', openDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
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
      ${deck.image ? `<div class="deck-card__image-wrap"><img class="deck-card__image" src="${deck.image}" alt="${deck.name}" loading="lazy"></div>` : ''}
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
      ${card.image ? `<div class="card-item__image-wrap"><img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy"></div>` : ''}
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

let currentDeck = null;
let selectedSection = null;

function renderCardListForSection() {
  const list = document.getElementById('cardList');
  const cards = selectedSection
    ? currentDeck.cards.filter(c => c.section === selectedSection)
    : currentDeck.cards;
  list.innerHTML = `<div class="card-list">${cards.map(renderCardItem).join('')}</div>`;
}

function renderSectionTabs(sections) {
  const container = document.getElementById('sectionTabs');

  if (!sections.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = sections.map(sectionName => `
    <button class="section-tab${sectionName === selectedSection ? ' is-active' : ''}" data-section="${sectionName}">${sectionName}</button>
  `).join('');

  container.querySelectorAll('.section-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSection = btn.dataset.section;
      renderSectionTabs(sections);
      renderCardListForSection();
    });
  });
}

function showDeckDetail(deckId) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  currentDeck = deck;
  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} kartu`;

  const hasSections = deck.cards.some(card => card.section);

  if (!hasSections) {
    selectedSection = null;
    renderSectionTabs([]);
    renderCardListForSection();
  } else {
    const sections = SECTION_ORDER.filter(name => deck.cards.some(c => c.section === name));
    deck.cards.forEach(c => {
      if (c.section && !sections.includes(c.section)) sections.push(c.section);
    });
    selectedSection = sections[0];
    renderSectionTabs(sections);
    renderCardListForSection();
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

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  const heroTrack = document.getElementById('heroTrack');
  const heroSlides = Array.from(heroTrack.children);
  const heroDotsContainer = document.getElementById('heroDots');

  let heroIndex = 0;
  let heroDragStartX = 0;
  let heroDragDeltaX = 0;
  let heroIsDragging = false;
  let heroWasDragged = false;

  function unflipAllHeroCards() {
    document.querySelectorAll('[data-flip-card]').forEach(card => card.classList.remove('is-flipped'));
  }

  function updateHeroCarousel() {
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
    heroDotsContainer.querySelectorAll('.hero-carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === heroIndex);
    });
  }

  function goToHeroSlide(i) {
    const clamped = Math.max(0, Math.min(heroSlides.length - 1, i));
    if (clamped === heroIndex) return;
    heroIndex = clamped;
    unflipAllHeroCards();
    updateHeroCarousel();
  }

  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToHeroSlide(i));
    heroDotsContainer.appendChild(dot);
  });

  heroCarousel.addEventListener('pointerdown', (e) => {
    heroIsDragging = true;
    heroWasDragged = false;
    heroDragStartX = e.clientX;
    heroDragDeltaX = 0;
  });
  heroCarousel.addEventListener('pointermove', (e) => {
    if (!heroIsDragging) return;
    heroDragDeltaX = e.clientX - heroDragStartX;
  });
  heroCarousel.addEventListener('pointerup', () => {
    if (!heroIsDragging) return;
    heroIsDragging = false;
    if (Math.abs(heroDragDeltaX) > 40) {
      heroWasDragged = true;
      goToHeroSlide(heroIndex + (heroDragDeltaX < 0 ? 1 : -1));
    }
  });
  heroCarousel.addEventListener('pointerleave', () => { heroIsDragging = false; });

  document.querySelectorAll('[data-flip-card]').forEach(card => {
    card.addEventListener('click', () => {
      if (heroWasDragged) { heroWasDragged = false; return; }
      card.classList.toggle('is-flipped');
    });
  });

  updateHeroCarousel();
}
