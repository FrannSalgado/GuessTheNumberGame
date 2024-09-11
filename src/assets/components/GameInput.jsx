import React from "react";
import "../Styles/GameInputStyle.css";
const GameInput = ({ numeroGuess, setNumeroGuess, handleAdivinar }) => {
  return (
    <div className="input-container">
      <input
        type="number"
        value={numeroGuess}
        onChange={(e) => setNumeroGuess(e.target.value)}
        placeholder="Ingresa tu numero"
        className="input-field"
      />
      <button onClick={handleAdivinar} className="input-button">
        Adivinar
      </button>
    </div>
  );
};

export default GameInput;
