const products = [
  { name: 'Basic T-Shirt Weiß', category: 'T-Shirts', price: 19.99, badge: 'NEU', colors: ['Weiß', 'Schwarz', 'Marineblau', 'Grau meliert', 'Sand'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], material: '100 % Baumwolle (Single-Jersey)', care: 'Maschinenwäsche 30 °C, nicht bleichen, bei mittlerer Hitze bügeln', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85' },
  { name: 'Oversized Shirt Schwarz', category: 'T-Shirts', price: 24.99, badge: 'NEU', colors: ['Schwarz', 'Weiß', 'Olivgrün', 'Beige'], sizes: ['S', 'M', 'L', 'XL'], material: '80 % Baumwolle, 20 % Polyester', care: 'Maschinenwäsche 30 °C, links waschen, nicht im Trockner trocknen', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85' },
  { name: 'Slim-Fit Jeans Blau', category: 'Hosen', price: 49.99, colors: ['Mittelblau', 'Dunkelblau', 'Schwarz', 'Hellblau (Used-Look)'], sizes: ['28/30', '30/32', '32/32', '34/34', '36/34'], material: '98 % Baumwolle, 2 % Elasthan', care: 'Maschinenwäsche 30 °C, auf links waschen, nicht bleichen', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85' },
  { name: 'High-Waist Jeans', category: 'Hosen', price: 54.99, badge: '-20%', colors: ['Dunkelblau', 'Schwarz', 'Hellblau', 'Weiß'], sizes: ['34', '36', '38', '40', '42'], material: '99 % Baumwolle, 1 % Elasthan', care: 'Maschinenwäsche 30 °C, nicht im Trockner, schonend bügeln', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=700&q=85' },
  { name: 'Chunky Sneaker Weiß', category: 'Schuhe', price: 79.99, badge: '-20%', colors: ['Weiß', 'Schwarz', 'Rosa', 'Beige/Creme'], sizes: ['36', '37', '38', '39', '40', '41'], material: 'Obermaterial Kunstleder, Sohle Gummi', care: 'Nicht waschbar, mit feuchtem Tuch reinigen, an der Luft trocknen', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85' },
  { name: 'Retro Sneaker Bunt', category: 'Schuhe', price: 89.99, badge: '-20%', colors: ['Mehrfarbig (Rot/Blau/Weiß)', 'Grün/Gelb', 'Schwarz/Weiß', 'Pastell-Mix'], sizes: ['38', '39', '40', '41', '42', '43'], material: 'Obermaterial Textil/Synthetik, Sohle Gummi', care: 'Nicht waschbar, Flecken mit Seifenlauge entfernen', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=85' },
  { name: 'Steppjacke Schwarz', category: 'Jacken', price: 99.99, badge: 'NEU', colors: ['Schwarz', 'Olivgrün', 'Marineblau', 'Bordeaux'], sizes: ['XS', 'S', 'M', 'L', 'XL'], material: 'Außenmaterial 100 % Polyester, Füllung Daunen-Ersatz', care: 'Handwäsche oder Schonwaschgang 30 °C, nicht bleichen, nicht bügeln', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=700&q=85' },
  { name: 'Winterjacke Grau', category: 'Jacken', price: 129.99, colors: ['Grau', 'Schwarz', 'Camel', 'Dunkelblau'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], material: 'Außenmaterial 100 % Polyester, Futter Fleece', care: 'Maschinenwäsche 30 °C Schonwaschgang, nicht im Trockner trocknen, nicht bügeln', image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=700&q=85' }
];
const grid = document.querySelector('#products');
const filters = document.querySelectorAll('.filters button');
const drawer = document.querySelector('#drawer');
const backdrop = document.querySelector('#backdrop');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const total = document.querySelector('#total');
const detail = document.querySelector('#product-detail');
const detailBackdrop = document.querySelector('#detail-backdrop');
let cart = [];
let selectedProduct = null;
let selectedColor = '';
let selectedSize = '';
const money = (value) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

function renderProducts(category = 'Alle') {
  const visible = category === 'Alle' ? products : category === 'Sale' ? products.filter((product) => product.badge === '-20%') : category === 'Neu' ? products.filter((product) => product.badge === 'NEU') : products.filter((product) => product.category === category);
  grid.innerHTML = visible.map((product) => `<article class="product" data-name="${product.name}"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy">${product.badge ? `<span class="product-badge ${product.badge === '-20%' ? 'sale-badge' : ''}">${product.badge}</span>` : ''}<button class="add" data-name="${product.name}" aria-label="${product.name} direkt hinzufügen">+</button></div><div class="product-info"><div><h3>${product.name}</h3><p>${product.category}</p></div><strong class="price">${money(product.price)}</strong></div></article>`).join('');
  grid.querySelectorAll('.product').forEach((card) => card.addEventListener('click', (event) => { if (!event.target.closest('.add')) openDetail(card.dataset.name); }));
  grid.querySelectorAll('.add').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.name, 'Standard', 'Standard', 1)));
}
function openDetail(name) {
  selectedProduct = products.find((product) => product.name === name);
  selectedColor = selectedProduct.colors[0];
  selectedSize = selectedProduct.sizes[0];
  document.querySelector('#detail-image').src = selectedProduct.image;
  document.querySelector('#detail-image').alt = selectedProduct.name;
  document.querySelector('#detail-name').textContent = selectedProduct.name;
  document.querySelector('#detail-category').textContent = selectedProduct.category;
  document.querySelector('#detail-price').textContent = money(selectedProduct.price);
  document.querySelector('#detail-material').innerHTML = `<strong>Material:</strong> ${selectedProduct.material}<br><strong>Pflege:</strong> ${selectedProduct.care}`;
  renderOptions('#color-options', selectedProduct.colors, selectedColor, (value) => { selectedColor = value; });
  renderOptions('#size-options', selectedProduct.sizes, selectedSize, (value) => { selectedSize = value; });
  document.querySelector('#detail-quantity').value = 1;
  detail.classList.add('open');
  detailBackdrop.classList.add('open');
  detail.setAttribute('aria-hidden', 'false');
}
function renderOptions(selector, options, selected, onSelect) {
  const container = document.querySelector(selector);
  container.innerHTML = options.map((option) => `<button type="button" class="${option === selected ? 'selected' : ''}">${option}</button>`).join('');
  container.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { container.querySelectorAll('button').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); onSelect(button.textContent); }));
}
function closeDetail() { detail.classList.remove('open'); detailBackdrop.classList.remove('open'); detail.setAttribute('aria-hidden', 'true'); }
function addToCart(name, color, size, quantity) { const product = products.find((item) => item.name === name); for (let index = 0; index < quantity; index += 1) cart.push({ ...product, selectedColor: color, selectedSize: size }); renderCart(); openDrawer(); }
function renderCart() {
  cartCount.textContent = cart.length;
  total.textContent = money(cart.reduce((sum, product) => sum + product.price, 0));
  cartItems.innerHTML = cart.length ? cart.map((product, index) => `<div class="cart-row"><div><strong>${product.name}</strong><small>${product.selectedColor} · Größe ${product.selectedSize}<br>${money(product.price)}</small></div><button class="remove" data-index="${index}">Entfernen</button></div>`).join('') : '<p class="empty">Deine Bag ist noch leer.</p>';
  cartItems.querySelectorAll('.remove').forEach((button) => button.addEventListener('click', () => { cart.splice(Number(button.dataset.index), 1); renderCart(); }));
}
function openDrawer() { drawer.classList.add('open'); backdrop.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); }
function closeDrawer() { drawer.classList.remove('open'); backdrop.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
document.querySelector('.cart-button').addEventListener('click', openDrawer);
document.querySelector('#close').addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);
document.querySelector('#detail-close').addEventListener('click', closeDetail);
detailBackdrop.addEventListener('click', closeDetail);
document.querySelector('#detail-add').addEventListener('click', () => { const quantity = Math.max(1, Number(document.querySelector('#detail-quantity').value) || 1); addToCart(selectedProduct.name, selectedColor, selectedSize, quantity); closeDetail(); });
filters.forEach((filter) => filter.addEventListener('click', () => { filters.forEach((item) => item.classList.remove('active')); filter.classList.add('active'); renderProducts(filter.dataset.filter); }));
document.querySelectorAll('[data-nav-filter]').forEach((link) => link.addEventListener('click', () => renderProducts(link.dataset.navFilter)));
document.querySelector('#newsletter').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#message').textContent = 'Danke, du bist dabei.'; event.target.reset(); });
document.querySelector('.checkout').addEventListener('click', () => { if (cart.length) alert('Danke! Der Checkout wird bald verfügbar sein.'); });
renderProducts();

const authModal = document.querySelector('#auth-modal');
const authBackdrop = document.querySelector('#auth-backdrop');
const authForm = document.querySelector('#auth-form');
const authButton = document.querySelector('#account-button');
const authError = document.querySelector('#auth-error');
const authSubmit = document.querySelector('.auth-submit');

function getCurrentUser() {
  return localStorage.getItem('forme-current-user');
}

function updateAccountButton() {
  const user = getCurrentUser();
  const displayName = user ? user.charAt(0).toUpperCase() + user.slice(1) : '';
  authButton.textContent = user ? `Hallo, ${displayName}` : 'Anmelden';
  authButton.title = user ? 'Abmelden' : 'Anmelden';
}

function openAuth() {
  authModal.classList.add('open');
  authBackdrop.classList.add('open');
  authModal.setAttribute('aria-hidden', 'false');
  document.querySelector('#auth-username').focus();
}

function closeAuth() {
  authModal.classList.remove('open');
  authBackdrop.classList.remove('open');
  authModal.setAttribute('aria-hidden', 'true');
  authForm.reset();
  authError.textContent = '';
}

authButton.addEventListener('click', () => {
  if (getCurrentUser()) {
    localStorage.removeItem('forme-current-user');
    updateAccountButton();
    return;
  }
  openAuth();
});

document.querySelector('#auth-close').addEventListener('click', closeAuth);
authBackdrop.addEventListener('click', closeAuth);
authForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#auth-username').value.trim().toLowerCase();
  const password = document.querySelector('#auth-password').value;

  authError.textContent = '';
  authSubmit.disabled = true;

  if (username !== 'noah' || password !== '1234') {
    authError.textContent = 'Benutzername oder Passwort ist falsch.';
    authSubmit.disabled = false;
    return;
  }

  localStorage.setItem('forme-current-user', username);
  updateAccountButton();
  closeAuth();
  authSubmit.disabled = false;
});

updateAccountButton();
