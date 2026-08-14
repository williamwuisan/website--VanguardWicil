const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
  search: document.getElementById('view-search'),
  glossary: document.getElementById('view-glossary'),
  game: document.getElementById('view-game'),
  'og-story': document.getElementById('view-og-story'),
  compare: document.getElementById('view-compare'),
};

const HIDDEN_DECK_IDS = ['og-knight-deck'];

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
  if (typeof stopSpeaking === 'function') stopSpeaking();
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
  if (name === 'game' && typeof startMemoryGame === 'function') {
    startMemoryGame();
  }
  if (name === 'compare' && typeof renderComparison === 'function') {
    renderComparison();
  }
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.nav;
    if (target === 'home' || target === 'decks' || target === 'search' || target === 'glossary' || target === 'game' || target === 'og-story' || target === 'compare') showView(target);
    closeDrawer();
  });
});

const ogStoryEnterBtn = document.getElementById('ogStoryEnterBtn');
if (ogStoryEnterBtn) {
  ogStoryEnterBtn.addEventListener('click', () => showDeckDetail('og-knight-deck'));
}

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

/* ===== Scroll-to-top button ===== */
const scrollTopBtn = document.getElementById('scrollTopBtn');
function updateScrollTopBtn() {
  scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
}
window.addEventListener('scroll', updateScrollTopBtn, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
updateScrollTopBtn();

function getClans() {
  const clans = [];
  DECKS.filter(d => !HIDDEN_DECK_IDS.includes(d.id)).forEach(deck => {
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

  const filtered = DECKS.filter(deck => !HIDDEN_DECK_IDS.includes(deck.id) && (deck.clan || 'Lainnya') === selectedClan);

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

const SPEECH_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;

function renderCardItem(card, i = 0) {
  return `
    <div class="card-item reveal" data-card-name="${card.name}" style="transition-delay:${Math.min(i, 8) * 0.05}s">
      ${card.image ? `<div class="card-item__image-wrap"><img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy"></div>` : ''}
      <div class="card-item__body">
        ${SPEECH_SUPPORTED ? `<button class="card-item__speak" data-speak aria-label="Read effect aloud"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>` : ''}
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
  wireCardSpeak(list);
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

const DECK_ACCENTS = {
  'chronojet-deck': '#3b82f6',
  'nightrose-deck': '#2b3a8f',
  'heartluru-deck': '#db2777',
  'jewel-knight-deck': '#ca8a04',
  'silver-thorn-deck': '#7c3aed',
  'og-knight-deck': '#06b6d4',
  'harri-premium-deck': '#ec4899',
};

/* ===== Themed FX: per-deck atmosphere on the detail page ===== */
const THEMED_DECKS = {
  'harri-premium-deck': 'circus',
  'nightrose-deck': 'ghostship',
};
const FESTIVE_COLORS = ['#ff6fae', '#ffd23f', '#4fd8ff', '#b46eff', '#5eead4', '#ff8a3d'];

function buildCircusFx() {
  let html = '';

  // Big-top tent canopy background (replaces the starfield behind this deck)
  html += `<div class="festive-bigtop-bg"></div>`;

  // String lights following the canopy seams
  const lightArcs = [
    { top: 11, count: 11, amp: 5 },
    { top: 16, count: 13, amp: 6 },
    { top: 21, count: 15, amp: 7 },
  ];
  lightArcs.forEach((arc, arcIndex) => {
    for (let i = 0; i < arc.count; i++) {
      const t = i / (arc.count - 1);
      const left = (2 + t * 96).toFixed(2);
      const top = (arc.top + Math.sin(t * Math.PI) * arc.amp).toFixed(2);
      const duration = (1.6 + Math.random() * 1.8).toFixed(2);
      const delay = (Math.random() * -4).toFixed(2);
      html += `<span class="festive-light" style="left:${left}%; top:${top}%; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
    }
  });

  // Big-top curtains framing the stage, trimmed with hanging tassels
  const tasselPeaks = [7, 15, 23, 31, 39, 47, 55, 63, 71, 79, 87, 95];
  const leftTassels = tasselPeaks.map((top) => {
    const duration = (2.2 + Math.random() * 1.4).toFixed(2);
    const delay = (Math.random() * -4).toFixed(2);
    return `<span class="festive-tassel" style="top:${top}%; right:20%; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }).join('');
  const rightTassels = tasselPeaks.map((top) => {
    const duration = (2.2 + Math.random() * 1.4).toFixed(2);
    const delay = (Math.random() * -4).toFixed(2);
    return `<span class="festive-tassel" style="top:${top}%; left:20%; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }).join('');
  html += `<div class="festive-curtain festive-curtain--left">${leftTassels}</div>`;
  html += `<div class="festive-curtain festive-curtain--right">${rightTassels}</div>`;

  // Bunting flag garland strung across the top
  html += `<div class="festive-bunting-line"></div>`;
  const flagCount = 16;
  for (let i = 0; i < flagCount; i++) {
    const left = (6 + (i / (flagCount - 1)) * 88).toFixed(2);
    const color = FESTIVE_COLORS[i % FESTIVE_COLORS.length];
    const duration = (2.6 + Math.random() * 1.6).toFixed(2);
    const delay = (Math.random() * -4).toFixed(2);
    html += `<span class="festive-flag" style="left:${left}%; background:${color}; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }

  // Spotlight beams sweeping like a stage show
  const spotlightSpots = [12, 38, 64, 88];
  spotlightSpots.forEach((leftPct, i) => {
    const color = FESTIVE_COLORS[i % FESTIVE_COLORS.length];
    const duration = (4.5 + Math.random() * 3).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    html += `<div class="festive-spotlight" style="left:${leftPct}%; background:linear-gradient(180deg, ${color}, transparent 75%); animation-duration:${duration}s; animation-delay:${delay}s;"></div>`;
  });

  // Falling confetti
  for (let i = 0; i < 55; i++) {
    const left = (Math.random() * 100).toFixed(2);
    const size = (5 + Math.random() * 6).toFixed(1);
    const color = FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
    const duration = (4 + Math.random() * 5).toFixed(2);
    const delay = (Math.random() * -9).toFixed(2);
    const drift = Math.round(Math.random() * 160 - 80);
    const spin = Math.round(360 + Math.random() * 540);
    const shape = Math.random() < 0.5 ? '2px' : '50%';
    html += `<span class="festive-confetti" style="left:${left}%; width:${size}px; height:${size}px; background:${color}; border-radius:${shape}; animation-duration:${duration}s; animation-delay:${delay}s; --drift:${drift}px; --spin:${spin}deg;"></span>`;
  }

  // Floating balloons
  for (let i = 0; i < 9; i++) {
    const left = (Math.random() * 96).toFixed(2);
    const size = (26 + Math.random() * 16).toFixed(1);
    const color = FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
    const duration = (10 + Math.random() * 8).toFixed(2);
    const delay = (Math.random() * -18).toFixed(2);
    const drift = Math.round(Math.random() * 80 - 40);
    html += `<span class="festive-balloon" style="left:${left}%; width:${size}px; height:${(size * 1.2).toFixed(1)}px; background:${color}; animation-duration:${duration}s; animation-delay:${delay}s; --drift:${drift}px;"></span>`;
  }

  // Twinkling sparkles
  for (let i = 0; i < 24; i++) {
    const top = (Math.random() * 100).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const size = (6 + Math.random() * 8).toFixed(1);
    const color = FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
    const duration = (2.4 + Math.random() * 2.6).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    html += `<span class="festive-sparkle" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; background:${color}; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }

  return html;
}

function buildGhostShipFx() {
  let html = '';

  // The real painted cabin artwork (converted from the owner's EPS) as the base background
  html += `<div class="ghostship-bg"></div>`;

  // Soft glow behind the moon that's already painted into the artwork
  html += `<div class="ghostship-vessel"></div>`;

  // Drifting fog banks, low across the room, for a gloomier haunted feel
  const mistBands = [
    { top: 58, height: 90, duration: 32 },
    { top: 72, height: 110, duration: 40 },
    { top: 84, height: 90, duration: 36 },
  ];
  mistBands.forEach((m) => {
    const delay = (Math.random() * -20).toFixed(2);
    html += `<div class="ghostship-mist" style="top:${m.top}%; height:${m.height}px; animation-duration:${m.duration}s; animation-delay:${delay}s;"></div>`;
  });

  // Stars glimpsed through the window (positioned over the window area of the artwork)
  for (let i = 0; i < 14; i++) {
    const top = (4 + Math.random() * 26).toFixed(2);
    const left = (16 + Math.random() * 50).toFixed(2);
    const size = (1 + Math.random() * 1.4).toFixed(2);
    const duration = (2.6 + Math.random() * 3).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    html += `<span class="ghostship-star" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }

  // Lantern glow, positioned over the lantern already painted above the desk
  html += `<span class="ghostship-lantern" style="left:49%; top:5%; height:34px; animation-duration:3.4s;"></span>`;

  // Bats flitting past the window
  for (let i = 0; i < 2; i++) {
    const top = (8 + Math.random() * 10).toFixed(2);
    const left = (24 + Math.random() * 14).toFixed(2);
    const duration = (13 + Math.random() * 7).toFixed(2);
    const delay = (Math.random() * -12).toFixed(2);
    const flyX = Math.round(120 + Math.random() * 80);
    const flyY = Math.round(-16 - Math.random() * 20);
    const flyX2 = Math.round(flyX * 2);
    const flyY2 = Math.round(flyY * -0.4);
    html += `<span class="ghostship-bat" style="top:${top}%; left:${left}%; animation-duration:${duration}s; animation-delay:${delay}s; --fly-x:${flyX}px; --fly-y:${flyY}px; --fly-x2:${flyX2}px; --fly-y2:${flyY2}px;"></span>`;
  }

  // Fireflies / dust motes wandering all through the room
  for (let i = 0; i < 46; i++) {
    const left = (4 + Math.random() * 92).toFixed(2);
    const top = (5 + Math.random() * 88).toFixed(2);
    const size = (2 + Math.random() * 3.4).toFixed(1);
    const duration = (2.6 + Math.random() * 3.2).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    const wx = Math.round(Math.random() * 40 - 20);
    const wy = Math.round(-10 - Math.random() * 20);
    const wx2 = Math.round(Math.random() * 40 - 20);
    const wy2 = Math.round(-24 - Math.random() * 26);
    const cls = Math.random() < 0.35 ? 'ghostship-wisp ghostship-wisp--gold' : 'ghostship-wisp';
    html += `<span class="${cls}" style="left:${left}%; top:${top}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s; --wx:${wx}px; --wy:${wy}px; --wx2:${wx2}px; --wy2:${wy2}px;"></span>`;
  }

  return html;
}

function buildThemedFx(theme) {
  const container = document.getElementById('festiveFx');
  if (!container || container.dataset.builtTheme === theme) return;
  container.dataset.builtTheme = theme;
  container.innerHTML = '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (theme === 'circus') container.innerHTML = buildCircusFx();
  else if (theme === 'ghostship') container.innerHTML = buildGhostShipFx();
}

function applyThemedFx(deckId) {
  const container = document.getElementById('festiveFx');
  const title = document.getElementById('detailDeckName');
  if (!container) return;
  const theme = THEMED_DECKS[deckId];
  if (theme) {
    buildThemedFx(theme);
    container.className = 'festive-fx is-active theme-' + theme;
    if (title) {
      title.classList.remove('is-festive', 'is-ghostship');
      title.classList.add(theme === 'circus' ? 'is-festive' : 'is-ghostship');
    }
  } else {
    container.className = 'festive-fx';
    if (title) title.classList.remove('is-festive', 'is-ghostship');
  }
}

function showDeckDetail(deckId, opts = {}) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  currentDeck = deck;
  const detailView = document.getElementById('view-detail');
  const accent = DECK_ACCENTS[deck.id];
  if (accent) detailView.style.setProperty('--deck-accent', accent);
  else detailView.style.removeProperty('--deck-accent');

  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards`;
  renderDeckStats(deck);
  applyThemedFx(deck.id);

  const backBtn = document.getElementById('detailBackBtn');
  if (HIDDEN_DECK_IDS.includes(deck.id)) {
    backBtn.dataset.nav = 'home';
    backBtn.textContent = '← Back to Home';
  } else {
    backBtn.dataset.nav = 'decks';
    backBtn.textContent = '← Back to Decklist';
  }

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

function showToast(message) {
  const toast = document.getElementById('shareToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function getDeckShareUrl(deck) {
  return `${location.origin}${location.pathname}#deck=${encodeURIComponent(deck.id)}`;
}

const shareDeckBtn = document.getElementById('shareDeckBtn');
if (shareDeckBtn) {
  shareDeckBtn.addEventListener('click', async () => {
    if (!currentDeck) return;
    const url = getDeckShareUrl(currentDeck);
    const shareData = {
      title: `WicilTCG — ${currentDeck.name}`,
      text: `Check out the "${currentDeck.name}" deck on WicilTCG!`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err && err.name !== 'AbortError') showToast('Could not share');
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link copied!');
      } catch (err) {
        showToast('Could not copy link');
      }
    } else {
      showToast('Sharing not supported on this browser');
    }
  });
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getCardThumb(src, targetWidth = 160) {
  try {
    const img = await loadImageElement(src);
    const ratio = img.naturalHeight / img.naturalWidth;
    const w = targetWidth;
    const h = Math.round(targetWidth * ratio);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    return { dataUrl: canvas.toDataURL('image/jpeg', 0.8), ratio };
  } catch (err) {
    return null;
  }
}

function drawPdfSpaceBackground(doc, pageWidth, pageHeight) {
  doc.setFillColor(9, 7, 16);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  const blobs = [
    { x: pageWidth * 0.06, y: pageHeight * 0.05, r: 150, color: [255, 91, 26], opacity: 0.14 },
    { x: pageWidth * 0.98, y: pageHeight * 0.95, r: 190, color: [124, 58, 237], opacity: 0.14 },
    { x: pageWidth * 0.9, y: pageHeight * 0.2, r: 120, color: [43, 58, 143], opacity: 0.12 },
  ];
  blobs.forEach(b => {
    try {
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: b.opacity }));
      doc.setFillColor(b.color[0], b.color[1], b.color[2]);
      doc.circle(b.x, b.y, b.r, 'F');
      doc.restoreGraphicsState();
    } catch (err) {}
  });

  try {
    doc.saveGraphicsState();
    for (let i = 0; i < 90; i++) {
      doc.setGState(new doc.GState({ opacity: 0.25 + Math.random() * 0.55 }));
      doc.setFillColor(255, 255, 255);
      doc.circle(Math.random() * pageWidth, Math.random() * pageHeight, 0.3 + Math.random() * 0.7, 'F');
    }
    doc.restoreGraphicsState();
  } catch (err) {}
}

async function buildDeckPdf(deck) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;
  const thumbW = 46;
  const thumbGap = 12;
  const textX = margin + thumbW + thumbGap;
  const textWidth = contentWidth - thumbW - thumbGap;
  let y = margin;
  let page = 1;

  drawPdfSpaceBackground(doc, pageWidth, pageHeight);

  const uniqueSrcs = [...new Set(deck.cards.map(c => c.image).filter(Boolean))];
  const thumbEntries = await Promise.all(uniqueSrcs.map(src => getCardThumb(src).then(t => [src, t])));
  const thumbCache = new Map(thumbEntries);

  function addFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(170, 176, 186);
    doc.text('Generated by WicilTCG', margin, pageHeight - 24);
    doc.text(String(page), pageWidth - margin, pageHeight - 24, { align: 'right' });
  }

  function ensureSpace(needed) {
    if (y + needed > pageHeight - 50) {
      addFooter();
      doc.addPage();
      drawPdfSpaceBackground(doc, pageWidth, pageHeight);
      page += 1;
      y = margin;
    }
  }

  function cleanText(text) {
    return String(text || '').replace(/・/g, '- ');
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(238, 242, 245);
  doc.text(deck.name, margin, y);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(139, 149, 163);
  doc.text(`${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards`, margin, y);
  y += 10;
  doc.setDrawColor(90, 98, 112);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  const hasSections = deck.cards.some(c => c.section);
  const sections = hasSections
    ? SECTION_ORDER.filter(name => deck.cards.some(c => c.section === name))
        .concat(deck.cards.map(c => c.section).filter(s => s && !SECTION_ORDER.includes(s)))
    : [null];

  sections.forEach(section => {
    const cards = section ? deck.cards.filter(c => c.section === section) : deck.cards;
    if (!cards.length) return;

    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 91, 26);
    doc.text(section ? `${section} (${cards.length})` : `Cards (${cards.length})`, margin, y);
    y += 18;

    cards.forEach(card => {
      const thumb = card.image ? thumbCache.get(card.image) : null;
      const thumbH = thumb ? Math.round(thumbW * thumb.ratio) : 0;

      const nameLine = `${card.name}${card.grade ? '  —  ' + card.grade : ''}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      const nameLines = doc.splitTextToSize(cleanText(nameLine), textWidth);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const effectLines = doc.splitTextToSize(cleanText(card.effect), textWidth);

      const textBlockHeight = nameLines.length * 13 + effectLines.length * 11.5 + 2;
      const blockHeight = Math.max(textBlockHeight, thumbH) + 12;
      ensureSpace(blockHeight);

      const blockTop = y;

      if (thumb) {
        try { doc.addImage(thumb.dataUrl, 'JPEG', margin, blockTop - 9, thumbW, thumbH); } catch (err) {}
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(238, 242, 245);
      doc.text(nameLines, textX, y);
      y += nameLines.length * 13 + 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(160, 168, 180);
      doc.text(effectLines, textX, y);
      y += effectLines.length * 11.5;

      y = Math.max(y, blockTop - 9 + thumbH) + 10;
    });

    y += 6;
  });

  addFooter();
  return doc;
}

const exportPdfBtn = document.getElementById('exportPdfBtn');
if (exportPdfBtn) {
  exportPdfBtn.addEventListener('click', async () => {
    if (!currentDeck || !window.jspdf) {
      showToast('PDF export not available');
      return;
    }
    exportPdfBtn.classList.add('is-busy');
    showToast('Generating PDF…');
    try {
      const doc = await buildDeckPdf(currentDeck);
      const filename = `${currentDeck.name.replace(/[^a-z0-9]+/gi, '-')}.pdf`;
      const blob = doc.output('blob');
      const file = new File([blob], filename, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: `WicilTCG — ${currentDeck.name}` });
        } catch (err) {
          if (err && err.name !== 'AbortError') doc.save(filename);
        }
      } else {
        doc.save(filename);
        showToast('PDF downloaded');
      }
    } catch (err) {
      showToast('Could not generate PDF');
    } finally {
      exportPdfBtn.classList.remove('is-busy');
    }
  });
}

const GRADE_ORDER = ['G0', 'G1', 'G2', 'G3', 'G (Stride/G unit)'];
const GRADE_LABELS = { 'G0': 'G0', 'G1': 'G1', 'G2': 'G2', 'G3': 'G3', 'G (Stride/G unit)': 'Stride' };
const GRADE_COLORS = { 'G0': '#ffd9b8', 'G1': '#ffb073', 'G2': '#ff8a3d', 'G3': '#ff5b1a', 'G (Stride/G unit)': '#b3390f' };

function getStatsHTML(deck) {
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

  return `
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

function renderDeckStats(deck) {
  document.getElementById('deckStats').innerHTML = getStatsHTML(deck);
}

/* ===== Compare Decks ===== */
const comparePickA = document.getElementById('comparePickA');
const comparePickB = document.getElementById('comparePickB');

function populateComparePickers() {
  if (!comparePickA || !comparePickB) return;
  const options = DECKS.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
  comparePickA.innerHTML = options;
  comparePickB.innerHTML = options;
  if (DECKS.length > 1) {
    comparePickA.value = DECKS[0].id;
    comparePickB.value = DECKS[1].id;
  }
}

function getComparePanelHTML(deck) {
  const accent = DECK_ACCENTS[deck.id] || 'var(--orange)';
  const sectionCounts = {};
  deck.cards.forEach(c => {
    const s = c.section || 'Cards';
    sectionCounts[s] = (sectionCounts[s] || 0) + 1;
  });
  const sections = Object.keys(sectionCounts).sort((a, b) => {
    const ai = SECTION_ORDER.indexOf(a);
    const bi = SECTION_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return `
    <div class="compare-panel" style="--panel-accent: ${accent}">
      <div class="compare-panel__name">${deck.name}</div>
      <div class="compare-panel__clan">${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards</div>
      ${getStatsHTML(deck)}
      <div class="compare-panel__sections">
        ${sections.map(s => `
          <div class="compare-panel__section-row">
            <span>${s}</span>
            <strong>${sectionCounts[s]}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderComparison() {
  const results = document.getElementById('compareResults');
  if (!results) return;

  if (DECKS.length < 2) {
    results.innerHTML = `<div class="compare-empty">Need at least two decks to compare.</div>`;
    return;
  }

  if (!comparePickA.value || !comparePickB.value) populateComparePickers();

  const deckA = DECKS.find(d => d.id === comparePickA.value);
  const deckB = DECKS.find(d => d.id === comparePickB.value);
  if (!deckA || !deckB) return;

  results.innerHTML = getComparePanelHTML(deckA) + getComparePanelHTML(deckB);
}

if (comparePickA && comparePickB) {
  populateComparePickers();
  comparePickA.addEventListener('change', renderComparison);
  comparePickB.addEventListener('change', renderComparison);
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

function getShowcaseCards(deck) {
  const rideLine = deck.cards.filter(c => c.section === 'Ride Line');
  if (rideLine.length) return rideLine;
  return deck.cards.slice(0, 5);
}

const dailyFanObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-revealed', entry.isIntersecting);
  });
}, { threshold: 0.35 });

function renderDailyCardFan(deck) {
  const fan = document.getElementById('dailyCardFan');
  fan.classList.remove('is-revealed');
  const showcase = getShowcaseCards(deck);
  fan.innerHTML = showcase.map((card, i) => {
    if (!card.image) return '';
    const opacity = Math.max(0.08, 1 - i * 0.22).toFixed(2);
    return `<img class="daily-card__fan-item" src="${card.image}" alt="${card.name}" style="--target-opacity:${opacity}; z-index:${showcase.length - i}; transition-delay:${i * 90}ms;" loading="lazy">`;
  }).join('');
  dailyFanObserver.observe(fan);
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

  renderDailyCardFan(pick.deck);
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

/* ===== Text-to-speech ===== */
let speakingBtn = null;

function stopSpeaking() {
  if (!SPEECH_SUPPORTED) return;
  window.speechSynthesis.cancel();
  if (speakingBtn) speakingBtn.classList.remove('is-speaking');
  speakingBtn = null;
}

function wireCardSpeak(container) {
  if (!SPEECH_SUPPORTED) return;
  container.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasSpeaking = btn === speakingBtn;
      stopSpeaking();
      if (wasSpeaking) return;

      const item = btn.closest('.card-item');
      const name = item.dataset.cardName;
      const effect = item.querySelector('.card-item__effect').textContent;
      const utter = new SpeechSynthesisUtterance(`${name}. ${effect}`);
      utter.rate = 0.95;
      utter.onend = utter.onerror = () => {
        btn.classList.remove('is-speaking');
        if (speakingBtn === btn) speakingBtn = null;
      };
      speakingBtn = btn;
      btn.classList.add('is-speaking');
      window.speechSynthesis.speak(utter);
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

/* ===== Onboarding tour ===== */
const TOUR_STEPS = [
  {
    title: 'Welcome to WicilTCG 👋',
    body: "This is Wicil's personal Cardfight!! Vanguard reference — every card here already has its skill translated into English.",
  },
  {
    target: '#headerSearchBtn',
    title: 'Search anything, fast',
    body: 'Tap here — or press "/" on a keyboard — to search every card by name, English or Japanese, without opening a deck first.',
  },
  {
    target: '#menuToggle',
    title: 'Everything else lives here',
    body: 'Decklist, Search, the Glossary, and the dark mode switch are all one tap away in this menu.',
  },
  {
    target: '.btn--primary[data-nav="decks"]',
    title: 'Browse the decks',
    body: "Every deck is grouped by nation, then by card — grade, skill text, all of it, right where you'd expect.",
  },
  {
    target: '#dailyCardImage',
    title: 'A random pull, every visit',
    body: 'This card changes every time you open the site — just for a bit of nostalgia.',
  },
  {
    title: "That's it!",
    body: 'Have fun digging through the collection. You can replay this tour anytime from the menu.',
  },
];

let tourStepIndex = 0;
let tourSpotlightEl = null;
const tourBackdrop = document.getElementById('tourBackdrop');
const tourTooltip = document.getElementById('tourTooltip');
const tourStepCount = document.getElementById('tourStepCount');
const tourTitle = document.getElementById('tourTitle');
const tourBody = document.getElementById('tourBody');
const tourNext = document.getElementById('tourNext');
const tourSkip = document.getElementById('tourSkip');
const replayTourBtn = document.getElementById('replayTourBtn');

function clearTourSpotlight() {
  if (tourSpotlightEl) {
    tourSpotlightEl.classList.remove('tour-spotlight');
    tourSpotlightEl = null;
  }
}

function positionTourTooltip(target) {
  if (!target) {
    tourTooltip.classList.add('tour-tooltip--center');
    return;
  }
  tourTooltip.classList.remove('tour-tooltip--center');
  const rect = target.getBoundingClientRect();
  const tw = tourTooltip.offsetWidth;
  const th = tourTooltip.offsetHeight;
  const margin = 16;
  let top = rect.bottom + margin;
  if (top + th > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - th - margin);
  }
  let left = rect.left + rect.width / 2 - tw / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));
  tourTooltip.style.top = `${top}px`;
  tourTooltip.style.left = `${left}px`;
}

function showTourStep(index) {
  clearTourSpotlight();
  const step = TOUR_STEPS[index];
  tourStepIndex = index;

  tourStepCount.textContent = `Step ${index + 1} of ${TOUR_STEPS.length}`;
  tourTitle.textContent = step.title;
  tourBody.textContent = step.body;
  tourNext.innerHTML = index === TOUR_STEPS.length - 1 ? 'Done' : 'Next<span class="btn__arrow">→</span>';

  const target = step.target ? document.querySelector(step.target) : null;
  if (target) {
    target.classList.add('tour-spotlight');
    tourSpotlightEl = target;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  positionTourTooltip(target);
  tourTooltip.classList.add('is-open');
}

function startTour() {
  closeDrawer();
  closeLightbox();
  closeSearchOverlay();
  showView('home');
  try { localStorage.setItem('wiciltcg-tour-seen', 'true'); } catch (e) {}
  tourBackdrop.classList.add('is-open');
  showTourStep(0);
}

function endTour() {
  clearTourSpotlight();
  tourBackdrop.classList.remove('is-open');
  tourTooltip.classList.remove('is-open');
}

tourNext.addEventListener('click', () => {
  if (tourStepIndex >= TOUR_STEPS.length - 1) {
    endTour();
  } else {
    showTourStep(tourStepIndex + 1);
  }
});
tourSkip.addEventListener('click', endTour);
tourBackdrop.addEventListener('click', endTour);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tourBackdrop.classList.contains('is-open')) endTour();
});
replayTourBtn.addEventListener('click', startTour);

window.addEventListener('resize', () => {
  if (tourTooltip.classList.contains('is-open')) {
    const step = TOUR_STEPS[tourStepIndex];
    positionTourTooltip(step.target ? document.querySelector(step.target) : null);
  }
});

try {
  if (!localStorage.getItem('wiciltcg-tour-seen') && !location.hash.startsWith('#deck=')) {
    setTimeout(startTour, 900);
  }
} catch (e) {}

/* ===== First-load splash ===== */
(function() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => splash.classList.add('is-hidden'), prefersReducedMotion ? 200 : 1700);
})();

/* ===== Ambient homepage particles ===== */
(function() {
  const container = document.getElementById('homeParticles');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = 24;
  let html = '';
  for (let i = 0; i < count; i++) {
    const left = (Math.random() * 100).toFixed(1);
    const size = (2 + Math.random() * 3).toFixed(1);
    const duration = (10 + Math.random() * 14).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    const drift = Math.round(Math.random() * 60 - 30);
    html += `<span class="particle" style="left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s; --drift:${drift}px;"></span>`;
  }
  container.innerHTML = html;
})();

/* ===== Cosmic hero background: starfield + comets ===== */
(function() {
  const starsContainer = document.getElementById('cosmicStars');
  const cometsContainer = document.getElementById('cosmicComets');
  if (!starsContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const starCount = 90;
  let starsHtml = '';
  for (let i = 0; i < starCount; i++) {
    const top = (Math.random() * 100).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const size = (Math.random() * 1.8 + 0.6).toFixed(2);
    const duration = (2.2 + Math.random() * 4).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    const maxOpacity = (0.5 + Math.random() * 0.5).toFixed(2);
    starsHtml += `<span class="cosmic-star" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s; --star-max:${maxOpacity};"></span>`;
  }

  const sparkleCount = 14;
  for (let i = 0; i < sparkleCount; i++) {
    const top = (Math.random() * 100).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const size = (7 + Math.random() * 9).toFixed(1);
    const duration = (3.5 + Math.random() * 3).toFixed(2);
    const delay = (Math.random() * -6).toFixed(2);
    starsHtml += `<span class="cosmic-sparkle" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
  }
  starsContainer.innerHTML = starsHtml;

  if (!cometsContainer) return;

  function spawnComet() {
    const comet = document.createElement('span');
    comet.className = 'cosmic-comet';
    const startTop = (Math.random() * 35).toFixed(2);
    const startLeft = (55 + Math.random() * 45).toFixed(2);
    const travelX = -(280 + Math.random() * 220);
    const travelY = 180 + Math.random() * 160;
    const duration = (1.1 + Math.random() * 0.7).toFixed(2);
    comet.style.top = `${startTop}%`;
    comet.style.left = `${startLeft}%`;
    comet.style.setProperty('--comet-x', `${travelX}px`);
    comet.style.setProperty('--comet-y', `${travelY}px`);
    comet.style.animationDuration = `${duration}s`;
    cometsContainer.appendChild(comet);
    setTimeout(() => comet.remove(), duration * 1000 + 150);
  }

  function scheduleComet() {
    spawnComet();
    setTimeout(scheduleComet, 2600 + Math.random() * 4400);
  }
  setTimeout(scheduleComet, 1200);

  /* ===== Constellations: cycling connect-the-dot star patterns ===== */
  const constellationGroup = document.getElementById('cosmicConstellation');
  const constellationLines = constellationGroup ? constellationGroup.querySelector('.cosmic-constellation__lines') : null;
  const constellationStars = document.getElementById('cosmicConstellationStars');
  if (constellationGroup && constellationLines && constellationStars) {
    const CONSTELLATION_SHAPES = [
      { stars: [[0, 4], [6, 1], [11, 3], [16, 0]], edges: [[0, 1], [1, 2], [2, 3]] },
      { stars: [[0, 2], [5, 8], [10, 12], [15, 7], [20, 2], [8, 16]], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5]] },
      { stars: [[2, 0], [2, 6], [3, 12], [1, 17], [9, 0], [9, 6], [10, 12], [8, 17]], edges: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [0, 4]] },
      { stars: [[0, 10], [3, 4], [8, 0], [13, 2], [15, 8], [20, 10]], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]] },
      { stars: [[0, 2], [4, 0], [8, 2], [12, 6], [15, 11], [16, 16], [13, 19], [9, 18]], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]] },
      { stars: [[0, 8], [4, 4], [9, 0], [14, 3], [16, 9], [11, 12], [6, 10]], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]] },
      { stars: [[8, 0], [0, 7], [4, 16], [16, 14], [14, 4]], edges: [[0, 4], [4, 3], [3, 2], [2, 1], [1, 0]] },
      { stars: [[0, 0], [3, 4], [0, 7], [20, 14], [23, 18], [20, 21]], edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [1, 4]] },
      { stars: [[0, 10], [6, 4], [12, 0], [12, 10], [18, 14]], edges: [[0, 1], [1, 2], [1, 3], [3, 4]] },
      { stars: [[0, 4], [5, 0], [11, 2], [16, 8], [10, 10], [4, 9]], edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
    ];

    function buildConstellationMarkup(shape, scale, side) {
      const xs = shape.stars.map(p => p[0]);
      const ys = shape.stars.map(p => p[1]);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const w = (Math.max(...xs) - minX) * scale;
      const h = (Math.max(...ys) - minY) * scale;
      const band = Math.max(4, 22 - w);
      const offsetX = side === 'left' ? (2 + Math.random() * band) : (98 - w - Math.random() * band);
      const offsetY = 8 + Math.random() * Math.max(4, 84 - h);
      const pts = shape.stars.map(([x, y]) => [
        offsetX + (x - minX) * scale,
        offsetY + (y - minY) * scale,
      ]);

      let linesHtml = '';
      shape.edges.forEach(([a, b]) => {
        linesHtml += `<line class="cosmic-constellation__line" x1="${pts[a][0].toFixed(2)}" y1="${pts[a][1].toFixed(2)}" x2="${pts[b][0].toFixed(2)}" y2="${pts[b][1].toFixed(2)}"></line>`;
      });

      let starsHtml = '';
      pts.forEach(([x, y]) => {
        const size = (4 + Math.random() * 4).toFixed(1);
        const duration = (2 + Math.random() * 2.4).toFixed(2);
        const delay = (Math.random() * -4).toFixed(2);
        starsHtml += `<span class="cosmic-constellation-star" style="left:${x.toFixed(2)}%; top:${y.toFixed(2)}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
      });

      return { linesHtml, starsHtml };
    }

    function pickShapeIndex(exclude) {
      let idx;
      do { idx = Math.floor(Math.random() * CONSTELLATION_SHAPES.length); } while (idx === exclude && CONSTELLATION_SHAPES.length > 1);
      return idx;
    }

    let lastLeftIndex = -1;
    let lastRightIndex = -1;
    function swapConstellation() {
      lastLeftIndex = pickShapeIndex(lastLeftIndex);
      lastRightIndex = pickShapeIndex(lastRightIndex);
      const left = buildConstellationMarkup(CONSTELLATION_SHAPES[lastLeftIndex], 0.5 + Math.random() * 0.35, 'left');
      const right = buildConstellationMarkup(CONSTELLATION_SHAPES[lastRightIndex], 0.5 + Math.random() * 0.35, 'right');
      constellationLines.innerHTML = left.linesHtml + right.linesHtml;
      constellationStars.innerHTML = left.starsHtml + right.starsHtml;
      requestAnimationFrame(() => constellationGroup.classList.add('is-visible'));
    }
    function nextConstellation() {
      constellationGroup.classList.remove('is-visible');
      setTimeout(swapConstellation, 1700);
    }
    swapConstellation();
    setInterval(nextConstellation, 16000);
  }
})();

const initialClans = getClans();
selectedClan = initialClans[0] || null;
renderClanTabs();
renderDeckGrid();
renderStats();
renderDailyCard();
observeRevealAll();

/* ===== Deep link: #deck=<id> opens a deck detail directly ===== */
(function() {
  const match = location.hash.match(/^#deck=(.+)$/);
  if (!match) return;
  const deckId = decodeURIComponent(match[1]);
  if (DECKS.some(d => d.id === deckId)) showDeckDetail(deckId);
})();

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

/* ===== Idle wallpaper ===== */
const IDLE_CARDS = [
  { name: 'Blaster Dark', clan: 'Shadow Paladin', image: 'assets/idle/blaster-dark.webp', color: '#8b5cf6', bgDark: '#150a29' },
  { name: 'Silver Thorn Dragon Tamer, Luquier', clan: 'Pale Moon', image: 'assets/idle/luquier.webp', color: '#14b8a6', bgDark: '#041613' },
  { name: 'Pure Heart Jewel Knight, Ashlei', clan: 'Royal Paladin', image: 'assets/idle/ashlei.webp', color: '#38bdf8', bgDark: '#071a2b' },
  { name: 'Chronojet Dragon', clan: 'Gear Chronicle', image: 'assets/idle/chronojet-dragon.webp', color: '#3b82f6', bgDark: '#05122b' },
  { name: 'Masked Magician, Harri', clan: 'Pale Moon', image: 'assets/idle/harri.webp', color: '#a855f7', bgDark: '#1c0a2b' },
  { name: 'Blue Sky Knight, Altmile', clan: 'Royal Paladin', image: 'assets/idle/altmile.webp', color: '#06b6d4', bgDark: '#04191d' },
  { name: 'Ranunculus Flower Maiden, Ahsha', clan: 'Neo Nectar', image: 'assets/idle/ahsha.webp', color: '#22c55e', bgDark: '#06180d' },
  { name: 'Vampire Princess of Night Fog, Nightrose', clan: 'Granblue', image: 'assets/idle/nightrose.webp', color: '#2b3a8f', bgDark: '#0a0f24' },
  { name: 'Blaster Blade', clan: 'Royal Paladin', image: 'assets/idle/blaster-blade.webp', color: '#60a5fa', bgDark: '#0a1730' },
  { name: 'Dragonic Overlord', clan: 'Kagero', image: 'assets/idle/dragonic-overlord.png', color: '#ef4444', bgDark: '#240707' },
];

const IDLE_DELAY = 60000;
const IDLE_CARD_DURATION = 4000;

const idleOverlay = document.getElementById('idleOverlay');
const idleCardImage = document.getElementById('idleCardImage');
const idleCardName = document.getElementById('idleCardName');
const idleCardClan = document.getElementById('idleCardClan');

let idleTimer = null;
let idleCycleInterval = null;
let idleCardIndex = 0;

function showIdleCard(index, immediate) {
  const card = IDLE_CARDS[index];

  const swapIn = () => {
    idleCardImage.src = card.image;
    idleCardImage.alt = card.name;
    idleCardName.textContent = card.name;
    idleCardClan.textContent = card.clan;
    idleOverlay.style.setProperty('--idle-color', card.color);
    idleOverlay.style.setProperty('--idle-bg-dark', card.bgDark);
    // Double rAF: guarantees the browser commits the opacity:0 state
    // in one frame before the is-visible transition starts in the next.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => idleCardImage.classList.add('is-visible'));
    });
  };

  if (immediate) {
    // First card on entering idle: show it right away, no fade-out to wait on.
    swapIn();
  } else {
    // Cycling to the next card: wait for the current one to fully fade out,
    // then preload the next image so the src swap is instant (no pop/flash).
    idleCardImage.classList.remove('is-visible');
    setTimeout(() => {
      const preload = new Image();
      preload.onload = swapIn;
      preload.onerror = swapIn;
      preload.src = card.image;
    }, 700);
  }
}

