/**
 * Lokales Projekt-Dashboard
 * - Login ohne Server (Daten kommen aus users.json)
 * - Rollenbasierte Ansichten, pro Benutzer freigeschaltete Projekte
 * - Verwaltung (nur admin): Benutzer anlegen/löschen, Projektzugriff je
 *   Benutzer per Checkbox steuern, Stand als users.json herunterladen
 *
 * Persistenz: Diese Seite ist statisch (kein Server/Backend). Änderungen
 * der Verwaltung werden sofort im Browser (localStorage-Entwurf) gespiegelt,
 * damit nichts beim Neuladen verloren geht. Für alle Besucher gültig wird
 * ein Stand erst, wenn die heruntergeladene users.json auf dem Webspace
 * hochgeladen wird (ersetzt die bisherige Datei im Website-Ordner).
 */

// ============================================
// KONFIGURATION
// ============================================
const DATA_URL = 'users.json';
const DRAFT_KEY = 'projektDashboard_draft';
const SESSION_KEY = 'projektDashboard_session';

// Fallback, falls users.json nicht geladen werden kann (z. B. Aufruf über file://)
const FALLBACK_DATA = {
  projects: [
    { id: 'seebad-caputh', title: 'Seebad Caputh', description: 'Strandbad & Restaurant am Schwielowsee.', icon: '🏖️', path: 'pages/seebad-caputh/index.html', category: 'Websites', tags: ['Website'] },
    { id: 'schule', title: 'Schulprojekte', description: 'Sammelseite mit Schul-Unterprojekten.', icon: '🎓', path: 'pages/schule/index.html', category: 'Schule', tags: ['Schule'] },
    { id: 'geo-guesser', title: 'Geo-Guesser', description: 'Mini-Spiel: Länder anhand von 360°-Panoramen erraten.', icon: '🌍', path: 'pages/geo-guesser/index.html', category: 'Spiele', tags: ['Spiel'] },
    { id: 'page01', title: 'FORME Experiment', description: 'Altes Layout-Experiment.', icon: '🧪', path: 'pages/page01/index.html', category: 'Experimente', tags: ['Experiment'] },
  ],
  users: [
    { username: 'noah', password: 'noah', name: 'Noah', role: 'admin', projects: [] },
    { username: 'schule', password: 'schule', name: 'Schule', role: 'user', projects: ['schule'] },
    { username: 'gast', password: 'gast', name: 'Gast', role: 'user', projects: ['seebad-caputh', 'geo-guesser'] },
  ],
};

const VIEWS = [
  { id: 'dashboard', label: 'Dashboard', roles: ['admin', 'user'] },
  { id: 'admin', label: 'Verwaltung', roles: ['admin'] },
];

const ACCENTS = ['lime', 'purple', 'orange', 'cyan'];
const THEME_KEY = 'dashboardTheme';

// ============================================
// STATUS
// ============================================
let DATA = null;           // { projects: [...], users: [...] } – aktueller (evtl. Entwurfs-)Stand
let REMOTE_SNAPSHOT = null; // zuletzt von users.json geladener Stand, für "Verwerfen"
let hasDraft = false;
let currentUser = null;
let searchTerm = '';

// ============================================
// DOM
// ============================================
const loginModal    = document.getElementById('login-modal');
const mainContent    = document.getElementById('main-content');
const loginForm      = document.getElementById('login-form');
const loginError     = document.getElementById('login-error');
const usernameInput  = document.getElementById('username');
const passwordInput  = document.getElementById('password');
const logoutBtn      = document.getElementById('logout-btn');
const headerNav      = document.getElementById('header-nav');
const sidebarNav     = document.getElementById('sidebar-nav');
const searchInput    = document.getElementById('search-input');
const themeToggleBtn = document.getElementById('theme-toggle');

// ============================================
// DATEN LADEN
// ============================================
async function loadData() {
  let remote = null;
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (res.ok) remote = await res.json();
  } catch (e) {
    // z. B. file:// ohne Server – Fallback wird verwendet
  }
  if (!remote || !Array.isArray(remote.users) || !Array.isArray(remote.projects)) {
    remote = FALLBACK_DATA;
  }
  REMOTE_SNAPSHOT = JSON.parse(JSON.stringify(remote));

  let draft = null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) draft = JSON.parse(raw);
  } catch (e) {
    draft = null;
  }

  hasDraft = !!(draft && Array.isArray(draft.users) && Array.isArray(draft.projects));
  DATA = hasDraft ? draft : JSON.parse(JSON.stringify(remote));
}

