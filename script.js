document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
  });
  const productsScroll = document.getElementById('productsScroll');
  document.getElementById('prodPrev')?.addEventListener('click', () => productsScroll?.scrollBy({ left: -304, behavior: 'smooth' }));
  document.getElementById('prodNext')?.addEventListener('click', () => productsScroll?.scrollBy({ left: 304, behavior: 'smooth' }));
  let isDown = false, startX, scrollLeft;
  productsScroll?.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - productsScroll.offsetLeft; scrollLeft = productsScroll.scrollLeft; });
  productsScroll?.addEventListener('mouseleave', () => { isDown = false; });
  productsScroll?.addEventListener('mouseup', () => { isDown = false; });
  productsScroll?.addEventListener('mousemove', (e) => {
    if (!isDown) return; e.preventDefault();
    productsScroll.scrollLeft = scrollLeft - (e.pageX - productsScroll.offsetLeft - startX) * 1.4;
  });
  document.querySelectorAll('.quick-add').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = card?.dataset.id;
      if (id && window.AlmareCart && window.getCatalog) {
        const p = getCatalog().products.find((x) => x.id === id);
        if (p) AlmareCart.add({ id: p.id, name: p.name, price: p.price, image: p.image, size: (p.sizes && p.sizes[0]) || '', color: (p.colors && p.colors[0]) || '', qty: 1 });
      }
      btn.textContent = '✓ Aggiunto'; btn.style.background = 'var(--beige-600)'; btn.style.color = 'white';
      setTimeout(() => { btn.textContent = '+ Aggiungi'; btn.style.background = ''; btn.style.color = ''; }, 1400);
    });
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.product-card, .collection-card, .ship-card').forEach((el) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (installBtn) installBtn.hidden = false; });
  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installBtn.hidden = true;
  });
  window.addEventListener('appinstalled', () => { if (installBtn) installBtn.hidden = true; });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
});
