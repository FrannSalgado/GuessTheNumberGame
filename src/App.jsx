import { useState } from "react";
import GameInput from "./assets/components/GameInput";
import "./assets/Styles/App.css";
import { generateRandomNumber } from "./assets/Utils/generateRandomNumber";

function App() {
  const [numeroTarget, setNumeroTarget] = useState(generateRandomNumber());
  const [numeroGuess, setNumeroGuess] = useState("");
  const [puntos, setPuntos] = useState(10);
  const [highScore, setHighScore] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const handleAdivinar = () => {
    const guess = parseInt(numeroGuess);

    if (isNaN(guess) || guess < 1 || guess > 20) {
      setMensaje("Por favor, ingresa un número válido entre 1 y 20.");
      return;
    }

    if (guess === numeroTarget) {
      setMensaje("¡Correcto! Has adivinado el número.");
      if (puntos > highScore) {
        setHighScore(puntos);
      }
      setNumeroTarget(generateRandomNumber());
      setPuntos(10);
    } else {
      setPuntos((prevPuntos) => prevPuntos - 1);

      if (puntos <= 1) {
        setMensaje("Has perdido. El número era " + numeroTarget);
        setNumeroTarget(generateRandomNumber());
        setPuntos(10);
      } else {
        setMensaje(
          guess > numeroTarget ? "El número es menor" : "El número es mayor"
        );
      }
    }

    setNumeroGuess("");
  };

  return (
    <div className="App">
      <h1>Juego de Adivinar el Número</h1>
      <p>Adivina el número entre 1 y 20</p>
      <p className="score">Puntos: {puntos}</p>
      <p className="high-score">Mejor Puntaje: {highScore}</p>
      <GameInput
        numeroGuess={numeroGuess}
        setNumeroGuess={setNumeroGuess}
        handleAdivinar={handleAdivinar}
      />
      <p className="mensaje">{mensaje}</p>
    </div>
  );
}

export default App;
