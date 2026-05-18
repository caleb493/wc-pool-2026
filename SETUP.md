# WC 2026 Pool — Setup Guide

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| M1 | Player research & groupings (80 players, 20 groups) | ✅ Complete |
| M2 | Google Sheets template setup | ⬜ You do this |
| M3 | Website built (groups page + standings page) | ✅ Complete |
| M4 | GitHub Pages deployment | ⬜ You do this |
| M5 | Participant picks entered in Google Sheet | ⬜ You do this |
| M6 | Weekly tournament updates workflow | ⬜ Ongoing |

---

## Key Decisions Log

| # | Decision | Choice |
|---|----------|--------|
| 1 | Tournament | 2026 FIFA World Cup (June–July 2026) |
| 2 | Pool size | 10–25 participants, manually entered |
| 3 | Pick mechanic | 1 player from each of 20 groups = squad of 20 per person |
| 4 | Player pool | 80 outfield players (FW/MF/DEF), 20 groups of 4 |
| 5 | Group ranking | 2025/26 club goals + assists combined |
| 6 | Tournament scoring | Goals = 2pts, Assists = 1pt |
| 7 | Data source | Google Sheets (published as CSV) |
| 8 | Hosting | GitHub Pages |
| 9 | Design | Dark navy, green pitch accents |
| 10 | Player list | Researched from 2025/26 season data (verify + update) |

---

## STEP 1 — Review & Update the Player List

The player stats in `players.json` are **approximate** based on available May 2026 data. Before launch:

1. Open `players.json`
2. Verify each player's `clubGoals` and `clubAssists` for the full 2025/26 season
3. Check that all 80 players are confirmed in their nation's World Cup squad
4. Replace any players who are injured/absent with suitable alternatives (keep the same `id` and `group`)

> **Note on Saudi/MLS players:** Ronaldo (Al Nassr) and Messi (Inter Miami) stats include their respective league totals. You may want to adjust their group placement if you feel the league quality difference matters for your pool.

---

## STEP 2 — Create the Google Sheet

### Tab 1: `players`

Create a tab named exactly **`players`** with these column headers in row 1:

```
id | group | name | nationality | flag | club | position | club_goals | club_assists | wc_goals | wc_assists
```

Copy all 80 rows from `players.json` into this sheet (or import the JSON data).

**You only need to update two columns during the tournament:**
- `wc_goals` — update after each match day
- `wc_assists` — update after each match day

### Tab 2: `participants`

Create a tab named exactly **`participants`** with these column headers:

```
name | g1 | g2 | g3 | g4 | g5 | g6 | g7 | g8 | g9 | g10 | g11 | g12 | g13 | g14 | g15 | g16 | g17 | g18 | g19 | g20
```

For each participant, add a row:
- `name`: their name
- `g1` through `g20`: the **player ID** they picked from each group (IDs 1–80, from the players tab)

Example row:
```
Caleb | 1 | 6 | 10 | 15 | 19 | 23 | 26 | 31 | 35 | 38 | 42 | 46 | 51 | 54 | 58 | 62 | 67 | 70 | 74 | 79
```

### Publish the Sheet

1. `File → Share → Publish to web`
2. Select **Entire Document** → **Comma-separated values (.csv)**
3. Click **Publish**
4. Copy the URL — you need the **Sheet ID** (the long alphanumeric string in the URL)

The Sheet ID looks like: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

---

## STEP 3 — Connect the Sheet to the Website

Open `app.js` and find line 5:

```javascript
const SHEET_ID = '';  // ← paste your Google Sheet ID here
```

Paste your Sheet ID:

```javascript
const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';
```

Save the file. The site will now fetch live data from your Google Sheet.

---

## STEP 4 — Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `wc-pool-2026`)
2. Make it **Public** (required for free GitHub Pages)
3. Upload all files from this folder:
   - `index.html`
   - `standings.html`
   - `style.css`
   - `app.js`
   - `players.json`
4. Go to **Settings → Pages**
5. Under **Source**, select `Deploy from a branch → main → / (root)`
6. Click **Save**

Your site will be live at:
`https://YOUR-USERNAME.github.io/wc-pool-2026/`

Share this URL with your group!

---

## STEP 5 — Collecting Picks

Before the tournament starts, collect each participant's picks and enter them into the `participants` tab of your Google Sheet.

For each group (1–20), the participant picks **one player ID** from that group.

Player IDs by group:

| Group | Player IDs |
|-------|------------|
| 1 | 1 (Mbappe), 2 (Haaland), 3 (Kane), 4 (Yamal) |
| 2 | 5 (Olise), 6 (Salah), 7 (Vinicius Jr), 8 (Bellingham) |
| 3 | 9 (B. Fernandes), 10 (Raphinha), 11 (Ronaldo), 12 (Musiala) |
| 4 | 13 (Palmer), 14 (Foden), 15 (Wirtz), 16 (Saka) |
| 5 | 17 (Messi), 18 (Lewandowski), 19 (Dimarco), 20 (M. Thuram) |
| 6 | 21 (Dembele), 22 (Havertz), 23 (J. Alvarez), 24 (De Bruyne) |
| 7 | 25 (Lautaro), 26 (Son), 27 (Pulisic), 28 (Pedri) |
| 8 | 29 (Griezmann), 30 (G. Ramos), 31 (Dani Olmo), 32 (Valverde) |
| 9 | 33 (Lukaku), 34 (Nico Williams), 35 (Odegaard), 36 (Gakpo) |
| 10 | 37 (TAA), 38 (T. Hernandez), 39 (Hakimi), 40 (B. Silva) |
| 11 | 41 (Nkunku), 42 (Isak), 43 (X. Simons), 44 (Sane) |
| 12 | 45 (Osimhen), 46 (D. Nunez), 47 (Endrick), 48 (Rashford) |
| 13 | 49 (Zaire-Emery), 50 (Gavi), 51 (Fermin), 52 (Madueke) |
| 14 | 53 (Rice), 54 (Barella), 55 (Calhanoglu), 56 (Ziyech) |
| 15 | 57 (A. Davies), 58 (Cancelo), 59 (Dumfries), 60 (T. Weah) |
| 16 | 61 (Memphis), 62 (K. Thuram), 63 (Morata), 64 (Richarlison) |
| 17 | 65 (F. Torres), 66 (Camavinga), 67 (Leao), 68 (Paqueta) |
| 18 | 69 (J. David), 70 (En-Nesyri), 71 (Lookman), 72 (I. Toney) |
| 19 | 73 (Mac Allister), 74 (Robertson), 75 (B. Johnson), 76 (Reyna) |
| 20 | 77 (Grealish), 78 (McTominay), 79 (Merino), 80 (T. Adams) |

---

## STEP 6 — Weekly Tournament Updates

During the World Cup, update `wc_goals` and `wc_assists` in the **players tab** of your Google Sheet after each match day. The standings page will automatically recalculate.

Suggested update schedule:
- After each group-stage match day (approx 3–4 per day)
- After each knockout round

No code changes needed — just update the sheet and refresh the site.

---

## File Structure

```
wc-pool/
├── index.html       → Groups page (20 groups, click for player cards)
├── standings.html   → Pool leaderboard (live standings)
├── style.css        → Dark navy theme
├── app.js           → All logic: data fetch, rendering, scoring
├── players.json     → Initial player data (fallback if no Sheet ID set)
└── SETUP.md         → This file
```
