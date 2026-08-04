const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
  search: document.getElementById('view-search'),
  glossary: document.getElementById('view-glossary'),
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeReveal(el) { revealObserver.observe(el); }
function observeRevealAll(root = document) {
  root.querySelectorAll('.reveal').forEach(observeReveal);
}

let selectedClan = null;

function showView(name) {
  Object.values(views).forEach(v => v.classList.add('view--hidden'));
  views[name].classList.remove('view--hidden');
  document.querySelectorAll('.drawer__item').forEach(link => {
    link.classList.toggle('is-active', link.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'search') {
    renderSearch();
    const input = document.getElementById('searchInput');
    if (input) setTimeout(() => input.focus(), 300);
  }
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.nav;
    if (target === 'home' || target === 'decks' || target === 'search' || target === 'glossary') showView(target);
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

  filtered.forEach((deck, i) => {
    const card = document.createElement('button');
    card.className = 'deck-card reveal';
    card.style.transitionDelay = `${Math.min(i, 6) * 0.06}s`;
    card.innerHTML = `
      ${deck.image ? `<div class="deck-card__image-wrap"><img class="deck-card__image" src="${deck.image}" alt="${deck.name}" loading="lazy"></div>` : ''}
      <div class="deck-card__body">
        <div class="deck-card__name">${deck.name}</div>
        <div class="deck-card__meta">${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards</div>
      </div>
    `;
    card.addEventListener('click', () => showDeckDetail(deck.id));
    grid.appendChild(card);
    observeReveal(card);
  });
}

function renderCardItem(card, i = 0) {
  return `
    <div class="card-item reveal" data-card-name="${card.name}" style="transition-delay:${Math.min(i, 8) * 0.05}s">
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

function renderSearchResultItem(entry, i = 0) {
  const { deck, card } = entry;
  return `
    <button class="card-item search-result-item reveal" data-deck-id="${deck.id}" data-card-name="${card.name}" data-card-section="${card.section || ''}" style="transition-delay:${Math.min(i, 8) * 0.05}s">
      ${card.image ? `<div class="card-item__image-wrap"><img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy"></div>` : ''}
      <div class="card-item__body">
        <span class="search-result-deck">${deck.name}</span>
        <div class="card-item__name">${card.name}</div>
        ${card.nameJp ? `<div class="card-item__name-jp">${card.nameJp}</div>` : ''}
        ${card.grade ? `<span class="card-item__grade">${card.grade}</span>` : ''}
        <div class="card-item__effect">${card.effect || ''}</div>
      </div>
    </button>
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
  observeRevealAll(list);
  wireCardImageZoom(list);
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

function showDeckDetail(deckId, opts = {}) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  currentDeck = deck;
  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards`;
  renderDeckStats(deck);

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
    selectedSection = (opts.section && sections.includes(opts.section)) ? opts.section : sections[0];
    renderSectionTabs(sections);
    renderCardListForSection();
  }

  showView('detail');
  if (opts.highlightName) highlightCardByName(opts.highlightName);
}

const GRADE_ORDER = ['G0', 'G1', 'G2', 'G3', 'G (Stride/G unit)'];
const GRADE_LABELS = { 'G0': 'G0', 'G1': 'G1', 'G2': 'G2', 'G3': 'G3', 'G (Stride/G unit)': 'Stride' };
const GRADE_COLORS = { 'G0': '#ffd9b8', 'G1': '#ffb073', 'G2': '#ff8a3d', 'G3': '#ff5b1a', 'G (Stride/G unit)': '#b3390f' };

function renderDeckStats(deck) {
  const container = document.getElementById('deckStats');
  const counts = {};
  deck.cards.forEach(c => {
    const g = c.grade || 'Unknown';
    counts[g] = (counts[g] || 0) + 1;
  });
  const total = deck.cards.length;
  const grades = Object.keys(counts).sort((a, b) => {
    const ai = GRADE_ORDER.indexOf(a);
    const bi = GRADE_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  container.innerHTML = `
    <div class="deck-stats__bar">
      ${grades.map(g => `<span class="deck-stats__segment" style="flex:0 0 ${(counts[g] / total * 100).toFixed(2)}%; background:${GRADE_COLORS[g] || 'var(--text-muted)'}"></span>`).join('')}
    </div>
    <div class="deck-stats__legend">
      ${grades.map(g => `
        <span class="deck-stats__item">
          <span class="deck-stats__dot" style="background:${GRADE_COLORS[g] || 'var(--text-muted)'}"></span>
          ${GRADE_LABELS[g] || g} <strong>${counts[g]}</strong>
        </span>
      `).join('')}
    </div>
  `;
}

function highlightCardByName(name) {
  setTimeout(() => {
    const target = document.querySelector(`#cardList .card-item[data-card-name="${CSS.escape(name)}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('is-highlighted');
    setTimeout(() => target.classList.remove('is-highlighted'), 1800);
  }, 80);
}