function saveDraft() {
  hasDraft = true;
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(DATA)); } catch (e) { /* ignore */ }
}

function discardDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ }
  hasDraft = false;
  DATA = JSON.parse(JSON.stringify(REMOTE_SNAPSHOT));
  renderAdminView();
  renderDashboardView();
}

function downloadUsersJson() {
  const payload = { projects: DATA.projects, users: DATA.users };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'users.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================
// SESSION
// ============================================
function setSession(user) {
  const session = { username: user.username, ts: Date.now() };
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { /* ignore */ }
}

function getSessionUsername() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && s.username ? s.username : null;
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

  const user = DATA.users.find(u => u.username === username && u.password === password);

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
  currentUser = null;
  mainContent.classList.remove('active');
  loginModal.style.display = 'flex';
  loginForm.reset();
  loginError.textContent = '';
  usernameInput.focus();
}

// ============================================
// HILFSFUNKTIONEN
// ============================================
function roleLabel(role) {
  return role === 'admin' ? 'Administrator' : 'Benutzer';
}

function initials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('') || '?';
}

function findUser(username) {
  return DATA.users.find(u => u.username === username) || null;
}

function visibleProjects(user) {
  if (user.role === 'admin') return DATA.projects;
  const allowed = new Set(user.projects || []);
  return DATA.projects.filter(p => allowed.has(p.id));
}

function groupByCategory(projects) {
  const groups = [];
  const index = new Map();
  projects.forEach(p => {
    const cat = p.category || 'Sonstiges';
    if (!index.has(cat)) {
      index.set(cat, { category: cat, items: [] });
      groups.push(index.get(cat));
    }
    index.get(cat).items.push(p);
  });
  return groups;
}

function matchesSearch(project, term) {
  if (!term) return true;
  const haystack = [project.title, project.description, ...(project.tags || [])].join(' ').toLowerCase();
  return haystack.includes(term.toLowerCase());
}

// ============================================
// DASHBOARD-AUFBAU
// ============================================
function showDashboard(user) {
  currentUser = user;
  loginModal.style.display = 'none';
  mainContent.classList.add('active');

  renderTopbar(user);
  renderNav(user);

  const firstView = VIEWS.find(v => v.roles.includes(user.role));
  switchView(firstView ? firstView.id : 'dashboard');
}

function renderTopbar(user) {
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-avatar').textContent = initials(user.name);
  const badge = document.getElementById('user-role-badge');
  badge.textContent = roleLabel(user.role);
  badge.classList.toggle('admin', user.role === 'admin');
}

// Baut sowohl die Header-Navigation als auch die Sidebar-Navigation aus
// derselben VIEWS-Liste auf – beide sind reine Textlinks (keine Icons).
function renderNav(user) {
  const items = VIEWS.filter(v => v.roles.includes(user.role));

  headerNav.innerHTML = '';
  sidebarNav.innerHTML = '';

  items.forEach(v => {
    const headerLink = document.createElement('button');
    headerLink.type = 'button';
    headerLink.className = 'header-nav-link';
    headerLink.dataset.view = v.id;
    headerLink.textContent = v.label;
    headerLink.addEventListener('click', () => switchView(v.id));
    headerNav.appendChild(headerLink);

    const sidebarLink = document.createElement('button');
    sidebarLink.type = 'button';
    sidebarLink.className = 'sidebar-btn';
    sidebarLink.dataset.view = v.id;
    sidebarLink.textContent = v.label;
    sidebarLink.addEventListener('click', () => switchView(v.id));
    sidebarNav.appendChild(sidebarLink);
  });
}

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(sec => {
    sec.hidden = sec.id !== `view-${viewId}`;
  });
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  if (viewId === 'dashboard') renderDashboardView();
  if (viewId === 'admin') renderAdminView();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// ANSICHT: DASHBOARD
// ============================================
function renderDashboardView() {
  if (!currentUser) return;
  const intro = document.getElementById('dashboard-intro');
  intro.textContent = currentUser.role === 'admin'
    ? 'Alle Unterprojekte im Überblick.'
    : `Für dich freigegebene Projekte.`;

  renderStats(currentUser);
  renderProjectSections(currentUser);
}

