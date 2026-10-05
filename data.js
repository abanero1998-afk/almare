/* Almaré catalog */
window.ALMARE_DEFAULT = {
  collections: [
    { id: 'essenziale', name: 'Essenziale', desc: 'Pezzi must-have in tonalità neutre', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80' },
    { id: 'coordinati', name: 'Coordinati', desc: 'Set completi per un look impeccabile', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80' },
    { id: 'bambina', name: 'Bambina / Bambino', desc: 'Stile raffinato anche per i più piccoli', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80' },
    { id: 'sopra-abiti', name: 'Sopra Abiti', desc: 'Cappotti e giacche dal taglio sartoriale', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' }
  ],
  products: [
    { id: 'p1', name: 'Abito Fluido Beige', category: 'abiti', collection: 'essenziale', price: 189, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', sizes: ['XS','S','M','L'], colors: ['Beige','Crema'], model: 'Fluido', age: null },
    { id: 'p2', name: 'Completo Coordinato Crema', category: 'completi', collection: 'coordinati', price: 249, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', sizes: ['S','M','L'], colors: ['Crema','Sabbia'], model: 'Coordinato', age: null },
    { id: 'p3', name: 'Gonna Midi Plissettata', category: 'gonne', collection: 'essenziale', price: 129, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80', sizes: ['XS','S','M'], colors: ['Beige','Nero'], model: 'Plissettata', age: null },
    { id: 'p4', name: 'T-Shirt Seta Naturale', category: 'tshirt', collection: 'essenziale', price: 79, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', sizes: ['XS','S','M','L','XL'], colors: ['Bianco','Beige','Rosa'], model: 'Basic', age: null },
    { id: 'p5', name: 'Cappotto Cashmere', category: 'sopra-abiti', collection: 'sopra-abiti', price: 389, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', sizes: ['S','M','L'], colors: ['Beige','Camello'], model: 'Lungo', age: null },
    { id: 'p6', name: 'Pantaloni Wide Leg', category: 'pantaloni', collection: 'essenziale', price: 159, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', sizes: ['S','M','L'], colors: ['Beige','Nero'], model: 'Wide Leg', age: null },
    { id: 'p7', name: 'Blazer Sartoriale', category: 'sopra-abiti', collection: 'sopra-abiti', price: 219, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', sizes: ['XS','S','M','L'], colors: ['Beige','Grigio'], model: 'Sartoriale', age: null },
    { id: 'b1', name: 'Body Cotone Neonato', category: 'bambino', collection: 'bambina', price: 28, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80', sizes: ['0-3m','3-6m','6-12m'], colors: ['Bianco','Beige','Rosa'], model: 'Body', age: 'neonato' },
    { id: 'b2', name: 'Tutina Ciniglia', category: 'bambino', collection: 'bambina', price: 42, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80', sizes: ['0-3m','3-6m','6-12m'], colors: ['Crema','Azzurro'], model: 'Tutina', age: 'neonato' },
    { id: 'b3', name: 'Cappellino Lana Merino', category: 'bambino', collection: 'bambina', price: 24, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', sizes: ['0-6m','6-12m'], colors: ['Beige','Grigio'], model: 'Accessorio', age: 'neonato' },
    { id: 'b4', name: 'Completo Lino 2 Anni', category: 'bambino', collection: 'bambina', price: 68, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80', sizes: ['18-24m','2a','3a'], colors: ['Beige','Verde'], model: 'Coordinato', age: '2anni' },
    { id: 'b5', name: 'Gonna Plissettata Baby', category: 'bambino', collection: 'bambina', price: 45, image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80', sizes: ['2a','3a','4a'], colors: ['Rosa','Crema'], model: 'Gonna', age: '2anni' },
    { id: 'b6', name: 'Maglioncino Cashmere', category: 'bambino', collection: 'bambina', price: 79, image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80', sizes: ['2a','3a','4a'], colors: ['Beige','Grigio'], model: 'Maglia', age: '2anni' },
    { id: 'b7', name: 'Completo Teen Beige', category: 'bambino', collection: 'bambina', price: 98, image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=600&q=80', sizes: ['12a','14a','16a'], colors: ['Beige','Nero'], model: 'Coordinato', age: '14anni' },
    { id: 'b8', name: 'Jeans Slim Teen', category: 'bambino', collection: 'bambina', price: 59, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', sizes: ['12a','14a','16a'], colors: ['Blu','Nero'], model: 'Jeans', age: '14anni' },
    { id: 'b9', name: 'Camicia Lino Teen', category: 'bambino', collection: 'bambina', price: 54, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', sizes: ['12a','14a','16a'], colors: ['Bianco','Beige'], model: 'Camicia', age: '14anni' }
  ]
};
window.getCatalog = function () {
  try {
    const raw = localStorage.getItem('almare_catalog');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return JSON.parse(JSON.stringify(window.ALMARE_DEFAULT));
};
window.saveCatalog = function (data) {
  localStorage.setItem('almare_catalog', JSON.stringify(data));
};
