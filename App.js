import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [blockPosition, setBlockPosition] = useState({
    top: 30,
    left: 50,
  });
  const [gameState, setGameState] = useState("reset");
  const [clock, setClock] = useState(null);
  const [timeInterval, setTimeInterval] = useState(0);
  const [reactionTimeArr, setReactionTimeArr] = useState([]);
  const interval = useRef();

  useEffect(() => {
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const startGame = () => {
    setClock(Date.parse(new Date()));
    setGameState("start");
    interval.current = window.setInterval(() => {
      const position = {
        top: parseInt(Math.random(10) * 100),
        left: parseInt(Math.random(10) * 100),
      };
      setBlockPosition(position);
    }, timeInterval * 1000);
  };

  const pauseGame = () => {
    setGameState("pause");
    setClock(null);
    window.clearInterval(interval.current);
  };

  const resetGame = () => {
    setGameState("reset");
    setTimeInterval(0);
    setReactionTimeArr([]);
    setBlockPosition({
      top: 30,
      left: 30,
    });
  };

  const setReactionTime = () => {
    const endClock = Date.parse(new Date());
    const diff = endClock - clock;
    const sec = diff / 1000;
    setReactionTimeArr([...reactionTimeArr, sec]);
    setClock(endClock);
  };

  return (
    <div className="App">
      <div>
        <button onClick={startGame} disabled={gameState === "start"}>
          Start
        </button>
        <button onClick={pauseGame} disabled={gameState === "pause"}>
          Pause
        </button>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div>
        No. Of Secondes:
        <input
          type="number"
          value={timeInterval}
          onChange={(event) => setTimeInterval(event.target.value)}
        />
      </div>
      <div className="playArea">
        <div
          onClick={setReactionTime}
          className="block"
          style={{
            display: gameState === "start" ? "block" : "none",
            top: `${blockPosition.top}%`,
            left: `${blockPosition.left}%`,
          }}
        ></div>
      </div>
      <div className="tableContainer">
        <table className="table">
          <tr>
            <th>Mouse Click Number</th>
            <th>Reaction Time</th>
          </tr>
          {reactionTimeArr.map((rt, index) => (
            <tr key={`${index}_${rt}`}>
              <td>{index + 1}</td>
              <td>{rt}s</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
