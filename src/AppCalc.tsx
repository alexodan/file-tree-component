import { useInsertionEffect, useState } from "react";
import "./AppCalc.css";
import SpeechToTextApp from "./SpeechToTextApp";

const LEVELS = {};
const OPS = ["+", "x", "-"];

function calc(n1, n2, op) {
  if (op === "+") return n1 + n2;
  if (op === "-") return n1 - n2;
  if (op === "x") return n1 * n2;
  throw new Error(`${op} not supported`);
}

function getRandomCalc(bubbles: number) {
  const level = Math.floor(bubbles / 20) + 1;
  const currentLevel = Math.max(level, 10);
  const n1 = Math.floor(Math.random() * 10);
  const n2 = Math.floor(Math.random() * 10);
  const op = OPS[Math.floor(Math.random() * OPS.length)];
  return { calc: `${n1} ${op} ${n2}`, result: calc(n1, n2, op) };
}

function App() {
  //   const [time, setTime] = useState(0);
  const [value, setValue] = useState("");
  const [solved, setSolved] = useState(0);
  const [bubbles, setBubbles] = useState<{ calc: string; result: number }[]>(
    []
  ); // { calc: "3+2" , result: 5 }

  useInsertionEffect(() => {
    const id = setInterval(() => {
      setBubbles((prev) => [...prev, getRandomCalc(bubbles.length)]);
    }, 1500);
    return () => {
      clearInterval(id);
    };
  }, [bubbles]);

  const handleInputChange = (text: string) => {
    const answer = Number(text.trim());
    const found = bubbles.find((bub) => bub.result === answer);
    if (found) {
      setBubbles((prev) => prev.filter((b) => b !== found));
      setValue("");
    } else {
      setValue(text);
      console.log("not found:", answer);
    }
  };

  return (
    <>
      {bubbles.map((bubble) => (
        <div className="water-drop">
          <div className="water-drop-content">{bubble.calc}</div>
        </div>
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </>
  );
}

export default App;
