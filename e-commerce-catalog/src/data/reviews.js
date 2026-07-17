const FIRST_NAMES = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery",
  "Cameron", "Peyton", "Sam", "Drew", "Reese", "Skyler", "Quinn", "Rowan",
  "Emerson", "Hayden", "Parker", "Dakota",
];

const LAST_NAMES = [
  "Chen", "Patel", "Garcia", "Kim", "Nguyen", "Smith", "Johnson", "Lee",
  "Brown", "Davis", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas",
  "Moore", "Jackson", "White", "Harris", "Clark",
];

const POSITIVE_TITLES = [
  "Exceeded my expectations",
  "Absolutely love it",
  "Worth every baht",
  "Great quality",
  "Would buy again",
];
const NEUTRAL_TITLES = [
  "Does the job",
  "Decent for the price",
  "Pretty good overall",
  "It's fine",
];
const NEGATIVE_TITLES = [
  "Not what I expected",
  "Disappointed",
  "Wouldn't recommend",
  "Had some issues",
];

const POSITIVE_BODIES = [
  "This exceeded my expectations in every way. The build quality feels premium and it's held up well with daily use.",
  "I've been using this for a few weeks now and I'm genuinely impressed. Fast shipping too.",
  "Exactly as described and then some. I've already recommended it to a couple of friends.",
  "Great value for the price. I was hesitant at first but glad I pulled the trigger.",
  "Five stars well deserved — everything about this feels well thought out.",
];
const NEUTRAL_BODIES = [
  "It's a solid choice, though nothing about it particularly stands out. Does what it's supposed to.",
  "Good enough for the price, but I've seen better in this category. No regrets though.",
  "Works as expected. Packaging could be better but the product itself is fine.",
  "Middle of the road — not bad, not amazing. I'd consider other options next time.",
];
const NEGATIVE_BODIES = [
  "Didn't quite live up to the description. Functional, but I expected more for the price.",
  "Ran into a few issues out of the box. Customer service was helpful but the product itself was underwhelming.",
  "Wouldn't buy this again. Feels cheaper than the photos suggest.",
  "Disappointed with the overall quality. Might return it if the window's still open.",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickUniqueNames(rng, count) {
  const used = new Set();
  const names = [];
  while (names.length < count) {
    const full = `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`;
    if (!used.has(full)) {
      used.add(full);
      names.push(full);
    }
  }
  return names;
}

function initialsFor(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function getReviewsByProductId(productId, rating = 4) {
  const rng = mulberry32(hashString(productId));
  const count = 6 + Math.floor(rng() * 4);
  const names = pickUniqueNames(rng, count);
  const now = Date.now();

  return names.map((name, i) => {
    const delta = (rng() - 0.5) * 2;
    const reviewRating = Math.round(Math.min(5, Math.max(1, rating + delta)));
    const sentiment =
      reviewRating >= 4 ? "positive" : reviewRating === 3 ? "neutral" : "negative";
    const titles =
      sentiment === "positive"
        ? POSITIVE_TITLES
        : sentiment === "neutral"
          ? NEUTRAL_TITLES
          : NEGATIVE_TITLES;
    const bodies =
      sentiment === "positive"
        ? POSITIVE_BODIES
        : sentiment === "neutral"
          ? NEUTRAL_BODIES
          : NEGATIVE_BODIES;
    const daysAgo = Math.floor(rng() * 240);

    return {
      id: `${productId}-review-${i}`,
      author: name,
      initials: initialsFor(name),
      rating: reviewRating,
      date: new Date(now - daysAgo * 86400000).toISOString(),
      title: pick(rng, titles),
      body: pick(rng, bodies),
      verified: rng() < 0.7,
      helpfulCount: Math.floor(rng() * 25),
    };
  });
}

const BREAKDOWN_WEIGHTS = [
  { min: 4.5, weights: [70, 22, 5, 2, 1] },
  { min: 4.0, weights: [50, 32, 12, 4, 2] },
  { min: 3.5, weights: [35, 30, 20, 10, 5] },
  { min: 0, weights: [20, 20, 25, 20, 15] },
];

export function getRatingBreakdown(rating, reviewCount) {
  const { weights } = BREAKDOWN_WEIGHTS.find((tier) => rating >= tier.min);
  const total = weights.reduce((a, b) => a + b, 0);

  return [5, 4, 3, 2, 1].map((star, idx) => {
    const pct = weights[idx] / total;
    return {
      star,
      pct: Math.round(pct * 100),
      count: Math.round(pct * reviewCount),
    };
  });
}
