import { useEffect, useState } from "react";

export default function BattleCountdown({ start, onDone }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!start) return;
    setCount(3);
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer);
          onDone();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [start, onDone]);

  if (!start || count === 0) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-10 flex flex-col items-center">
        <span className="text-6xl font-extrabold text-amber-500 mb-2 animate-pulse">{count}</span>
        <span className="text-zinc-300 text-lg font-medium">Get Ready!</span>
      </div>
    </div>
  );
}
