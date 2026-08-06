(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = '公開前に送信先を設定すると、このフォームからお問い合わせを受け取れます。';
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
