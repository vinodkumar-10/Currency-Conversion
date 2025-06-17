import { getRate } from '../services/currencyService';

export async function convertCurrency(amount, from, to) {
if (from === to) return { result: amount, source: 'same currency' };
const { rate, source } = await getRate(from, to);
return { result: (amount * rate).toFixed(2), source };
}