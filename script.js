/**
 * Lokales Projekt-Dashboard
 * - Einfacher Login (ohne Server, funktioniert unter file://)
 * - Rollenbasierte Ansichten / Menüpunkte
 * - Dashboard verlinkt die Unterprojekte im Ordner /pages
 */

// ============================================
// KONFIGURATION
// ============================================

// Benutzer (Klartext – nur für lokalen Gebrauch!)
// Spiegelt users.json; hier eingebettet, damit es ohne Server (file://) läuft.
const USERS = [
  { username: 'noah',   password: 'noah',   name: 'Noah',   role: 'admin'  },
  { username: 'schule', password: 'schule', name: 'Schule', role: 'schule' },
  { username: 'gast',   password: 'gast',   name: 'Gast',   role: 'gast'   },
];

// Unterprojekte im Ordner /pages.
// roles = welche Rollen das Projekt sehen; 'admin' sieht generell alles.
const PROJECTS = [
  {
    id: 'seebad-caputh',
    title: 'Seebad Caputh',
    description: 'Strandbad & Restaurant am Schwielowsee – Website mit Speisekarte, Rezensionen und Reservierung.',
    icon: '🏖️',
    path: 'pages/seebad-caputh/index.html',
    tags: ['Website', 'Restaurant'],
    roles: ['admin', 'gast'],
  },
  {
    id: 'schule',
    title: 'Schulprojekte',
    description: 'Sammelseite mit Unterprojekten: Taschenrechner, Stoppuhr und eine Präsentation zum Wasserkreislauf.',
    icon: '🎓',
    path: 'pages/schule/index.html',
    tags: ['Schule', 'Sammlung'],
    roles: ['admin', 'schule'],
  },
  {
    id: 'page01',
    title: 'Page 01',
    description: 'Experiment- und Vorlagenprojekt.',
    icon: '🧪',
    path: 'pages/page01/index.html',
    tags: ['Experiment'],
    roles: ['admin'],
  },
];

// Menüpunkte je Ansicht. roles = wer den Menüpunkt / die Ansicht sieht.
const VIEWS = [
  { id: 'dashboard', label: 'Dashboard', roles: ['admin', 'schule', 'gast'] },
  { id: 'schule',    label: 'Schule',    roles: ['admin', 'schule'] },
  { id: 'admin',     label: 'Verwaltung', roles: ['admin'] },
];

const SESSION_KEY = 'projektDashboard_session';

// ============================================
// DOM
// ============================================
const loginModal   = document.getElementById('login-modal');
const mainContent   = document.getElementById('main-content');
const loginForm     = document.getElementById('login-form');
const loginError    = document.getElementById('login-error');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutBtn     = document.getElementById('logout-btn');
const navLinks      = document.getElementById('nav-links');
const userBadge     = document.getElementById('user-badge');

// ============================================
// SESSION
// ============================================
function setSession(user) {
  const session = { username: user.username, name: user.name, role: user.role, ts: Date.now() };
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { /* file:// ohne Storage */ }
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && s.username && s.role ? s : null;
  } catch (e) {
    return null;
  }
}

function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
}

// ============================================
// LOGIN
// ============================================
function handleLogin(e) {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  const user = USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    loginError.textContent = 'Ungültiger Benutzername oder Passwort.';
    passwordInput.value = '';
    passwordInput.focus();
    return;
  }

  loginError.textContent = '';
  setSession(user);
  loginForm.reset();
  showDashboard(user);
}

function handleLogout() {
  clearSession();
  mainContent.classList.remove('active');
  loginModal.style.display = 'flex';
  loginForm.reset();
  loginError.textContent = '';
  usernameInput.focus();
}

// ============================================
// DASHBOARD-AUFBAU (rollenbasiert)
// ============================================
function showDashboard(user) {
  loginModal.style.display = 'none';
  mainContent.classList.add('active');

  userBadge.textContent = `${user.name} · ${roleLabel(user.role)}`;

  renderNav(user.role);
  renderProjects(user.role);
  renderAdmin(user.role);

  // Erste erlaubte Ansicht öffnen
  const first = VIEWS.find(v => v.roles.includes(user.role));
  switchView(first ? first.id : 'dashboard', user.role);
}

function roleLabel(role) {
  return { admin: 'Administrator', schule: 'Schule', gast: 'Gast' }[role] || role;
}

function visibleProjects(role) {
  return PROJECTS.filter(p => role === 'admin' || p.roles.includes(role));
}

function renderNav(role) {
  navLinks.innerHTML = '';
  VIEWS.filter(v => v.roles.includes(role)).forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'nav-link';
    btn.dataset.view = v.id;
    btn.textContent = v.label;
    btn.addEventListener('click', () => switchView(v.id, role));
    navLinks.appendChild(btn);
  });
}

function switchView(viewId, role) {
  document.querySelectorAll('.view').forEach(sec => {
    sec.hidden = sec.id !== `view-${viewId}`;
  });
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProjects(role) {
  const grid = document.getElementById('project-grid');
  const intro = document.getElementById('dashboard-intro');
  const projects = visibleProjects(role);
  grid.innerHTML = '';

  intro.textContent = role === 'admin'
    ? 'Alle Unterprojekte im Überblick.'
    : `Für dich freigegebene Projekte (${projects.length}).`;

  if (!projects.length) {
    grid.innerHTML = '<p class="empty">Keine Projekte für diese Rolle freigegeben.</p>';
    return;
  }

  projects.forEach(p => {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = p.path;
    card.innerHTML = `
      <div class="project-icon">${p.icon}</div>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <span class="project-link">Öffnen →</span>
      </div>`;
    grid.appendChild(card);
  });
}

function renderAdmin(role) {
  if (role !== 'admin') return;

  const tbody = document.querySelector('#users-table tbody');
  tbody.innerHTML = USERS.map(u =>
    `<tr><td>${u.username}</td><td>${u.name}</td><td>${roleLabel(u.role)}</td></tr>`
  ).join('');

  const list = document.getElementById('all-projects-list');
  list.innerHTML = PROJECTS.map(p =>
    `<li><a href="${p.path}">${p.icon} ${p.title}</a> <span class="muted">– ${p.roles.join(', ')}</span></li>`
  ).join('');
}

// ============================================
// INIT
// ============================================
function init() {
  const session = getSession();
  if (session) {
    showDashboard(session);
  } else {
    loginModal.style.display = 'flex';
    mainContent.classList.remove('active');
    usernameInput.focus();
  }

  loginForm.addEventListener('submit', handleLogin);
  logoutBtn.addEventListener('click', handleLogout);
}

document.addEventListener('DOMContentLoaded', init);
