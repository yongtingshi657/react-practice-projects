import { useState } from "react";
import "./App.css";
import { languages } from "./languages";
import StatusBoard from "./StatusBoard";
import { getFarewellText, getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());

  console.log(currentWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  console.log("guessedLetters", guessedLetters);

  const wordArray = currentWord.split("");

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !wordArray.includes(letter)
  ).length;

  const isGameWon = wordArray.every((letter) =>
    guessedLetters.includes(letter)
  );
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  console.log("wrongGuessCount", wrongGuessCount);
  console.log(languages.length);

  let recentGuessLetter = guessedLetters[guessedLetters.length - 1];
  console.log("recentletter", recentGuessLetter);

  let isIncorrect =
    recentGuessLetter && !currentWord.includes(recentGuessLetter);

  console.log("isInCorrect", isIncorrect);

  let farewellMessage = isIncorrect
    ? getFarewellText(languages[wrongGuessCount - 1].name)
    : null;
  console.log(farewellMessage);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetter) => {
      if (!prevLetter.includes(letter)) {
        return [...prevLetter, letter];
      } else {
        return prevLetter;
      }
    });
  }

  function NewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  // language
  let languageEl = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    let languageClass = isLanguageLost ? "language lost" : "language";
    let styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <p key={index} style={styles} className={languageClass}>
        {language.name}
      </p>
    );
  });



  // keyboard
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let keyboardEl = alphabet.split("").map((letter) => {
    let buttonClassName;

    if (guessedLetters.includes(letter)) {
      if (wordArray.includes(letter)) {
        buttonClassName = "correct";
      } else {
        buttonClassName = "wrong";
      }
    } else {
      buttonClassName = null;
    }

    return (
      <button
        key={letter}
        className={`letter ${buttonClassName}`}
        disabled={isGameOver}
        onClick={() => {
          addGuessedLetter(letter);
        }}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  // word

  let wordEl = currentWord.split("").map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return (
        <p className="word" key={index}>
          {letter.toUpperCase()}
        </p>
      );
    } else {
      return <p className="word" key={index}></p>;
    }
  });

  let completeWord = currentWord.split("").map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return (
        <p className="word" key={index}>
          {letter.toUpperCase()}
        </p>
      );
    } else {
      return (
        <p className="word unguessedLetter" key={index}>
          {" "}
          {letter.toUpperCase()}
        </p>
      );
    }
  });

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section>
        <StatusBoard
          isGameOver={isGameOver}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          farewellMessage={farewellMessage}
          isIncorrect={isIncorrect}
        />
      </section>

      <section className="languages-container">{languageEl}</section>
      <section>
        <h3>Remaining Guesses: {languages.length-1 - wrongGuessCount}</h3>
        
        </section>
      <section className="word-container">
        {isGameOver ? completeWord : wordEl}
      </section>

      <section className="keyboard-container">{keyboardEl}</section>

      {isGameOver && (
        <button onClick={NewGame} className="newGame-btn">
          NewGame
        </button>
      )}

      {isGameWon && <ReactConfetti />}
    </>
  );
}

export default App;
