/* ===== UTILITIES ===== */

function logoImg(store, size = 60, small = false) {
  const cls = small ? 'store-logo-sm' : 'store-logo';
  const placeholder = small ? 'store-logo-sm-placeholder' : 'store-logo-placeholder';
  if (!store) return `<div class="${placeholder}">?</div>`;
  return `<img src="${store.logo}" alt="${store.name}" class="${cls}"
    onerror="this.outerHTML='<div class=&quot;${placeholder}&quot;>${store.name.charAt(0)}</div>'"
    loading="lazy">`;
}

function formatExpiry(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ===== COUPON ROW (trending list) ===== */
function renderCouponRow(coupon) {
  const store = getStoreById(coupon.storeId);
  if (!store) return '';
  return `
    <div class="coupon-row">
      <a href="store.html?store=${store.id}" title="${store.name}">
        ${logoImg(store, 48, true)}
      </a>
      <div class="coupon-info">
        <div class="coupon-store">${store.name}</div>
        <div class="coupon-desc">${coupon.description}</div>
        <div class="coupon-tags">
          ${coupon.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
          ${coupon.exclusive ? '<span class="badge badge-exclusive">Exclusive</span>' : ''}
        </div>
      </div>
      <span class="badge badge-discount">${coupon.discount}</span>
      <button class="btn-show-code" onclick="openModal(${coupon.id})">Show Code</button>
    </div>`;
}

/* ===== STORE CARD (grid) ===== */
function renderStoreCard(store) {
  const storeCoupons = getCouponsByStore(store.id);
  const topDeal = storeCoupons[0];
  return `
    <a class="store-card" href="store.html?store=${store.id}">
      ${logoImg(store)}
      <div class="store-name">${store.name}</div>
      ${topDeal ? `<div class="store-deal">${topDeal.discount}</div>` : ''}
      ${store.cashback !== '0%' ? `<div class="store-cashback">${store.cashback} Cashback</div>` : ''}
    </a>`;
}

/* ===== COUPON CARD (grid for coupons page) ===== */
function renderCouponCard(coupon) {
  const store = getStoreById(coupon.storeId);
  if (!store) return '';
  return `
    <div class="coupon-card-full">
      <div class="coupon-card-header">
        ${logoImg(store, 36, true)}
        <a class="store-name-link" href="store.html?store=${store.id}">${store.name}</a>
        ${coupon.exclusive ? '<span class="badge badge-exclusive" style="margin-left:auto">Exclusive</span>' : ''}
      </div>
      <div class="coupon-card-body">
        <div class="coupon-card-discount">${coupon.discount}</div>
        <div class="coupon-card-desc">${coupon.description}</div>
        <button class="btn btn-primary" style="width:100%" onclick="openModal(${coupon.id})">
          ${coupon.code ? 'Show Code' : 'Get Deal'}
        </button>
      </div>
      <div class="coupon-card-footer">
        <span class="expiry">${coupon.expiry ? 'Expires ' + formatExpiry(coupon.expiry) : ''}</span>
        ${coupon.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
      </div>
    </div>`;
}

/* ===== MODAL ===== */
function openModal(couponId) {
  const coupon = COUPONS.find(c => c.id === couponId);
  if (!coupon) return;
  const store = getStoreById(coupon.storeId);

  const modal = document.getElementById('coupon-modal');
  modal.querySelector('.modal-store-name').textContent = store ? store.name : '';
  const logoEl = modal.querySelector('.modal-store-logo');
  if (store) {
    logoEl.src = store.logo;
    logoEl.alt = store.name;
    logoEl.onerror = () => { logoEl.style.display = 'none'; };
    logoEl.style.display = '';
  } else {
    logoEl.style.display = 'none';
  }

  modal.querySelector('.modal-desc').textContent = coupon.description;
  modal.querySelector('.modal-expiry').textContent = coupon.expiry ? 'Expires ' + formatExpiry(coupon.expiry) : '';

  const codeBox = modal.querySelector('.modal-code-box');
  if (coupon.code) {
    codeBox.innerHTML = `
      <div class="modal-code" id="modal-code-text">${coupon.code}</div>
      <button class="btn-copy" onclick="copyCode('${coupon.code}', this)">Copy</button>`;
  } else {
    codeBox.innerHTML = `<div class="modal-code-no-code">No code needed — deal applied automatically at checkout</div>`;
  }

  const visitBtn = modal.querySelector('#modal-visit-btn');
  if (visitBtn && store) {
    visitBtn.href = store.url;
    visitBtn.textContent = `Visit ${store.name}`;
  }

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('coupon-modal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function copyCode(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ===== NAVBAR SEARCH ===== */
function initNavSearch() {
  const input = document.getElementById('nav-search-input');
  const results = document.getElementById('nav-search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { results.classList.remove('show'); return; }

    const stores = searchStores(q).slice(0, 6);
    if (!stores.length) { results.classList.remove('show'); return; }

    results.innerHTML = stores.map(s => `
      <a class="search-result-item" href="store.html?store=${s.id}">
        <img src="${s.logo}" alt="${s.name}" onerror="this.style.display='none'">
        <div>
          <div class="result-name">${s.name}</div>
          <div class="result-cat">${s.category}</div>
        </div>
      </a>`).join('');
    results.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) results.classList.remove('show');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `coupons.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

/* ===== HOMEPAGE ===== */
function initHomePage() {
  // Best Deals (featured stores)
  const bestDealsEl = document.getElementById('best-deals-grid');
  if (bestDealsEl) {
    const featured = getFeaturedStores().slice(0, 8);
    bestDealsEl.innerHTML = featured.map(renderStoreCard).join('');
  }

  // Staff Picks (featured stores, second set)
  const staffPicksEl = document.getElementById('staff-picks-grid');
  if (staffPicksEl) {
    const picks = getFeaturedStores().slice(4, 12);
    staffPicksEl.innerHTML = picks.map(renderStoreCard).join('');
  }

  // Trending Coupons
  const trendingEl = document.getElementById('trending-coupons');
  if (trendingEl) {
    const trending = getTrendingCoupons().slice(0, 8);
    trendingEl.innerHTML = trending.map(renderCouponRow).join('');
  }

  // Popular Stores directory
  const dirEl = document.getElementById('stores-directory');
  if (dirEl) {
    const sorted = [...STORES].sort((a, b) => a.name.localeCompare(b.name));
    dirEl.innerHTML = sorted.map(s =>
      `<a class="store-link" href="store.html?store=${s.id}">${s.name}</a>`
    ).join('');
  }

  // Trending Searches
  const searchesEl = document.getElementById('trending-searches');
  if (searchesEl) {
    searchesEl.innerHTML = TRENDING_SEARCHES.map(t =>
      `<a class="chip" href="coupons.html?q=${encodeURIComponent(t)}">🔍 ${t}</a>`
    ).join('');
  }

  // FAQ
  const faqEl = document.getElementById('faq-list');
  if (faqEl) {
    faqEl.innerHTML = FAQ.map((item, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-question" onclick="toggleFaq(${i})">
          ${item.question}
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">${item.answer}</div>
      </div>`).join('');
  }
}

function toggleFaq(i) {
  const item = document.getElementById(`faq-${i}`);
  item.classList.toggle('open');
}

/* ===== STORES PAGE ===== */
function initStoresPage() {
  const grid = document.getElementById('stores-page-grid');
  const searchInput = document.getElementById('stores-search');
  const tabs = document.querySelectorAll('[data-category]');

  let activeCategory = 'All';
  let query = '';

  function render() {
    let list = STORES;
    if (activeCategory !== 'All') list = list.filter(s => s.category === activeCategory);
    if (query) list = list.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state"><h3>No stores found</h3><p>Try a different search or category.</p></div>';
      return;
    }
    grid.innerHTML = list.map(renderStoreCard).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => { query = e.target.value; render(); });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      render();
    });
  });

  render();
}

