import { getRate, getCurrencyList, clearCache } from '../services/currencyService';

export async function convertCurrency(amount, from, to) {
  if (from === to) {
    return {
      result: Number(amount).toFixed(2),
      source: 'same currency (no conversion)',
    };
  }

  const { rate, source } = await getRate(from, to);
  const result = (amount * rate).toFixed(2); 
  return { result, source };
}

export async function fetchCurrencyList() {
  return await getCurrencyList();
}

export function resetCurrencyCache() {
  clearCache();
}
