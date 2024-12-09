import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

function App() {
  const [basketPosition, setBasketPosition] = useState(400);
  const [apples, setApples] = useState([]);
  const [score, setScore] = useState(0);
  const [fallSpeed, setFallSpeed] = useState(3);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && basketPosition > 0) {
        setBasketPosition((pos) => pos - 30);
      } else if (event.key === "ArrowRight" && basketPosition < 760) {
        setBasketPosition((pos) => pos + 30);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [basketPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 760;
      setApples((prev) => [...prev, { id: Date.now(), x, y: 0 }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setApples((prev) =>
        prev.map((apple) => ({ ...apple, y: apple.y + fallSpeed }))
      );
    }, 20);

    return () => clearInterval(interval);
  }, [fallSpeed]);

  const checkCollision = () => {
    setApples((prev) =>
      prev.filter((apple) => {
        const isCaught =
          apple.y > 540 &&
          apple.x > basketPosition &&
          apple.x < basketPosition + 80;
        if (isCaught) {
          setScore((s) => s + 1);
          setFallSpeed((speed) => speed + 0.1);
        }
        return !isCaught && apple.y < 600;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [basketPosition, apples]);

  return (
    <div className="game-container">
      <header className="header">
        <input type="text" placeholder="Paste your song link..." />
      </header>
      <div className="game-area">
        <div
          className="basket"
          style={{ left: `${basketPosition}px` }}
        ></div>
        {apples.map((apple) => (
          <animated.div
            key={apple.id}
            className="apple"
            style={{
              transform: `translate(${apple.x}px, ${apple.y}px)`,
            }}
          ></animated.div>
        ))}
        <div className="score">Score: {score}</div>
      </div>
    </div>
  );
}

export default App;
