/* ================================================
   MUSEUM PWA — app.js
   Burger menu, expandable text, back-to-top, cache status
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== BURGER MENU ==========
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerMenu = document.getElementById('burgerMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    burgerMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burgerMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      // Small delay so menu closes before scroll
      setTimeout(() => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')) || 64;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
    });
  });


  // ========== EXPANDABLE TEXT ==========
  const toggles = document.querySelectorAll('.expandable-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.expandable');
      const isOpen = parent.classList.contains('open');

      if (isOpen) {
        parent.classList.remove('open');
        toggle.textContent = toggle.dataset.more;
      } else {
        parent.classList.add('open');
        toggle.textContent = toggle.dataset.less;
      }
    });
  });


  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('backToTop');

  function checkScroll() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ========== CACHE STATUS ==========
  const cacheBanner = document.getElementById('cacheBanner');
  const cacheText = document.getElementById('cacheText');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      // Check all caches for a key resource
      caches.keys().then(keys => {
        const museumCache = keys.find(k => k.startsWith('museumguide_'));
        if (museumCache) {
          caches.open(museumCache).then(cache => {
            cache.match('./audio/guide-it.mp3').then(response => {
              if (response) {
                showCacheReady();
              } else {
                listenForCacheComplete();
              }
            });
          });
        } else {
          listenForCacheComplete();
        }
      }).catch(() => {
        listenForCacheComplete();
      });
    });
  } else {
    // No SW support — hide banner
    cacheBanner.classList.add('hidden');
  }

  function listenForCacheComplete() {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_COMPLETE') {
        showCacheReady();
      }
    });
  }

  function showCacheReady() {
    cacheBanner.classList.add('ready');
    cacheText.textContent = 'Audio Support pronto / Audio Support ready ✓';

    // Hide banner after 4 seconds
    setTimeout(() => {
      cacheBanner.classList.add('hidden');
    }, 4000);
  }


  // ========== AUDIO SUPPORT BUTTON SCROLL ==========
  const audioButtons = document.querySelectorAll('.btn-audio-support');

  audioButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const audioSection = document.getElementById('audio-support');
      if (audioSection) {
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 64;
        const top = audioSection.getBoundingClientRect().top + window.pageYOffset - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
