import { useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import CloseDialogButton from "./buttons/CloseDialogButton";

function CongratulationsDialog({ onClose, typingStats, lessonHistory, lessons }) {
  const navigate = useNavigate();
  // Calculate stats
  const totalLessons = lessons.length;
  let totalRight = 0;
  let totalWrong = 0;
  let totalWpm = 0;
  let completed = 0;
  let wpmCount = 0;

  lessons.forEach((lesson) => {
    const stats = typingStats[lesson.id] || {};
    totalRight += Array.isArray(stats.right) ? stats.right.length : stats.right || 0;
    totalWrong += Array.isArray(stats.wrong) ? stats.wrong.length : stats.wrong || 0;
    if (typeof stats.wpm === "number" && stats.wpm > 0) {
      totalWpm += stats.wpm;
      wpmCount++;
    }
    if (lessonHistory[lesson.id]) completed++;
  });
  const avgWpm = wpmCount ? (totalWpm / wpmCount).toFixed(1) : 0;

  // Handle close and redirect
  const handleClose = () => {
    onClose && onClose();
    navigate("/quest-list");
  };

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={250} recycle={false} />
      <div className="relative bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-lg text-center animate-fade-in">
        <div className="absolute top-4 right-4">
          <CloseDialogButton />
        </div>
        <h2 className="text-4xl font-extrabold text-amber-400 mb-2 drop-shadow">Congratulations! 🎉</h2>
        <p className="mb-8 text-zinc-300 text-lg">You have completed all lessons in this quest.</p>
        <div className="mb-8 grid grid-cols-2 gap-4 bg-zinc-800/80 rounded-lg p-4 border border-zinc-700">
          <div className="text-left">
            <div className="mb-2 text-zinc-400 text-xs">Lessons Completed</div>
            <div className="text-xl font-bold text-amber-400">
              {completed} / {totalLessons}
            </div>
          </div>
          <div className="text-left">
            <div className="mb-2 text-zinc-400 text-xs">Total Right</div>
            <div className="text-xl font-bold text-green-400">{totalRight}</div>
          </div>
          <div className="text-left">
            <div className="mb-2 text-zinc-400 text-xs">Total Wrong</div>
            <div className="text-xl font-bold text-red-400">{totalWrong}</div>
          </div>
          <div className="text-left">
            <div className="mb-2 text-zinc-400 text-xs">Average WPM</div>
            <div className="text-xl font-bold text-blue-400">{avgWpm}</div>
          </div>
        </div>
        <button
          className="mt-2 w-full py-3 bg-amber-600 hover:bg-amber-700 text-zinc-900 font-semibold rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
          onClick={handleClose}
        >
          Go to Quest List
        </button>
      </div>
    </div>
  );
}

export default CongratulationsDialog;
