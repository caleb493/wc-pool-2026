// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SHEET_ID   = '';  // ← your Google Sheet ID
const SCRIPT_URL = '';  // ← your Apps Script Web App URL

const csvUrl = (tab) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;

const PTS_GOAL   = 2;
const PTS_ASSIST = 1;
const TOTAL_GROUPS = 16;

// ─── CONFEDERATION CONFIG ─────────────────────────────────────────────────────
const CONF_STYLE = {
  UEFA:     { color: '#4499ff', bg: 'rgba(68,153,255,0.15)' },
  CONMEBOL: { color: '#00cc88', bg: 'rgba(0,204,136,0.15)' },
  CONCACAF: { color: '#ff8833', bg: 'rgba(255,136,51,0.15)' },
  CAF:      { color: '#ffcc00', bg: 'rgba(255,204,0,0.15)'  },
  AFC:      { color: '#ff4455', bg: 'rgba(255,68,85,0.15)'  },
};

// ─── PLAYER DATA ──────────────────────────────────────────────────────────────
const PLAYERS_DATA = [
  // GROUP 1
  {id:1, group:1, name:"Harry Kane",        nationality:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", club:"Bayern Munich",        position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:2, group:1, name:"Kylian Mbappe",     nationality:"France",      flag:"🇫🇷", club:"Real Madrid",          position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:3, group:1, name:"Erling Haaland",    nationality:"Norway",      flag:"🇳🇴", club:"Manchester City",      position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:4, group:1, name:"Lamine Yamal",      nationality:"Spain",       flag:"🇪🇸", club:"Barcelona",            position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 2
  {id:5, group:2, name:"Michael Olise",     nationality:"France",      flag:"🇫🇷", club:"Bayern Munich",        position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:6, group:2, name:"Raphinha",          nationality:"Brazil",      flag:"🇧🇷", club:"Barcelona",            position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:7, group:2, name:"Lionel Messi",      nationality:"Argentina",   flag:"🇦🇷", club:"Inter Miami",          position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:8, group:2, name:"Cristiano Ronaldo", nationality:"Portugal",    flag:"🇵🇹", club:"Al Nassr",             position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 3
  {id:9,  group:3, name:"Vinicius Jr",      nationality:"Brazil",      flag:"🇧🇷", club:"Real Madrid",          position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:10, group:3, name:"Bruno Fernandes",  nationality:"Portugal",    flag:"🇵🇹", club:"Manchester United",    position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:11, group:3, name:"Jude Bellingham",  nationality:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", club:"Real Madrid",          position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:12, group:3, name:"Florian Wirtz",    nationality:"Germany",     flag:"🇩🇪", club:"Bayern Munich",        position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 4
  {id:13, group:4, name:"Mohamed Salah",    nationality:"Egypt",       flag:"🇪🇬", club:"Liverpool",            position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:14, group:4, name:"Ousmane Dembele",  nationality:"France",      flag:"🇫🇷", club:"Paris Saint-Germain",  position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:15, group:4, name:"Jamal Musiala",    nationality:"Germany",     flag:"🇩🇪", club:"Bayern Munich",        position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:16, group:4, name:"Bukayo Saka",      nationality:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", club:"Arsenal",              position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 5
  {id:17, group:5, name:"Igor Thiago",      nationality:"Brazil",      flag:"🇧🇷", club:"Brentford",            position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:18, group:5, name:"Cody Gakpo",       nationality:"Netherlands", flag:"🇳🇱", club:"Liverpool",            position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:19, group:5, name:"Lautaro Martinez", nationality:"Argentina",   flag:"🇦🇷", club:"Inter Milan",          position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:20, group:5, name:"Luis Diaz",        nationality:"Colombia",    flag:"🇨🇴", club:"Borussia Dortmund",    position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},

  // GROUP 6
  {id:21, group:6, name:"Viktor Gyokeres",  nationality:"Sweden",      flag:"🇸🇪", club:"Arsenal",              position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:22, group:6, name:"Julian Alvarez",   nationality:"Argentina",   flag:"🇦🇷", club:"Atletico Madrid",      position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:23, group:6, name:"Anthony Gordon",   nationality:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", club:"Newcastle United",     position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:24, group:6, name:"Romelu Lukaku",    nationality:"Belgium",     flag:"🇧🇪", club:"Napoli",               position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 7
  {id:25, group:7, name:"Alexander Sorloth",nationality:"Norway",      flag:"🇳🇴", club:"Atletico Madrid",      position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:26, group:7, name:"Antoine Semenyo",  nationality:"Ghana",       flag:"🇬🇭", club:"Manchester City",      position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:27, group:7, name:"Patrik Schick",    nationality:"Czech Republic",flag:"🇨🇿",club:"Bayer Leverkusen",    position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:28, group:7, name:"Brahim Diaz",      nationality:"Morocco",     flag:"🇲🇦", club:"Real Madrid",          position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},

  // GROUP 8
  {id:29, group:8, name:"Jonathan David",   nationality:"Canada",      flag:"🇨🇦", club:"Lille",                position:"FW", conf:"CONCACAF", wcGoals:0, wcAssists:0},
  {id:30, group:8, name:"Darwin Nunez",     nationality:"Uruguay",     flag:"🇺🇾", club:"Liverpool",            position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:31, group:8, name:"Son Heung-min",    nationality:"South Korea", flag:"🇰🇷", club:"LAFC",                 position:"FW", conf:"AFC",      wcGoals:0, wcAssists:0},
  {id:32, group:8, name:"Pape Matar Sarr",  nationality:"Senegal",     flag:"🇸🇳", club:"Tottenham Hotspur",    position:"MF", conf:"CAF",      wcGoals:0, wcAssists:0},

  // GROUP 9
  {id:33, group:9, name:"Christian Pulisic",nationality:"United States",flag:"🇺🇸", club:"AC Milan",            position:"FW", conf:"CONCACAF", wcGoals:0, wcAssists:0},
  {id:34, group:9, name:"Rafael Leao",      nationality:"Portugal",    flag:"🇵🇹", club:"AC Milan",             position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:35, group:9, name:"Sadio Mane",       nationality:"Senegal",     flag:"🇸🇳", club:"Al Nassr",             position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:36, group:9, name:"Federico Valverde",nationality:"Uruguay",     flag:"🇺🇾", club:"Real Madrid",          position:"MF", conf:"CONMEBOL", wcGoals:0, wcAssists:0},

  // GROUP 10
  {id:37, group:10, name:"Neymar",          nationality:"Brazil",      flag:"🇧🇷", club:"Santos FC",            position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:38, group:10, name:"Mikel Oyarzabal", nationality:"Spain",       flag:"🇪🇸", club:"Real Sociedad",        position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:39, group:10, name:"Edin Dzeko",      nationality:"Bosnia",      flag:"🇧🇦", club:"Schalke 04",           position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:40, group:10, name:"James Rodriguez", nationality:"Colombia",    flag:"🇨🇴", club:"—",                    position:"MF", conf:"CONMEBOL", wcGoals:0, wcAssists:0},

  // GROUP 11
  {id:41, group:11, name:"Hwang Hee-chan",  nationality:"South Korea", flag:"🇰🇷", club:"Wolverhampton",        position:"FW", conf:"AFC",      wcGoals:0, wcAssists:0},
  {id:42, group:11, name:"Yoane Wissa",     nationality:"DR Congo",    flag:"🇨🇩", club:"Brentford",            position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:43, group:11, name:"Ismaila Sarr",    nationality:"Senegal",     flag:"🇸🇳", club:"Crystal Palace",       position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:44, group:11, name:"Dani Olmo",       nationality:"Spain",       flag:"🇪🇸", club:"Barcelona",            position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 12
  {id:45, group:12, name:"Matheus Cunha",   nationality:"Brazil",      flag:"🇧🇷", club:"Manchester United",    position:"FW", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:46, group:12, name:"Enzo Fernandez",  nationality:"Argentina",   flag:"🇦🇷", club:"Chelsea",              position:"MF", conf:"CONMEBOL", wcGoals:0, wcAssists:0},
  {id:47, group:12, name:"Jeremy Doku",     nationality:"Belgium",     flag:"🇧🇪", club:"Manchester City",      position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:48, group:12, name:"Kai Havertz",     nationality:"Germany",     flag:"🇩🇪", club:"Arsenal",              position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 13
  {id:49, group:13, name:"Alexander Isak",  nationality:"Sweden",      flag:"🇸🇪", club:"Liverpool",            position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:50, group:13, name:"Omar Marmoush",   nationality:"Egypt",       flag:"🇪🇬", club:"Manchester City",      position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:51, group:13, name:"Martin Odegaard", nationality:"Norway",      flag:"🇳🇴", club:"Arsenal",              position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:52, group:13, name:"Kevin De Bruyne", nationality:"Belgium",     flag:"🇧🇪", club:"Napoli",               position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},

  // GROUP 14
  {id:53, group:14, name:"Nico Williams",   nationality:"Spain",       flag:"🇪🇸", club:"Athletic Club",        position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:54, group:14, name:"Takefusa Kubo",   nationality:"Japan",       flag:"🇯🇵", club:"Real Sociedad",        position:"FW", conf:"AFC",      wcGoals:0, wcAssists:0},
  {id:55, group:14, name:"Breel Embolo",    nationality:"Switzerland", flag:"🇨🇭", club:"Monaco",               position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:56, group:14, name:"Alphonso Davies", nationality:"Canada",      flag:"🇨🇦", club:"Bayern Munich",        position:"DEF",conf:"CONCACAF", wcGoals:0, wcAssists:0},

  // GROUP 15
  {id:57, group:15, name:"Granit Xhaka",    nationality:"Switzerland", flag:"🇨🇭", club:"Bayer Leverkusen",     position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:58, group:15, name:"Bernardo Silva",  nationality:"Portugal",    flag:"🇵🇹", club:"Manchester City",      position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:59, group:15, name:"Nick Woltemade",  nationality:"Germany",     flag:"🇩🇪", club:"Newcastle United",     position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:60, group:15, name:"Nicolas Pepe",    nationality:"Ivory Coast", flag:"🇨🇮", club:"Al Khelaifi",          position:"FW", conf:"CAF",      wcGoals:0, wcAssists:0},

  // GROUP 16
  {id:61, group:16, name:"Raul Jimenez",    nationality:"Mexico",      flag:"🇲🇽", club:"Fulham",               position:"FW", conf:"CONCACAF", wcGoals:0, wcAssists:0},
  {id:62, group:16, name:"Achraf Hakimi",   nationality:"Morocco",     flag:"🇲🇦", club:"Paris Saint-Germain",  position:"DEF",conf:"CAF",      wcGoals:0, wcAssists:0},
  {id:63, group:16, name:"Arda Guler",      nationality:"Turkey",      flag:"🇹🇷", club:"Real Madrid",          position:"MF", conf:"UEFA",     wcGoals:0, wcAssists:0},
  {id:64, group:16, name:"Desire Doue",     nationality:"France",      flag:"🇫🇷", club:"Paris Saint-Germain",  position:"FW", conf:"UEFA",     wcGoals:0, wcAssists:0},
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let PLAYERS      = [];
let PARTICIPANTS = [];
let userPicks    = {};   // { groupNumber: playerId }
let activePlayerId = null;

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
  let cur = '', inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      result.push(cur.trim()); cur = '';
    } else { cur += ch; }
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
    id:          parseInt(r.id),
    group:       parseInt(r.group),
    name:        r.name,
    nationality: r.nationality,
    flag:        r.flag,
    club:        r.club,
    position:    r.position,
    conf:        r.conf || 'UEFA',
    wcGoals:     parseInt(r.wc_goals)   || 0,
    wcAssists:   parseInt(r.wc_assists) || 0,
  }));
}

function parseParticipants(csvText) {
  return parseCsv(csvText).map(r => ({
    name:  r.name,
    picks: Array.from({ length: TOTAL_GROUPS }, (_, i) => parseInt(r[`g${i + 1}`]) || null),
  }));
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getPlayer(id)   { return PLAYERS.find(p => p.id === id); }
function playerPoints(p) { return (p.wcGoals * PTS_GOAL) + (p.wcAssists * PTS_ASSIST); }

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

function pickCount()  { return Object.keys(userPicks).length; }
function allPicked()  { return pickCount() === TOTAL_GROUPS; }

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────
const LS_PICKS     = 'wcpool_picks';
const LS_ENTRY     = 'wcpool_entry';
const LS_SUBMITTED = 'wcpool_submitted';

function savePicks()            { localStorage.setItem(LS_PICKS, JSON.stringify(userPicks)); }
function saveEntry(e)           { localStorage.setItem(LS_ENTRY, JSON.stringify(e)); }
function markSubmitted(entry, picks) { localStorage.setItem(LS_SUBMITTED, JSON.stringify({ entry, picks })); }

function loadPicksFromStorage() {
  try { const r = localStorage.getItem(LS_PICKS); if (r) userPicks = JSON.parse(r); }
  catch (e) { userPicks = {}; }
}

function loadEntryFromStorage() {
  try { return JSON.parse(localStorage.getItem(LS_ENTRY) || '{}'); }
  catch (e) { return {}; }
}

function getSubmission() {
  try { return JSON.parse(localStorage.getItem(LS_SUBMITTED)); }
  catch (e) { return null; }
}

// ─── GROUPS PAGE INIT ─────────────────────────────────────────────────────────
async function initGroupsPage() {
  await loadPlayers();

  const submission = getSubmission();
  if (submission) {
    showAlreadySubmitted(submission);
    renderGroups(submission.picks);
    return;
  }

  loadPicksFromStorage();
  const saved = loadEntryFromStorage();
  if (saved.firstName) document.getElementById('first-name').value = saved.firstName;
  if (saved.lastName)  document.getElementById('last-name').value  = saved.lastName;
  if (saved.teamName)  document.getElementById('team-name').value  = saved.teamName;

  renderGroups();
  initModal();
  initSubmitBar();
  initEntryForm();
  updateSubmitBar();
}

// ─── RENDER GROUPS ────────────────────────────────────────────────────────────
function renderGroups(lockedPicks) {
  const grid = document.getElementById('groups-grid');
  grid.innerHTML = '';

  const picksObj = {};
  if (lockedPicks) {
    if (Array.isArray(lockedPicks)) {
      lockedPicks.forEach(({ g, id }) => { picksObj[g] = id; });
    } else {
      Object.assign(picksObj, lockedPicks);
    }
  }

  for (let g = 1; g <= TOTAL_GROUPS; g++) {
    const players  = PLAYERS.filter(p => p.group === g);
    const pickedId = lockedPicks ? picksObj[g] : userPicks[g];
    const hasPick  = !!pickedId;

    const card = document.createElement('div');
    card.className = `group-card${hasPick ? ' has-pick' : ''}`;
    card.dataset.group = g;

    card.innerHTML = `
      <div class="group-header${hasPick ? ' complete' : ''}">
        <span class="group-number">Group ${g}</span>
      </div>
      ${players.map(p => {
        const cs = CONF_STYLE[p.conf] || CONF_STYLE.UEFA;
        return `
          <div class="player-row${pickedId === p.id ? ' selected' : ''}" data-id="${p.id}">
            <span class="player-flag">${p.flag}</span>
            <div class="player-info">
              <div class="player-name">${p.name}</div>
              <div class="player-club">${p.club}</div>
            </div>
            <span class="player-pos-badge ${posClass(p.position)}">${p.position}</span>
            <span class="player-conf-badge" style="color:${cs.color}; background:${cs.bg}">${p.conf}</span>
          </div>
        `;
      }).join('')}
    `;

    if (!lockedPicks) {
      card.querySelectorAll('.player-row').forEach(row => {
        row.addEventListener('click', () => openModal(parseInt(row.dataset.id)));
      });
    }

    grid.appendChild(card);
  }
}

// ─── PICK SELECTION ───────────────────────────────────────────────────────────
function selectPlayer(group, playerId) {
  userPicks[group] = playerId;
  savePicks();
  updateGroupCard(group, playerId);
  updateSubmitBar();
}

function deselectGroup(group) {
  delete userPicks[group];
  savePicks();
  updateGroupCard(group, null);
  updateSubmitBar();
}

function updateGroupCard(group, selectedId) {
  const card = document.querySelector(`.group-card[data-group="${group}"]`);
  if (!card) return;
  card.classList.toggle('has-pick', selectedId !== null);
  card.querySelector('.group-header').classList.toggle('complete', selectedId !== null);
  card.querySelectorAll('.player-row').forEach(row => {
    row.classList.toggle('selected', parseInt(row.dataset.id) === selectedId);
  });
}

// ─── SUBMIT BAR ───────────────────────────────────────────────────────────────
function initSubmitBar() {
  document.getElementById('save-btn').addEventListener('click', openConfirm);
}

function updateSubmitBar() {
  const count   = pickCount();
  const allDone = allPicked();
  const formOk  = isFormValid();

  document.getElementById('pick-count').textContent        = count;
  document.getElementById('progress-fill').style.width     = `${(count / TOTAL_GROUPS) * 100}%`;

  const btn     = document.getElementById('save-btn');
  btn.disabled  = !(allDone && formOk);
  btn.title     = !allDone  ? `Pick from ${TOTAL_GROUPS - count} more group${TOTAL_GROUPS - count !== 1 ? 's' : ''}`
                : !formOk  ? 'Fill in your name and team name first'
                : '';
}

// ─── ENTRY FORM ───────────────────────────────────────────────────────────────
function initEntryForm() {
  ['first-name', 'last-name', 'team-name'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { updateFieldStyle(el); persistEntry(); updateSubmitBar(); });
    el.addEventListener('blur',  () => updateFieldStyle(el));
    updateFieldStyle(el);
  });
}

function updateFieldStyle(input) {
  const ok = input.value.trim().length > 0;
  input.classList.toggle('input-ok',    ok);
  input.classList.toggle('input-error', !ok);
}

function isFormValid() {
  return ['first-name', 'last-name', 'team-name'].every(id => {
    const el = document.getElementById(id);
    return el && el.value.trim().length > 0;
  });
}

function getFormEntry() {
  return {
    firstName: document.getElementById('first-name').value.trim(),
    lastName:  document.getElementById('last-name').value.trim(),
    teamName:  document.getElementById('team-name').value.trim(),
  };
}

function persistEntry() { saveEntry(getFormEntry()); }

// ─── MODAL ────────────────────────────────────────────────────────────────────
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-pick-btn').addEventListener('click', handlePickBtn);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
  const p = getPlayer(id);
  if (!p) return;
  activePlayerId = id;

  document.getElementById('modal-flag').textContent        = p.flag;
  document.getElementById('modal-name').textContent        = p.name;
  document.getElementById('modal-nationality').textContent = p.nationality;
  document.getElementById('modal-club').textContent        = p.club;

  const posBadge = document.getElementById('modal-pos-badge');
  posBadge.textContent = p.position;
  posBadge.className   = `pos-badge ${posClass(p.position)}`;

  const cs = CONF_STYLE[p.conf] || CONF_STYLE.UEFA;
  const confBadge = document.getElementById('modal-conf-badge');
  const confLabel = document.getElementById('modal-conf-label');
  confBadge.textContent = p.conf;
  confBadge.style.color      = cs.color;
  confBadge.style.background = cs.bg;
  confLabel.textContent = p.conf === 'CONCACAF' ? 'North & Central America'
                        : p.conf === 'CONMEBOL' ? 'South America'
                        : p.conf === 'CAF'      ? 'Africa'
                        : p.conf === 'AFC'      ? 'Asia'
                        : 'Europe';

  document.getElementById('modal-wc-goals').textContent   = p.wcGoals;
  document.getElementById('modal-wc-assists').textContent = p.wcAssists;
  document.getElementById('modal-wc-pts').textContent     = playerPoints(p);
  document.getElementById('modal-group-tag').textContent  = `Group ${p.group}`;

  refreshPickBtn(p);

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function refreshPickBtn(p) {
  const btn = document.getElementById('modal-pick-btn');
  const cur = userPicks[p.group];
  if (cur === p.id) {
    btn.textContent = '✓ Picked — click to remove';
    btn.className   = 'pick-btn picked';
  } else if (cur && cur !== p.id) {
    btn.textContent = '↺ Change to this player';
    btn.className   = 'pick-btn change';
  } else {
    btn.textContent = '✓ Pick this player';
    btn.className   = 'pick-btn';
  }
}

function handlePickBtn() {
  const p = getPlayer(activePlayerId);
  if (!p) return;
  if (userPicks[p.group] === p.id) {
    deselectGroup(p.group);
    refreshPickBtn(p);
  } else {
    selectPlayer(p.group, p.id);
    refreshPickBtn(p);
    setTimeout(closeModal, 450);
  }
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  activePlayerId = null;
}

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
function openConfirm() {
  if (!allPicked() || !isFormValid()) return;
  const entry = getFormEntry();
  document.getElementById('confirm-entry-name').textContent =
    `${entry.teamName} · ${entry.firstName} ${entry.lastName}`;

  const container = document.getElementById('confirm-picks-summary');
  container.innerHTML = '';
  for (let g = 1; g <= TOTAL_GROUPS; g++) {
    const p = getPlayer(userPicks[g]);
    if (!p) continue;
    const chip = document.createElement('div');
    chip.className = 'confirm-pick-chip';
    chip.innerHTML = `<span class="cg">G${g}</span><span class="cf">${p.flag}</span><span class="cn">${p.name}</span>`;
    container.appendChild(chip);
  }

  document.getElementById('confirm-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeConfirm() {
  document.getElementById('confirm-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── SUBMISSION ───────────────────────────────────────────────────────────────
async function submitPicks() {
  const entry = getFormEntry();
  const picks = {};
  for (let g = 1; g <= TOTAL_GROUPS; g++) picks[`g${g}`] = userPicks[g] || '';

  const payload = {
    firstName:   entry.firstName,
    lastName:    entry.lastName,
    teamName:    entry.teamName,
    picks,
    submittedAt: new Date().toISOString(),
  };

  const btn = document.getElementById('confirm-submit');
  btn.disabled    = true;
  btn.textContent = '⏳ Submitting…';

  try {
    if (SCRIPT_URL) {
      await fetch(SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(payload),
      });
    }
    markSubmitted(entry, userPicks);
    closeConfirm();
    showSuccess(entry);
  } catch (err) {
    console.error('Submission error:', err);
    btn.disabled    = false;
    btn.textContent = '⚠️ Error — try again';
    setTimeout(() => { btn.textContent = '✓ Yes, Lock In My Picks'; }, 3000);
  }
}

// ─── SUCCESS / ALREADY-SUBMITTED SCREENS ──────────────────────────────────────
function showSuccess(entry) {
  document.getElementById('success-team-name').textContent =
    `${entry.teamName} · ${entry.firstName} ${entry.lastName}`;
  document.getElementById('success-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function showAlreadySubmitted(submission) {
  const { entry, picks } = submission;
  document.getElementById('already-team-name').textContent =
    `${entry.teamName} · ${entry.firstName} ${entry.lastName}`;

  const container = document.getElementById('already-picks-summary');
  container.innerHTML = '';
  for (let g = 1; g <= TOTAL_GROUPS; g++) {
    const pid = picks[g] || picks[`${g}`];
    const p   = getPlayer(parseInt(pid));
    if (!p) continue;
    const chip = document.createElement('div');
    chip.className = 'confirm-pick-chip';
    chip.innerHTML = `<span class="cg">G${g}</span><span class="cf">${p.flag}</span><span class="cn">${p.name}</span>`;
    container.appendChild(chip);
  }

  document.getElementById('already-submitted-overlay').style.display = 'flex';
}

// ─── WIRE UP CONFIRM BUTTONS ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const cancelBtn      = document.getElementById('confirm-cancel');
  const submitBtn      = document.getElementById('confirm-submit');
  const confirmOverlay = document.getElementById('confirm-overlay');
  if (cancelBtn)      cancelBtn.addEventListener('click', closeConfirm);
  if (submitBtn)      submitBtn.addEventListener('click', submitPicks);
  if (confirmOverlay) confirmOverlay.addEventListener('click', e => {
    if (e.target === confirmOverlay) closeConfirm();
  });
});

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
        <p>Open <code>app.js</code> and paste your Google Sheet ID into <code>SHEET_ID</code>.<br><br>
        See <code>SETUP.md</code> for step-by-step instructions.</p>
      </div>`;
    return;
  }

  if (PARTICIPANTS.length === 0) {
    container.innerHTML = `
      <div class="state-msg">
        <div class="icon">👥</div>
        <h3>No participants yet</h3>
        <p>Picks will appear here once participants have submitted their entries.</p>
      </div>`;
    return;
  }

  const ranked = [...PARTICIPANTS]
    .map(p => ({ ...p, total: participantPoints(p) }))
    .sort((a, b) => b.total - a.total);

  document.getElementById('last-updated').textContent =
    `Last updated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;

  if (PLAYERS.some(p => p.wcGoals > 0 || p.wcAssists > 0)) {
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
    const rank      = idx + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
    const wcGoals   = participant.picks.reduce((s, id) => s + (getPlayer(id)?.wcGoals   || 0), 0);
    const wcAssists = participant.picks.reduce((s, id) => s + (getPlayer(id)?.wcAssists || 0), 0);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="rank-cell ${rankClass}">${rankEmoji}</td>
      <td><span class="participant-name">${participant.name}</span></td>
      <td style="text-align:right; color:#ff7777; font-weight:700">${wcGoals}</td>
      <td style="text-align:right; color:#77aaff; font-weight:700">${wcAssists}</td>
      <td class="points-cell">${participant.total}
        <div class="pts-breakdown">${wcGoals * PTS_GOAL}g + ${wcAssists * PTS_ASSIST}a</div>
      </td>
    `;

    const picksRow  = document.createElement('tr');
    picksRow.className = 'picks-row';
    const picksCell = document.createElement('td');
    picksCell.colSpan = 5;

    const picksGrid = document.createElement('div');
    picksGrid.className = 'picks-grid';

    participant.picks.forEach((id, gIdx) => {
      const p    = getPlayer(id);
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
    row.addEventListener('click', () => {
      const open = picksRow.classList.toggle('visible');
      row.classList.toggle('expanded', open);
    });

    tbody.appendChild(row);
    tbody.appendChild(picksRow);
  });

  container.innerHTML = '';
  container.appendChild(table);
}
