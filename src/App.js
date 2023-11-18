import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const shuffleWord = (word) => {
  const words = word.split(" ");
  const shuffledWords = words.map((w) => {
    const characters = w.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join("");
  });
  return shuffledWords.join(" ");
};

const App = () => {
  const initialWords = ["ayush Prakash", "prakash"];
  const [words, setWords] = useState(initialWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [shuffledCharacters, setShuffledCharacters] = useState([]);

  const notify = () => toast("The word is correct ");

  const notify1 = () => toast("The word is incorrect ");

  const shuffleCurrentWords = () => {
    const newWords = [...words];
    const shuffledWord = shuffleWord(newWords[currentIndex]);
    newWords[currentIndex] = shuffledWord;
    setWords(newWords);
    setShuffledCharacters(shuffledWord.split(""));
  };

  const nextWord = () => {
    setInputText("");
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    shuffleCurrentWords();
  };

  const handleCharacterClick = (char) => {
    setInputText(inputText + char);

    const charIndex = shuffledCharacters.indexOf(char);
    if (charIndex !== -1) {
      const updatedCharacters = [...shuffledCharacters];
      updatedCharacters.splice(charIndex, 1);
      setShuffledCharacters(updatedCharacters);
    }
  };

  const handleBackspace = () => {
    if (inputText.length > 0) {
      const lastCharacter = inputText.slice(-1);
      setInputText(inputText.slice(0, -1));

      setShuffledCharacters([...shuffledCharacters, lastCharacter]);
    }
  };

  useEffect(() => {
    shuffleCurrentWords();
  }, [currentIndex]);

  const checkValue = () => {
    if (shuffledCharacters.length > 0) {
      if (initialWords[currentIndex] === inputText) {
        notify();
      } else {
        notify1();
      }
    }
  };

  return (
    <div className="App">
      <div className="shuffled-words-div">
        {shuffledCharacters.map((char, index) => (
          <p
            key={index}
            className="char"
            onClick={() => handleCharacterClick(char)}
          >
            {char}
          </p>
        ))}
      </div>

      <div className="the-answer-div">{inputText}</div>

      <div>
        <button onClick={checkValue}>Check</button>
      </div>

      <button onClick={nextWord}>Next</button>
      <button onClick={handleBackspace}>Backspace</button>
      <ToastContainer />
    </div>
  );
};

export default App;