function enterIdle() {
  clearInterval(idleCycleInterval);
  idleCardIndex = 0;
  showIdleCard(idleCardIndex, true);
  idleOverlay.classList.add('is-active');
  idleCycleInterval = setInterval(() => {
    idleCardIndex = (idleCardIndex + 1) % IDLE_CARDS.length;
    showIdleCard(idleCardIndex, false);
  }, IDLE_CARD_DURATION);
}

function exitIdle() {
  if (!idleOverlay.classList.contains('is-active')) return;
  idleOverlay.classList.remove('is-active');
  clearInterval(idleCycleInterval);
  resetIdleTimer();
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(enterIdle, IDLE_DELAY);
}

['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (idleOverlay.classList.contains('is-active')) {
      exitIdle();
    } else {
      resetIdleTimer();
    }
  }, { passive: true });
});
resetIdleTimer();

/* ===== Skill match minigame ===== */
const MEMORY_PAIR_COUNT = 8;
let memoryState = { flipped: [], matchedCount: 0, moves: 0, locked: false };

function getAllCardsWithImages() {
  const all = [];
  DECKS.forEach(deck => deck.cards.forEach(card => { if (card.image) all.push(card); }));
  return all;
}

function getCardsForSkillGame() {
  return getAllCardsWithImages().filter(card =>
    card.grade !== 'G (Stride/G unit)' &&
    card.effect &&
    card.effect.length > 15 &&
    !card.effect.includes('Terjemahan belum ditemukan')
  );
}

