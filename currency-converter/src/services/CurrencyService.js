const memoryCache = {};

export async function getRate(from, to) {
  const key = `${from}_${to}`;

  // Check in-memory cache
  if (memoryCache[key]) {
    return { rate: memoryCache[key], source: 'cache' };
  }

  // Check localStorage
  const stored = localStorage.getItem(key);
  if (stored) {
    const rate = parseFloat(stored);
    memoryCache[key] = rate;
    return { rate, source: 'localStorage' };
  }

  // Fetch from JSON
  const response = await fetch('/rates.json');
  const data = await response.json();
  const fromRate = data.rates[from];
  const toRate = data.rates[to];
  const rate = toRate / fromRate;

  // Save to cache + localStorage
  memoryCache[key] = rate;
  localStorage.setItem(key, rate);

  return { rate, source: 'json' };
}

export async function getCurrencyList() {
  const response = await fetch('/rates.json');
  const data = await response.json();
  return data.currencies;
}

export function clearCache() {
  Object.keys(memoryCache).forEach(key => delete memoryCache[key]);
  localStorage.clear();
}
