import { useState, useEffect } from "react";
import GameInput from "./assets/components/GameInput";
import "./assets/Styles/App.css";
import { generateRandomNumber } from "./assets/Utils/generateRandomNumber";
import defaultImage from "./assets/img/Genio_default.png";
import mayorImage from "./assets/img/Genio_More_Up.png";
import menorImage from "./assets/img/Genio_more_low.png";
import ganadorImage from "./assets/img/Genio_Win.png";

function App() {
  const [numeroTarget, setNumeroTarget] = useState(generateRandomNumber());
  const [numeroGuess, setNumeroGuess] = useState("");
  const [puntos, setPuntos] = useState(10);
  const [highScore, setHighScore] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [image, setImage] = useState(defaultImage);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    const saveScore = localStorage.getItem("highScore");
    if (saveScore) {
      setHighScore(parseInt(saveScore));
    }
  }, []);

  const ejecutarShake = () => {
    setAnimar(true);
    const timer = setTimeout(() => {
      setAnimar(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleAdivinar = () => {
    const guess = parseInt(numeroGuess);

    if (isNaN(guess) || guess < 1 || guess > 20) {
      setMensaje("Por favor, ingresa un numero valido entre 1 y 20.");
      setImage(defaultImage);
      ejecutarShake();
      setNumeroGuess("");

      return;
    }

    if (guess === numeroTarget) {
      setMensaje("¡Correcto! Has adivinado el numero.");
      setImage(ganadorImage);
      if (puntos > highScore) {
        setHighScore(puntos);
        localStorage.setItem("highScore", puntos);
      }
      setNumeroTarget(generateRandomNumber());
      setPuntos(10);
    } else {
      setPuntos((prevPuntos) => prevPuntos - 1);

      if (puntos <= 1) {
        setMensaje("Has perdido. El numero era " + numeroTarget);
        setNumeroTarget(generateRandomNumber());
        setPuntos(10);
        setImage(defaultImage);
      } else {
        if (guess > numeroTarget) {
          setMensaje("El numero es menor");
          ejecutarShake();
          setImage(menorImage);
        } else {
          setMensaje("El numero es mayor");
          ejecutarShake();
          setImage(mayorImage);
        }
      }
    }

    setNumeroGuess("");
  };

  return (
    <div className="game-container">
      <div className="App">
        <h1>Juego de Adivinar el numero</h1>
        <p>Adivina el numero entre 1 y 20</p>
        <p className="score">Puntos: {puntos}</p>
        <p className="high-score">Mejor Puntaje: {highScore}</p>
        <p className={`mensaje ${animar ? "animar" : ""}`}>{mensaje}</p>{" "}
        <div className="image-container">
          <img src={image} alt="Estado del juego" className="game-image" />
        </div>
        <GameInput
          numeroGuess={numeroGuess}
          setNumeroGuess={setNumeroGuess}
          handleAdivinar={handleAdivinar}
        />
      </div>
    </div>
  );
}

export default App;
