
import { useEffect, useState } from 'react';

export default function App() {
  const defaultState = {
    money: 100,
    seeds: 5,
    crops: 0,
  };

  const [game, setGame] = useState(defaultState);

  useEffect(() => {
    const saved = localStorage.getItem("farmGame");
    if (saved) setGame(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("farmGame", JSON.stringify(game));
  }, [game]);

  const buySeeds = () => {
    if (game.money >= 10) {
      setGame({ ...game, money: game.money - 10, seeds: game.seeds + 1 });
    }
  };

  const plantSeeds = () => {
    if (game.seeds > 0) {
      setGame({ ...game, seeds: game.seeds - 1, crops: game.crops + 1 });
    }
  };

  const sellCrops = () => {
    if (game.crops > 0) {
      setGame({ ...game, crops: 0, money: game.money + game.crops * 20 });
    }
  };

  const resetGame = () => {
    setGame(defaultState);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>🌾 Tycoon Granjero</h1>
      <p>💰 Dinero: ${game.money}</p>
      <p>🌱 Semillas: {game.seeds}</p>
      <p>🥕 Cultivos: {game.crops}</p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={buySeeds}>Comprar Semilla ($10)</button><br /><br />
        <button onClick={plantSeeds}>Plantar Semilla</button><br /><br />
        <button onClick={sellCrops}>Vender Cultivos ($20 c/u)</button><br /><br />
        <button onClick={resetGame}>Reiniciar Juego</button>
      </div>
    </div>
  );
}
