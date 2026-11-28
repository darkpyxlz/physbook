/* Scibook science garden (#garden): the place to spend coins.
   - Coins buy seeds, extra plots, upgrades and decorations.
   - Studying makes water: every correct problem, quick check or drill adds 💧 to the rain barrel,
     and morning rain adds a little each day. Each growth stage starts when the plant is watered.
   - Plants grow in real time (from minutes for cress to a day for the titan arum), also while you are away.
   - Harvests pay back more coins than the seed cost, add the species to the herbarium with a real fact,
     and sometimes come up golden. Some species unlock by solving problems in a related chapter. */
(function () {
  'use strict';
  const h = PB.h, S = () => PB.S;
  const MIN = 60000;

  /* ---------- species ----------
     t: minutes from seed to bloom (4 stages), c: coins, y: coins per harvest, w: water per stage,
     r: rarity 0–4, u: unlock { h: harvests, ch: chapter id (any solved problem there unlocks it early) } */
  const SPECIES = [
    { id: 'cress', name: 'Garden cress', latin: 'Lepidium sativum', c: 10, t: 6, w: 1, y: 16, r: 0, u: {}, shape: 'sprouts', fact: 'Cress seeds germinate in a day or two, which makes them the classic school test of what seeds need: water, oxygen and warmth, but not light.' },
    { id: 'radish', name: 'Radish', latin: 'Raphanus sativus', c: 20, t: 15, w: 1, y: 36, r: 0, u: { h: 1 }, shape: 'root', col: '#d8344f', fact: 'The swollen part we eat is the hypocotyl and the top of the taproot: a food store the plant would spend on flowering. Radishes are brassicas, cousins of cabbage and of Arabidopsis.' },
    { id: 'pea', name: 'Garden pea', latin: 'Pisum sativum', c: 30, t: 25, w: 1, y: 55, r: 0, u: { h: 2, ch: 'bio-mendel' }, shape: 'vine', fact: 'Gregor Mendel grew about 28 000 pea plants between 1856 and 1863, following seven traits such as seed shape and flower colour, and found the 3 : 1 ratios that founded genetics. Peas pollinate themselves, so he could breed pure lines.' },
    { id: 'moss', name: 'Haircap moss', latin: 'Polytrichum commune', c: 25, t: 20, w: 1, y: 42, r: 0, u: { h: 3, ch: 'bio-plantdiv' }, shape: 'moss', fact: 'The green carpet is the haploid gametophyte generation; the thin stalks with capsules are diploid sporophytes growing out of it. Mosses have no xylem, so they stay small and need a film of water for their sperm to swim.' },
    { id: 'sunflower', name: 'Sunflower', latin: 'Helianthus annuus', c: 50, t: 40, w: 1, y: 95, r: 1, u: { h: 4, ch: 'math-sequences' }, shape: 'flower', fl: { h: 60, n: 24, pc: '#f6c21c', cc: '#6b3d17', cr: 8, pl: 8, pw: 3, fib: true }, fact: 'The seeds in a sunflower head sit on two families of spirals whose counts are consecutive Fibonacci numbers, often 34 and 55. Each new seed grows about 137.5° (the golden angle) round from the last, which packs them with no gaps.' },
    { id: 'tomato', name: 'Tomato', latin: 'Solanum lycopersicum', c: 60, t: 60, w: 2, y: 130, r: 1, u: { h: 5 }, shape: 'bush', bu: { fc: '#e23b2e', fr: 4.2, n: 6 }, fact: 'Tomatoes ripen in response to ethene, a gaseous plant hormone: ripe fruit release it and speed up their neighbours. Botanically a tomato is a berry.' },
    { id: 'wheat', name: 'Bread wheat', latin: 'Triticum aestivum', c: 45, t: 45, w: 1, y: 90, r: 1, u: { h: 6, ch: 'bio-evolution' }, shape: 'grain', gr: { n: 6, c: '#d9a63a' }, fact: 'Bread wheat is hexaploid: 42 chromosomes from three ancestral grasses, joined by two rounds of hybridisation and chromosome doubling. The last merger happened in farmers’ fields about 9000 years ago.' },
    { id: 'rice', name: 'Rice', latin: 'Oryza sativa', c: 60, t: 50, w: 2, y: 115, r: 1, u: { h: 7 }, shape: 'grain', gr: { n: 5, c: '#c9b45a', droop: true }, fact: 'Rice feeds more than half of the world’s people. Paddies are flooded partly to drown weeds; rice survives because air channels (aerenchyma) carry oxygen down to its roots.' },
    { id: 'fern', name: 'Male fern', latin: 'Dryopteris filix-mas', c: 70, t: 80, w: 1, y: 150, r: 1, u: { h: 8 }, shape: 'fern', fact: 'The brown dots under fern leaves are sori, clusters of sporangia that fling their spores out with a tiny catapult. Ferns and their relatives filled the coal-forming swamps of the Carboniferous, 300 million years ago.' },
    { id: 'arabidopsis', name: 'Thale cress', latin: 'Arabidopsis thaliana', c: 40, t: 30, w: 1, y: 80, r: 1, u: { h: 9, ch: 'bio-plantgrowth' }, shape: 'rosette', fact: 'The lab mouse of plant biology: a six-week life cycle, thousands of seeds per plant and a small genome (about 135 million base pairs). It was the first plant genome to be sequenced, in 2000.' },
    { id: 'shiitake', name: 'Shiitake', latin: 'Lentinula edodes', c: 70, t: 60, w: 1, y: 140, r: 1, u: { h: 11 }, shape: 'mushroom', mu: { c: '#9a5b34' }, fact: 'Not a plant at all: fungi are closer relatives of animals, with chitin in their walls, and they digest food outside their bodies. A mushroom is only the spore-making fruit of a hidden mycelium.' },
    { id: 'strawberry', name: 'Strawberry', latin: 'Fragaria × ananassa', c: 90, t: 100, w: 2, y: 190, r: 2, u: { h: 10 }, shape: 'bush', bu: { fc: '#e0303f', fr: 3.4, n: 7, low: true, flowers: true }, fact: 'The “seeds” on the outside are the true fruits (achenes), each holding one seed; the red flesh is a swollen receptacle. Strawberries also clone themselves with runners.' },
    { id: 'maize', name: 'Maize', latin: 'Zea mays', c: 80, t: 90, w: 2, y: 175, r: 2, u: { h: 12, ch: 'bio-photosynthesis' }, shape: 'maize', fact: 'Maize is a C₄ plant: it pumps CO₂ into bundle-sheath cells to beat photorespiration. Barbara McClintock discovered “jumping genes” (transposons) from the speckled colours of maize kernels, and won the 1983 Nobel prize.' },
    { id: 'mimosa', name: 'Sensitive plant', latin: 'Mimosa pudica', c: 100, t: 120, w: 2, y: 220, r: 2, u: { h: 14 }, shape: 'flower', fl: { h: 46, puff: true, pc: '#ef6fb4', cc: '#f7d4ea', cr: 3, pinnate: true }, fact: 'Touch a leaf and it folds within seconds. An electrical signal runs along it, and cells at the base of each leaflet lose potassium ions and water fast, so they collapse like deflating balloons.' },
    { id: 'flytrap', name: 'Venus flytrap', latin: 'Dionaea muscipula', c: 150, t: 180, w: 2, y: 330, r: 2, u: { h: 16, ch: 'bio-nerves' }, shape: 'trap', fact: 'Each trap has trigger hairs. One touch fires an action potential; a second within about 20 seconds snaps the trap shut in a tenth of a second, and further touches tell it to start digesting. It grows wild only in a small area of the Carolinas.' },
    { id: 'saguaro', name: 'Saguaro cactus', latin: 'Carnegiea gigantea', c: 120, t: 200, w: 1, y: 300, r: 2, u: { h: 18 }, shape: 'cactus', fact: 'Saguaros use CAM photosynthesis, opening their stomata only at night. After a storm a large one can soak up hundreds of litres of water, its pleated stem swelling like an accordion. They can live for 150 years.' },
    { id: 'bamboo', name: 'Moso bamboo', latin: 'Phyllostachys edulis', c: 180, t: 150, w: 3, y: 340, r: 2, u: { h: 20 }, shape: 'bamboo', fact: 'Some bamboos grow nearly a metre a day, the fastest of any plant, by lengthening cells in many segments at once. Bamboo is a grass.' },
    { id: 'lotus', name: 'Sacred lotus', latin: 'Nelumbo nucifera', c: 200, t: 240, w: 2, y: 440, r: 3, u: { h: 22, ch: 'fluids' }, shape: 'flower', fl: { h: 44, n: 11, pc: '#f39ab8', cc: '#f4d35e', cr: 4, pl: 9, pw: 4.5, cup: true, pads: true }, fact: 'Water beads up and rolls off lotus leaves, carrying dirt away: microscopic wax bumps make the surface superhydrophobic (the “lotus effect”). A lotus seed about 1300 years old has been germinated.' },
    { id: 'orchid', name: 'Moth orchid', latin: 'Phalaenopsis amabilis', c: 250, t: 300, w: 2, y: 540, r: 3, u: { h: 25 }, shape: 'flower', fl: { h: 50, n: 5, pc: '#c86bd9', cc: '#f3e26b', cr: 3, pl: 8, pw: 5.5, lip: '#8a2a9e' }, fact: 'Orchid seeds are as fine as dust, with no food store. In the wild each must be colonised by a mycorrhizal fungus that feeds it. Orchids are one of the two largest plant families, with about 28 000 species.' },
    { id: 'coffee', name: 'Arabica coffee', latin: 'Coffea arabica', c: 220, t: 270, w: 2, y: 480, r: 3, u: { h: 28, ch: 'bio-signalling' }, shape: 'bush', bu: { fc: '#c0262d', fr: 2.6, n: 12, tall: true }, fact: 'Caffeine is an alkaloid the plant uses as a pesticide. It keeps us alert by blocking adenosine receptors in the brain. Arabica is itself a natural hybrid of two wild coffee species.' },
    { id: 'cacao', name: 'Cacao', latin: 'Theobroma cacao', c: 260, t: 330, w: 2, y: 590, r: 3, u: { h: 30 }, shape: 'tree', tr: { kind: 'cacao' }, fact: 'Its flowers grow straight from the trunk and are pollinated mostly by tiny midges. Each pod holds 20–60 beans; fermenting and roasting them creates chocolate’s flavour molecules.' },
    { id: 'pitcher', name: 'Rajah pitcher plant', latin: 'Nepenthes rajah', c: 300, t: 360, w: 2, y: 660, r: 3, u: { h: 33 }, shape: 'pitcher', fact: 'Insects slip on the waxy, wet rim and drown in digestive fluid. On Borneo this giant pitcher also feeds tree shrews, which lick nectar from the lid and leave their droppings behind as fertiliser.' },
    { id: 'ginkgo', name: 'Ginkgo', latin: 'Ginkgo biloba', c: 400, t: 480, w: 2, y: 900, r: 4, u: { h: 38 }, shape: 'tree', tr: { kind: 'ginkgo' }, fact: 'A living fossil: its lineage goes back more than 200 million years, and it is the last survivor of its group. Several ginkgos close to the centre of the Hiroshima blast in 1945 survived and still grow.' },
    { id: 'baobab', name: 'Baobab', latin: 'Adansonia digitata', c: 450, t: 600, w: 3, y: 1120, r: 4, u: { h: 44 }, shape: 'tree', tr: { kind: 'baobab' }, fact: 'Baobabs store water in their huge spongy trunks, which swell in the rainy season. Their white flowers open at night and are pollinated by fruit bats. Some living baobabs are over 2000 years old.' },
    { id: 'welwitschia', name: 'Welwitschia', latin: 'Welwitschia mirabilis', c: 500, t: 720, w: 2, y: 1300, r: 4, u: { h: 50 }, shape: 'welwitschia', fact: 'It grows just two leaves in its whole life, which can last more than 1000 years in the Namib desert. The leaves grow from the base for ever and fray at the tips, and the plant takes in water from coastal fog.' },
    { id: 'rafflesia', name: 'Corpse lily', latin: 'Rafflesia arnoldii', c: 600, t: 900, w: 3, y: 1650, r: 4, u: { h: 60 }, shape: 'rafflesia', fact: 'The largest single flower in the world, up to about a metre across. The plant has no leaves, stems or roots of its own: it lives as threads inside a vine, and its flower smells of rotting meat to attract carrion flies.' },
    { id: 'titan', name: 'Titan arum', latin: 'Amorphophallus titanum', c: 800, t: 1440, w: 3, y: 2400, r: 4, u: { h: 75 }, shape: 'titan', fact: 'Its flower spike can reach 3 m. It blooms only every few years for a day or two, warms its spike to near body temperature to spread a smell of rotting flesh, and attracts carrion beetles to pollinate it.' }
  ];
  const SP = {}; SPECIES.forEach((s) => { SP[s.id] = s; });
  const RAR = (PB.RARITY || [['Common', '#8a93a8'], ['Uncommon', '#2e9d57'], ['Rare', '#2f6fdb'], ['Epic', '#9b4fd6'], ['Legendary', '#e0901a']]);
  const FIRST_GEMS = [10, 15, 25, 40, 80];

  const PLOT_COST = [150, 300, 500, 800, 1200, 1800, 2600, 3600]; // plots 5 to 12
  const UPG = [
    { id: 'can', icon: '🚿', name: 'Watering can', lv: [[120, 'Water every thirsty plant with one tap.']] },
    { id: 'barrel', icon: '🛢️', name: 'Rain barrel', lv: [[200, 'Store up to 35 water.'], [600, 'Store up to 50 water.']] },
    { id: 'compost', icon: '♻️', name: 'Compost bin', lv: [[300, 'Each harvest makes compost. Compost finishes a plant’s current growth stage at once.']] },
    { id: 'greenhouse', icon: '🏡', name: 'Greenhouse', lv: [[400, 'Plants grow 15% faster.'], [1000, 'Plants grow 30% faster.'], [2200, 'Plants grow 45% faster.']] },
    { id: 'station', icon: '🌦️', name: 'Weather station', lv: [[500, 'Morning rain brings 6 water a day instead of 3.']] },
    { id: 'sprinkler', icon: '💦', name: 'Sprinkler', lv: [[700, 'Thirsty plants are watered from your store automatically, even while you are away.']] },
    { id: 'hive', icon: '🐝', name: 'Beehive', lv: [[900, 'Bees pollinate your plants: +30% coins per harvest, and golden plants are twice as likely.']] }
  ];
  const DECO = [
    { id: 'ladybirds', icon: '🐞', name: 'Ladybird house', c: 120, z: 'lawn', x: 6, text: 'Ladybirds eat aphids: natural pest control.' },
    { id: 'shrooms', icon: '🍄', name: 'Fairy ring', c: 180, z: 'lawn', x: 94, text: 'A ring of mushrooms marks the edge of a mycelium spreading outwards underground.' },
    { id: 'chime', icon: '🎐', name: 'Wind chime', c: 220, z: 'sky', x: 8, y: 30, text: 'Each tube’s note is set by its length, like a standing wave in a pipe.' },
    { id: 'butterflies', icon: '🦋', name: 'Butterfly bush', c: 250, z: 'sky', x: 66, y: 62, float: true, text: 'Butterflies taste with their feet and see ultraviolet patterns on flowers.' },
    { id: 'frog', icon: '🐸', name: 'Frog pond', c: 300, z: 'lawn', x: 82, text: 'Frogs breathe partly through their moist skin.' },
    { id: 'parasol', icon: '⛱️', name: 'Parasol', c: 300, z: 'lawn', x: 30, text: 'White fabric reflects most sunlight; dark fabric absorbs it.' },
    { id: 'cat', icon: '🐈', name: 'Garden cat', c: 350, z: 'lawn', x: 50, text: 'A cat lands on its feet by twisting the front and back halves of its body in opposite directions, keeping its total angular momentum zero.' },
    { id: 'hedgehog', icon: '🦔', name: 'Hedgehog house', c: 400, z: 'lawn', x: 18, text: 'Hedgehogs hibernate, letting their body temperature fall to a few degrees above freezing.' },
    { id: 'tent', icon: '⛺', name: 'Stargazing tent', c: 450, z: 'lawn', x: 70, text: 'Away from city lights you can see a few thousand stars with the naked eye.' },
    { id: 'lanterns', icon: '🏮', name: 'Lanterns', c: 500, z: 'sky', x: 36, y: 40, glow: true, text: 'A glowing lantern is a little black-body radiator: hotter flames look whiter.' },
    { id: 'telescope', icon: '🔭', name: 'Telescope', c: 600, z: 'lawn', x: 60, text: 'Galileo’s telescope magnified about 20 times and showed him Jupiter’s four large moons in 1610.' },
    { id: 'fountain', icon: '⛲', name: 'Fountain', c: 800, z: 'lawn', x: 40, text: 'Each jet of water follows a parabola, just like a projectile.' },
    { id: 'rainbow', icon: '🌈', name: 'Prism fountain', c: 1500, z: 'sky', x: 52, y: 28, big: true, text: 'Raindrops split sunlight by dispersion; the bow sits about 42° from the point opposite the Sun.' }
  ];
  const RANKS = [[0, 'Seedling'], [5, 'Sprout'], [15, 'Grower'], [35, 'Botanist'], [70, 'Head gardener'], [120, 'Master of the garden']];

  function G() {
    const s = S();
    if (!s.garden) { s.garden = { plots: [null, null, null, null], water: 8, compost: 0, harvests: 0, herb: {}, upg: {}, deco: {}, rain: null, coinsIn: 0, coinsOut: 0, miles: {} }; PB.save(); }
    return s.garden;
  }
  const lvl = (id) => G().upg[id] || 0;
  const cap = () => [20, 35, 50][lvl('barrel')];
  const speed = () => [1, 0.85, 0.7, 0.55][lvl('greenhouse')];
  const stageMs = (sp) => sp.t / 4 * speed() * MIN;
  const goldChance = () => lvl('hive') ? 0.1 : 0.05;
  const rank = () => { const n = G().harvests; let r = RANKS[0]; RANKS.forEach((x) => { if (n >= x[0]) r = x; }); return r; };
  const nextRank = () => RANKS.find((x) => x[0] > G().harvests);

  function solvedChapters() { const set = {}; Object.keys(S().solved || {}).forEach((id) => { const p = PB.problem && PB.problem(id); if (p) set[p.chapter] = 1; }); return set; }
  function unlocked(sp, solved) {
    const u = sp.u || {};
    if (!u.h) return true;
    if (G().harvests >= u.h || G().herb[sp.id]) return true;
    return !!(u.ch && (solved || solvedChapters())[u.ch]);
  }
  function lockText(sp) {
    const u = sp.u || {}, ch = u.ch && PB.chapter(u.ch), left = u.h - G().harvests;
    return 'Harvest ' + left + ' more plant' + (left === 1 ? '' : 's') + (ch ? ', or solve a problem in ' + ch.title : '') + ' to unlock.';
  }

  /* ---------- growth ---------- */
  function advance(p, now) {
    const sp = SP[p.sp], g = G(), D = stageMs(sp);
    let changed = false;
    while (p.stage < 4 && p.wAt != null && now >= p.wAt + D) {
      const done = p.wAt + D;
      p.stage++; changed = true;
      if (p.stage === 4) { p.golden = Math.random() < goldChance(); p.wAt = null; break; }
      if (lvl('sprinkler') && g.water >= sp.w) { g.water -= sp.w; p.wAt = done; } else p.wAt = null;
    }
    // A sprinkler also starts any plant that is already waiting.
    if (p.stage < 4 && p.wAt == null && lvl('sprinkler') && g.water >= sp.w) { g.water -= sp.w; p.wAt = now; changed = true; }
    return changed;
  }
  function tickAll() { const g = G(), now = Date.now(); let ch = false; g.plots.forEach((p) => { if (p && advance(p, now)) ch = true; }); if (ch) PB.save(); return ch; }
  function status(p) {
    const sp = SP[p.sp], D = stageMs(sp), now = Date.now();
    if (p.stage >= 4) return { key: 'ready', label: p.golden ? 'Golden bloom! Ready to harvest' : 'Ready to harvest', frac: 1 };
    if (p.wAt == null) return { key: 'thirsty', label: 'Thirsty: needs ' + sp.w + ' 💧', frac: p.stage / 4 };
    const left = p.wAt + D - now, f = (p.stage + Math.min(1, (now - p.wAt) / D)) / 4;
    return { key: 'growing', label: ['Germinating', 'Sprouting', 'Growing', 'Budding'][p.stage] + ' · ' + fmt(left), frac: f };
  }
  function fmt(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    if (s < 60) return s + 's';
    const m = Math.floor(s / 60);
    if (m < 60) return m + 'm ' + String(s % 60).padStart(2, '0') + 's';
    const hh = Math.floor(m / 60);
    return hh + 'h ' + String(m % 60).padStart(2, '0') + 'm';
  }
  const fmtMin = (t) => t < 60 ? Math.round(t) + ' min' : (t / 60 % 1 ? (t / 60).toFixed(1) : t / 60) + ' h';

  /* ---------- water ---------- */
  function addWater(n, quiet) {
    const g = G(), before = g.water;
    g.water = Math.min(cap(), g.water + n);
    if (g.water !== before) { PB.save(); if (PB.renderHUD) PB.renderHUD(); const el = document.querySelector('.hud-gold'); if (el) { el.classList.remove('drip'); void el.offsetWidth; el.classList.add('drip'); } }
    if (!quiet && g.water > before && location.hash === '#garden') render();
    return g.water - before;
  }
  function rainCheck() {
    const g = G(), d = PB.today();
    if (g.rain === d) return 0;
    const first = g.rain == null;
    g.rain = d; PB.save();
    if (first) return 0;
    const got = addWater(lvl('station') ? 6 : 3, true);
    if (got && PB.toast) PB.toast('<span class="tx">🌧 Morning rain</span> +' + got + ' 💧 for your garden', '');
    return got;
  }
  PB.on((ev) => {
    if (ev.type === 'answer' && ev.ok) addWater(ev.p && ev.p.level === 'olympiad' ? 2 : 1);
    else if ((ev.type === 'quiz' || ev.type === 'drill') && ev.ok) addWater(1);
    else if (ev.type === 'journalfix') addWater(2);
  });

  /* ---------- actions ---------- */
  function plant(i, id) {
    const g = G(), sp = SP[id];
    if (g.plots[i] || !PB.wallet.spend('coins', sp.c)) return false;
    g.coinsOut += sp.c;
    g.plots[i] = { sp: id, stage: 0, wAt: Date.now(), planted: Date.now() };
    PB.save(); return true;
  }
  function water(i) {
    const g = G(), p = g.plots[i], sp = p && SP[p.sp];
    if (!p || p.stage >= 4 || p.wAt != null || g.water < sp.w) return false;
    g.water -= sp.w; p.wAt = Date.now(); PB.save(); return true;
  }
  function compost(i) {
    const g = G(), p = g.plots[i];
    if (!p || p.stage >= 4 || p.wAt == null || g.compost < 1) return false;
    g.compost--; p.wAt -= stageMs(SP[p.sp]); advance(p, Date.now()); PB.save(); return true;
  }
  function harvest(i) {
    const g = G(), p = g.plots[i];
    if (!p || p.stage < 4) return;
    const sp = SP[p.sp], first = !g.herb[sp.id], firstGold = p.golden && !(g.herb[sp.id] || {}).gold;
    const coins = Math.round(sp.y * (lvl('hive') ? 1.3 : 1) * (p.golden ? 3 : 1));
    const rec = g.herb[sp.id] = g.herb[sp.id] || { n: 0, first: Date.now() };
    rec.n++; if (p.golden) rec.gold = (rec.gold || 0) + 1;
    g.harvests++; g.coinsIn += coins; g.plots[i] = null;
    if (lvl('compost')) g.compost = Math.min(10, g.compost + (p.golden ? 2 : 1));
    const before = SPECIES.filter((s) => unlocked(s)).length;
    PB.save();
    PB.wallet.give('coins', coins, sp.name, true);
    const xp = Math.max(2, Math.min(30, Math.round(sp.t / 12)));
    if (PB.addXP) PB.addXP(xp, 'Harvest: ' + sp.name);
    const rewards = [['coins', coins]];
    let gems = 0;
    if (first) gems += FIRST_GEMS[sp.r];
    if (firstGold) gems += 25;
    if (gems) { PB.wallet.give('gems', gems, 'herbarium', true); rewards.push(['gems', gems]); }
    const nowUnlocked = SPECIES.filter((s) => unlocked(s)).length - before;
    if (first || p.golden) {
      PB.rewardModal({ icon: p.golden ? '🌟' : '🌿', eyebrow: (first ? 'New in your herbarium' : 'Golden harvest') + ' · ' + RAR[sp.r][0], title: (p.golden ? 'Golden ' : '') + sp.name, text: '<i>' + sp.latin + '</i><br>' + sp.fact + (nowUnlocked > 0 ? '<br><b>New seeds unlocked in the shop!</b>' : ''), rewards: rewards, big: p.golden || sp.r >= 3, button: 'Back to the garden' });
    } else if (PB.toast) PB.toast('<span class="tx">🧺 ' + sp.name + '</span> +' + coins + ' ◉' + (nowUnlocked > 0 ? ' · new seeds unlocked!' : ''), 'badge-t');
    herbMilestones();
    if (PB.checkBadges) PB.checkBadges();
  }
  function herbMilestones() {
    const g = G(), got = Object.keys(g.herb).length, f = got / SPECIES.length;
    [[0.25, 40], [0.5, 80], [0.75, 150], [1, 400]].forEach(([t, gems]) => {
      if (f >= t && !g.miles[t]) {
        g.miles[t] = Date.now(); PB.save();
        PB.wallet.give('gems', gems, 'herbarium', true);
        PB.rewardModal({ icon: '📗', eyebrow: 'Herbarium', title: t === 1 ? 'Every species grown!' : Math.round(t * 100) + '% of species grown', text: got + ' of ' + SPECIES.length + ' species.', rewards: [['gems', gems]], big: t === 1 });
      }
    });
  }
  function buyUpg(u) {
    const g = G(), l = lvl(u.id);
    if (l >= u.lv.length || !PB.wallet.spend('coins', u.lv[l][0])) return;
    g.upg[u.id] = l + 1; g.coinsOut += u.lv[l][0]; PB.save();
    if (PB.toast) PB.toast('<span class="tx">' + u.icon + ' ' + u.name + '</span> ' + u.lv[l][1], 'badge-t');
    if (u.id === 'sprinkler') tickAll();
  }
  function buyPlot() {
    const g = G(), k = g.plots.length - 4;
    if (k >= PLOT_COST.length || !PB.wallet.spend('coins', PLOT_COST[k])) return;
    g.plots.push(null); g.coinsOut += PLOT_COST[k]; PB.save();
  }
  function buyDeco(d) {
    const g = G();
    if (g.deco[d.id] || !PB.wallet.spend('coins', d.c)) return;
    g.deco[d.id] = Date.now(); g.coinsOut += d.c; PB.save();
    if (PB.toast) PB.toast('<span class="tx">' + d.icon + ' ' + d.name + '</span> added to your garden', 'badge-t');
  }
  function mysterySeed() {
    const g = G(), i = g.plots.findIndex((p) => !p);
    if (i < 0 || !PB.wallet.spend('gems', 40)) return;
    const unseen = SPECIES.filter((s) => !g.herb[s.id] && s.r >= 1);
    const pool = unseen.length ? unseen : SPECIES.filter((s) => s.r >= 1);
    // Rarer species are less likely: weight 5, 4, 3, 2, 1 by rarity.
    let tot = 0; pool.forEach((s) => { tot += 5 - s.r; });
    let x = Math.random() * tot, pick = pool[0];
    for (const s of pool) { x -= 5 - s.r; if (x <= 0) { pick = s; break; } }
    g.plots[i] = { sp: pick.id, stage: 0, wAt: Date.now(), planted: Date.now(), mystery: true };
    PB.save();
    PB.rewardModal({ icon: '🎁', eyebrow: 'Mystery seed · ' + RAR[pick.r][0], title: pick.name, text: '<i>' + pick.latin + '</i> is now growing in plot ' + (i + 1) + '. It takes about ' + fmtMin(pick.t * speed()) + ' to bloom.', button: 'Let it grow' });
  }

  /* ---------- drawing (SVG, 100 × 100, ground at y = 90) ---------- */
  const r1 = (n) => Math.round(n * 10) / 10;
  const LEAF = '#4f9d3a', DARK = '#2f6f2a', STEM = '#3d7d2c';
  function leaf(x, y, L, W, ang, col) { return '<path d="M0 0Q' + r1(L / 2) + ' ' + r1(-W) + ' ' + r1(L) + ' 0Q' + r1(L / 2) + ' ' + r1(W) + ' 0 0Z" fill="' + (col || LEAF) + '" transform="translate(' + r1(x) + ' ' + r1(y) + ')rotate(' + r1(ang) + ')"/>'; }
  const line = (x1, y1, x2, y2, col, w) => '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + (col || STEM) + '" stroke-width="' + (w || 1.6) + '" stroke-linecap="round"/>';
  const circ = (x, y, r, col, extra) => '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + r1(r) + '" fill="' + col + '"' + (extra || '') + '/>';
  const ell = (x, y, rx, ry, col, ang) => '<ellipse cx="' + r1(x) + '" cy="' + r1(y) + '" rx="' + r1(rx) + '" ry="' + r1(ry) + '" fill="' + col + '"' + (ang ? ' transform="rotate(' + ang + ' ' + r1(x) + ' ' + r1(y) + ')"' : '') + '/>';
  const path = (d, fill, stroke, w) => '<path d="' + d + '" fill="' + (fill || 'none') + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (w || 1.5) + '" stroke-linecap="round" stroke-linejoin="round"' : '') + '/>';
  const jit = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  function petals(cx, cy, n, L, W, col, a0, spread) {
    let s = '';
    for (let k = 0; k < n; k++) s += leaf(cx, cy, L, W, spread ? a0 + k * spread / Math.max(1, n - 1) : a0 + k * 360 / n, col);
    return s;
  }
  function flower5(x, y, r, col, cc) { return petals(x, y, 5, r, r * 0.45, col, -90) + circ(x, y, r * 0.3, cc || '#f6d34a'); }

  const SHAPES = {
    sprouts(sp, b) {
      let s = '';
      for (let i = 0; i < 11; i++) { const x = 28 + i * 4.4 + jit(i, 1) * 2, ht = (b ? 16 : 11) + jit(i, 2) * 6; s += line(x, 90, x + (jit(i, 3) - 0.5) * 3, 90 - ht, '#8fbf5a', 1.1) + leaf(x + (jit(i, 3) - 0.5) * 3, 90 - ht, 5, 2.6, -160, '#5fae3c') + leaf(x + (jit(i, 3) - 0.5) * 3, 90 - ht, 5, 2.6, -20, '#5fae3c'); }
      return s;
    },
    root(sp, b) {
      const R = b ? 11 : 7;
      let s = '';
      [-155, -125, -95, -70, -40].forEach((a, i) => { s += leaf(50, 84, b ? 28 : 22, 6, a + (jit(i, 4) - 0.5) * 8, i % 2 ? LEAF : DARK); });
      return s + ell(50, 89, R, R * 0.85, sp.col) + path('M50 ' + r1(89 + R * 0.8) + 'L50 ' + r1(94 + R * 0.3), null, '#f3e9e0', 1.2) + ell(50 - R * 0.35, 86, R * 0.25, R * 0.18, 'rgba(255,255,255,.35)');
    },
    vine(sp, b) {
      let s = line(50, 92, 50, 22, '#a0784a', 2.2) + path('M50 90Q42 80 50 72T50 54T50 36T50 26', null, STEM, 1.6);
      [80, 70, 61, 52, 43, 34].forEach((y, i) => { s += leaf(50, y, 13, 5, i % 2 ? -25 : -155, i % 2 ? LEAF : DARK); s += path('M50 ' + y + 'q' + (i % 2 ? '-6 -2 -5 -6' : '6 -2 5 -6'), null, '#7fb34d', 0.8); });
      if (b) { [[38, 62], [62, 48], [37, 40], [63, 70]].forEach((q, i) => { s += i % 2 ? ell(q[0], q[1], 3, 7, '#6fbf45', 15) + ell(q[0] - 0.5, q[1], 1.2, 5, '#9ad66b', 15) : flower5(q[0], q[1], 4.5, '#ffffff', '#f2e8b8'); }); }
      return s;
    },
    flower(sp, b) {
      const f = sp.fl, top = 90 - f.h, cx = 50 + (f.cup ? 0 : 2);
      let s = '';
      if (f.pads) s += ell(50, 90, 34, 5, '#5aa6d6') + ell(33, 88, 12, 3.4, '#3f8f3a') + ell(68, 89, 11, 3, '#4aa043') + path('M33 88L39 87', null, '#2f6f2a', 0.8);
      s += path('M50 90Q' + (f.cup ? 50 : 44) + ' ' + r1(90 - f.h / 2) + ' ' + cx + ' ' + r1(top), null, STEM, f.puff ? 1.4 : 2.4);
      if (f.pinnate) { [74, 64, 56].forEach((y, i) => { const dx = i % 2 ? 1 : -1; s += path('M48 ' + y + 'l' + 14 * dx + ' -5', null, STEM, 0.9); for (let k = 1; k < 7; k++) s += leaf(48 + 2 * k * dx, y - 0.7 * k, 3.4, 1.3, dx > 0 ? -110 : -70, LEAF) + leaf(48 + 2 * k * dx, y - 0.7 * k, 3.4, 1.3, dx > 0 ? 70 : 110, LEAF); }); }
      else if (!f.pads) s += leaf(48, 90 - f.h * 0.35, 16, 6, -150, DARK) + leaf(49, 90 - f.h * 0.55, 15, 5.5, -30, LEAF);
      if (!b) return s + ell(cx, top, 4.5, 6, '#5d9b3e') + path('M' + (cx - 2) + ' ' + (top - 4) + 'l2 -3l2 3', null, f.pc, 1.2);
      if (f.puff) { for (let k = 0; k < 28; k++) { const a = k * 2 * Math.PI / 28, L = 7 + jit(k, 5) * 2; s += line(cx, top, cx + Math.cos(a) * L, top + Math.sin(a) * L, f.pc, 0.8) + circ(cx + Math.cos(a) * L, top + Math.sin(a) * L, 0.8, '#ffd94a'); } return s + circ(cx, top, f.cr, f.cc); }
      const L = f.cr + f.pl;
      if (f.cup) s += petals(cx, top, f.n, L, f.pw, f.pc, -175, 170) + petals(cx, top + 1, 5, L * 0.8, f.pw * 0.9, '#f7b6cc', -150, 120);
      else s += petals(cx, top, f.n, L, f.pw, f.pc, f.n === 5 ? -90 : 0);
      if (f.lip) s += ell(cx, top + 5, 3.2, 4.2, f.lip);
      s += circ(cx, top, f.cr, f.cc);
      if (f.fib) { for (let i = 1; i < 70; i++) { const rr = Math.sqrt(i / 70) * (f.cr - 0.8), a = i * 2.39996; s += circ(cx + rr * Math.cos(a), top + rr * Math.sin(a), 0.55, '#3b210c'); } }
      return s;
    },
    bush(sp, b) {
      const q = sp.bu, sc = q.low ? 0.7 : q.tall ? 1.15 : 1, oy = q.low ? 14 : q.tall ? -6 : 0;
      let s = q.tall ? line(50, 90, 50, 40, '#7a5a3a', 2.6) : line(50, 90, 50, 70, STEM, 2.4);
      const blobs = q.tall ? [[42, 44, 11], [58, 40, 11], [50, 32, 10], [40, 60, 12], [60, 58, 12], [50, 52, 12], [44, 74, 10], [57, 74, 10]] : [[38, 70, 14], [56, 62, 16], [66, 74, 13], [46, 78, 13], [52, 70, 12]];
      blobs.forEach((c, i) => { s += circ(50 + (c[0] - 50) * sc, 90 - (90 - c[1]) * sc + oy, c[2] * sc, i % 2 ? LEAF : DARK); });
      if (q.low) s += path('M66 86Q78 82 88 88', null, STEM, 1) + circ(88, 88, 2.4, DARK);
      if (b) {
        for (let k = 0; k < q.n; k++) {
          const bx = blobs[k % blobs.length], x = 50 + (bx[0] - 50 + (jit(k, 6) - 0.5) * 14) * sc, y = 90 - (90 - bx[1] - (jit(k, 7) - 0.3) * 10) * sc + oy;
          if (q.low) s += path('M' + r1(x - q.fr) + ' ' + r1(y - 1) + 'Q' + r1(x) + ' ' + r1(y + q.fr * 2.6) + ' ' + r1(x + q.fr) + ' ' + r1(y - 1) + 'Z', q.fc) + leaf(x, y - 1.5, 3, 1.4, -150, '#3c8a2c') + leaf(x, y - 1.5, 3, 1.4, -30, '#3c8a2c');
          else s += circ(x, y, q.fr, q.fc) + circ(x - q.fr * 0.35, y - q.fr * 0.35, q.fr * 0.28, 'rgba(255,255,255,.45)');
        }
        if (q.flowers) s += flower5(36, 74 + oy * 0.4, 3.2, '#fff', '#f2d24b') + flower5(62, 70 + oy * 0.4, 3.2, '#fff', '#f2d24b');
      }
      return s;
    },
    grain(sp, b) {
      const q = sp.gr, col = b ? q.c : '#8cbf55';
      let s = '';
      for (let i = 0; i < q.n; i++) {
        const x0 = 44 + i * 2.4, tx = 26 + i * (48 / (q.n - 1)) + (jit(i, 8) - 0.5) * 4, ty = 30 + jit(i, 9) * 10;
        s += path('M' + r1(x0) + ' 90Q' + r1((x0 + tx) / 2) + ' 60 ' + r1(tx) + ' ' + r1(ty), null, b ? '#b9a24a' : STEM, 1.2) + leaf(x0, 82 - i, 18, 2.2, i % 2 ? -60 : -120, '#6fa845');
        if (q.droop) { for (let k = 0; k < 6; k++) s += ell(tx + 1.4 * k, ty + 2.2 * k, 1.1, 2, col, -30); }
        else { for (let k = 0; k < 6; k++) s += ell(tx - 1.2, ty + 2.3 * k, 1.3, 2.1, col, -25) + ell(tx + 1.2, ty + 2.3 * k, 1.3, 2.1, col, 25); if (b) s += line(tx, ty, tx, ty - 7, col, 0.5); }
      }
      return s;
    },
    maize(sp, b) {
      let s = line(50, 90, 50, 16, '#5f9a3a', 3.2);
      [[80, -160], [72, -20], [62, -165], [52, -15], [42, -150], [32, -30]].forEach((q, i) => { s += path('M50 ' + q[0] + 'q' + (q[1] < -90 ? '-14 -10 -26 -2' : '14 -10 26 -2'), null, i % 2 ? LEAF : DARK, 3); });
      if (b) {
        s += ell(56, 58, 4.2, 10, '#f3c535', 12) + path('M53 66Q50 56 55 46', null, '#7fb34d', 2.4) + path('M59 67Q63 56 58 48', null, '#7fb34d', 2);
        for (let k = 0; k < 7; k++) s += line(50, 16, 44 + k * 2, 8 + (k % 2) * 2, '#d7b45a', 0.8);
        s += line(55.5, 48, 53, 42, '#b8875a', 0.6);
      }
      return s;
    },
    trap(sp, b) {
      let s = '';
      [-160, -125, -90, -55, -20].forEach((a, i) => {
        const rad = a * Math.PI / 180, L = 22 + (i % 2) * 4, x = 50 + Math.cos(rad) * L, y = 88 + Math.sin(rad) * L;
        s += line(50, 88, x, y, LEAF, 2.4);
        const ang = a, open = b ? 34 : 14;
        s += '<g transform="translate(' + r1(x) + ' ' + r1(y) + ')rotate(' + (ang + 90) + ')">' + path('M0 0Q-' + (open / 4) + ' -9 0 -12', '#c8283a', '#4f9d3a', 1.2) + path('M0 0Q' + (open / 4) + ' -9 0 -12', '#e04558', '#4f9d3a', 1.2) + '</g>';
        if (b) { for (let k = 0; k < 4; k++) s += circ(x + Math.cos(rad) * (3 + k), y + Math.sin(rad) * (3 + k), 0.35, '#e9f0c4'); }
      });
      if (b) s += line(50, 88, 52, 26, '#6fa845', 1) + flower5(52, 24, 4.5, '#ffffff', '#c8e07a') + flower5(46, 30, 3.5, '#ffffff', '#c8e07a');
      return s;
    },
    pitcher(sp, b) {
      let s = path('M50 90Q44 70 52 58T48 30', null, STEM, 2) + leaf(50, 76, 16, 5, -150, DARK) + leaf(50, 64, 16, 5, -25, LEAF) + leaf(49, 44, 14, 4.5, -160, LEAF);
      const pit = (x, y, k) => path('M' + x + ' ' + y + 'q-7 2 -7 12q0 9 7 10q7 -1 7 -10q0 -10 -7 -12z', b ? '#a33a2e' : '#8bb04a') + ell(x, y + 1, 5.5, 1.8, b ? '#e3a23b' : '#6f9a3a') + path('M' + x + ' ' + (y - 1) + 'q4 -6 9 -3', b ? '#7f2a22' : '#76a03f', '#5b7f2e', 0.6) + (k ? '' : path('M' + (x - 3) + ' ' + (y + 6) + 'q2 6 0 12', null, 'rgba(255,255,255,.35)', 0.8));
      s += path('M62 64q6 2 8 8', null, STEM, 1) + pit(70, 70, 0) + path('M38 50q-6 2 -8 8', null, STEM, 1) + pit(30, 56, 1);
      if (b) s += path('M48 30q8 -2 12 6', null, STEM, 1) + pit(60, 36, 1);
      return s;
    },
    cactus(sp, b) {
      const col = '#3f8f4a';
      let s = path('M43 90V34q0-7 7-7t7 7V90z', col) + path('M43 62h-7q-5 0 -5 -5V44q0-4 3-4t3 4v12h6z', col) + path('M57 54h6q4 0 4 -4V38q0-4 -3-4t-3 4v10h-4z', col);
      [46, 50, 54].forEach((x) => { s += line(x, 30, x, 89, 'rgba(255,255,255,.18)', 0.8); });
      for (let k = 0; k < 14; k++) s += circ(44 + (k % 3) * 6, 36 + Math.floor(k / 3) * 10, 0.6, '#f3f0d8');
      if (b) s += flower5(50, 27, 4, '#fdfdf6', '#f2cf43') + flower5(34, 39, 3, '#fdfdf6', '#f2cf43') + flower5(64, 33, 3, '#fdfdf6', '#f2cf43');
      return s;
    },
    fern(sp, b) {
      let s = '';
      [-150, -122, -95, -68, -38].forEach((a, i) => {
        const rad = a * Math.PI / 180, L = 34 - Math.abs(a + 95) / 8, ex = 50 + Math.cos(rad) * L, ey = 88 + Math.sin(rad) * L, mx = 50 + Math.cos(rad) * L * 0.5 - Math.sin(rad) * 4, my = 88 + Math.sin(rad) * L * 0.5;
        s += path('M50 88Q' + r1(mx) + ' ' + r1(my) + ' ' + r1(ex) + ' ' + r1(ey), null, STEM, 1.2);
        for (let k = 1; k < 9; k++) { const t = k / 9, x = 50 + (ex - 50) * t, y = 88 + (ey - 88) * t, pl = 7 * (1 - t * 0.7); s += leaf(x, y, pl, 1.4, a - 60, i % 2 ? LEAF : DARK) + leaf(x, y, pl, 1.4, a + 60, i % 2 ? LEAF : DARK); if (b && k % 2) s += circ(x + 1.5, y + 1.5, 0.6, '#8a5a2a'); }
      });
      if (b) s += path('M56 88q2 -12 -2 -14q-4 -1 -3 3q1 3 3 1', null, '#7fb34d', 1.2);
      return s;
    },
    moss(sp, b) {
      let s = '';
      for (let i = 0; i < 26; i++) s += circ(26 + jit(i, 10) * 48, 86 - jit(i, 11) * 7, 3.2 + jit(i, 12) * 2, i % 3 ? '#5f9d3a' : '#467f2c');
      for (let i = 0; i < 18; i++) { const x = 28 + jit(i, 13) * 44; s += line(x, 84, x, 78, '#9ccb5d', 0.8); }
      if (b) { for (let i = 0; i < 8; i++) { const x = 30 + i * 5.5 + jit(i, 14) * 2, ht = 22 + jit(i, 15) * 10; s += line(x, 82, x + 1, 82 - ht, '#b8863e', 0.7) + ell(x + 1.6, 82 - ht, 1, 2.2, '#9b6a2e', 25); } }
      return s;
    },
    bamboo(sp, b) {
      let s = '';
      [[40, 18, 4], [52, 8, 4.6], [62, 24, 3.6]].forEach((c, i) => {
        s += '<rect x="' + (c[0] - c[2] / 2) + '" y="' + c[1] + '" width="' + c[2] + '" height="' + (90 - c[1]) + '" rx="1.4" fill="' + (i % 2 ? '#7fb44a' : '#6aa33f') + '"/>';
        for (let y = c[1] + 8; y < 88; y += 10) s += line(c[0] - c[2] / 2, y, c[0] + c[2] / 2, y, '#4a7d2a', 0.9);
        s += leaf(c[0], c[1] + 2, 12, 2.4, -150, LEAF) + leaf(c[0], c[1] + 4, 12, 2.4, -30, DARK) + leaf(c[0], c[1] + 10, 10, 2.2, -160, DARK);
        if (b) s += leaf(c[0], c[1] + 16, 11, 2.2, -20, LEAF) + leaf(c[0], c[1] + 1, 9, 2, -100, '#8cc556');
      });
      return s;
    },
    mushroom(sp, b) {
      const col = sp.mu.c;
      let s = path('M24 90Q50 84 76 90', '#6b4a2a');
      const m = (x, ht, w) => '<rect x="' + (x - w * 0.18) + '" y="' + (90 - ht) + '" width="' + (w * 0.36) + '" height="' + ht + '" rx="1" fill="#efe3cf"/>' + path('M' + (x - w) + ' ' + (90 - ht + 1) + 'Q' + x + ' ' + (90 - ht - w * 1.1) + ' ' + (x + w) + ' ' + (90 - ht + 1) + 'Z', col) + circ(x - w * 0.35, 90 - ht - w * 0.3, w * 0.13, 'rgba(255,240,220,.8)') + circ(x + w * 0.3, 90 - ht - w * 0.15, w * 0.1, 'rgba(255,240,220,.7)');
      return s + (b ? m(40, 14, 9) + m(57, 20, 11) + m(70, 10, 6) : m(44, 8, 6) + m(56, 6, 4.5));
    },
    rosette(sp, b) {
      let s = '';
      for (let k = 0; k < 9; k++) s += leaf(50, 88, 11, 3.8, -180 + k * 22.5, k % 2 ? LEAF : DARK);
      s += path('M50 88Q48 64 50 40', null, STEM, 0.9) + path('M50 64q6 -6 8 -16', null, STEM, 0.7) + path('M50 56q-6 -4 -9 -14', null, STEM, 0.7);
      if (b) { [[50, 38], [58, 46], [41, 41], [52, 33]].forEach((q) => { s += flower5(q[0], q[1], 1.8, '#ffffff', '#f2e27a'); }); [[54, 58], [46, 52], [56, 52]].forEach((q) => { s += line(q[0], q[1], q[0] + 3, q[1] - 6, '#8cbf55', 0.7); }); }
      return s;
    },
    tree(sp, b) {
      const k = sp.tr.kind;
      if (k === 'baobab') {
        let s = path('M40 90Q36 60 44 46h12Q64 60 60 90z', '#a07c5c') + path('M44 47l-8 -10M48 46l-3 -14M52 46l4 -13M56 47l9 -9', null, '#8a6a4c', 2);
        [[36, 36], [45, 31], [56, 32], [65, 37]].forEach((q, i) => { s += ell(q[0], q[1], 8, 4, i % 2 ? '#5a9a3a' : '#4a8a30'); });
        if (b) [[38, 42], [50, 40], [62, 43]].forEach((q) => { s += line(q[0], q[1] - 3, q[0], q[1], '#8a6a4c', 0.6) + circ(q[0], q[1] + 1.5, 2.4, '#fbf7ee'); });
        return s;
      }
      if (k === 'ginkgo') {
        let s = path('M48 90L49 40L51 40L52 90z', '#7a5a3a') + path('M49 60l-12 -10M51 54l11 -9M50 46l-8 -10', null, '#7a5a3a', 1.6);
        const fan = (x, y, a) => '<path d="M0 0L-4 -6Q0 -8 4 -6Z" fill="' + (b ? '#f2c230' : '#6aa33f') + '" transform="translate(' + r1(x) + ' ' + r1(y) + ')rotate(' + a + ')"/>';
        let f = '';
        for (let i = 0; i < 34; i++) f += fan(32 + jit(i, 16) * 36, 22 + jit(i, 17) * 34, (jit(i, 18) - 0.5) * 90);
        if (b) for (let i = 0; i < 6; i++) f += fan(30 + jit(i, 19) * 40, 86 + jit(i, 20) * 3, 180 * jit(i, 21));
        return s + f;
      }
      // cacao
      let s = path('M48 90L48.6 34L51.4 34L52 90z', '#6e4b32');
      [[40, 30, 12], [58, 28, 12], [50, 22, 11], [44, 42, 9], [58, 42, 9]].forEach((c, i) => { s += ell(c[0], c[1], c[2], c[2] * 0.6, i % 2 ? DARK : LEAF); });
      if (b) [[46, 60, 0], [54, 66, 1], [46, 74, 1], [54, 52, 0]].forEach((q) => { s += ell(q[0], q[1], 2.6, 5, q[2] ? '#e08a24' : '#c0552a', q[0] < 50 ? 12 : -12) + line(q[0], q[1] - 2, q[0], q[1] + 2, 'rgba(0,0,0,.18)', 0.5); });
      return s;
    },
    welwitschia(sp, b) {
      let s = path('M50 86Q34 80 22 88T8 90', null, '#4a7f3a', 5) + path('M50 86Q66 80 78 88T94 90', null, '#3f7432', 5);
      s += path('M10 90l-2 -2M14 90l-1 -3M90 90l2 -2', null, '#a58a5a', 0.8) + ell(50, 86, 7, 4, '#7a5a3a');
      if (b) [[44, 80], [50, 78], [56, 80]].forEach((q) => { s += line(q[0], 84, q[0], q[1], '#6b4a2a', 0.8) + ell(q[0], q[1] - 2, 1.8, 3, '#c8433a'); });
      return s;
    },
    rafflesia(sp, b) {
      if (!b) return path('M30 90Q30 70 50 68Q70 70 70 90z', '#6b2a1e') + path('M36 88Q38 74 50 72M64 88Q62 74 50 72M50 72V88', null, '#4e1c14', 1);
      let s = '';
      for (let k = 0; k < 5; k++) { const a = -90 + k * 72; s += '<g transform="translate(50 74)rotate(' + a + ')"><path d="M0 -4C-11 -6 -12 -26 0 -27C12 -26 11 -6 0 -4Z" fill="#a8282a"/>' + [[-4, -16], [3, -20], [-1, -23], [4, -12]].map((p) => circ(p[0], p[1], 1.4, '#f3d9c6')).join('') + '</g>'; }
      return s + circ(50, 74, 9, '#6e1a1d') + circ(50, 74, 6, '#2e0d0e') + circ(50, 74, 4.4, '#7a2425');
    },
    titan(sp, b) {
      if (!b) return path('M46 90Q44 60 50 20Q56 60 54 90z', '#6d8f4a') + path('M48 86Q47 60 50 28', null, '#8aa95c', 0.8);
      return path('M50 6Q55 10 56 40Q57 60 54 72H46Q43 60 44 40Q45 10 50 6Z', '#d6c96a') + path('M26 70Q30 54 46 60Q50 64 54 60Q70 54 74 70Q72 88 50 90Q28 88 26 70Z', '#6a1f4a') + path('M30 70Q34 62 46 66M70 70Q66 62 54 66', null, '#a33e72', 1.2) + path('M44 90Q42 80 50 76Q58 80 56 90z', '#4e8a3a');
    }
  };
  function plantSVG(sp, stage, golden, size) {
    let s = '<ellipse cx="50" cy="92" rx="30" ry="5" fill="rgba(60,35,15,.35)"/>';
    if (stage === 0) s += path('M34 92Q50 80 66 92Z', '#8a5a34') + ell(50, 86, 2.4, 1.6, '#e8d6a0') + path('M46 84q4 -3 8 0', null, 'rgba(255,255,255,.25)', 0.8);
    else if (stage === 1) s += line(50, 90, 50, 78, '#7fb34d', 1.6) + leaf(50, 78.5, 9, 4, -160, '#7cc04f') + leaf(50, 78.5, 9, 4, -20, '#6aae3e');
    else if (stage === 2) s += path('M50 90Q48 76 50 62', null, STEM, 2) + leaf(50, 80, 14, 5, -155, DARK) + leaf(50, 74, 14, 5, -25, LEAF) + leaf(50, 66, 11, 4, -150, LEAF) + leaf(50, 63, 9, 3.5, -40, DARK);
    else s += SHAPES[sp.shape](sp, stage >= 4);
    return '<svg class="plant-svg' + (golden ? ' golden' : '') + '" viewBox="0 0 100 100" width="' + (size || 120) + '" height="' + (size || 120) + '" aria-hidden="true">' + s + '</svg>';
  }
  PB.plantSVG = (id, stage, golden, size) => SP[id] ? plantSVG(SP[id], stage == null ? 4 : stage, golden, size) : '';

  /* ---------- views ---------- */
  let tab = 'garden', timer = null, refs = [];
  const isDay = () => { const hr = new Date().getHours(); return hr >= 6 && hr < 20; };
  const coinBtn = (cost, label, on, extra) => h('button', { class: 'btn ' + (extra || 'primary') + ' small', type: 'button', disabled: PB.wallet.coins() >= cost ? null : 'disabled', text: label + ' · ◉ ' + cost, onclick: on });

  function header() {
    const g = G(), rk = rank(), nx = nextRank();
    return h('div', { class: 'garden-head' }, [
      h('div', { class: 'eyebrow', text: 'Study to water, spend coins to grow' }),
      h('h1', { text: '🌻 Science garden' }),
      h('p', { class: 'lede', text: 'Spend coins on seeds, plots and upgrades. Every correct problem, quick check or drill adds a drop of water to your rain barrel (olympiad problems add two), and each growth stage starts when you water. Plants keep growing while you are away, and every harvest pays back more than its seed and adds a real plant fact to your herbarium.' }),
      h('div', { class: 'stat-row' }, [
        ['◉ ' + PB.wallet.coins(), 'coins'], ['💧 ' + g.water + ' / ' + cap(), 'water'], lvl('compost') ? ['♻️ ' + g.compost, 'compost'] : null,
        [Object.keys(g.herb).length + ' / ' + SPECIES.length, 'species grown'], [rk[1], g.harvests + ' harvest' + (g.harvests === 1 ? '' : 's') + (nx ? ' · next rank at ' + nx[0] : '')]
      ].filter(Boolean).map((x) => h('div', { class: 'stat' }, [h('b', { text: String(x[0]) }), h('span', { text: x[1] })])))
    ]);
  }
  function tabs() {
    return h('div', { class: 'cc-tabs garden-tabs' }, [['garden', '🌱', 'Garden'], ['shop', '🛒', 'Shop'], ['herb', '📗', 'Herbarium']].map((t) => h('button', { class: 'cc-tab' + (tab === t[0] ? ' on' : ''), type: 'button', onclick: () => { tab = t[0]; render(); } }, [h('span', { text: t[1] }), h('b', { text: t[2] })])));
  }
  function scene() {
    const g = G(), day = isDay();
    const wrap = h('div', { class: 'garden-scene' + (day ? '' : ' night') });
    const sky = h('div', { class: 'garden-sky', html: (day ? '<span class="g-sun"></span><span class="g-cloud c1"></span><span class="g-cloud c2"></span>' : '<span class="g-moon"></span>' + Array.from({ length: 18 }, (_, i) => '<i class="g-star" style="left:' + Math.round(jit(i, 30) * 98) + '%;top:' + Math.round(jit(i, 31) * 80) + '%"></i>').join('')) });
    wrap.appendChild(sky);
    const deco = (d) => h('span', { class: 'g-deco' + (d.float ? ' float' : '') + (d.glow ? ' glow' : '') + (d.big ? ' big' : ''), style: 'left:' + d.x + '%' + (d.z === 'sky' ? ';top:' + d.y + '%' : ''), tabindex: '0', title: d.name + ': ' + d.text, 'aria-label': d.name + ': ' + d.text, text: d.icon });
    DECO.forEach((d) => { if (g.deco[d.id] && d.z === 'sky') sky.appendChild(deco(d)); });
    const grid = h('div', { class: 'garden-grid' });
    refs = [];
    g.plots.forEach((p, i) => grid.appendChild(plotCard(p, i)));
    if (g.plots.length - 4 < PLOT_COST.length) {
      const cost = PLOT_COST[g.plots.length - 4];
      grid.appendChild(h('div', { class: 'g-plot locked' }, [h('div', { class: 'g-soil empty', html: '<span class="g-plus">+</span>' }), h('b', { text: 'New plot' }), h('small', { text: 'Dig another bed' }), coinBtn(cost, 'Buy', () => { buyPlot(); render(); }, 'ghost')]));
    }
    wrap.appendChild(grid);
    const lawn = h('div', { class: 'garden-lawn' });
    DECO.forEach((d) => { if (g.deco[d.id] && d.z === 'lawn') lawn.appendChild(deco(d)); });
    if (!lawn.childElementCount) lawn.appendChild(h('small', { class: 'lawn-hint', text: 'Decorations from the shop appear here and in the sky.' }));
    wrap.appendChild(lawn);
    return wrap;
  }
  function plotCard(p, i) {
    const g = G();
    if (!p) return h('div', { class: 'g-plot' }, [h('div', { class: 'g-soil empty', html: '<span class="g-plus">🌱</span>' }), h('b', { text: 'Empty plot' }), h('small', { text: 'Plant a seed' }), h('button', { class: 'btn primary small', type: 'button', text: 'Plant', onclick: () => seedPicker(i) })]);
    const sp = SP[p.sp], st = status(p);
    const bar = h('span', { style: 'width:' + Math.round(st.frac * 100) + '%' });
    const lab = h('small', { class: 'g-status ' + st.key, text: st.label });
    const acts = h('div', { class: 'g-acts' });
    if (st.key === 'ready') acts.appendChild(h('button', { class: 'btn primary small', type: 'button', text: 'Harvest', onclick: () => { harvest(i); render(); } }));
    if (st.key === 'thirsty') acts.appendChild(h('button', { class: 'btn primary small', type: 'button', disabled: g.water >= sp.w ? null : 'disabled', title: g.water >= sp.w ? '' : 'Solve problems to collect water', text: 'Water 💧' + sp.w, onclick: () => { water(i); render(); } }));
    if (st.key === 'growing' && lvl('compost') && g.compost > 0) acts.appendChild(h('button', { class: 'btn small', type: 'button', text: 'Compost ♻️', title: 'Finish this growth stage now', onclick: () => { compost(i); render(); } }));
    acts.appendChild(h('button', { class: 'btn ghost small g-dig', type: 'button', title: 'Dig up (no refund)', 'aria-label': 'Dig up ' + sp.name, text: '✕', onclick: () => { if (confirm('Dig up the ' + sp.name.toLowerCase() + '? The seed cost is not refunded.')) { g.plots[i] = null; PB.save(); render(); } } }));
    const soil = h('div', { class: 'g-soil' + (st.key === 'ready' ? ' ready' : '') + (st.key === 'thirsty' ? ' dry' : ''), html: plantSVG(sp, p.stage, p.golden && p.stage >= 4) + (st.key === 'thirsty' ? '<span class="g-drop">💧</span>' : '') });
    const card = h('div', { class: 'g-plot r' + sp.r, style: '--rc:' + RAR[sp.r][1] }, [soil, h('b', { text: (p.golden && p.stage >= 4 ? '🌟 ' : '') + sp.name }), lab, h('div', { class: 'xpbar g-bar' }, [bar]), acts]);
    refs[i] = { p: p, bar: bar, lab: lab, key: st.key, stage: p.stage };
    return card;
  }
  function seedPicker(i) {
    const solved = solvedChapters();
    const ov = h('div', { class: 'reward-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Choose a seed', onclick: (e) => { if (e.target === ov) ov.remove(); } });
    const list = h('div', { class: 'seed-list' });
    SPECIES.forEach((sp) => {
      const open = unlocked(sp, solved), afford = PB.wallet.coins() >= sp.c, grown = G().herb[sp.id];
      list.appendChild(h('button', { class: 'seed' + (open ? '' : ' locked') + (open && !afford ? ' poor' : ''), type: 'button', style: '--rc:' + RAR[sp.r][1], disabled: open && afford ? null : 'disabled', onclick: () => { if (plant(i, sp.id)) { ov.remove(); render(); } } }, [
        h('span', { class: 'seed-pic' + (open ? '' : ' dim'), html: plantSVG(sp, 4, false, 64) + (open ? '' : '<span class="seed-lock">🔒</span>') }),
        h('span', { class: 'seed-txt' }, [h('b', { text: sp.name }), h('small', { text: open ? '◉ ' + sp.c + ' → ◉ ' + Math.round(sp.y * (lvl('hive') ? 1.3 : 1)) + ' · ' + fmtMin(sp.t * speed()) + ' · 💧' + (sp.w * 3) : lockText(sp) }), h('i', { style: 'color:' + RAR[sp.r][1], text: RAR[sp.r][0] + (grown ? ' · grown ×' + grown.n : '') })])
      ]));
    });
    ov.appendChild(h('div', { class: 'reward-box seed-box' }, [h('div', { class: 'eyebrow', text: 'Plot ' + (i + 1) + ' · you have ◉ ' + PB.wallet.coins() + ' and 💧 ' + G().water }), h('h2', { text: 'Choose a seed' }), h('p', { text: 'Price → harvest value · time to bloom · water needed after planting. The first stage is watered for free.' }), list, h('button', { class: 'btn ghost', type: 'button', text: 'Close', onclick: () => ov.remove() })]));
    document.body.appendChild(ov);
  }
  function shop() {
    const g = G(), box = h('div', { class: 'garden-shop' });
    box.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Upgrades' }), h('p', { text: 'Tools that make the garden grow faster, store more water and pay more.' })]));
    const ug = h('div', { class: 'shop-grid' });
    UPG.forEach((u) => {
      const l = lvl(u.id), max = l >= u.lv.length;
      ug.appendChild(h('div', { class: 'shop-item' + (max ? ' owned' : '') }, [h('span', { class: 'shop-ic', text: u.icon }), h('b', { text: u.name + (u.lv.length > 1 ? ' · level ' + l + '/' + u.lv.length : '') }), h('small', { text: max ? 'Owned. ' + u.lv[u.lv.length - 1][1] : u.lv[l][1] }), max ? h('span', { class: 'shop-own', text: '✓ Owned' }) : coinBtn(u.lv[l][0], l ? 'Upgrade' : 'Buy', () => { buyUpg(u); render(); })]));
    });
    const k = g.plots.length - 4;
    ug.appendChild(h('div', { class: 'shop-item' + (k >= PLOT_COST.length ? ' owned' : '') }, [h('span', { class: 'shop-ic', text: '🟫' }), h('b', { text: 'Extra plot · ' + g.plots.length + '/12' }), h('small', { text: 'Another bed to grow in.' }), k >= PLOT_COST.length ? h('span', { class: 'shop-own', text: '✓ All 12 plots' }) : coinBtn(PLOT_COST[k], 'Buy', () => { buyPlot(); render(); })]));
    const free = g.plots.some((p) => !p);
    ug.appendChild(h('div', { class: 'shop-item gem' }, [h('span', { class: 'shop-ic', text: '🎁' }), h('b', { text: 'Mystery seed' }), h('small', { text: 'Plants a random uncommon-or-rarer species in your first empty plot, even one you have not unlocked. It favours species you have never grown.' }), h('button', { class: 'btn small primary', type: 'button', disabled: free && PB.wallet.gems() >= 40 ? null : 'disabled', title: free ? '' : 'Needs an empty plot', text: 'Buy · 💎 40', onclick: () => { mysterySeed(); render(); } })]));
    box.appendChild(ug);
    box.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: 'Decorations' }), h('p', { text: 'Purely for looks. Each comes with a small science fact; hover over it in the garden.' })]));
    const dg = h('div', { class: 'shop-grid' });
    DECO.forEach((d) => { const own = !!g.deco[d.id]; dg.appendChild(h('div', { class: 'shop-item' + (own ? ' owned' : '') }, [h('span', { class: 'shop-ic', text: d.icon }), h('b', { text: d.name }), h('small', { text: d.text }), own ? h('span', { class: 'shop-own', text: '✓ In your garden' }) : coinBtn(d.c, 'Buy', () => { buyDeco(d); render(); })])); });
    box.appendChild(dg);
    box.appendChild(h('p', { class: 'predict-note', text: 'Garden totals: spent ◉ ' + g.coinsOut + ', earned back ◉ ' + g.coinsIn + '.' }));
    return box;
  }
  function herbarium() {
    const g = G(), solved = solvedChapters(), box = h('div');
    box.appendChild(h('div', { class: 'section-head' }, [h('h2', { text: '📗 Herbarium' }), h('p', { text: Object.keys(g.herb).length + ' of ' + SPECIES.length + ' species grown. Growing every species pays 💎 400; golden blooms are marked with a star.' })]));
    const grid = h('div', { class: 'herb-grid' });
    SPECIES.forEach((sp) => {
      const rec = g.herb[sp.id], open = unlocked(sp, solved);
      grid.appendChild(h('div', { class: 'herb' + (rec ? ' got' : ''), style: '--rc:' + RAR[sp.r][1] }, [
        h('div', { class: 'herb-pic', html: plantSVG(sp, 4, rec && rec.gold, 96) }),
        h('b', { text: (rec && rec.gold ? '🌟 ' : '') + sp.name }),
        h('i', { text: sp.latin }),
        h('small', { text: rec ? sp.fact : open ? 'Unlocked: grow it to read its story.' : lockText(sp) }),
        h('span', { class: 'herb-meta', style: 'color:' + RAR[sp.r][1], text: RAR[sp.r][0] + (rec ? ' · harvested ×' + rec.n + (rec.gold ? ' · golden ×' + rec.gold : '') : '') })
      ]));
    });
    box.appendChild(grid);
    return box;
  }
  function render() {
    tickAll(); rainCheck();
    const wrap = h('div', { class: 'wrap-wide garden' });
    wrap.appendChild(header());
    wrap.appendChild(tabs());
    if (tab === 'garden') {
      wrap.appendChild(scene());
      const g = G(), thirsty = g.plots.filter((p) => p && status(p).key === 'thirsty');
      const bar = h('div', { class: 'garden-bar' });
      if (lvl('can') && thirsty.length) bar.appendChild(h('button', { class: 'btn primary', type: 'button', text: '🚿 Water all thirsty plants (' + thirsty.length + ')', onclick: () => { g.plots.forEach((p, i) => { if (p) water(i); }); render(); } }));
      const ready = g.plots.filter((p) => p && p.stage >= 4).length;
      if (ready > 1) bar.appendChild(h('button', { class: 'btn', type: 'button', text: '🧺 Harvest all (' + ready + ')', onclick: () => { g.plots.forEach((p, i) => { if (p && p.stage >= 4) harvest(i); }); render(); } }));
      bar.appendChild(h('small', { text: g.water < 3 ? 'Running low on water: solve a few problems, quick checks or drills to refill the barrel.' : 'Tip: long-growing plants pay the most per seed, and a sprinkler keeps them going while you are away.' }));
      wrap.appendChild(bar);
    } else if (tab === 'shop') wrap.appendChild(shop());
    else wrap.appendChild(herbarium());
    PB.setView([wrap], 'garden');
    clearInterval(timer);
    timer = setInterval(() => {
      if (location.hash !== '#garden' || !document.querySelector('.garden')) { clearInterval(timer); return; }
      if (tab !== 'garden') return;
      if (tickAll()) { render(); return; }
      refs.forEach((r) => { if (!r) return; const st = status(r.p); if (st.key !== r.key) { render(); return; } r.bar.style.width = Math.round(st.frac * 100) + '%'; r.lab.textContent = st.label; });
    }, 1000);
  }
  PB.views.garden = function () { render(); };

  /* Ready-to-harvest notices while studying elsewhere. */
  setInterval(() => {
    if (!PB.S || location.hash === '#garden') return;
    tickAll();
    G().plots.forEach((p) => { if (p && p.stage >= 4 && !p.told) { p.told = 1; PB.save(); if (PB.toast) PB.toast('<span class="tx">🧺 ' + SP[p.sp].name + '</span> is ready to harvest in your <a href="#garden">garden</a>', ''); } });
  }, 30000);

  PB.garden = { water: () => G().water, cap: cap, addWater: addWater, species: SPECIES, ready: () => { tickAll(); return G().plots.filter((p) => p && p.stage >= 4).length; } };

  const prevHome = PB.homeTop;
  PB.homeTop = function (wrap) {
    if (prevHome) prevHome(wrap);
    const g = G(); tickAll();
    const ready = g.plots.filter((p) => p && p.stage >= 4).length, thirsty = g.plots.filter((p) => p && p.stage < 4 && p.wAt == null).length, empty = g.plots.filter((p) => !p).length;
    const msg = ready ? ready + ' ready to harvest!' : thirsty ? thirsty + ' thirsty plant' + (thirsty > 1 ? 's' : '') + ' · 💧 ' + g.water : empty ? empty + ' empty plot' + (empty > 1 ? 's' : '') + ' · ◉ ' + PB.wallet.coins() + ' to spend' : 'Growing · 💧 ' + g.water;
    PB.playRow(wrap).appendChild(h('a', { class: 'today-card garden-card', href: '#garden' }, [h('div', { class: 'eyebrow', text: '🌻 Science garden' }), h('h3', { text: Object.keys(g.herb).length + ' / ' + SPECIES.length + ' species' }), h('div', { class: 'xpbar lg', html: '<span style="width:' + Math.round(100 * Object.keys(g.herb).length / SPECIES.length) + '%"></span>' }), h('small', { text: msg })]));
  };

  if (PB.BADGES) PB.BADGES.push(
    { id: 'garden1', mark: '🌱', name: 'Green Fingers', desc: 'Harvest your first plant in the science garden.', test: () => G().harvests >= 1 },
    { id: 'garden25', mark: '🌻', name: 'Head Gardener', desc: 'Harvest 25 plants.', test: () => G().harvests >= 25 },
    { id: 'gardenGold', mark: '🌟', name: 'Golden Touch', desc: 'Harvest a golden bloom.', test: () => Object.values(G().herb).some((r) => r.gold) },
    { id: 'gardenAll', mark: '📗', name: 'Botanist', desc: 'Grow every species in the herbarium.', test: () => Object.keys(G().herb).length >= SPECIES.length }
  );
  G(); rainCheck();
})();
