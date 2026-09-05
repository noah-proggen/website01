const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;
const usersPath = path.join(root, 'users.json');
const staticFiles = {
  '/': ['index.html', 'text/html'],
  '/index.html': ['index.html', 'text/html'],
  '/script.js': ['script.js', 'text/javascript'],
  '/style.css': ['style.css', 'text/css']
};

function readUsers() {
  return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, `${JSON.stringify(users, null, 2)}\n`);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function passwordMatches(password, storedHash) {
  const [salt, expected] = storedHash.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
    });
    request.on('error', reject);
  });
}

async function handleApi(request, response, pathname) {
  if (request.method !== 'POST' || !['/api/login', '/api/register'].includes(pathname)) {
    sendJson(response, 404, { error: 'Nicht gefunden.' });
    return;
  }
  try {
    const { email, password } = await readBody(request);
    if (!email || !password || password.length < 6) {
      sendJson(response, 400, { error: 'E-Mail und ein Passwort mit mindestens 6 Zeichen sind erforderlich.' });
      return;
    }
    const users = readUsers();
    const existingUser = users.find((user) => user.email === email);
    if (pathname === '/api/register') {
      if (existingUser) {
        sendJson(response, 409, { error: 'Für diese E-Mail gibt es bereits einen Account.' });
        return;
      }
      users.push({ email, passwordHash: hashPassword(password) });
      writeUsers(users);
    } else if (!existingUser || !passwordMatches(password, existingUser.passwordHash)) {
      sendJson(response, 401, { error: 'E-Mail-Adresse oder Passwort ist nicht korrekt.' });
      return;
    }
    sendJson(response, 200, { email });
  } catch (error) {
    sendJson(response, 400, { error: 'Ungültige Anfrage.' });
  }
}

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  if (pathname.startsWith('/api/')) {
    await handleApi(request, response, pathname);
    return;
  }
  const file = staticFiles[pathname];
  if (!file) {
    response.writeHead(404);
    response.end('Nicht gefunden.');
    return;
  }
  response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8` });
  fs.createReadStream(path.join(root, file[0])).pipe(response);
});

server.listen(port, () => {
  console.log(`FORME läuft auf http://localhost:${port}`);
});