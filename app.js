// ─── CONFIG ──────────────────────────────────────────────────────────────────
// 1. Create a Google Sheet with two tabs: "players" and "participants"
// 2. File → Share → Publish to web → choose each tab → CSV → copy the link
// 3. Paste the SHEET_ID (the long string in the URL) below
const SHEET_ID = '';  // ← paste your Google Sheet ID here

const csvUrl = (tab) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;

// Scoring weights
const PTS_GOAL   = 2;
const PTS_ASSIST = 1;

// ─── EMBEDDED PLAYER DATA (fallback when no Sheet ID set) ────────────────────
const PLAYERS_DATA = [
  {id:1,group:1,name:"Kylian Mbappe",nationality:"France",flag:"🇫🇷",club:"Real Madrid",position:"FW",clubGoals:39,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:2,group:1,name:"Erling Haaland",nationality:"Norway",flag:"🇳🇴",club:"Manchester City",position:"FW",clubGoals:35,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:3,group:1,name:"Harry Kane",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Bayern Munich",position:"FW",clubGoals:36,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:4,group:1,name:"Lamine Yamal",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"FW",clubGoals:22,clubAssists:16,wcGoals:0,wcAssists:0},
  {id:5,group:2,name:"Michael Olise",nationality:"France",flag:"🇫🇷",club:"Bayern Munich",position:"FW",clubGoals:22,clubAssists:14,wcGoals:0,wcAssists:0},
  {id:6,group:2,name:"Mohamed Salah",nationality:"Egypt",flag:"🇪🇬",club:"Liverpool",position:"FW",clubGoals:20,clubAssists:12,wcGoals:0,wcAssists:0},
  {id:7,group:2,name:"Vinicius Jr",nationality:"Brazil",flag:"🇧🇷",club:"Real Madrid",position:"FW",clubGoals:18,clubAssists:12,wcGoals:0,wcAssists:0},
  {id:8,group:2,name:"Jude Bellingham",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Real Madrid",position:"MF",clubGoals:18,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:9,group:3,name:"Bruno Fernandes",nationality:"Portugal",flag:"🇵🇹",club:"Manchester United",position:"MF",clubGoals:8,clubAssists:20,wcGoals:0,wcAssists:0},
  {id:10,group:3,name:"Raphinha",nationality:"Brazil",flag:"🇧🇷",club:"Barcelona",position:"FW",clubGoals:16,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:11,group:3,name:"Cristiano Ronaldo",nationality:"Portugal",flag:"🇵🇹",club:"Al Nassr",position:"FW",clubGoals:22,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:12,group:3,name:"Jamal Musiala",nationality:"Germany",flag:"🇩🇪",club:"Bayern Munich",position:"MF",clubGoals:14,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:13,group:4,name:"Cole Palmer",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Chelsea",position:"FW",clubGoals:15,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:14,group:4,name:"Phil Foden",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Manchester City",position:"MF",clubGoals:12,clubAssists:11,wcGoals:0,wcAssists:0},
  {id:15,group:4,name:"Florian Wirtz",nationality:"Germany",flag:"🇩🇪",club:"Bayer Leverkusen",position:"MF",clubGoals:14,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:16,group:4,name:"Bukayo Saka",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Arsenal",position:"FW",clubGoals:13,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:17,group:5,name:"Lionel Messi",nationality:"Argentina",flag:"🇦🇷",club:"Inter Miami",position:"FW",clubGoals:13,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:18,group:5,name:"Robert Lewandowski",nationality:"Poland",flag:"🇵🇱",club:"Barcelona",position:"FW",clubGoals:15,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:19,group:5,name:"Federico Dimarco",nationality:"Italy",flag:"🇮🇹",club:"Inter Milan",position:"DEF",clubGoals:4,clubAssists:16,wcGoals:0,wcAssists:0},
  {id:20,group:5,name:"Marcus Thuram",nationality:"France",flag:"🇫🇷",club:"Inter Milan",position:"FW",clubGoals:12,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:21,group:6,name:"Ousmane Dembele",nationality:"France",flag:"🇫🇷",club:"Paris Saint-Germain",position:"FW",clubGoals:11,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:22,group:6,name:"Kai Havertz",nationality:"Germany",flag:"🇩🇪",club:"Arsenal",position:"FW",clubGoals:12,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:23,group:6,name:"Julian Alvarez",nationality:"Argentina",flag:"🇦🇷",club:"Atletico Madrid",position:"FW",clubGoals:11,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:24,group:6,name:"Kevin De Bruyne",nationality:"Belgium",flag:"🇧🇪",club:"Manchester City",position:"MF",clubGoals:5,clubAssists:13,wcGoals:0,wcAssists:0},
  {id:25,group:7,name:"Lautaro Martinez",nationality:"Argentina",flag:"🇦🇷",club:"Inter Milan",position:"FW",clubGoals:13,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:26,group:7,name:"Son Heung-min",nationality:"South Korea",flag:"🇰🇷",club:"Tottenham Hotspur",position:"FW",clubGoals:12,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:27,group:7,name:"Christian Pulisic",nationality:"United States",flag:"🇺🇸",club:"AC Milan",position:"FW",clubGoals:11,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:28,group:7,name:"Pedri",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"MF",clubGoals:7,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:29,group:8,name:"Antoine Griezmann",nationality:"France",flag:"🇫🇷",club:"Atletico Madrid",position:"FW",clubGoals:11,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:30,group:8,name:"Goncalo Ramos",nationality:"Portugal",flag:"🇵🇹",club:"Paris Saint-Germain",position:"FW",clubGoals:13,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:31,group:8,name:"Dani Olmo",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"MF",clubGoals:9,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:32,group:8,name:"Federico Valverde",nationality:"Uruguay",flag:"🇺🇾",club:"Real Madrid",position:"MF",clubGoals:7,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:33,group:9,name:"Romelu Lukaku",nationality:"Belgium",flag:"🇧🇪",club:"Napoli",position:"FW",clubGoals:14,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:34,group:9,name:"Nico Williams",nationality:"Spain",flag:"🇪🇸",club:"Athletic Club",position:"FW",clubGoals:9,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:35,group:9,name:"Martin Odegaard",nationality:"Norway",flag:"🇳🇴",club:"Arsenal",position:"MF",clubGoals:7,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:36,group:9,name:"Cody Gakpo",nationality:"Netherlands",flag:"🇳🇱",club:"Liverpool",position:"FW",clubGoals:10,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:37,group:10,name:"Trent Alexander-Arnold",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Real Madrid",position:"MF",clubGoals:5,clubAssists:12,wcGoals:0,wcAssists:0},
  {id:38,group:10,name:"Theo Hernandez",nationality:"France",flag:"🇫🇷",club:"AC Milan",position:"DEF",clubGoals:6,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:39,group:10,name:"Achraf Hakimi",nationality:"Morocco",flag:"🇲🇦",club:"Paris Saint-Germain",position:"DEF",clubGoals:5,clubAssists:10,wcGoals:0,wcAssists:0},
  {id:40,group:10,name:"Bernardo Silva",nationality:"Portugal",flag:"🇵🇹",club:"Manchester City",position:"MF",clubGoals:8,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:41,group:11,name:"Christopher Nkunku",nationality:"France",flag:"🇫🇷",club:"Chelsea",position:"FW",clubGoals:12,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:42,group:11,name:"Alexander Isak",nationality:"Sweden",flag:"🇸🇪",club:"Newcastle United",position:"FW",clubGoals:12,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:43,group:11,name:"Xavi Simons",nationality:"Netherlands",flag:"🇳🇱",club:"RB Leipzig",position:"MF",clubGoals:9,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:44,group:11,name:"Leroy Sane",nationality:"Germany",flag:"🇩🇪",club:"Bayern Munich",position:"FW",clubGoals:9,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:45,group:12,name:"Victor Osimhen",nationality:"Nigeria",flag:"🇳🇬",club:"Galatasaray",position:"FW",clubGoals:14,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:46,group:12,name:"Darwin Nunez",nationality:"Uruguay",flag:"🇺🇾",club:"Liverpool",position:"FW",clubGoals:10,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:47,group:12,name:"Endrick",nationality:"Brazil",flag:"🇧🇷",club:"Real Madrid",position:"FW",clubGoals:8,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:48,group:12,name:"Marcus Rashford",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Aston Villa",position:"FW",clubGoals:9,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:49,group:13,name:"Warren Zaire-Emery",nationality:"France",flag:"🇫🇷",club:"Paris Saint-Germain",position:"MF",clubGoals:5,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:50,group:13,name:"Gavi",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"MF",clubGoals:4,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:51,group:13,name:"Fermin Lopez",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"MF",clubGoals:6,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:52,group:13,name:"Noni Madueke",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Chelsea",position:"FW",clubGoals:8,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:53,group:14,name:"Declan Rice",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Arsenal",position:"MF",clubGoals:5,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:54,group:14,name:"Nicolo Barella",nationality:"Italy",flag:"🇮🇹",club:"Inter Milan",position:"MF",clubGoals:5,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:55,group:14,name:"Hakan Calhanoglu",nationality:"Turkey",flag:"🇹🇷",club:"Inter Milan",position:"MF",clubGoals:7,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:56,group:14,name:"Hakim Ziyech",nationality:"Morocco",flag:"🇲🇦",club:"Galatasaray",position:"FW",clubGoals:7,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:57,group:15,name:"Alphonso Davies",nationality:"Canada",flag:"🇨🇦",club:"Bayern Munich",position:"DEF",clubGoals:3,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:58,group:15,name:"Joao Cancelo",nationality:"Portugal",flag:"🇵🇹",club:"Barcelona",position:"DEF",clubGoals:3,clubAssists:9,wcGoals:0,wcAssists:0},
  {id:59,group:15,name:"Denzel Dumfries",nationality:"Netherlands",flag:"🇳🇱",club:"Inter Milan",position:"DEF",clubGoals:4,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:60,group:15,name:"Timothy Weah",nationality:"United States",flag:"🇺🇸",club:"Juventus",position:"FW",clubGoals:6,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:61,group:16,name:"Memphis Depay",nationality:"Netherlands",flag:"🇳🇱",club:"Atletico Madrid",position:"FW",clubGoals:8,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:62,group:16,name:"Kephren Thuram",nationality:"France",flag:"🇫🇷",club:"Juventus",position:"MF",clubGoals:4,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:63,group:16,name:"Alvaro Morata",nationality:"Spain",flag:"🇪🇸",club:"AC Milan",position:"FW",clubGoals:8,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:64,group:16,name:"Richarlison",nationality:"Brazil",flag:"🇧🇷",club:"Tottenham Hotspur",position:"FW",clubGoals:7,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:65,group:17,name:"Ferran Torres",nationality:"Spain",flag:"🇪🇸",club:"Barcelona",position:"FW",clubGoals:6,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:66,group:17,name:"Eduardo Camavinga",nationality:"France",flag:"🇫🇷",club:"Real Madrid",position:"MF",clubGoals:3,clubAssists:8,wcGoals:0,wcAssists:0},
  {id:67,group:17,name:"Rafael Leao",nationality:"Portugal",flag:"🇵🇹",club:"AC Milan",position:"FW",clubGoals:7,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:68,group:17,name:"Lucas Paqueta",nationality:"Brazil",flag:"🇧🇷",club:"West Ham United",position:"MF",clubGoals:5,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:69,group:18,name:"Jonathan David",nationality:"Canada",flag:"🇨🇦",club:"Lille",position:"FW",clubGoals:12,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:70,group:18,name:"Youssef En-Nesyri",nationality:"Morocco",flag:"🇲🇦",club:"Fenerbahce",position:"FW",clubGoals:10,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:71,group:18,name:"Ademola Lookman",nationality:"Nigeria",flag:"🇳🇬",club:"Atalanta",position:"FW",clubGoals:8,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:72,group:18,name:"Ivan Toney",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Al-Ahli",position:"FW",clubGoals:8,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:73,group:19,name:"Alexis Mac Allister",nationality:"Argentina",flag:"🇦🇷",club:"Liverpool",position:"MF",clubGoals:6,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:74,group:19,name:"Andrew Robertson",nationality:"Scotland",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",club:"Liverpool",position:"DEF",clubGoals:2,clubAssists:7,wcGoals:0,wcAssists:0},
  {id:75,group:19,name:"Brennan Johnson",nationality:"Wales",flag:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",club:"Tottenham Hotspur",position:"FW",clubGoals:7,clubAssists:3,wcGoals:0,wcAssists:0},
  {id:76,group:19,name:"Gio Reyna",nationality:"United States",flag:"🇺🇸",club:"Nottingham Forest",position:"MF",clubGoals:4,clubAssists:6,wcGoals:0,wcAssists:0},
  {id:77,group:20,name:"Jack Grealish",nationality:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",club:"Manchester City",position:"MF",clubGoals:4,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:78,group:20,name:"Scott McTominay",nationality:"Scotland",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",club:"Napoli",position:"MF",clubGoals:5,clubAssists:4,wcGoals:0,wcAssists:0},
  {id:79,group:20,name:"Mikel Merino",nationality:"Spain",flag:"🇪🇸",club:"Arsenal",position:"MF",clubGoals:4,clubAssists:5,wcGoals:0,wcAssists:0},
  {id:80,group:20,name:"Tyler Adams",nationality:"United States",flag:"🇺🇸",club:"Bournemouth",position:"MF",clubGoals:2,clubAssists:5,wcGoals:0,wcAssists:0}
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let PLAYERS = [];        // array of player objects
let PARTICIPANTS = [];   // array of { name, picks: [playerId, …] (len 20) }

// ─── DATA LOADING ─────────────────────────────────────────────────────────────
async function loadPlayers() {
  if (SHEET_ID) {
    try {
      const text = await fetchCsv(csvUrl('players'));
      PLAYERS = parsePlayers(text);
      return;
    } catch (e) {
      console.warn('Sheets fetch failed, using embedded data', e);
    }
  }
  // Use embedded data — works offline and as local file
  PLAYERS = PLAYERS_DATA;
}

async function loadParticipants() {
  if (!SHEET_ID) return;
  try {
    const text = await fetchCsv(csvUrl('participants'));
    PARTICIPANTS = parseParticipants(text);
  } catch (e) {
    console.warn('Could not load participants sheet:', e);
  }
}

async function fetchCsv(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// ─── CSV PARSERS ──────────────────────────────────────────────────────────────
function parseCsvLine(line) {
  const result = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      result.push(cur.trim()); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseCsv(text) {
  const lines = text.trim().split('\n').filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).map(line => {
    const vals = parseCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ''; });
    return obj;
  });
}

function parsePlayers(csvText) {
  return parseCsv(csvText).map(r => ({
    id:           parseInt(r.id),
    group:        parseInt(r.group),
    name:         r.name,
    nationality:  r.nationality,
    flag:         r.flag,
    club:         r.club,
    position:     r.position,
    clubGoals:    parseInt(r.club_goals)   || 0,
    clubAssists:  parseInt(r.club_assists) || 0,
    wcGoals:      parseInt(r.wc_goals)     || 0,
    wcAssists:    parseInt(r.wc_assists)   || 0,
  }));
}

function parseParticipants(csvText) {
  // Expected columns: name, g1, g2, …, g20
  return parseCsv(csvText).map(r => ({
    name: r.name,
    picks: Array.from({ length: 20 }, (_, i) => parseInt(r[`g${i + 1}`]) || null),
  }));
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getPlayer(id) {
  return PLAYERS.find(p => p.id === id);
}

function playerPoints(player) {
  return (player.wcGoals * PTS_GOAL) + (player.wcAssists * PTS_ASSIST);
}

function participantPoints(participant) {
  return participant.picks.reduce((sum, id) => {
    const p = getPlayer(id);
    return sum + (p ? playerPoints(p) : 0);
  }, 0);
}

function posClass(pos) {
  if (pos === 'DEF') return 'pos-DEF';
  if (pos === 'MF')  return 'pos-MF';
  return 'pos-FW';
}

function rankLabel(group) {
  const top = PLAYERS.filter(p => p.group === group)
    .sort((a, b) => (b.clubGoals + b.clubAssists) - (a.clubGoals + a.clubAssists));
  if (top.length === 0) return '';
  const best = top[0].clubGoals + top[0].clubAssists;
  return `Top G+A <span>${best}</span>`;
}

// ─── GROUPS PAGE ──────────────────────────────────────────────────────────────
async function initGroupsPage() {
  await loadPlayers();
  renderGroups();
  initModal();
}

function renderGroups() {
  const grid = document.getElementById('groups-grid');
  grid.innerHTML = '';

  for (let g = 1; g <= 20; g++) {
    const players = PLAYERS.filter(p => p.group === g)
      .sort((a, b) => (b.clubGoals + b.clubAssists) - (a.clubGoals + a.clubAssists));

    const card = document.createElement('div');
    card.className = 'group-card';

    card.innerHTML = `
      <div class="group-header">
        <span class="group-number">Group ${g}</span>
        <span class="group-rank-label">${rankLabel(g)}</span>
      </div>
      ${players.map(p => `
        <div class="player-row" data-id="${p.id}">
          <span class="player-flag">${p.flag}</span>
          <div class="player-info">
            <div class="player-name">${p.name}</div>
            <div class="player-club">${p.club}</div>
          </div>
          <span class="player-pos-badge ${posClass(p.position)}">${p.position}</span>
          <div class="player-ga">
            ${p.clubGoals + p.clubAssists}
            <small>G+A</small>
          </div>
        </div>
      `).join('')}
    `;

    card.querySelectorAll('.player-row').forEach(row => {
      row.addEventListener('click', () => openModal(parseInt(row.dataset.id)));
    });

    grid.appendChild(card);
  }
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
  const p = getPlayer(id);
  if (!p) return;

  document.getElementById('modal-flag').textContent        = p.flag;
  document.getElementById('modal-name').textContent        = p.name;
  document.getElementById('modal-nationality').textContent = p.nationality;
  document.getElementById('modal-club').textContent        = p.club;

  const posBadge = document.getElementById('modal-pos-badge');
  posBadge.textContent = p.position;
  posBadge.className   = `pos-badge ${posClass(p.position)}`;

  document.getElementById('modal-club-goals').textContent   = p.clubGoals;
  document.getElementById('modal-club-assists').textContent = p.clubAssists;
  document.getElementById('modal-club-ga').textContent      = p.clubGoals + p.clubAssists;
  document.getElementById('modal-wc-goals').textContent     = p.wcGoals;
  document.getElementById('modal-wc-assists').textContent   = p.wcAssists;
  document.getElementById('modal-wc-pts').textContent       = playerPoints(p);
  document.getElementById('modal-group-tag').textContent    = `Group ${p.group}`;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── STANDINGS PAGE ───────────────────────────────────────────────────────────
async function initStandingsPage() {
  await loadPlayers();
  await loadParticipants();
  renderStandings();
}

function renderStandings() {
  const container = document.getElementById('standings-content');

  if (!SHEET_ID) {
    container.innerHTML = `
      <div class="state-msg">
        <div class="icon">🔗</div>
        <h3>Connect your Google Sheet</h3>
        <p>
          Open <code>app.js</code> and paste your Google Sheet ID into the <code>SHEET_ID</code> variable.<br><br>
          Then add participant names and their picks (player IDs G1–G20) to the <strong>participants</strong> tab.<br><br>
          See <code>SETUP.md</code> for step-by-step instructions.
        </p>
      </div>`;
    return;
  }

  if (PARTICIPANTS.length === 0) {
    container.innerHTML = `
      <div class="state-msg">
        <div class="icon">👥</div>
        <h3>No participants yet</h3>
        <p>Add participant rows to the <strong>participants</strong> tab of your Google Sheet.</p>
      </div>`;
    return;
  }

  const ranked = [...PARTICIPANTS]
    .map(p => ({ ...p, total: participantPoints(p) }))
    .sort((a, b) => b.total - a.total);

  // Set last-updated text from a player's data (or just use today)
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('last-updated').textContent = `Last updated: ${today}`;

  // Check if tournament has started (any player has wc goals/assists)
  const started = PLAYERS.some(p => p.wcGoals > 0 || p.wcAssists > 0);
  if (started) {
    document.getElementById('tournament-status').textContent = '⚽ Tournament in progress';
  }

  const table = document.createElement('table');
  table.className = 'standings-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th style="width:48px">Rank</th>
        <th>Participant</th>
        <th style="text-align:right">WC Goals</th>
        <th style="text-align:right">WC Assists</th>
        <th style="text-align:right">Points</th>
      </tr>
    </thead>
    <tbody id="standings-tbody"></tbody>
  `;

  const tbody = table.querySelector('#standings-tbody');

  ranked.forEach((participant, idx) => {
    const rank = idx + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;

    const wcGoals   = participant.picks.reduce((s, id) => s + (getPlayer(id)?.wcGoals || 0), 0);
    const wcAssists = participant.picks.reduce((s, id) => s + (getPlayer(id)?.wcAssists || 0), 0);

    // Main row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="rank-cell ${rankClass}">${rankEmoji}</td>
      <td><span class="participant-name">${participant.name}</span></td>
      <td style="text-align:right; color:#ff7777; font-weight:700">${wcGoals}</td>
      <td style="text-align:right; color:#77aaff; font-weight:700">${wcAssists}</td>
      <td class="points-cell">${participant.total}<div class="pts-breakdown">${wcGoals * PTS_GOAL}g + ${wcAssists * PTS_ASSIST}a</div></td>
    `;

    // Picks expandable row
    const picksRow = document.createElement('tr');
    picksRow.className = 'picks-row';
    const picksCell = document.createElement('td');
    picksCell.colSpan = 5;

    const picksGrid = document.createElement('div');
    picksGrid.className = 'picks-grid';

    participant.picks.forEach((id, gIdx) => {
      const p = getPlayer(id);
      const chip = document.createElement('div');
      chip.className = 'pick-chip';
      if (p) {
        const pts = playerPoints(p);
        chip.innerHTML = `
          <span class="grp">G${gIdx + 1}</span>
          <span class="pflag">${p.flag}</span>
          <span class="pname">${p.name}</span>
          <span class="ppts">${pts > 0 ? pts + 'pt' : '—'}</span>
        `;
      } else {
        chip.innerHTML = `<span class="grp">G${gIdx + 1}</span><span class="pname" style="color:var(--grey)">Not picked</span>`;
      }
      picksGrid.appendChild(chip);
    });

    picksCell.appendChild(picksGrid);
    picksRow.appendChild(picksCell);

    // Toggle expand
    row.addEventListener('click', () => {
      const isOpen = picksRow.classList.toggle('visible');
      row.classList.toggle('expanded', isOpen);
    });

    tbody.appendChild(row);
    tbody.appendChild(picksRow);
  });

  container.innerHTML = '';
  container.appendChild(table);
}
