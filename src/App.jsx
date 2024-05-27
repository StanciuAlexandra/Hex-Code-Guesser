import { useEffect, useState } from "react";

const colors = [
  "#E6194B", "#3CB44B", "#FFE119", "#4363D8",
  "#F58231", "#911EB4", "#46F0F0", "#F032E6",
  "#BCF60C", "#FABEBE", "#008080", "#E6BEFF",
  "#9A6324", "#FFFAC8", "#800000", "#0DEFA0",
  "#F82994", "#CABF06", "#2CB8C4", "#2CA018",
  "#3AB389", "#65A110", "#FB9301", "#718B58",
  "#99198E",
];

function App() {
  const [currentColor, setCurrentColor] = useState(colors[randomizeIndex(colors)]);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [status, setStatus] = useState("Ghicește codul hex");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  function randomizeIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function changeBackgroundColor(name, color) {
    name.style.backgroundColor = color;
  }

  function clickHandler(hex) {
    const correct = document.getElementById(currentColor);
    const clicked = document.getElementById(hex);
    if (hex === currentColor) {
      setStatus("Răspuns corect");
      setScore(score + 1);
    } else {
      setStatus("Răspuns greșit");
      changeBackgroundColor(clicked, "red");
    }
    changeBackgroundColor(correct, "green");
    setTimeout(() => {
      changeBackgroundColor(clicked, "");
      changeBackgroundColor(correct, "");
      loadNewColor();
      setAttempts(attempts + 1);
    }, 1000);
  }

  function loadNewColor() {
    setCurrentColor(colors[randomizeIndex(colors)]);
  }

  function loadCurrentChoices() {
    const newChoices = [currentColor];
    for (let i = 0; i < 2; i++) {
      const filteredColors = colors.filter((color) => !newChoices.includes(color));
      const randomIndex = randomizeIndex(filteredColors);
      newChoices.push(filteredColors[randomIndex]);
    }
    shuffleChoices(newChoices);
  }

  function shuffleChoices(current) {
    const choices = [...current];
    const shuffledChoices = [];
    while (choices.length > 0) {
      const randomIndex = randomizeIndex(choices);
      shuffledChoices.push(choices[randomIndex]);
      choices.splice(randomIndex, 1);
    }
    setCurrentChoices(shuffledChoices);
  }

  useEffect(() => {
    setStatus("Ghicește codul hex");
    loadCurrentChoices();
  }, [currentColor]);

  useEffect(() => {
    if (attempts === 20) {
      setStatus("Joc terminat");
    }
  }, [attempts]);

  function restartGame() {
    setScore(0);
    setAttempts(0);
    loadNewColor();
    setStatus("Ghicește codul hex");
  }
  function toggleInstructions() {
    setShowInstructions(!showInstructions);
  }


  return (
    <div className="absolute inset-0 flex flex-col h-full w-full bg-blue-100
      bg-[radial-gradient(#5876a3_1px,transparent_1px)] [background-size:16px_16px]">
       <button className="absolute bg-white top-0 right-0 m-4 border border-slate-600 
        p-2 w-10 h-10 text-slate-800 rounded-full" onClick={toggleInstructions}>
        ℹ️
      </button>
      {showInstructions && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
      )}
      {showInstructions && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white p-8 border border-gray-400 text-slate-800 rounded-lg flex flex-col z-30">
          <h2 className="text-xl font-bold mb-4">Instrucțiuni</h2>
          <p>Ghicește codul hex corect pentru fiecare culoare afișată.</p>
          <p>Fiecare răspuns corect va adăuga un punct la scor.</p>
          <p>Jocul se termină după 20 de încercări.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            mt-4 rounded self-end" onClick={toggleInstructions}>
            Închide
          </button>
        </div>
      )}
      <div className="flex flex-col justify-center center-self items-center m-auto w-6/12 max-w-4xl">
        <div className="flex flex-col justify-center center-self items-center border border-slate-400
          m-auto w-full gap-5 bg-white p-5 rounded-lg ">
          <div className="flex justify-between w-full gap-4 text-center">
            <h1 className="text-center text-xl text-slate-600 font-bold">Scor curent: {score}</h1>
            <h1 className="text-center text-xl text-slate-600">{attempts}/20</h1>
          </div>
          
          <h1 className="text-center text-2xl font-bold text-slate-800">{status}</h1>
          <div className="w-full h-32 text-center rounded-md" style={{ backgroundColor: currentColor }}></div>
          <div className="flex justify-between w-full gap-4 text-center">
            {currentChoices.map((choice) => {
              return (
                <div
                  className="w-full py-4 bg-blue-200 rounded-md text-slate-800 font-bold cursor-pointer 
                          hover:bg-blue-100 transition ease-in-out duration-250ms"
                  key={choice}
                  id={choice}
                  onClick={() => clickHandler(choice)}
                >
                  {choice}
                </div>
              );
            })}
          </div>
          {attempts=== 20 && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>)}
          {attempts === 20 && (
            <div className="border border-slate-400 rounded-lg bg-blue-100 p-4 mt-4 text-center absolute
              flex flex-col items-center justify-between z-30">
              <p className="font-bold text-slate-800">Scor final</p>
              <div className="relative m-6">
                <span className="font-bold text-blue-500 text-7xl">{score}</span>
                <span className="font-bold text-blue-500 absolute bottom-0">/20</span>
              </div>
              
              {score > 10 ? (
                <p className="text-blue-900">Felicitări! &#x1F60A;</p>
              ):(<p className="text-slate-800">Mai încearcă... &#x1F613;</p>)}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
               mt-6 transition ease-in-out duration-250ms" onClick={restartGame}>
                Reîncepe jocul
              </button>
            </div>
          )}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full mt-6 
          transition ease-in-out duration-250ms w-10 h-10 self-end flex items-center justify-center
            z-10" onClick={restartGame}>
          <ion-icon name="reload-outline"></ion-icon>
        </button>
      </div>

    </div>
  );
}

export default App;
