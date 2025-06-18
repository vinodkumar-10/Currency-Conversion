import { describe, it, expect, vi } from 'vitest';
import * as service from '../services/currencyService';
import { convertCurrency } from './CurrencyViewModel';

describe('convertCurrency()', () => {
  // ✅ MOCK getRate function from service
  vi.spyOn(service, 'getRate').mockImplementation(async (from, to) => {
    if (from === 'EUR' && to === 'INR') {
      return { rate: 80, source: 'cache' };
    }
    return { rate: 1, source: 'json' };
  });

  it('should return same amount when from === to', async () => {
    const result = await convertCurrency(100, 'USD', 'USD');
    expect(result).toEqual({
      result: '100.00',
      source: 'same currency (no conversion)',
    });
  });

  it('should convert amount using mocked rate (EUR to INR)', async () => {
    const result = await convertCurrency(100, 'EUR', 'INR');
    expect(result).toEqual({
      result: '8000.00',
      source: 'cache',
    });
  });

  it('should call getRate() from service when from !== to', async () => {
    const spy = vi.spyOn(service, 'getRate');
    await convertCurrency(50, 'EUR', 'INR');
    expect(spy).toHaveBeenCalledWith('EUR', 'INR');
  });

  it('should handle 0 amount correctly', async () => {
    const result = await convertCurrency(0, 'EUR', 'INR');
    expect(result.result).toBe('0.00');
  });
});
