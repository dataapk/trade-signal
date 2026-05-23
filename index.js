setInterval(() => {
  const pairs = ["BTC/USDT", "ETH/USDT", "BNB/USDT"];

  const signal = {
    pair: pairs[Math.floor(Math.random() * pairs.length)],
    type: Math.random() > 0.5 ? "BUY" : "SELL",
    strength: Math.floor(Math.random() * 40) + 60
  };

  console.log(signal);
}, 3000);