function renderStats(user) {
  const grid = document.getElementById('stat-grid');
  const projects = visibleProjects(user);
  const total = DATA.projects.length;
  const categories = new Set(projects.map(p => p.category || 'Sonstiges')).size;
  const share = total ? Math.round((projects.length / total) * 100) : 0;

  const stats = [
    { label: 'Freigegebene Projekte', value: `${projects.length} / ${total}`, sub: 'für dein Konto sichtbar', accent: 'lime', fill: share },
    { label: 'Kategorien', value: String(categories), sub: 'unterschiedliche Bereiche', accent: 'purple', fill: total ? Math.round((categories / total) * 100) : 0 },
    user.role === 'admin'
      ? { label: 'Benutzer', value: String(DATA.users.length), sub: 'im System angelegt', accent: 'orange', fill: 100 }
      : { label: 'Deine Rolle', value: roleLabel(user.role), sub: user.name, accent: 'orange', fill: 60 },
  ];

  grid.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-label"><span>${s.label}</span></div>
      <div class="stat-bar"><div class="stat-bar-fill ${s.accent}" style="width:${s.fill}%"></div></div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-sub">${s.sub}</div>
    </div>
  `).join('');
}

function renderProjectSections(user) {
  const container = document.getElementById('project-sections');
  const projects = visibleProjects(user).filter(p => matchesSearch(p, searchTerm));
  container.innerHTML = '';

  if (!projects.length) {
    container.innerHTML = '<p class="empty">Keine Projekte gefunden.</p>';
    return;
  }

  const groups = groupByCategory(projects);
  groups.forEach((group, groupIndex) => {
    const accent = ACCENTS[groupIndex % ACCENTS.length];
    const section = document.createElement('div');
    section.className = 'category-section';
    section.innerHTML = `
      <h3 class="category-title"><span class="category-dot ${accent}"></span>${group.category}</h3>
      <div class="project-grid">
        ${group.items.map(p => `
          <a class="project-card" href="${p.path}">
            <div class="project-icon chip-${accent}">${p.icon}</div>
            <div class="project-info">
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              <div class="project-tags">${(p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
              <span class="project-link">Öffnen →</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  });
}

// ============================================
// ANSICHT: VERWALTUNG (nur admin)
// ============================================
function renderAdminView() {
  if (!currentUser || currentUser.role !== 'admin') return;
  renderDraftBanner();
  renderUsersList();
}

function renderDraftBanner() {
  const banner = document.getElementById('draft-banner');
  if (!hasDraft) {
    banner.innerHTML = '';
    return;
  }
  banner.innerHTML = `
    <div class="draft-banner">
      <span>⚠️ Es gibt ungespeicherte Änderungen, die nur in diesem Browser liegen. Lade die JSON herunter und lade sie auf den Webspace hoch, damit sie für alle gilt.</span>
    </div>
  `;
}

function renderUsersList() {
  const list = document.getElementById('users-list');
  list.innerHTML = DATA.users.map(u => renderUserRow(u)).join('');

  list.querySelectorAll('[data-action="update-field"]').forEach(input => {
    input.addEventListener('change', () => {
      const username = input.dataset.username;
      const field = input.dataset.field;
      updateUser(username, field, input.value);
    });
  });

  list.querySelectorAll('[data-action="toggle-project"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      toggleUserProject(checkbox.dataset.username, checkbox.dataset.project, checkbox.checked);
    });
  });

  list.querySelectorAll('[data-action="delete-user"]').forEach(btn => {
    btn.addEventListener('click', () => deleteUser(btn.dataset.username));
  });
}

function renderUserRow(user) {
  const isSelf = currentUser && currentUser.username === user.username;
  const isOnlyAdmin = user.role === 'admin' && DATA.users.filter(u => u.role === 'admin').length <= 1;
  const disableDelete = isSelf || isOnlyAdmin;

  const projectChecks = user.role === 'admin'
    ? '<p class="muted">Administratoren sehen automatisch alle Projekte.</p>'
    : `<div class="project-checks">${DATA.projects.map(p => `
        <label class="check-pill ${(user.projects || []).includes(p.id) ? 'checked' : ''}">
          <input type="checkbox" data-action="toggle-project" data-username="${user.username}" data-project="${p.id}" ${(user.projects || []).includes(p.id) ? 'checked' : ''}>
          ${p.icon} ${p.title}
        </label>
      `).join('')}</div>`;

  return `
    <div class="user-row">
      <div class="user-row-head">
        <div>
          <strong>${user.username}</strong>
          <span class="role-badge ${user.role === 'admin' ? 'admin' : ''}">${roleLabel(user.role)}</span>
        </div>
        <button type="button" class="btn btn-danger" data-action="delete-user" data-username="${user.username}" ${disableDelete ? 'disabled' : ''}>
          Löschen
        </button>
      </div>

      <div class="user-fields">
        <div class="form-group">
          <label>Anzeigename</label>
          <input type="text" value="${user.name}" data-action="update-field" data-username="${user.username}" data-field="name">
        </div>
        <div class="form-group">
          <label>Passwort</label>
          <input type="text" value="${user.password}" data-action="update-field" data-username="${user.username}" data-field="password">
        </div>
        <div class="form-group">
          <label>Rolle</label>
          <select data-action="update-field" data-username="${user.username}" data-field="role" ${isSelf ? 'disabled' : ''}>
            <option value="user" ${user.role === 'user' ? 'selected' : ''}>Benutzer</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrator</option>
          </select>
        </div>
      </div>

      <p class="muted">Sichtbare Projekte:</p>
      ${projectChecks}
    </div>
  `;
}

function updateUser(username, field, value) {
  const user = findUser(username);
  if (!user) return;
  user[field] = value;
  if (field === 'role' && value === 'admin') user.projects = [];
  saveDraft();
  renderAdminView();
  if (currentUser && currentUser.username === username) renderTopbar(currentUser);
}

function toggleUserProject(username, projectId, checked) {
  const user = findUser(username);
  if (!user) return;
  const set = new Set(user.projects || []);
  if (checked) set.add(projectId); else set.delete(projectId);
  user.projects = Array.from(set);
  saveDraft();
  renderAdminView();
}

function deleteUser(username) {
  const user = findUser(username);
  if (!user) return;
  if (!confirm(`Benutzer "${username}" wirklich löschen?`)) return;
  DATA.users = DATA.users.filter(u => u.username !== username);
  saveDraft();
  renderAdminView();
}

function handleAddUser(e) {
  e.preventDefault();
  const username = document.getElementById('new-username').value.trim();
  const name = document.getElementById('new-name').value.trim();
  const password = document.getElementById('new-password').value.trim();
  const role = document.getElementById('new-role').value;

  if (!username || !name || !password) return;

  if (findUser(username)) {
    alert('Dieser Benutzername existiert bereits.');
    return;
  }

  DATA.users.push({ username, password, name, role, projects: [] });
  saveDraft();
  renderAdminView();
  e.target.reset();
}

// ============================================
// DARK / HELL MODE
// ============================================
// Die Theme-Klasse selbst wird bereits per Inline-Script im <head> gesetzt
// (verhindert ein kurzes Aufblitzen des falschen Themes beim Laden).
// Hier wird nur noch der Umschalt-Button synchronisiert und bedient.
function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function updateThemeToggleLabel(theme) {
  themeToggleBtn.textContent = theme === 'light' ? '🌙 Dunkel' : '☀️ Hell';
}

function toggleTheme() {
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  updateThemeToggleLabel(next);
}

// ============================================
// INIT
// ============================================
async function init() {
  updateThemeToggleLabel(currentTheme());
  themeToggleBtn.addEventListener('click', toggleTheme);

  await loadData();

  const sessionUsername = getSessionUsername();
  const sessionUser = sessionUsername ? findUser(sessionUsername) : null;

  if (sessionUser) {
    showDashboard(sessionUser);
  } else {
    loginModal.style.display = 'flex';
    mainContent.classList.remove('active');
    usernameInput.focus();
  }

  loginForm.addEventListener('submit', handleLogin);
  logoutBtn.addEventListener('click', handleLogout);

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value;
    renderProjectSections(currentUser);
  });

  document.getElementById('save-json-btn').addEventListener('click', downloadUsersJson);
  document.getElementById('discard-draft-btn').addEventListener('click', () => {
    if (confirm('Alle ungespeicherten Änderungen verwerfen?')) discardDraft();
  });
  document.getElementById('add-user-form').addEventListener('submit', handleAddUser);
}

document.addEventListener('DOMContentLoaded', init);