/* ===== STORE DETAIL PAGE ===== */
function initStorePage() {
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  if (!storeId) { window.location.href = 'stores.html'; return; }

  const store = getStoreById(storeId);
  if (!store) { window.location.href = 'stores.html'; return; }

  document.title = `${store.name} Coupons & Promo Codes | DailyCoupons`;

  const logoEl = document.getElementById('store-logo');
  if (logoEl) {
    logoEl.src = store.logo;
    logoEl.alt = store.name;
    logoEl.onerror = () => {
      logoEl.outerHTML = `<div class="store-logo-placeholder" style="width:80px;height:80px;font-size:28px">${store.name.charAt(0)}</div>`;
    };
  }

  const nameEl = document.getElementById('store-name');
  if (nameEl) nameEl.textContent = `${store.name} Coupons`;

  const descEl = document.getElementById('store-desc');
  if (descEl) descEl.textContent = `Save money at ${store.name} with verified promo codes and deals.`;

  const coupons = getCouponsByStore(storeId);

  const countEl = document.getElementById('coupon-count');
  if (countEl) countEl.textContent = coupons.length;

  const cashbackEl = document.getElementById('store-cashback');
  if (cashbackEl && store.cashback !== '0%') cashbackEl.textContent = store.cashback + ' Cashback';

  const listEl = document.getElementById('store-coupons-list');
  if (listEl) {
    if (!coupons.length) {
      listEl.innerHTML = '<div class="empty-state"><h3>No coupons available</h3><p>Check back soon for new deals.</p></div>';
    } else {
      listEl.innerHTML = coupons.map(renderCouponRow).join('');
    }
  }
}

/* ===== COUPONS BROWSE PAGE ===== */
function initCouponsPage() {
  const grid = document.getElementById('coupons-page-grid');
  const searchInput = document.getElementById('coupons-search');
  const tabs = document.querySelectorAll('[data-category]');
  const params = new URLSearchParams(window.location.search);

  let activeCategory = 'All';
  let query = params.get('q') || '';
  if (searchInput) searchInput.value = query;

  function render() {
    let list = COUPONS;
    if (activeCategory !== 'All') list = list.filter(c => c.category === activeCategory);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(c => {
        const store = getStoreById(c.storeId);
        return (
          c.description.toLowerCase().includes(q) ||
          c.discount.toLowerCase().includes(q) ||
          (store && store.name.toLowerCase().includes(q))
        );
      });
    }
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state"><h3>No coupons found</h3><p>Try a different search or category.</p></div>';
      return;
    }
    grid.innerHTML = list.map(renderCouponCard).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => { query = e.target.value; render(); });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      render();
    });
  });

  render();
}

/* ===== HAMBURGER MENU ===== */
function initHamburger() {
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close when a link is tapped
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });

  // Close when tapping outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavSearch();

  // Modal close handlers
  const overlay = document.getElementById('coupon-modal');
  if (overlay) {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Page-specific init
  const page = document.body.dataset.page;
  if (page === 'home') initHomePage();
  if (page === 'stores') initStoresPage();
  if (page === 'store') initStorePage();
  if (page === 'coupons') initCouponsPage();
});