function getEffectSnippet(effect) {
  const lines = effect.split('\n').map(l => l.trim()).filter(Boolean);
  const isGenericReminder = (l) => /^\(.*\)$/.test(l) || /^\[[^\]]+\]\s*\(.*\)$/.test(l);
  const abilityLine = lines.find(l => /\[(AUTO|CONT|ACT)\]/.test(l) || /Trigger:/.test(l));
  const candidate = abilityLine || lines.find(l => !isGenericReminder(l)) || lines[0] || '';
  const sentence = candidate.split(/(?<=[.!?])\s/)[0] || candidate;
  return sentence.length > 110 ? sentence.slice(0, 108) + '…' : sentence;
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startMemoryGame() {
  const pool = shuffleArray(getCardsForSkillGame()).slice(0, MEMORY_PAIR_COUNT);
  const tiles = [];
  pool.forEach((card, idx) => {
    tiles.push({ uid: idx * 2, name: card.name, type: 'image', image: card.image });
    tiles.push({ uid: idx * 2 + 1, name: card.name, type: 'effect', text: getEffectSnippet(card.effect) });
  });
  const shuffled = shuffleArray(tiles);

  memoryState = { flipped: [], matchedCount: 0, moves: 0, locked: false };
  document.getElementById('memoryWinMessage').classList.remove('is-visible');
  updateMemoryMoves();
  renderMemoryBoard(shuffled);
}

