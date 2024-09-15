import { number } from "prop-types";
import { useEffect, useState } from "react";

// input을 받고, option 태그를 이용해 USD -> BTC로 변환하는 코드 작성
function App() {
  const [loading, setLoading] = useState(true);
  // 빈 array 값 넘겨줌
  const [coins, setCoins] = useState([]);
  const [asset, setAsset] = useState(0);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");

  // 배열이 비어 있으면 단 한 번만 작동
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);

  const onChange = (event) => {
    setName(event.target.selectedOptions[0].text.split(":")[0]);
    setPrice(parseFloat(event.target.value));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (asset === 0) return;
    setAsset(0);
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>
            <form onSubmit={onSubmit}>
              <input 
                onChange={(event) => setAsset(event.target.value)} 
                value={asset === 0? "" : asset}  
                type="number"
                placeholder="How much do you have?"
              />
              <button>Reset</button>
            </form>
          </div>
          <h2>With ${asset === undefined ? 0 : asset}, you can purchase {asset > 0 && price !== 0 ? (asset / price) : 0} of {name}</h2>
        </div>
      )}
    </div>
  );
}

export default App;