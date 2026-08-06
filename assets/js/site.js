(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');

  // Responsive overrides shared by every page.
  const mobileMenuStyle = document.createElement('style');
  mobileMenuStyle.textContent = `
    @media (max-width: 900px) {
      .site-header.menu-active {
        background: #0b0d0f !important;
        border-bottom-color: rgba(255,255,255,.12) !important;
        backdrop-filter: none !important;
      }
      .site-nav {
        position: fixed !important;
        top: 76px !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 999 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        justify-content: flex-start !important;
        gap: 0 !important;
        padding: 18px 24px max(28px, env(safe-area-inset-bottom)) !important;
        overflow-y: auto !important;
        background: #0b0d0f !important;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-8px);
        transition: opacity .22s ease, transform .22s ease, visibility .22s ease;
      }
      .site-nav.open {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
      }
      .site-nav a {
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        min-height: 64px !important;
        padding: 16px 4px !important;
        border-bottom: 1px solid rgba(255,255,255,.12) !important;
        color: #f3f4f5 !important;
        font-size: 17px !important;
        line-height: 1.25 !important;
        letter-spacing: .12em !important;
        background: transparent !important;
      }
      .site-nav a:first-child {
        border-top: 1px solid rgba(255,255,255,.12) !important;
      }
      .site-nav a::after { display: none !important; }
      .site-nav a[aria-current="page"] {
        color: #f1d8ae !important;
      }
      .menu-button {
        position: relative;
        z-index: 1001;
        width: 44px;
        height: 44px;
        padding: 8px !important;
      }
      .menu-button span {
        position: absolute;
        left: 10px;
        width: 24px;
        margin: 0 !important;
        transition: transform .22s ease, top .22s ease;
      }
      .menu-button span:first-child { top: 16px; }
      .menu-button span:last-child { top: 27px; }
      .menu-button[aria-expanded="true"] span:first-child {
        top: 21px;
        transform: rotate(45deg);
      }
      .menu-button[aria-expanded="true"] span:last-child {
        top: 21px;
        transform: rotate(-45deg);
      }
    }
    @media (max-width: 640px) {
      .site-nav { top: 68px !important; }

      /* Reset the tablet grid image height when cards become stacked. */
      .journal-card {
        display: block !important;
        grid-template-columns: none !important;
        height: auto !important;
        overflow: visible !important;
      }
      .journal-card > img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 3 / 2 !important;
        object-fit: cover !important;
      }
      .journal-body {
        display: block !important;
        height: auto !important;
        overflow: visible !important;
        padding: 22px 20px 26px !important;
      }
      .journal-card h3 {
        display: block !important;
        margin: 10px 0 9px !important;
        font-size: 21px !important;
        line-height: 1.5 !important;
        white-space: normal !important;
        overflow: visible !important;
        overflow-wrap: anywhere;
      }
      .journal-card p {
        display: block !important;
        margin: 0 !important;
        line-height: 1.75 !important;
      }
      .split-image img,
      .stock-preview img {
        width: 100% !important;
        height: auto !important;
      }
    }
  `;
  document.head.appendChild(mobileMenuStyle);

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    nav?.classList.remove('open');
    header?.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'メニューを開く');
  };

  menuButton?.addEventListener('click', () => {
    const open = !nav?.classList.contains('open');
    nav?.classList.toggle('open', open);
    header?.classList.toggle('menu-active', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });

  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });

  // Basic deterrence only: browser-delivered images can never be made impossible to capture.
  document.addEventListener('contextmenu', e => {
    if (e.target.closest('img, .protected-image')) e.preventDefault();
  });
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
  }));

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxTitle = lightbox?.querySelector('strong');
  const lightboxMeta = lightbox?.querySelector('span');
  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  galleryItems.forEach(item => item.addEventListener('click', () => {
    const source = item.dataset.full;
    if (!source || !lightbox) return;
    lightboxImage.src = source;
    lightboxImage.alt = item.dataset.title || '';
    lightboxTitle.textContent = item.dataset.title || '';
    lightboxMeta.textContent = item.dataset.meta || '';
    lightbox.classList.add('open');
    document.body.classList.add('menu-open');
  }));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = '公開前に送信先を設定すると、このフォームからお問い合わせを受け取れます。';
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