function renderMemoryBoard(tiles) {
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = tiles.map(tile => `
    <button class="memory-card" data-uid="${tile.uid}" data-name="${tile.name}">
      <div class="memory-card__inner">
        <div class="memory-card__face memory-card__face--front">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="50,3 90,25 90,75 50,97 10,75 10,25" fill="none" stroke="var(--orange)" stroke-width="5"/>
            <text x="50" y="68" text-anchor="middle" font-family="'Russo One', Arial, sans-serif" font-size="46" fill="var(--orange)">W</text>
          </svg>
        </div>
        <div class="memory-card__face memory-card__face--back">
          ${tile.type === 'image'
            ? `<img src="${tile.image}" alt="${tile.name}" loading="lazy">`
            : `<p class="memory-card__effect-text">${tile.text}</p>`}
        </div>
      </div>
    </button>
  `).join('');
  grid.querySelectorAll('.memory-card').forEach(btn => btn.addEventListener('click', onMemoryCardClick));
}

function onMemoryCardClick(e) {
  const btn = e.currentTarget;
  if (memoryState.locked || btn.classList.contains('is-flipped') || btn.classList.contains('is-matched')) return;

  btn.classList.add('is-flipped');
  memoryState.flipped.push(btn);

  if (memoryState.flipped.length === 2) {
    memoryState.moves++;
    updateMemoryMoves();
    const [a, b] = memoryState.flipped;
    if (a.dataset.name === b.dataset.name) {
      a.classList.add('is-matched');
      b.classList.add('is-matched');
      memoryState.flipped = [];
      memoryState.matchedCount++;
      checkMemoryWin();
    } else {
      memoryState.locked = true;
      setTimeout(() => {
        a.classList.remove('is-flipped');
        b.classList.remove('is-flipped');
        memoryState.flipped = [];
        memoryState.locked = false;
      }, 900);
    }
  }
}

function updateMemoryMoves() {
  document.getElementById('memoryMoves').textContent = memoryState.moves;
}

function checkMemoryWin() {
  if (memoryState.matchedCount === MEMORY_PAIR_COUNT) {
    document.getElementById('memoryFinalMoves').textContent = memoryState.moves;
    document.getElementById('memoryWinMessage').classList.add('is-visible');
  }
}

document.getElementById('memoryRestart').addEventListener('click', startMemoryGame);
document.getElementById('memoryPlayAgain').addEventListener('click', startMemoryGame);
