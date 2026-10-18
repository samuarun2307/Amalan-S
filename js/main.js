/**
 * AMALAN S — Portfolio · main.js
 * Vanilla JavaScript for interactive behavior.
 * Beginner-friendly: each section is clearly commented.
 */

// -----------------------------------------------
// 1. HAMBURGER MENU TOGGLE
// -----------------------------------------------

// Grab the elements we need
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav    = document.getElementById('mobile-nav');
const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-link') : [];

/**
 * Opens the mobile navigation menu.
 */
function openMobileNav() {
  hamburgerBtn.classList.add('is-open');
  mobileNav.classList.add('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
  mobileNav.setAttribute('aria-hidden', 'false');
}

/**
 * Closes the mobile navigation menu.
 */
function closeMobileNav() {
  hamburgerBtn.classList.remove('is-open');
  mobileNav.classList.remove('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
  mobileNav.setAttribute('aria-hidden', 'true');
}

/**
 * Toggles the mobile nav open or closed.
 */
function toggleMobileNav() {
  const isOpen = mobileNav.classList.contains('is-open');
  if (isOpen) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}

// Wire up the hamburger button click
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when a link inside it is clicked
mobileNavLinks.forEach(function(link) {
  link.addEventListener('click', closeMobileNav);
});

// -----------------------------------------------
// 2. CLOSE MENU WHEN CLICKING OUTSIDE
// -----------------------------------------------

document.addEventListener('click', function(event) {
  // If the nav is closed, do nothing
  if (!mobileNav || !mobileNav.classList.contains('is-open')) return;

  // Check if click was outside the header and mobile nav
  const isInsideHeader = event.target.closest('.site-header');
  const isInsideNav    = event.target.closest('.mobile-nav');

  if (!isInsideHeader && !isInsideNav) {
    closeMobileNav();
  }
});

// -----------------------------------------------
// 3. CLOSE MENU ON ESCAPE KEY
// -----------------------------------------------

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
      // Return focus to the hamburger button for accessibility
      hamburgerBtn.focus();
    }
  }
});

// -----------------------------------------------
// 4. HEADER SCROLL EFFECT
// Adds a slightly more opaque background when
// the user scrolls down (subtle visual polish).
// -----------------------------------------------

const siteHeader = document.querySelector('.site-header');

function handleHeaderScroll() {
  if (!siteHeader) return;

  if (window.scrollY > 10) {
    siteHeader.style.background = 'rgba(9, 6, 17, 0.92)';
  } else {
    siteHeader.style.background = 'rgba(9, 6, 17, 0.72)';
  }
}

// Listen for scroll events
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// -----------------------------------------------
// 5. ACTIVE NAV LINK ON RESIZE
// Reset mobile nav if user resizes to desktop
// -----------------------------------------------

window.addEventListener('resize', function() {
  // If viewport is wider than mobile breakpoint, close any open mobile nav
  if (window.innerWidth > 640) {
    if (mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  }
});

// -----------------------------------------------
// 6. ACTIVE NAVIGATION STATE & SCROLL TRACKING
// Uses Intersection Observer API with scroll-position
// sync for reliable, flicker-free highlighting.
// -----------------------------------------------

(function initActiveNavigation() {
  // Section IDs in DOM order for positional calculations
  const sectionIds = ['hero', 'work', 'experience', 'about', 'contact'];
  const sections = sectionIds
    .map(function(id) { return document.getElementById(id); })
    .filter(Boolean);

  if (sections.length === 0) return;

  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks  = document.querySelectorAll('.mobile-nav .mobile-nav-link');
  const allNavLinks  = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .mobile-nav-link');

  let currentActiveId  = 'hero';
  let isClickScrolling = false;
  let clickScrollTimer = null;

  /**
   * Updates desktop and mobile navigation links with the active state.
   * Applies aria-current="location" for accessibility.
   */
  function setActiveNav(sectionId, force) {
    if (!sectionId) return;
    if (!force && sectionId === currentActiveId) return;
    currentActiveId = sectionId;

    desktopLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === '#' + sectionId) {
        link.classList.add('nav-link--active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('nav-link--active');
        link.removeAttribute('aria-current');
      }
    });

    mobileLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === '#' + sectionId) {
        link.classList.add('mobile-nav-link--active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('mobile-nav-link--active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Computes which section is currently active based on viewport position.
   */
  function computeActiveSection() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const viewportHeight = window.innerHeight;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );

    // 1. Top of page -> Home
    if (scrollY <= 60) {
      return 'hero';
    }

    // 2. Bottom of page -> Contact / Footer
    if (scrollY + viewportHeight >= docHeight - 80) {
      return 'contact';
    }

    // 3. Focal line below fixed header (72px header + 68px buffer = 140px)
    const focalLine = 140;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      if (rect.top <= focalLine && rect.bottom > focalLine) {
        return section.id;
      }
    }

    // 4. Fallback: closest section to the focal line
    let closestId = null;
    let minDistance = Infinity;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      const dist = Math.min(
        Math.abs(rect.top - focalLine),
        Math.abs(rect.bottom - focalLine)
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestId = section.id;
      }
    }

    return closestId || currentActiveId || 'hero';
  }

  /**
   * Syncs active navigation state during user scrolling.
   */
  function syncActiveSection() {
    if (isClickScrolling) return;
    const activeId = computeActiveSection();
    if (activeId) {
      setActiveNav(activeId, false);
    }
  }

  // Set up Intersection Observer API
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      // Focus detection band under fixed header (72px)
      rootMargin: '-72px 0px -40% 0px',
      threshold: [0, 0.2, 0.5, 0.8]
    };

    const sectionObserver = new IntersectionObserver(function() {
      if (!isClickScrolling) {
        syncActiveSection();
      }
    }, observerOptions);

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // Throttled scroll listener to guarantee zero lag at scroll boundaries
  let scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (isClickScrolling) return;
    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        syncActiveSection();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Handle click on navigation links
  allNavLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      event.preventDefault();

      // Immediately highlight clicked link for instant feedback
      setActiveNav(targetId, true);

      // Lock observer/scroll tracking during smooth scroll
      isClickScrolling = true;
      if (clickScrollTimer) clearTimeout(clickScrollTimer);

      // Close mobile navigation if open
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }

      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const headerOffset = 72;

      if (targetId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const targetScrollY = elementPosition + (window.scrollY || window.pageYOffset) - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }

      // Update URL hash without causing a page jump
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }

      // Unlock scroll spy after smooth scroll finishes
      const unlockDuration = prefersReducedMotion ? 50 : 850;
      clickScrollTimer = setTimeout(function() {
        isClickScrolling = false;
        syncActiveSection();
      }, unlockDuration);
    });
  });

  // Modern scrollend event to unlock immediately when scroll finishes
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', function() {
      if (isClickScrolling) {
        isClickScrolling = false;
        if (clickScrollTimer) clearTimeout(clickScrollTimer);
        syncActiveSection();
      }
    });
  }

  // Initial synchronization on load and resize
  window.addEventListener('load', syncActiveSection);
  window.addEventListener('resize', function() {
    if (!isClickScrolling) {
      syncActiveSection();
    }
  });

  // Run on initialization
  syncActiveSection();
})();
