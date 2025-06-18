import React, { useEffect, useState } from 'react';
import { convertCurrency, fetchCurrencyList, resetCurrencyCache } from '../viewmodel/CurrencyViewModel';

const CurrencyForm = () => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState('');
  const [source, setSource] = useState('');
  const [currencyList, setCurrencyList] = useState({});
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    fetchCurrencyList().then(setCurrencyList);
  }, []);

  const validateInput = () => {
    if (amount === '') {
      setValidationError('Amount is required');
      return false;
    }

    const num = Number(amount);
    if (isNaN(num)) {
      setValidationError('Amount must be a valid number');
      return false;
    }

    if (num <= 0) {
      setValidationError('Amount must be greater than 0');
      return false;
    }

    if (amount.toString().length > 10) {
      setValidationError('Amount cannot exceed 10 digits');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleConvert = async () => {
    if (!validateInput()) return;

    const { result, source } = await convertCurrency(amount, from, to);
    setResult(result);
    setSource(source);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setValidationError('');
  };

  const handleRefresh = () => {
    resetCurrencyCache();
    setAmount('');
    setFrom('EUR');
    setTo('INR');
    setResult('');
    setSource('');
    setValidationError('');
  };

  return (
    <div className="currency-card">
      <h2 className="currency-title">Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="currency-input"
        placeholder="Enter amount"
        maxLength={10}
      />
      {validationError && (
        <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
          {validationError}
        </div>
      )}

      <div className="currency-select-group">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="currency-select"
        >
          {Object.entries(currencyList).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="currency-select"
        >
          {Object.entries(currencyList).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="currency-button"
        disabled={!!validationError}
      >
        Convert
      </button>

      <button
        onClick={handleRefresh}
        className="currency-button"
        style={{ marginTop: '10px', backgroundColor: '#dc3545' }}
      >
        Refresh
      </button>

      {result && (
        <div className="currency-result">
          Result: {result}{' '}
          <span className="currency-source">({source})</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyForm;
