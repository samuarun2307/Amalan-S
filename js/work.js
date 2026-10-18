/**
 * AMALAN S — Portfolio · work.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders project cards from the PROJECTS data in projects.js and handles
 * category filter pill interactions.
 *
 * Depends on:  js/projects.js  (must be loaded first in index.html)
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ─── Asset paths ──────────────────────────────────────────────────────── */
  const CASE_STUDY_BTN_SRC = 'assets/icons/button.svg';   // wide "View Case Study" pill
  const ARROW_BTN_SRC      = 'assets/icons/B-icon.svg';   // small square arrow icon

  /* ─── Resolve a Behance URL — if placeholder, open profile instead ─────── */
  function resolveUrl(url) {
    if (!url || url.startsWith('PLACEHOLDER')) {
      return BEHANCE_PROFILE_URL;
    }
    return url;
  }

  /* ─── Build a project card element matching latest visual reference ──── */
  function buildCard(project) {
    const url  = resolveUrl(project.behanceUrl);
    const isPlaceholder = project.behanceUrl && project.behanceUrl.startsWith('PLACEHOLDER');

    const card = document.createElement('article');
    card.className   = 'project-card';
    card.dataset.category = project.category;
    card.dataset.id  = project.id;
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
      <div class="card-media">
        <img
          class="card-img"
          src="${escHtml(project.image)}"
          alt="${escHtml(project.imageAlt || project.title)}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <a
        class="card-arrow-btn"
        href="${escHtml(url)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View ${escHtml(project.title)} case study on Behance (opens in new tab)"
        ${isPlaceholder ? 'data-placeholder="true"' : ''}
      >
        <img
          class="card-arrow-svg"
          src="${ARROW_BTN_SRC}"
          alt=""
          width="70"
          height="68"
        />
      </a>
    `;

    return card;
  }

  /* Backwards compatibility aliases */
  function buildLargeCard(project) { return buildCard(project); }
  function buildSmallCard(project) { return buildCard(project); }

  /* ─── Build the "View All Project" card ───────────────────────────────── */
  function buildViewAllCard() {
    const a = document.createElement('a');
    a.className  = 'view-all-card';
    a.href       = BEHANCE_PROFILE_URL;
    a.target     = '_blank';
    a.rel        = 'noopener noreferrer';
    a.id         = 'view-all-card';
    a.setAttribute('aria-label', 'View all projects on Behance (opens in new tab)');
    a.setAttribute('role', 'listitem');

    a.innerHTML = `
      <div class="view-all-inner">
        <div class="view-all-icon" aria-hidden="true">
          <img class="view-all-svg" src="${ARROW_BTN_SRC}" alt="" width="70" height="68" />
        </div>
        <span class="view-all-label">VIEW ALL PROJECT</span>
      </div>
    `;

    return a;
  }

  /* ─── Render all cards into the grid ──────────────────────────────────── */
  function renderCards(grid) {
    grid.innerHTML = '';

    PROJECTS.forEach(function (project) {
      grid.appendChild(buildCard(project));
    });

    // Always append the "View All" card at the end
    grid.appendChild(buildViewAllCard());
  }

  /* ─── Filter logic ─────────────────────────────────────────────────────── */
  function applyFilter(activeCategory) {
    const cards = document.querySelectorAll('.work-grid .project-card');
    const viewAll = document.getElementById('view-all-card');

    cards.forEach(function (card) {
      const cardCategory = card.dataset.category;
      const show = (activeCategory === 'all') || (cardCategory === activeCategory);
      card.dataset.hidden = show ? 'false' : 'true';
    });

    // "View All" card is always visible
    if (viewAll) {
      viewAll.dataset.hidden = 'false';
    }
  }

  /* ─── Wire up filter buttons ───────────────────────────────────────────── */
  function initFilters() {
    const filterButtons = document.querySelectorAll('.work-filter-btn');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = btn.dataset.filter;

        // Update active state on all buttons
        filterButtons.forEach(function (b) {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        applyFilter(category);
      });

      // Keyboard: allow Space and Enter to activate filter buttons
      btn.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* ─── Warn about placeholder Behance URLs in console ──────────────────── */
  function warnPlaceholders() {
    const placeholders = PROJECTS.filter(function (p) {
      return p.behanceUrl && p.behanceUrl.startsWith('PLACEHOLDER');
    });

    if (placeholders.length > 0) {
      console.warn(
        '[Portfolio] The following projects need real Behance URLs in js/projects.js:\n',
        placeholders.map(function (p) {
          return '  • ' + p.id + ' (behanceUrl: ' + p.behanceUrl + ')';
        }).join('\n')
      );
    }
  }

  /* ─── HTML entity escaping (XSS safety) ───────────────────────────────── */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#x27;');
  }

  /* ─── INIT ─────────────────────────────────────────────────────────────── */
  function init() {
    const grid = document.getElementById('work-grid');
    if (!grid) return;

    // Render all project cards
    renderCards(grid);

    // Wire up filter buttons
    initFilters();

    // Log placeholder warnings to console
    warnPlaceholders();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
