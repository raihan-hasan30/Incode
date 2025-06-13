import { useEffect, useRef, useState } from "react";

function BattleTypingArea({
  command,
  nextCommand,
  isReady,
  lessonHistory,
  setLessonHistory,
  id,
  typingStats = {},
  setTypingStats = () => {},
}) {
  const [typedText, setTypedText] = useState(lessonHistory[id] || "");
  const [wrongCount, setWrongCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const prevLength = useRef(0);

  useEffect(() => {
    if (typedText !== "") {
      setLessonHistory((prev) => {
        return {
          ...prev,
          [id]: typedText,
        };
      });
    }
  }, [typedText]);

  useEffect(() => {
    if (!isReady) return;
    if (typedText.length === 0) setStartTime(Date.now());
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        // Save stats on completion
        setTypingStats((prev) => ({
          ...prev,
          [id]: {
            wrong: wrongCount,
            chars: typedText.length,
            time: elapsed + (startTime ? Date.now() - startTime : 0),
          },
        }));
        nextCommand();
        setTypedText("");
        setWrongCount(0);
        setElapsed(0);
        setStartTime(null);
      } else if (event.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      } else if (event.key.length === 1) {
        setTypedText((prev) => {
          // Count wrong char
          const idx = prev.length;
          if (command[idx] && event.key !== command[idx]) {
            setWrongCount((wc) => wc + 1);
          }
          return prev + event.key;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReady, typedText, command, nextCommand, wrongCount, elapsed, startTime, setTypingStats, id]);

  useEffect(() => {
    // Track elapsed time
    let timer;
    if (startTime && typedText.length < command.length) {
      timer = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 200);
    }
    return () => timer && clearInterval(timer);
  }, [startTime, typedText, command.length]);

  const renderCharacters = () => {
    const chars = command.split("");
    const typedChars = typedText.split("");
    const elements = [];
    for (let i = 0; i < chars.length; i++) {
      let className = "text-transparent";
      if (i < typedChars.length) {
        if (typedChars[i] === chars[i]) {
          className = "text-amber-700";
        } else {
          className = "text-red-700";
        }
      }
      elements.push(
        <span key={i} className={className}>
          {chars[i]}
        </span>
      );
    }
    return elements;
  };

  return (
    <div className="min-h-96 max-h-96 flex items-center justify-center relative ">
      <h2 className="text-2xl font-bold">{renderCharacters()}</h2>
      {typedText.length >= command.length && (
        <button
          onClick={nextCommand}
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tab
        </button>
      )}
    </div>
  );
}

export default BattleTypingArea;
