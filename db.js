/* Almarè Boutique — Data layer (Supabase + fallback localStorage) */
(function () {
  const DEFAULT = window.ALMARE_DEFAULT || { products: [], collections: [] };
  function client() {
    if (!window.almareIsSupabaseReady()) return null;
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.ALMARE_CONFIG;
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  function mapProduct(row) {
    return {
      id: row.id, name: row.name, price: Number(row.price), category: row.category,
      collection: row.collection, image: row.image, sizes: row.sizes || [], colors: row.colors || [],
      model: row.model || '', age: row.age || null, gender: row.gender || null, description: row.description || '',
    };
  }
  function mapCollection(row) {
    return { id: row.id, name: row.name, desc: row.description || row.desc || '', image: row.image || '' };
  }
  window.getCatalog = async function () {
    const sb = client();
    if (sb) {
      try {
        const [p, c] = await Promise.all([
          sb.from('products').select('*').order('created_at', { ascending: false }),
          sb.from('collections').select('*').order('created_at', { ascending: false }),
        ]);
        if (!p.error && !c.error) {
          return { products: (p.data || []).map(mapProduct), collections: (c.data || []).map(mapCollection) };
        }
        console.warn('Supabase catalog error', p.error || c.error);
      } catch (e) { console.warn(e); }
    }
    try {
      const raw = localStorage.getItem('almare_catalog');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT));
  };
  window.getCatalogSync = function () {
    try {
      const raw = localStorage.getItem('almare_catalog');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT));
  };
  window.saveCatalog = async function (data) {
    localStorage.setItem('almare_catalog', JSON.stringify(data));
    const sb = client();
    if (!sb) return { ok: true, mode: 'local' };
    try {
      for (const p of data.products || []) {
        await sb.from('products').upsert({
          id: p.id, name: p.name, price: p.price, category: p.category, collection: p.collection,
          image: p.image, sizes: p.sizes || [], colors: p.colors || [], model: p.model || null,
          age: p.age || null, gender: p.gender || null, description: p.description || null,
        });
      }
      for (const c of data.collections || []) {
        await sb.from('collections').upsert({
          id: c.id, name: c.name, description: c.desc || c.description || '', image: c.image || '',
        });
      }
      return { ok: true, mode: 'supabase' };
    } catch (e) {
      console.warn(e);
      return { ok: false, error: e, mode: 'local' };
    }
  };
  window.deleteProductRemote = async function (id) {
    const sb = client();
    if (sb) await sb.from('products').delete().eq('id', id);
  };
  window.deleteCollectionRemote = async function (id) {
    const sb = client();
    if (sb) await sb.from('collections').delete().eq('id', id);
  };
  window.uploadProductImage = async function (file) {
    const sb = client();
    if (!sb) {
      return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
    }
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
    const { error } = await sb.storage.from('product-images').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = sb.storage.from('product-images').getPublicUrl(path);
    return data.publicUrl;
  };
  window.listGalleryImages = async function () {
    const sb = client();
    if (!sb) return [];
    const { data, error } = await sb.storage.from('product-images').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (error || !data) return [];
    return data.filter((f) => f.name && !f.name.endsWith('/')).map((f) => {
      const { data: urlData } = sb.storage.from('product-images').getPublicUrl(f.name);
      return { name: f.name, url: urlData.publicUrl };
    });
  };
  window.createOrder = async function (order) {
    const payload = {
      customer_name: order.name, email: order.email, phone: order.phone, city: order.city,
      address: order.address, notes: order.notes || '', items: order.items, total: order.total, status: 'pending',
    };
    const sb = client();
    if (sb) {
      const { data, error } = await sb.from('orders').insert(payload).select().single();
      if (!error && data) {
        const local = JSON.parse(localStorage.getItem('almare_orders') || '[]');
        local.unshift({ ...data, id: data.id });
        localStorage.setItem('almare_orders', JSON.stringify(local.slice(0, 50)));
        return data;
      }
      console.warn(error);
    }
    const localOrder = { id: 'local-' + Date.now(), ...payload, created_at: new Date().toISOString() };
    const local = JSON.parse(localStorage.getItem('almare_orders') || '[]');
    local.unshift(localOrder);
    localStorage.setItem('almare_orders', JSON.stringify(local.slice(0, 50)));
    return localOrder;
  };
  window.getMyOrders = async function (email) {
    const sb = client();
    if (sb && email) {
      const { data, error } = await sb.from('orders').select('*').eq('email', email).order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    const local = JSON.parse(localStorage.getItem('almare_orders') || '[]');
    if (email) return local.filter((o) => (o.email || '').toLowerCase() === email.toLowerCase());
    return local;
  };
  window.seedSupabaseIfEmpty = async function () {
    const sb = client();
    if (!sb) return;
    const { count } = await sb.from('products').select('*', { count: 'exact', head: true });
    if (count && count > 0) return;
    const def = DEFAULT;
    for (const p of def.products || []) {
      await sb.from('products').upsert({
        id: p.id, name: p.name, price: p.price, category: p.category, collection: p.collection,
        image: p.image, sizes: p.sizes || [], colors: p.colors || [], model: p.model || null,
        age: p.age || null, gender: p.gender || null,
      });
    }
    for (const c of def.collections || []) {
      await sb.from('collections').upsert({ id: c.id, name: c.name, description: c.desc || '', image: c.image || '' });
    }
  };
})();