function renderStats() {
  document.getElementById('deckCount').textContent = DECKS.length;
  document.getElementById('cardCount').textContent = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
}

function renderDailyCard() {
  const allCards = [];
  DECKS.forEach(deck => deck.cards.forEach(card => allCards.push({ deck, card })));
  if (!allCards.length) return;

  const pick = allCards[Math.floor(Math.random() * allCards.length)];
  const img = document.getElementById('dailyCardImage');
  const nameEl = document.getElementById('dailyCardName');
  const jpEl = document.getElementById('dailyCardJp');
  const deckEl = document.getElementById('dailyCardDeck');
  const btn = document.getElementById('dailyCardBtn');

  if (pick.card.image) img.src = pick.card.image;
  img.alt = pick.card.name;
  nameEl.textContent = pick.card.name;
  jpEl.textContent = pick.card.nameJp || '';
  jpEl.style.display = pick.card.nameJp ? '' : 'none';
  deckEl.textContent = pick.deck.name;

  const goToCard = () => showDeckDetail(pick.deck.id, { section: pick.card.section || null, highlightName: pick.card.name });
  img.onclick = goToCard;
  btn.onclick = goToCard;
}

/* ===== Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || '';
  lightbox.classList.add('is-open');
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function wireCardImageZoom(container) {
  container.querySelectorAll('.card-item__image-wrap img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src, img.alt);
    });
  });
}

/* ===== Search ===== */
function searchCards(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches = [];
  DECKS.forEach(deck => {
    deck.cards.forEach(card => {
      const nameMatch = card.name && card.name.toLowerCase().includes(q);
      const jpMatch = card.nameJp && card.nameJp.toLowerCase().includes(q);
      if (nameMatch || jpMatch) matches.push({ deck, card });
    });
  });
  return matches;
}

function renderSearch() {
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  const empty = document.getElementById('searchEmpty');
  const query = input.value;

  if (!query.trim()) {
    resultsContainer.innerHTML = '';
    empty.querySelector('h3').textContent = 'Start typing to search';
    empty.querySelector('p').textContent = 'Search by English or Japanese card name.';
    empty.classList.add('is-visible');
    return;
  }

  const matches = searchCards(query);

  if (!matches.length) {
    resultsContainer.innerHTML = '';
    empty.querySelector('h3').textContent = 'No cards found';
    empty.querySelector('p').textContent = `No cards match "${query.trim()}".`;
    empty.classList.add('is-visible');
    return;
  }

  empty.classList.remove('is-visible');
  resultsContainer.innerHTML = matches.map(renderSearchResultItem).join('');
  observeRevealAll(resultsContainer);

  resultsContainer.querySelectorAll('.search-result-item').forEach(btn => {
    btn.addEventListener('click', () => {
      showDeckDetail(btn.dataset.deckId, {
        section: btn.dataset.cardSection || null,
        highlightName: btn.dataset.cardName,
      });
    });
  });
}

/* ===== Header quick-search overlay ===== */
const searchOverlay = document.getElementById('searchOverlay');
const overlaySearchInput = document.getElementById('overlaySearchInput');
const overlaySearchResults = document.getElementById('overlaySearchResults');
const headerSearchBtn = document.getElementById('headerSearchBtn');
const searchOverlayClose = document.getElementById('searchOverlayClose');

