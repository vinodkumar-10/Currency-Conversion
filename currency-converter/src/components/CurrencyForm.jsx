import React, { useEffect, useState } from 'react';
import { convertCurrency } from '../viewmodel/CurrencyViewModel';
import { getCurrencyList } from '../services/currencyService';

const CurrencyForm = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState('');
  const [source, setSource] = useState('');
  const [currencyList, setCurrencyList] = useState({});

  useEffect(() => {
    getCurrencyList().then(setCurrencyList);
  }, []);

  const handleConvert = async () => {
    const { result, source } = await convertCurrency(amount, from, to);
    setResult(result);
    setSource(source);
  };

  return (
    <div className="currency-card">
      <h2 className="currency-title">Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="currency-input"
      />

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

      <button onClick={handleConvert} className="currency-button">
        Convert
      </button>

      {result && (
        <div className="currency-result">
          Result: {result} <span className="currency-source">({source})</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyForm;
