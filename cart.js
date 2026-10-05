/* Almarè Boutique — Cart (localStorage) */
(function () {
  const KEY = 'almare_cart';
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('almare:cart', { detail: items }));
  }
  window.AlmareCart = {
    get() { return read(); },
    count() { return read().reduce((n, i) => n + (i.qty || 1), 0); },
    total() { return read().reduce((s, i) => s + Number(i.price) * (i.qty || 1), 0); },
    add(item) {
      const items = read();
      const key = [item.id, item.size || '', item.color || ''].join('|');
      const existing = items.find((i) => [i.id, i.size || '', i.color || ''].join('|') === key);
      if (existing) existing.qty = (existing.qty || 1) + (item.qty || 1);
      else items.push({ id: item.id, name: item.name, price: Number(item.price), image: item.image, size: item.size || '', color: item.color || '', qty: item.qty || 1 });
      write(items);
      return items;
    },
    setQty(index, qty) {
      const items = read();
      if (!items[index]) return items;
      items[index].qty = Math.max(1, parseInt(qty, 10) || 1);
      write(items);
      return items;
    },
    remove(index) {
      const items = read();
      items.splice(index, 1);
      write(items);
      return items;
    },
    clear() { write([]); },
  };
  function updateBadges() {
    const n = window.AlmareCart.count();
    document.querySelectorAll('.cart-count').forEach((el) => { el.textContent = n; });
  }
  window.addEventListener('almare:cart', updateBadges);
  document.addEventListener('DOMContentLoaded', updateBadges);
})();