function renderOverlaySearch() {
  const query = overlaySearchInput.value;

  if (!query.trim()) {
    overlaySearchResults.innerHTML = `<div class="search-overlay__empty">Type a card name to start searching.</div>`;
    return;
  }

  const matches = searchCards(query).slice(0, 20);

  if (!matches.length) {
    overlaySearchResults.innerHTML = `<div class="search-overlay__empty">No cards match "${query.trim()}".</div>`;
    return;
  }

  overlaySearchResults.innerHTML = matches.map(({ deck, card }) => `
    <button class="search-overlay__item" data-deck-id="${deck.id}" data-card-name="${card.name}" data-card-section="${card.section || ''}">
      ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy">` : ''}
      <div class="search-overlay__item-info">
        <div class="search-overlay__item-name">${card.name}</div>
        <div class="search-overlay__item-deck">${deck.name}</div>
      </div>
    </button>
  `).join('');

  overlaySearchResults.querySelectorAll('.search-overlay__item').forEach(btn => {
    btn.addEventListener('click', () => {
      closeSearchOverlay();
      showDeckDetail(btn.dataset.deckId, {
        section: btn.dataset.cardSection || null,
        highlightName: btn.dataset.cardName,
      });
    });
  });
}

function openSearchOverlay() {
  searchOverlay.classList.add('is-open');
  renderOverlaySearch();
  setTimeout(() => overlaySearchInput.focus(), 150);
}
function closeSearchOverlay() {
  searchOverlay.classList.remove('is-open');
}

headerSearchBtn.addEventListener('click', openSearchOverlay);
searchOverlayClose.addEventListener('click', closeSearchOverlay);
searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearchOverlay(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearchOverlay(); });
overlaySearchInput.addEventListener('input', renderOverlaySearch);

document.addEventListener('keydown', (e) => {
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
  const active = document.activeElement;
  const tag = active ? active.tagName : '';
  const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || (active && active.isContentEditable);
  if (isEditable) return;
  e.preventDefault();
  if (searchOverlay.classList.contains('is-open')) {
    overlaySearchInput.focus();
  } else {
    openSearchOverlay();
  }
});

document.getElementById('searchInput').addEventListener('input', renderSearch);

/* ===== Dark theme toggle ===== */
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.classList.toggle('is-active', theme === 'dark');
  themeToggle.setAttribute('aria-checked', theme === 'dark');
  try { localStorage.setItem('wiciltcg-theme', theme); } catch (e) {}
}
applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

const initialClans = getClans();
selectedClan = initialClans[0] || null;
renderClanTabs();
renderDeckGrid();
renderStats();
renderDailyCard();
observeRevealAll();

/* ===== PWA: service worker registration ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

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

  function resetHeroCardScroll(card) {
    const back = card.querySelector('.flip-card__face--back');
    if (back) back.scrollTop = 0;
  }

  function unflipAllHeroCards() {
    document.querySelectorAll('[data-flip-card]').forEach(card => {
      card.classList.remove('is-flipped');
      resetHeroCardScroll(card);
    });
  }

  function updateHeroCarousel() {
    const viewport = heroCarousel.querySelector('.hero-carousel__viewport');
    const activeSlide = heroSlides[heroIndex];
    const offset = activeSlide.offsetLeft - (viewport.clientWidth - activeSlide.offsetWidth) / 2;
    heroTrack.style.transform = `translateX(${-offset}px)`;

    heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === heroIndex));
    heroDotsContainer.querySelectorAll('.hero-carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === heroIndex);
    });
  }

  window.addEventListener('resize', updateHeroCarousel);

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
      const slide = card.closest('.hero-carousel__slide');
      const slideIndex = heroSlides.indexOf(slide);
      if (slideIndex !== heroIndex) {
        goToHeroSlide(slideIndex);
        return;
      }
      card.classList.toggle('is-flipped');
      if (!card.classList.contains('is-flipped')) resetHeroCardScroll(card);
    });
  });

  updateHeroCarousel();
}
