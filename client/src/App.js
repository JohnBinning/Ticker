import React, { useCallback } from "react";
import "./index.css";

function App() {
  const [price, setPrice] = React.useState(null);
  const [percent, setPercent] = React.useState(null);
  const [symbol, setSymbol] = React.useState(null);
  const [symbolIsUp, setSymbolIsUp] = React.useState(null);

  const handlePriceCheck = useCallback(() => {
    fetch(`/api/quote/${symbol}`)
      .then((res) => {
        return res.json();
      })
      .then(({ 
        c: currentPrice, 
        dp: percentChange, 
      }) => {
        setPrice(currentPrice);
        // round to two digits and set percent
        if (percentChange === 0) {
          setSymbolIsUp(null);
        } else (
          setSymbolIsUp(percentChange > 0 ? 'up' : 'down');
        )
        setPercent(`${Math.round(percentChange * 100) / 100}%`);
      })
      .catch((err) => console.log('something went wrong: ', err));
  })

  return (
    <div className="Ticker">
      <div className="Ticker_input-container">
        <div className="Ticker_label-container">
          <label htmlFor="symbol">Symbol:</label>
          <input 
            className="symbol-input"
            type="text"
            name="symbol"
            onKeyUp={(e) => {
              e.key === 'Enter' && handlePriceCheck()
            }
          }
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="AAPL"
          />
        </div>
        <button 
          disabled={!symbol}
          className="button--price-check"
          type="button" 
          onClick={handlePriceCheck}
        >
          See Price
        </button>
      </div>
      <div className="Ticker_data-container">
        {price && (<div className="price-info"> Current Price: {price}</div>)}
        {percent && (
          <div 
            className={[
              'percent-info',
              `percent-info--${symbolIsUp}`
            ].join(' ')}
          >
            Percent Change: {percent}
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
