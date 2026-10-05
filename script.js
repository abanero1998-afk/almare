/* Almaré — Interactions */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const onScroll = () => { header.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  const productsScroll = document.getElementById('productsScroll');
  const prodPrev = document.getElementById('prodPrev');
  const prodNext = document.getElementById('prodNext');
  const scrollAmount = 304;
  prodPrev?.addEventListener('click', () => productsScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  prodNext?.addEventListener('click', () => productsScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

  let isDown = false, startX, scrollLeft;
  productsScroll?.addEventListener('mousedown', (e) => {
    isDown = true;
    productsScroll.classList.add('dragging');
    startX = e.pageX - productsScroll.offsetLeft;
    scrollLeft = productsScroll.scrollLeft;
  });
  productsScroll?.addEventListener('mouseleave', () => { isDown = false; productsScroll.classList.remove('dragging'); });
  productsScroll?.addEventListener('mouseup', () => { isDown = false; productsScroll.classList.remove('dragging'); });
  productsScroll?.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productsScroll.offsetLeft;
    productsScroll.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });

  let cartCount = 0;
  const cartCountEl = document.querySelector('.cart-count');
  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount;
      btn.textContent = '✓ Aggiunto';
      btn.style.background = 'var(--beige-600)';
      btn.style.color = 'white';
      setTimeout(() => {
        btn.textContent = '+ Aggiungi';
        btn.style.background = '';
        btn.style.color = '';
      }, 1600);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.collection-card, .product-card, .ship-card, .about-text, .about-visual').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
});
