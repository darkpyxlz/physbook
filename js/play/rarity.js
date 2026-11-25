/* Re-sort rarities into a pyramid in every collection: about 40% common, 27% uncommon, 18% rare,
   10% epic and 5% legendary. Each collection is ranked from most familiar to most obscure, and the
   tiers are cut from that ranking. */
(function () {
  const CUT = [0.40, 0.67, 0.85, 0.95, 1];
  const mag = (x) => { const m = /magnitude ([\d.]+)/.exec(x.text || ''); return m ? +m[1] : 99; };
  const SCORE = {
    elements: (x, i) => x.rarity * 1000 + x.n,          // familiar light elements first, superheavies last
    messier: (x) => mag(x) + (x.n === 1 ? 100 : 0),      // brighter is commoner; the Crab stays special
    numbers: (x, i) => x.rarity * 1000 + i,
    particles: (x, i) => x.rarity * 1000 + i,
    life: (x, i) => x.rarity * 1000 + i
  };
  PB.COLLECTIONS.forEach((c) => {
    const f = SCORE[c.id] || ((x, i) => x.rarity * 1000 + i);
    const ranked = c.cards.map((x, i) => [f(x, i), x]).sort((a, b) => a[0] - b[0]);
    ranked.forEach(([, x], k) => { const q = (k + 0.5) / ranked.length; x.rarity = CUT.findIndex((t) => q <= t); });
  });
})();
